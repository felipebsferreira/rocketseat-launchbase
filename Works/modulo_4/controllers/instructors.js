const fs = require("fs")
const data = require("../data.json")
const utils = require("../utils")

// Index
exports.index = function (request, response) {

    const instructors = []

    for (let instructor of data.instructors) {
        instructors.push({
            id: instructor.id,
            name: instructor.name,
            avatar_url: instructor.avatar_url,
            services: instructor.services.split(",")
        })
    }

    return response.render("instructors/index", { instructors })
}

// Create
exports.create = function (request, response) {
    return response.render("instructors/create")
}

// Show
exports.show = function (request, response) {
    const { id } = request.params

    const foundInstructor = data.instructors.find((instructor) => {
        return instructor.id == id
    })

    if (!foundInstructor) {
        return response.send("Instructor not found!")
    }
    
    const instructor = {
        ...foundInstructor,
        age: utils.age(foundInstructor.birth),
        gender: foundInstructor.gender == "M" ? "Masculino" : "Feminino",
        services: foundInstructor.services.split(","),
        created_at: Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at)
    }

    return response.render("instructors/show", { instructor })
}

// Create
exports.post = function (request, response) {
    const keys = Object.keys(request.body)

    for (let key of keys) {
        if (request.body[key] == "") {
            return response.send("Please, fill in all fields!")
        }
    }

    let newId = 1

    for (let instructor of data.instructors) {
        if (newId <= instructor.id) {
            newId = instructor.id + 1
        }
    }

    request.body.id = Number(newId)
    request.body.birth = Date.parse(request.body.birth)
    request.body.created_at = Date.now()

    const { id, name, avatar_url, gender, services, birth, created_at } = request.body

    data.instructors.push({
        id, 
        name, 
        avatar_url, 
        gender, 
        services, 
        birth, 
        created_at
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 4), (err) => {
        if (err) {
            return response.send("An error occurred while writting the file.")
        } else {
            return response.redirect(`/instructors/${id}`)
        }
    })
}

// Edit
exports.edit = function (request, response) {
    const { id } = request.params

    const foundInstructor = data.instructors.find((instructor) => {
        return instructor.id == id
    })

    if (!foundInstructor) {
        return response.send("Instructor not found!")
    }

    foundInstructor.birth = utils.date(foundInstructor.birth).iso
    
    return response.render("instructors/edit", { instructor: foundInstructor })
}

// Put
exports.put = function (request, response) {
    const keys = Object.keys(request.body)

    for (let key of keys) {
        if (request.body[key] == "") {
            return response.send("Please, fill in all fields!")
        }
    }
    
    const { id } = request.body
    let index = 0

    const foundInstructor = data.instructors.find((instructor, foundIndex) => {
        if (instructor.id == id) {
            index = foundIndex
            return true
        }
    })

    if (!foundInstructor) {
        return response.send("Instructor not found!")
    }

    data.instructors[index] = {
        ...foundInstructor,
        ...request.body,
        id: Number(request.body.id),
        birth: Date.parse(request.body.birth)
    }

    fs.writeFile("data.json", JSON.stringify(data, null, 4), (err) => {
        if (err) {
            return response.send("An error occurred while writting the file.")
        } else {
            return response.redirect(`/instructors/${id}`)
        }
    })
}

// Delete
exports.delete = function (request, response) {
    const { id } = request.body

    const filteredInstructors = data.instructors.filter((instructor) => {
        return instructor.id != id
    })

    data.instructors = filteredInstructors

    fs.writeFile("data.json", JSON.stringify(data, null, 4), (err) => {
        if (err) {
            return response.send("An error occurred while writting the file.")
        } else {
            return response.redirect(`/instructors`)
        }
    })
}