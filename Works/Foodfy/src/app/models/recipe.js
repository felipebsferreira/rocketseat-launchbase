const db = require("../../config/db")
const utils = require("../../lib/utils")

module.exports = {
    getAll (callback) {
        const query = `
            SELECT r.id, r.title, r.image_url, c.name
            FROM recipes r
            LEFT JOIN chefs c
                ON c.id = r.chef_id
            ORDER BY r.created_at
        `

        db.query(query, (error, results) => {
            if (error)
                throw `Database error! ${error}`

            callback(results.rows)
        })
    },

    getById (id, callback) {
        const query = `
            SELECT r.*, c.name
            FROM recipes r
            LEFT JOIN chefs c
                ON c.id = r.chef_id
            WHERE r.id = $1
        `

        db.query(query, [id], (error, results) => {
            if (error)
                throw `Database error! ${error}`

            callback(results.rows)
        })
    },

    create (data, callback) {
        const query = `
            INSERT INTO recipes (
                chef_id,
                image_url,
                title,
                ingredients,
                preparations,
                information,
                created_at
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `

        const values = [
            data.chef_id,
            data.image_url,
            data.title,
            data.ingredients,
            data.preparations,
            data.information,
            utils.date(Date.now()).iso
        ]

        db.query(query, values, (error, results) => {
            if (error)
                throw `Database error! ${error}`

            callback(results.rows[0].id)
        })
    },

    getChefOptions (callback) {
        const query = `
            SELECT id, name
            FROM chefs
            ORDER BY name
        `

        db.query(query, (error, results) => {
            if (error)
                throw `Database error! ${error}`
            
            callback(results.rows)
        })
    }
}