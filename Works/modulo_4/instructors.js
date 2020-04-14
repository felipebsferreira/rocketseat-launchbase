const fs = require("fs")
const data = require("./data.json")

//show
exports.show = function (request, response) {
    const { id } = request.params

    const foundInstructor = data.instructors.find((instructor) => {
        return instructor.id == id
    })

    if (!foundInstructor) {
        return response.send("Instructor not found!")
    }

    return response.send(foundInstructor)
}

// create
exports.post = function (request, response) {
    const keys = Object.keys(request.body)

    for (let key of keys) {
        if (request.body[key] == "") {
            return response.send("Please, fill in all fields!")
        }
    }

    request.body.id = Number(data.instructors.length + 1)
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
            return response.redirect("/instructors")
        }
    })
}