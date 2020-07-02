const db = require("../../config/db")

module.exports = {
    getAll () {
        const query = "SELECT * FROM categories"
        return db.query(query)
    }
}