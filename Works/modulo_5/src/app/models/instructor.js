const { date } = require("../../lib/utils")
const db = require("../../config/db")

module.exports = {
    all(callback) {
        const query = `
            SELECT i.*, count(m) AS total_students
            FROM instructors i
            LEFT JOIN members m
            ON i.id = m.instructor_id
            GROUP BY i.id
            ORDER BY total_students DESC
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
            data.name,
            data.avatar_url,
            data.gender,
            data.services,
            date(data.birth).iso,
            date(Date.now()).iso
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
            SELECT *
            FROM instructors
            WHERE id = $1
        `

        db.query(query, [id], (error, results) => {
            if (error)
                throw `Database error! ${error}`

            callback(results.rows[0])
        })
    },

    getBy (filter, callback) {
        const query = `
            SELECT i.*, count(m) AS total_students
            FROM instructors i
            LEFT JOIN members m
                ON i.id = m.instructor_id
            WHERE i.name ILIKE '%${filter}%'
                OR i.services ILIKE '%${filter}%'
            GROUP BY i.id
            ORDER BY total_students DESC
        `

        db.query(query, (error, results) => {
            if (error)
                throw `Database error! ${error}`
            else {
                callback(results.rows)
            }
        })
    },

    update (data, callback) {
        const query = `
            UPDATE instructors SET
                avatar_url = $1,
                name = $2,
                birth = $3,
                gender = $4,
                services = $5
            WHERE id = $6
        `

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.gender,
            data.services,
            data.id
        ]

        db.query(query, values, (error) => {
            if (error)
                throw `Database error! ${error}`

            callback()
        })
    },

    delete (id, callback) {
        db.query(`DELETE FROM instructors WHERE id = $1`, [id], (error) => {
            if (error)
                throw `Database error! ${error}`

            callback()
        })
    },

    paginate (params, callback) {
        const { filter, limit, offset } = params

        let query = "",
            filterQuery = "",
            totalQuery = `(
                SELECT count(*) FROM instructors i
            ) as total`

        if (filter) {
            filterQuery = `
                WHERE i.name ILIKE '%${filter}%'
                    OR i.services ILIKE '%${filter}%'
            `

            totalQuery = `(
                SELECT count(*) FROM instructors i
                ${filterQuery}
            ) as total`
        }

        query = `
            SELECT i.*, ${totalQuery}, count(m) AS total_students
            FROM instructors i
            LEFT JOIN members m
                ON i.id = m.instructor_id
            ${filterQuery}
            GROUP BY i.id
            LIMIT $1 OFFSET $2
        `

        db.query(query, [limit, offset], (error, results) => {
            if (error)
                throw `Database error! ${error}`
                
            callback(results.rows)
        })
    }
}