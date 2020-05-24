const { date } = require("../../lib/utils")
const db = require("../../config/db")

module.exports = {
    getAll (callback) {
        const query = `
            SELECT *
            FROM chefs
            ORDER BY name
        `

        db.query(query, (error, results) => {
            if (error)
                throw `Database error! ${error}`
            else
                callback(results.rows)
        })
    },

    getById (id, getRecipes, callback) {
        let query = ``
        
        if (getRecipes) {
            query = `
                SELECT c.id, c.name, c.avatar_url, count(r.id) as total_recipes, r.id as recipe_id, r.image_url, r.title
                FROM chefs c
                LEFT JOIN recipes r
                    ON r.chef_id = c.id
                WHERE c.id = $1
                GROUP BY c.id, r.id
            `
        }
        else {
            query = `
                SELECT *
                FROM chefs
                WHERE id = $1
            `
        }

        db.query(query, [id], (error, results) => {
            if (error)
                throw `Database error! ${error}`
            else
                callback(results.rows)
        })
    },

    create (data, callback) {
        const query = `
            INSERT INTO chefs (
                name,
                avatar_url,
                created_at
            )
            VALUES ($1, $2, $3)
            RETURNING id
        `

        const values = [
            data.name,
            data.avatarUrl,
            date(Date.now()).iso
        ]
        
        db.query(query, values, (error, results) => {
            if (error)
                throw `Database error! ${error}`
            else
                callback(results.rows[0])
        })
    },

    update (data, callback) {
        const query = `
            UPDATE chefs SET
                name = $1,
                avatar_url = $2
            WHERE id = $3
        `

        const values = [
            data.name,
            data.avatarUrl,
            data.id
        ]

        db.query(query, values, (error, results) => {
            if (error)
                throw `Database error! ${error}`
            else
                callback()
        })
    },

    delete (id, callback) {
        let query = `
            SELECT *
            FROM recipes
            WHERE chef_id = $1
        `
        db.query(query, [id], (error, results) => {
            if (error)
                throw `Database error! ${error}`
            
            if (results.rowCount > 0)
                callback(false)
            else {
                query = `
                    DELETE FROM chef
                    WHERE id = $1
                `

                db.query(query, [id], (error, results) => {
                    if (error)
                        throw `Database error! ${error}`

                    callback(true)
                })
            }
        })
    }
}