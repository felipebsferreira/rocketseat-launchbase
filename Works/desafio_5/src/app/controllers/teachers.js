const utils = require("../../lib/utils")
const Teacher = require("../models/teacher")

module.exports = {
    index (request, response) {
        Teacher.getAll(teachers => {
            for (let teacher of teachers) {
                teacher.areas = teacher.areas.split(",")
            }

            return response.render("teachers/index", { teachers })
        })
    },

    show (request, response) {
        const id = request.params.id

        Teacher.getById(id, teachers => {
            if (teachers.length == 0)
                return response.send("Teacher not found!")

            const teacher = {
                ...teachers[0],
                areas: teachers[0].areas.split(","),
                class_type: teachers[0].class_type == "P" ? "Presencial" : "À distância",
                educational_level: utils.graduation(teachers[0].educational_level),
                age: utils.age(teachers[0].birth),
                created_at: utils.date(teachers[0].created_at).format
            }

            return response.render("teachers/show", { teacher })
        })
    },

    edit (request, response) {
        const id = request.params.id

        Teacher.getById(id, teachers => {
            if (teachers.length == 0)
                return response.send("Teacher not found!")

            const teacher = {
                ...teachers[0],
                birth: utils.date(teachers[0].birth).iso
            }

            return response.render("teachers/edit", { teacher })
        })
    },

    create (request, response) {
        return response.render("teachers/create")
    },

    post (request, response) {
        const keys = Object.keys(request.body)

        for (let key of keys) {
            if (request.body[key] == "") {
                return response.send("Fill in all fields!")
            }
        }

        request.body.created_at = utils.date(Date.now()).iso
        request.body.birth = utils.date(request.body.birth).iso

        Teacher.create(request.body, teachers => {
            if (teachers.length == 0)
                return response.send("An error occurred while saving the teachers' info!")

            return response.redirect(`/teachers/${teachers[0].id}`)
        })
    },

    put (request, response) {
        const keys = Object.keys(request.body)

        for (let key of keys) {
            if (request.body[key] == "") {
                return response.send("Fill in all fields!")
            }
        }

        request.body.birth = utils.date(request.body.birth).iso

        Teacher.update(request.body, () => {
            return response.redirect(`/teachers/${request.body.id}`)
        })
    },

    delete (request, response) {
        const id = request.body.id

        Teacher.delete(id, () => {
            return response.redirect(`/teachers`)
        })
    }
}