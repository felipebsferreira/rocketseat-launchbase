const utils = require("../../lib/utils")
const Student = require("../models/student")

module.exports = {
    index (request, response) {
        Student.getAll(students => {
            for (let student of students) {
                student.school_year = utils.schoolYear(student.school_year)
            }

            return response.render("students/index", { students })
        })
    },

    show (request, response) {
        const id = request.params.id

        Student.getById(id, students => {
            if (students.length == 0)
                return response.send("Student not found!")
            
            const student = {
                ...students[0],
                school_year: utils.schoolYear(students[0].school_year),
                age: utils.age(students[0].birth),
                created_at: Intl.DateTimeFormat("pt-BR").format(students[0].created_at)
            }

            return response.render("students/show", { student })
        })
    },

    edit (request, response) {
        const id = request.params.id

        Student.getById(id, students => {
            if (students.length == 0)
                return response.send("Student not found!")
            
            const student = {
                ...students[0],
                birth: utils.date(students[0].birth).iso
            }

            Student.getTeachersOptions(teachersOptions => {
                return response.render("students/edit", { student, teachersOptions })
            })
        })
    },

    create (request, response) {
        Student.getTeachersOptions(teachersOptions => {
            return response.render("students/create", { teachersOptions })
        })
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

        Student.create(request.body, students => {
            if (students.length == 0)
                return response.send("An error occurred while saving the student's info!")

            return response.redirect(`/students/${students[0].id}`)
        })
    },

    put (request, response) {
        const keys = Object.keys(request.body)

        for (let key of keys) {
            if (request.body[key] == "") {
                return response.send("Fill in all fields!")
            }
        }

        const student = {
            ...request.body,
            birth: utils.date(request.body.birth).iso
        }

        Student.update(student, () => {
            return response.redirect(`/students/${request.body.id}`)
        })
    },

    delete (request, response) {
        const id = request.body.id

        Student.delete(id, () => {
            return response.redirect("/students")
        })
    }
}