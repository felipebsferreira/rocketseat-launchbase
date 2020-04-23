const utils = require("../../lib/utils")
const db = require("../../config/db")

module.exports = {
    index (request, response) {
        db.query("SELECT * FROM teachers", (error, results) => {
            if (error) {
                return response.send("Database error!")
            } else {
                const teachers = results.rows

                for (let teacher of teachers) {
                    teacher.areas = teacher.areas.split(",")
                }

                return response.render("teachers/index", { teachers })
            }
        })
    },

    show (request, response) {
        const id = request.params.id
        const query = `SELECT * FROM teachers WHERE id = ${id}`

        db.query(query, (error, results) => {
            if (error) {
                return response.send("Database error!")
            } else if (results.rowCount == 0) {
                return response.send("Teacher not found!")
            } else {
                const foundTeacher = results.rows[0]

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
        })
    },

    edit (request, response) {
        // const id = request.params.id

        // const foundTeacher = data.teachers.find((teacher) => {
        //     return teacher.id == id
        // })

        // if (!foundTeacher) {
        //     return response.send("Teacher not found!")
        // }

        // const teacher = {
        //     ...foundTeacher,
        //     birth: utils.date(foundTeacher.birth).iso,
        // }

        // return response.render("teachers/edit", { teacher })
        
        return response.render("teachers/edit")
    },

    create (request, response) {
        return response.render("teachers/create")
    },

    post (request, response) {
        // const keys = Object.keys(request.body)

        // for (let key of keys) {
        //     if (request.body[key] == "") {
        //         return response.send("Fill in all fields!")
        //     }
        // }

        // request.body.created_at = Date.now()
        // request.body.birth = Date.parse(request.body.birth)

        // let newId = 1

        // for (let teacher of data.teachers) {
        //     if (newId <= teacher.id) {
        //         newId = teacher.id + 1
        //     }
        // }

        // request.body.id = Number(newId)

        // const {id, photo_url, name, birth, educational_level, class_type, areas, created_at} = request.body

        // data.teachers.push({
        //     id,
        //     name,
        //     photo_url,
        //     educational_level,
        //     class_type,
        //     areas,
        //     birth,
        //     created_at
        // })

        // fs.writeFile("data.json", JSON.stringify(data, null, 4), (err) => {
        //     if (err) {
        //         return response.send("An error occurred while writting the file.")
        //     } else {
        //         return response.redirect(`/teachers/${id}`)
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

        // const foundTeacher = data.teachers.find((teacher, foundIndex) => {
        //     if (teacher.id == id) {
        //         index = foundIndex
        //         return true
        //     }
        // })

        // if (!foundTeacher) {
        //     return response.send("Teacher not found!")
        // }

        // data.teachers[index] = {
        //     ...foundTeacher,
        //     ...request.body,
        //     id: Number(request.body.id),
        //     birth: Date.parse(request.body.birth)
        // }

        // fs.writeFile("data.json", JSON.stringify(data, null, 4), (err) => {
        //     if (err) {
        //         return response.send("An error occurred while writting the file.")
        //     } else {
        //         return response.redirect(`/teachers/${id}`)
        //     }
        // })

        return response.send("put")
    },

    delete (request, response) {
        // const id = request.body.id

        // data.teachers = data.teachers.filter((teacher) => {
        //     return teacher.id != id
        // })

        // fs.writeFile("data.json", JSON.stringify(data, null, 4), (err) => {
        //     if (err) {
        //         return response.send("An error occurred while writting the file.")
        //     } else {
        //         return response.redirect(`/teachers`)
        //     }
        // })

        return response.send("delete")
    }
}