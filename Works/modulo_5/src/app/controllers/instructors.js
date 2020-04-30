const { age, date } = require("../../lib/utils")
const Instructor = require("../models/instructor")

module.exports = {
    index (request, response) {
        const { filter } = request.query

        if (filter) {
            Instructor.getBy(filter, (instructors) => {
                for (let instructor of instructors) {
                    instructor.services = instructor.services.split(",")
                }
    
                return response.render("instructors/index", { instructors, filter })
            })
        } else {
            Instructor.all((instructors) => {
                for (let instructor of instructors) {
                    instructor.services = instructor.services.split(",")
                }
    
                return response.render("instructors/index", { instructors })
            })
        }
    },

    create (request, response) {
        return response.render("instructors/create")
    },

    show (request, response) {
        const id = request.params.id
        
        Instructor.getById(id, (instructor) => {
            if (!instructor) {
                return response.send("Instructor not found!")
            }

            instructor.age = age(instructor.birth)
            instructor.gender = instructor.gender == "M" || instructor.gender == "m" ? "Masculino" : "Feminino"
            instructor.services = instructor.services.split(",")
            instructor.created_at = date(instructor.created_at).format

            return response.render("instructors/show", { instructor })
        })
    },

    edit (request, response) {
        const id = request.params.id
        
        Instructor.getById(id, (instructor) => {
            if (!instructor) {
                return response.send("Instructor not found!")
            }

            instructor.birth = date(instructor.birth).iso
            instructor.gender = instructor.gender.toUpperCase()

            return response.render("instructors/edit", { instructor })
        })
    },

    post (request, response) {
        const keys = Object.keys(request.body)

        for (let key of keys) {
            if (request.body[key] == "") {
                return response.send("Please, fill in all fields!")
            }
        }

        Instructor.create(request.body, (instructor) => {
            return response.redirect(`/instructors/${instructor.id}`)
        })
    },

    put (request, response) {
        const keys = Object.keys(request.body)

        for (let key of keys) {
            if (request.body[key] == "") {
                return response.send("Please, fill in all fields!")
            }
        }
        
        Instructor.update(request.body, () => {
            return response.redirect(`/instructors/${request.body.id}`)
        })
    },

    delete (request, response) {
        Instructor.delete(request.body.id, () => {
            return response.redirect("/instructors")
        })
    }
}