const db = require("../../config/db")
const utils = require("../../lib/utils")

module.exports = {
    getAll (callback, filter) {
        let filterQuery = ""

        if (filter)
            filterQuery = `WHERE r.title ILIKE '%${filter}%'`
        
        const query = `
            SELECT r.id, r.title, r.image_url, c.name
            FROM recipes r
            LEFT JOIN chefs c
                ON c.id = r.chef_id
            ${filterQuery}
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
    },

    update (data, callback) {
        const query = `
            UPDATE recipes SET
                chef_id = $1,
                image_url = $2,
                title = $3,
                information = $4,
                ingredients = $5,
                preparations = $6
            WHERE id = $7
        `

        const values = [
            data.chef_id,
            data.image_url,
            data.title,
            data.information,
            data.ingredients,
            data.preparations,
            data.id
        ]

        db.query(query, values, (error) => {
            if (error)
                throw `Database error! ${error}`

            callback()
        })
    },

    delete (id, callback) {
        const query = `
            DELETE FROM recipes
            WHERE id = $1
        `

        db.query(query, [id], (error) => {
            if (error)
                throw `Database error! ${error}`

            callback()
        })
    }
}