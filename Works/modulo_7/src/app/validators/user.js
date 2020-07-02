const User = require("../models/User")
const { compare } = require("bcryptjs")

function checkAllFields(body) {
    const keys = Object.keys(body)

    for (key of keys) {
        if (body[key] == "") {
            return {
                user: body,
                error: "Por favor, preencha todos os campos."
            }
        }
    }
}

async function show(request, response, next) {
    const { userId: id } = request.session
        
    const user = await User.get({ where: { id }})

    if (!user) {
        return response.render("user/register", {
            error: "Usuário não encontrado!"
        })
    }

    request.user = user

    next()
}

async function post(request, response, next) {
    const fillAllFields = checkAllFields(request.body)

    if (fillAllFields) {
        return response.render("user/register", fillAllFields)
    }

    let { cpf_cnpj } = request.body
    cpf_cnpj = cpf_cnpj.replace(/\D/g, "")
    
    const { email, password, passwordRepeat } = request.body
    
    const user = await User.get({
        where: { email },
        or: { cpf_cnpj }
    })

    if (user) return response.render("user/register", {
        user: request.body,
        error: "Usuário já cadastrado!"
    })

    if (password != passwordRepeat) return response.render("user/register", {
        user: request.body,
        error: "Repita exatamente a mesma senha!"
    })

    next()
}

async function update(request, response, next) {
    const fillAllFields = checkAllFields(request.body)

    if (fillAllFields) {
        return response.render("user/index", fillAllFields)
    }

    const { id, password } = request.body
    
    if (!password) return response.render("user/index", {
        user: request.body,
        error: "Digite sua senha para atualizar seu cadastro."
    })

    const user = await User.get({ where: { id } })

    const passed = await compare(password, user.password)
    if (!passed) return response.render("user/index", {
        user: request.body,
        error: "Senha incorreta."
    })

    request.user = user

    next()
}

module.exports = {
    post,
    show,
    update
}