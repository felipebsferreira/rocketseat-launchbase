const { Pool } = require("pg")

module.exports = new Pool({
    user: "felipeferreira",
    password: "",
    host: "localhost",
    port: 5432,
    database: "gymmanager"
})