const utils = require("../../lib/utils")

module.exports = {
    index (request, response) {
        // const students = []

        // for (let student of data.students) {
        //     students.push({
        //         id: student.id,
        //         name: student.name,
        //         photo_url: student.photo_url,
        //         email: student.email,
        //         school_year: utils.schoolYear(student.school_year)
        //     })
        // }

        // return response.render("students/index", { students })

        return response.render("students/index")
    },

    show (request, response) {
        // const id = request.params.id

        // const foundStudent = data.students.find((student) => {
        //     return student.id == id
        // })

        // if (!foundStudent) {
        //     return response.send("Student not found!")
        // }

        // const student = {
        //     ...foundStudent,
        //     school_year: utils.schoolYear(foundStudent.school_year),
        //     age: utils.age(foundStudent.birth),
        //     created_at: Intl.DateTimeFormat("pt-BR").format(foundStudent.created_at)
        // }

        // return response.render("students/show", { student })

        return response.render("students/show")
    },

    edit (request, response) {
        // const id = request.params.id

        // const foundStudent = data.students.find((student) => {
        //     return student.id == id
        // })

        // if (!foundStudent) {
        //     return response.send("Student not found!")
        // }

        // const student = {
        //     ...foundStudent,
        //     birth: utils.date(foundStudent.birth).iso,
        // }

        // return response.render("students/edit", { student })

        return response.render("students/edit")
    },

    create (request, response) {
        return response.render("students/create")
    },

    post (request, response) {
        // const keys = Object.keys(request.body)

        // for (let key of keys) {
        //     if (request.body[key] == "") {
        //         return response.send("Fill in all fields!")
        //     }
        // }

        // let newId = 1

        // for (let student of data.students) {
        //     if (newId <= student.id) {
        //         newId = student.id + 1
        //     }
        // }

        // request.body.id = Number(newId)
        // request.body.created_at = Date.now()
        // request.body.birth = Date.parse(request.body.birth)

        // const {id, photo_url, name, birth, email, school_year, workload, created_at} = request.body

        // data.students.push({
        //     id,
        //     name,
        //     photo_url,
        //     birth,
        //     email,
        //     school_year,
        //     workload,
        //     created_at
        // })

        // fs.writeFile("data.json", JSON.stringify(data, null, 4), (err) => {
        //     if (err) {
        //         return response.send("An error occurred while writting the file.")
        //     } else {
        //         return response.redirect(`/students/${id}`)
        //     }
        // })

        return response.send("post")
    },

    put (request, response) {
        // const keys = Object.keys(request.body)

        // for (let key of keys) {
        //     if (request.body[key] == "") {
        //         return response.send("Fill in all fields!")
        //     }
        // }

        // const id = request.body.id
        // let index

        // const foundStudent = data.students.find((student, foundIndex) => {
        //     if (student.id == id) {
        //         index = foundIndex
        //         return true
        //     }
        // })

        // if (!foundStudent) {
        //     return response.send("Student not found!")
        // }

        // data.students[index] = {
        //     ...foundStudent,
        //     ...request.body,
        //     id: Number(request.body.id),
        //     birth: Date.parse(request.body.birth)
        // }

        // fs.writeFile("data.json", JSON.stringify(data, null, 4), (err) => {
        //     if (err) {
        //         return response.send("An error occurred while writting the file.")
        //     } else {
        //         return response.redirect(`/students/${id}`)
        //     }
        // })

        return response.send("put")
    },

    delete (request, response) {
        // const id = request.body.id

        // data.students = data.students.filter((student) => {
        //     return student.id != id
        // })

        // fs.writeFile("data.json", JSON.stringify(data, null, 4), (err) => {
        //     if (err) {
        //         return response.send("An error occurred while writting the file.")
        //     } else {
        //         return response.redirect(`/students`)
        //     }
        // })

        return response.send("delete")
    }
}