const db = require("../../config/db")
const fs = require("fs")

module.exports = {
    async create(data, recipeId) {
        let query = `
            INSERT INTO files (
                name,
                path
            ) 
            VALUES ($1, $2)
            RETURNING id
        `

        let values = [
            data.filename,
            data.path
        ]

        if (recipeId) {
            const results = await db.query(query, values)
            const fileId = results.rows[0].id

            query = `
                INSERT INTO recipe_files (
                    recipe_id,
                    file_id
                )
                VALUES ($1, $2)
            `

            values = [
                recipeId,
                fileId
            ]

            return db.query(query, values)
        } 
        else {
            return db.query(query, values)
        }
    },

    getFilesByRecipeId(recipeId) {
        const query = `
            SELECT f.*
            FROM files f
            LEFT JOIN recipe_files rf
                ON rf.file_id = f.id
            WHERE rf.recipe_id = $1
        `

        return db.query(query, [recipeId])
    },

    getFirstFileByRecipeId(recipeId) {
        const query = `
            SELECT f.*
            FROM files f
            LEFT JOIN recipe_files rf
                ON rf.file_id = f.id
            WHERE rf.recipe_id = $1
            ORDER BY f.id
            LIMIT 1
        `

        return db.query(query, [recipeId])
    },

    async delete(id) {
        try {
            const results = await db.query(`SELECT * FROM files WHERE id = $1`, [id])
            const file = results.rows[0]

            fs.unlinkSync(file.path)

            await db.query(`DELETE FROM recipe_files WHERE file_id = $1`, [id])
            return db.query(`DELETE FROM files WHERE id = $1`, [id])
        } catch (error) {
            console.error(error)
        }
    },

    async deleteChefAvatar(id) {
        const results = await db.query(`SELECT * FROM files WHERE id = $1`, [id])
        const file = results.rows[0]

        fs.unlinkSync(file.path)

        return db.query(`DELETE FROM files WHERE id = $1`, [id])
    },

    async deleteFilesByRecipeId(recipeId) {
        const query = `
            SELECT file_id
            FROM recipe_files
            WHERE recipe_id = $1
        `

        const results = await db.query(query, [recipeId])

        const filePromises = results.rows.map(row => { this.delete(row.file_id) })
        Promise.all(filePromises)
    }
}