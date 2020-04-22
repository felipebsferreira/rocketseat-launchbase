const { age, date } = require("../../lib/utils")
const db = require("../../config/db")

module.exports = {
    index (request, response) {
        db.query("SELECT * FROM instructors", (err, results) => {
            if (err)
                return response.send("Database error!")
            else
            {
                const instructors = [...results.rows]
                for (let instructor of instructors) {
                    instructor.services = instructor.services.split(",")
                }

                return response.render("instructors/index", { instructors })
            }
        })
    },

    create (request, response) {
        return response.render("instructors/create")
    },

    show (request, response) {
        return response.send("show")
    },

    edit (request, response) {
        return response.send("edit")
    },

    post (request, response) {
        const keys = Object.keys(request.body)

        for (let key of keys) {
            if (request.body[key] == "") {
                return response.send("Please, fill in all fields!")
            }
        }

        const query = `
            INSERT INTO instructors (
                name,
                avatar_url,
                gender,
                services,
                birth,
                created_at
            ) 
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `

        const values = [
            request.body.name,
            request.body.avatar_url,
            request.body.gender,
            request.body.services,
            date(request.body.birth).iso,
            date(Date.now()).iso
        ]

        db.query(query, values, (err, results) => {
            if (err)
                return response.send("Database error!")
            else
                return response.redirect(`/instructors/${results.rows[0].id}`)
        })
    },

    put (request, response) {
        const keys = Object.keys(request.body)

        for (let key of keys) {
            if (request.body[key] == "") {
                return response.send("Please, fill in all fields!")
            }
        }
        
        return response.send("put")
    },

    delete (request, response) {
        return response.send("delete")
    }
}