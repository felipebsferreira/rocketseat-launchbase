const db = require("../../config/db")
const fs = require("fs")

module.exports = {
    create(data) {
        const query = `
            INSERT INTO files (
                name,
                path,
                product_id
            ) 
            VALUES ($1, $2, $3)
            RETURNING id
        `

        const values = [
            data.filename,
            data.path,
            data.product_id
        ]
        
        return db.query(query, values)
    },

    getFilesByProductId(id) {
        const query = `
            SELECT *
            FROM files
            WHERE product_id = $1
        `

        return db.query(query, [id])
    },

    async delete(id) {
        try {
            const results = await db.query(`SELECT * FROM files WHERE id = $1`, [id])
            const file = results.rows[0]

            fs.unlinkSync(file.path)

            const query = `
                DELETE FROM files
                WHERE id = $1
            `

            return db.query(query, [id])
        } catch (error) {
            console.error(error)
        }
    }
}