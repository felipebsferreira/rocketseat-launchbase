const fs = require("fs")

const data = require("../data.json")
const utils = require("../utils")

// Index
exports.index = function (request, response) {
    const teachers = []

    for (let teacher of data.teachers) {
        teachers.push({
            id: teacher.id,
            name: teacher.name,
            photo_url: teacher.photo_url,
            areas: teacher.areas.split(",")
        })
    }

    return response.render("teachers/index", { teachers })
}

// Show
exports.show = function (request, response) {
    const id = request.params.id

    const foundTeacher = data.teachers.find((teacher) => {
        return teacher.id == id
    })

    if (!foundTeacher) {
        return response.send("Teacher not found!")
    }

    const teacher = {
        ...foundTeacher,
        areas: foundTeacher.areas.split(","),
        class_type: foundTeacher.class_type == "P" ? "Presencial" : "À distância",
        educational_level: utils.graduation(foundTeacher.educational_level),
        age: utils.age(foundTeacher.birth),
        created_at: Intl.DateTimeFormat("pt-BR").format(foundTeacher.created_at)
    }

    return response.render("teachers/show", { teacher })
}

// Edit
exports.edit = function (request, response) {
    const id = request.params.id

    const foundTeacher = data.teachers.find((teacher) => {
        return teacher.id == id
    })

    if (!foundTeacher) {
        return response.send("Teacher not found!")
    }

    const teacher = {
        ...foundTeacher,
        birth: utils.date(foundTeacher.birth).iso,
    }

    return response.render("teachers/edit", { teacher })
}

// Create
exports.create = function (request, response) {
    return response.render("teachers/create")
}

// Post
exports.post = function (request, response) {
    const keys = Object.keys(request.body)

    for (let key of keys) {
        if (request.body[key] == "") {
            return response.send("Fill in all fields!")
        }
    }

    request.body.created_at = Date.now()
    request.body.birth = Date.parse(request.body.birth)

    let newId = 1

    for (let teacher of data.teachers) {
        if (newId <= teacher.id) {
            newId = teacher.id + 1
        }
    }

    request.body.id = Number(newId)

    const {id, photo_url, name, birth, educational_level, class_type, areas, created_at} = request.body

    data.teachers.push({
        id,
        name,
        photo_url,
        educational_level,
        class_type,
        areas,
        birth,
        created_at
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 4), (err) => {
        if (err) {
            return response.send("An error occurred while writting the file.")
        } else {
            return response.redirect(`/teachers/${id}`)
        }
    })
}

// Put
exports.put = function (request, response) {
    const keys = Object.keys(request.body)

    for (let key of keys) {
        if (request.body[key] == "") {
            return response.send("Fill in all fields!")
        }
    }

    const id = request.body.id
    let index

    const foundTeacher = data.teachers.find((teacher, foundIndex) => {
        if (teacher.id == id) {
            index = foundIndex
            return true
        }
    })

    if (!foundTeacher) {
        return response.send("Teacher not found!")
    }

    data.teachers[index] = {
        ...foundTeacher,
        ...request.body,
        id: Number(request.body.id),
        birth: Date.parse(request.body.birth)
    }

    fs.writeFile("data.json", JSON.stringify(data, null, 4), (err) => {
        if (err) {
            return response.send("An error occurred while writting the file.")
        } else {
            return response.redirect(`/teachers/${id}`)
        }
    })
}

// Delete
exports.delete = function (request, response) {
    const id = request.body.id

    data.teachers = data.teachers.filter((teacher) => {
        return teacher.id != id
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 4), (err) => {
        if (err) {
            return response.send("An error occurred while writting the file.")
        } else {
            return response.redirect(`/teachers`)
        }
    })
}