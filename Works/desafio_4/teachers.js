const fs = require("fs")
const data = require("./data.json")

// Show
exports.show = function (request, response) {
    const id = request.params.id

    const teacher = data.teachers.find((teacher) => {
        return teacher.id == id
    })

    if (!teacher) {
        return response.send("Teacher not found!")
    }

    return response.send(teacher)
}

// Create
exports.create = function (request, response) {
    const keys = Object.keys(request.body)

    for (let key of keys) {
        if (request.body[key] == "") {
            return response.send("Fill in all fields!")
        }
    }

    request.body.created_at = Date.now()
    request.body.birth = Date.parse(request.body.birth)
    request.body.id = Number(data.teachers.length + 1)

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
            return response.redirect("/teachers")
        }
    })
}