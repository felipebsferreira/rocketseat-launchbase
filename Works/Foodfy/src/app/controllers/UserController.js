const crypto = require('crypto')
const { hash } = require("bcryptjs")

const User = require('../models/user')

async function list(request, response) {
    try {
        const users = await User.getAll()

        if (!users) return response.render("users/index", {
            neutral: "Não existem usuários cadastrados.",
            userIsAdmin: request.session.userIsAdmin
        })

        return response.render("users/index", { 
            users,
            logedUserId: request.session.userId,
            userIsAdmin: request.session.userIsAdmin
        })
    } catch (error) {
        console.log(error)
        return response.render("user/index", {
            error: "Ocorreu um erro inexperado. Por favor, tente novamente.",
            userIsAdmin: request.session.userIsAdmin
        })
    }
}

function createForm(request, response) {
    return response.render("users/create", {
        userIsAdmin: request.session.userIsAdmin
    })
}

async function editForm(request, response) {
    const { id } = request.params

    try {
        const user = await User.getById(id)
        user.isAdmin = user.is_admin

        return response.render("users/edit", { 
            user,
            userIsAdmin: request.session.userIsAdmin
         })
    } catch (error) {
        console.log(error)
        return response.render("users/edit", {
            error: "Ocorreu um erro inexperado. Por favor, tente novamente.",
            userIsAdmin: request.session.userIsAdmin
        })
    }
}

async function post(request, response) {
    const { name, email, isAdmin } = request.body

    try {
        let password = crypto.randomBytes(4).toString('hex')
        password = await hash(password, 8)

        let user = {
            name,
            email,
            isAdmin: isAdmin ? true : false,
            password
        }

        const id = await User.create(user)

        user.id = id

        return response.render("users/edit", {
            user,
            success: "Usuário cadastrado com sucesso.",
            userIsAdmin: request.session.userIsAdmin
        })
    } catch (error) {
        console.log(error)

        const user = {
            name,
            email,
            isAdmin: isAdmin ? true : false
        }

        return response.render("users/create", {
            user,
            error: "Ocorreu um erro inexperado. Por favor, tente novamente.",
            userIsAdmin: request.session.userIsAdmin
        })
    }
}

async function put(request, response) {
    const { id, name, email, isAdmin } = request.body

    try {
        const user = await User.getById(id)

        user.name = name
        user.email = email
        user.isAdmin = isAdmin ? true : false

        await User.update(user)

        return response.render("users/edit", {
            user,
            success: "Usuário atualizado com sucesso.",
            userIsAdmin: request.session.userIsAdmin
        })
    } catch (error) {
        console.log(error)

        const user = {
            id,
            name,
            email,
            isAdmin: isAdmin ? true : false
        }

        return response.render("users/edit", {
            user,
            error: "Ocorreu um erro inexperado. Por favor, tente novamente.",
            userIsAdmin: request.session.userIsAdmin
        })
    }
}

async function remove(request, response) {
    try {
        const { id } = request.body
        
        await User.remove(id)
        
        return response.redirect("/admin/users")
    } catch (error) {
        console.log(error)
        return response.redirect("/admin/users")
    }
}

module.exports = {
    list,
    createForm,
    editForm,
    post,
    put,
    remove
}