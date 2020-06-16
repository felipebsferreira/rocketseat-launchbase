const db = require("../../config/db")
const utils = require("../../lib/utils")

module.exports = {
    getAll (filter) {
        let filterQuery = ""

        if (filter)
            filterQuery = `WHERE r.title ILIKE '%${filter}%'`
        
        const query = `
            SELECT r.id, r.title, c.name, (
                SELECT f.path
                FROM files f
                LEFT JOIN recipe_files rf
                    ON rf.file_id = f.id
                WHERE rf.recipe_id = r.id
                  ORDER BY f.id
                LIMIT 1
            ) as image_path
            FROM recipes r
            LEFT JOIN chefs c
                ON c.id = r.chef_id
            ${filterQuery}
            ORDER BY r.created_at
        `

        return db.query(query)
    },

    getById (id) {
        const query = `
            SELECT r.*, c.name
            FROM recipes r
            LEFT JOIN chefs c
                ON c.id = r.chef_id
            WHERE r.id = $1
        `

        return db.query(query, [id])
    },

    create (data) {
        const query = `
            INSERT INTO recipes (
                chef_id,
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
            data.title,
            data.ingredients,
            data.preparations,
            data.information,
            utils.date(Date.now()).iso
        ]

        return db.query(query, values)
    },

    getChefOptions () {
        const query = `
            SELECT id, name
            FROM chefs
            ORDER BY name
        `

        return db.query(query)
    },

    update (data) {
        const query = `
            UPDATE recipes SET
                chef_id = $1,
                title = $2,
                information = $3,
                ingredients = $4,
                preparations = $5
            WHERE id = $6
        `

        const values = [
            data.chef_id,
            data.title,
            data.information,
            data.ingredients,
            data.preparations,
            data.id
        ]

        return db.query(query, values)
    },

    delete (id) {
        const query = `
            DELETE FROM recipes
            WHERE id = $1
        `

        return db.query(query, [id])
    }
}