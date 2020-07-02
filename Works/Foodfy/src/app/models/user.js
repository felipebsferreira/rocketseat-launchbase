const db = require("../../config/db")

async function getById(id) {
    const query = `
        SELECT *
        FROM users
        WHERE id = $1
    `

    try {
        const results = await db.query(query, [id])
        return results.rows[0]
    } catch(error) {
        throw error
    }
}

async function getByEmail(email) {
    const query = `
        SELECT *
        FROM users
        WHERE email = $1
    `

    try {
        const results = await db.query(query, [email])
        return results.rows[0]
    } catch(error) {
        throw error
    }
}

async function getAll() {
    try {
        const results = await db.query("SELECT * FROM users")
        return results.rows
    } catch (error) {
        throw error
    }
}

async function create(user) {
    const query = `
        INSERT INTO users (
            name,
            email,
            password,
            is_admin
        ) 
        VALUES ($1, $2, $3, $4)
        RETURNING id
    `

    const values = [
        user.name,
        user.email,
        user.password,
        user.isAdmin
    ]

    try {
        const results = await db.query(query, values)
        return results.rows[0].id
    } catch (error) {
        throw error
    }
}

async function update(user) {
    let query = `
        UPDATE users SET
            name = $1,
            email = $2
    `
    
    let values = [
        user.name,
        user.email
    ]

    if (user.hasOwnProperty('isAdmin')) {
        query = `
            ${query}, is_admin = ${user.isAdmin}
        `
    }

    if (user.id) {
        query = `
            ${query}
            WHERE id = $3
        `

        values = [ ...values, user.id ]
    } else {
        query = `
            ${query}
            WHERE email = $3
        `

        values = [ ...values, data.oldEmail ]
    }
    
    try {
        await db.query(query, values)
    } catch (error) {
        throw error
    }
}

async function remove(id) {
    try {
        await db.query("DELETE FROM users WHERE id = $1", [id])
    } catch (error) {
        throw error
    }
}

module.exports = {
    getById,
    getByEmail,
    getAll,
    create,
    update,
    remove
}