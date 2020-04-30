const db = require("../../config/db")

module.exports = {
    getAll (callback) {
        const query = `
            SELECT * 
            FROM students
            ORDER BY name
        `

        db.query(query, (error, results) => {
            if (error)
                throw `Database error! ${error}`

            callback(results.rows)
        })
    },

    getById (id, callback) {
        const query = `
            SELECT *
            FROM students
            WHERE id = $1
        `

        db.query(query, [id], (error, results) => {
            if (error)
                throw `Database error! ${error}`

            callback(results.rows)
        })
    },

    create (student, callback) {
        const query = `
            INSERT INTO students (
                name,
                photo_url,
                birth,
                email,
                school_year,
                workload,
                created_at
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `
        
        const values = [
            student.name,
            student.photo_url,
            student.birth,
            student.email,
            student.school_year,
            student.workload,
            student.created_at
        ]

        db.query(query, values, (error, results) => {
            if (error)
                throw `Database error! ${error}`

            callback(results.rows)
        })
    },

    update (student, callback) {
        const query = `
            UPDATE students SET
                name = $1,
                photo_url = $2,
                birth = $3,
                email = $4,
                school_year = $5,
                workload = $6
            WHERE id = $7
        `

        const values = [
            student.name,
            student.photo_url,
            student.birth,
            student.email,
            student.school_year,
            student.workload,
            student.id
        ]

        db.query(query, values, (error) => {
            if (error)
                throw `Database error! ${error}`

            callback()
        })
    },

    delete (id, callback) {
        const query = `
            DELETE FROM students
            WHERE id = $1
        `

        db.query(query, [id], (error) => {
            if (error)
                throw `Database error! ${error}`

            callback()
        })
    }
}