const { date } = require("../../lib/utils")
const db = require("../../config/db")

module.exports = {
    all(callback) {
        const query = `
            SELECT *
            FROM members
            ORDER BY name ASC
        `

        db.query(query, (error, results) => {
            if (error)
                throw `Database error! ${error}`
            else {
                callback(results.rows)
            }
        })
    },

    create(data, callback) {
        const query = `
            INSERT INTO members (
                name,
                avatar_url,
                gender,
                email,
                birth,
                blood,
                weight,
                height,
                instructor_id
            ) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING id
        `

        const values = [
            data.name,
            data.avatar_url,
            data.gender,
            data.email,
            date(data.birth).iso,
            data.blood,
            data.weight,
            data.height,
            data.instructor
        ]

        db.query(query, values, (error, results) => {
            if (error)
                throw `Database error! ${error}`
            else
                callback(results.rows[0])
        })
    },

    getById (id, callback) {
        const query = `
            SELECT members.*, instructors.name AS instructor_name
            FROM members
            LEFT JOIN instructors ON members.instructor_id = instructors.id
            WHERE members.id = $1
        `

        db.query(query, [id], (error, results) => {
            if (error)
                throw `Database error! ${error}`

            callback(results.rows[0])
        })
    },

    update (data, callback) {
        const query = `
            UPDATE members SET
                avatar_url = $1,
                name = $2,
                birth = $3,
                gender = $4,
                email = $5,
                blood = $6,
                weight = $7,
                height = $8,
                instructor_id = $9
            WHERE id = $10
        `

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.gender,
            data.email,
            data.blood,
            data.weight,
            data.height,
            data.instructor,
            data.id
        ]

        db.query(query, values, (error) => {
            if (error)
                throw `Database error! ${error}`

            callback()
        })
    },

    delete (id, callback) {
        db.query(`DELETE FROM members WHERE id = $1`, [id], (error) => {
            if (error)
                throw `Database error! ${error}`

            callback()
        })
    },

    instructorsSelectOptions (callback) {
        const query = `
            SELECT id, name
            FROM instructors
        `

        db.query(query, (error, results) => {
            if (error)
                throw `Database error! ${error}`

            callback(results.rows)
        })
    }
}