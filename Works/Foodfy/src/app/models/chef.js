const { date } = require("../../lib/utils")
const db = require("../../config/db")

module.exports = {
    getAll () {
        const query = `
            SELECT c1.*,
            (
                SELECT COUNT(r.id)
                FROM chefs c2
                LEFT JOIN recipes r
                    ON r.chef_id = c2.id
                WHERE c2.id = c1.id
            ) as total_recipes,
            (
                SELECT f.path
                FROM files f
                WHERE f.id = c1.file_id
            ) as avatar_path
            FROM chefs c1
            ORDER BY c1.created_at
        `
        
        return db.query(query)
    },

    getById (id, getRecipes) {
        let query = ``
        
        if (getRecipes) {
            query = `
                SELECT c.id, c.name, r.id as recipe_id, r.title,
                (
                    SELECT f.path
                    FROM files f
                    WHERE f.id = c.file_id
                ) as avatar_path,
                (
                    SELECT f.path
                    FROM files f
                    LEFT JOIN recipe_files rf
                        ON f.id = rf.file_id
                    WHERE rf.recipe_id = r.id
                    ORDER BY f.id
                    LIMIT 1
                ) as image_path,
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
                SELECT c.*,
                (
                    SELECT f.path
                    FROM files f
                    WHERE f.id = c.file_id
                ) as avatar_path
                FROM chefs c
                WHERE id = $1
            `
        }

        return db.query(query, [id])
    },

    getFileId(chefId) {
        const query = `
            SELECT file_id
            FROM chefs
            WHERE id = $1
        `

        return db.query(query, [chefId])
    },

    create (data) {
        const query = `
            INSERT INTO chefs (
                name,
                avatar_url,
                created_at,
                file_id
            )
            VALUES ($1, $2, $3, $4)
            RETURNING id
        `

        const values = [
            data.name,
            "",
            date(Date.now()).iso,
            data.fileId
        ]
        
        return db.query(query, values)
    },

    update (data) {
        let query, values
        
        if (data.fileId) {
            query = `
                UPDATE chefs SET
                    name = $1,
                    avatar_url = $2,
                    file_id = $3
                WHERE id = $4
            `

            values = [
                data.name,
                "",
                data.fileId,
                data.id
            ]
        } else {
            query = `
                UPDATE chefs SET
                    name = $1,
                    avatar_url = $2
                WHERE id = $3
            `

            values = [
                data.name,
                "",
                data.id
            ]
        }

        return db.query(query, values)
    },

    async delete (id) {
        let query = `
            SELECT *
            FROM recipes
            WHERE chef_id = $1
        `

        const results = await db.query(query, [id])

        if (results.rowCount > 0) {
            return {
                hasFailed: true
            }
        }
        else {
            query = `
                DELETE FROM chefs
                WHERE id = $1
            `

            return db.query(query, [id])
        }
    }
}