const db = require("../../config/db")

module.exports = {
    getAll (callback) {
        const query = `
            SELECT * 
            FROM teachers
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
            FROM teachers
            WHERE id = $1
        `

        db.query(query, [id], (error, results) => {
            if (error)
                throw `Database error! ${error}`

            callback(results.rows)
        })
    },

    create (teacher, callback) {
        const query = `
            INSERT INTO teachers (
                name,
                photo_url,
                birth,
                educational_level,
                class_type,
                areas,
                created_at
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `
        
        const values = [
            teacher.name,
            teacher.photo_url,
            teacher.birth,
            teacher.educational_level,
            teacher.class_type,
            teacher.areas,
            teacher.created_at
        ]

        db.query(query, values, (error, results) => {
            if (error)
                throw `Database error! ${error}`

            callback(results.rows)
        })
    },

    update (teacher, callback) {
        const query = `
            UPDATE teachers SET
                name = $1,
                photo_url = $2,
                birth = $3,
                educational_level = $4,
                class_type = $5,
                areas = $6
            WHERE id = $7
        `

        console.log(teacher)
        
        const values = [
            teacher.name,
            teacher.photo_url,
            teacher.birth,
            teacher.educational_level,
            teacher.class_type,
            teacher.areas,
            teacher.id
        ]

        db.query(query, values, (error) => {
            if (error)
                throw `Database error! ${error}`

            callback()
        })
    },

    delete (id, callback) {
        const query = `
            DELETE FROM teachers
            WHERE id = $1
        `

        db.query(query, [id], (error) => {
            if (error)
                throw `Database error! ${error}`

            callback()
        })
    }
}