const { date } = require("../../lib/utils")
const db = require("../../config/db")

module.exports = {
    getAll (callback) {
        const query = `
            SELECT c1.*, 
            (
                SELECT COUNT(r.id)
                FROM chefs c2
                LEFT JOIN recipes r
                    ON r.chef_id = c2.id
                WHERE c2.id = c1.id
            ) as total_recipes
            FROM chefs c1
            ORDER BY c1.created_at
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
                SELECT c.id, c.name, c.avatar_url, r.id as recipe_id, r.image_url, r.title,
                (
                    SELECT COUNT(r.id)
                    FROM chefs c
                    LEFT JOIN recipes r
                        ON r.chef_id = c.id
                    WHERE c.id = $1
                ) as total_recipes
                FROM chefs c
                LEFT JOIN recipes r
                    ON r.chef_id = c.id
                WHERE c.id = $1
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