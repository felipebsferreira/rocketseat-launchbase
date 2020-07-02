const User = require("../models/User")
const { compare } = require("bcryptjs")

async function login(request, response, next) {
    const { email, password } = request.body
        
    const user = await User.get({ where: { email }})

    if (!user) {
        return response.render("session/login", {
            user: request.body,
            error: "Usuário não encontrado!"
        })
    }

    const passed = await compare(password, user.password)
    
    if (!passed) return response.render("session/login", {
        user: request.body,
        error: "Senha incorreta."
    })

    request.user = user

    next()
}

async function forgot(request, response, next) {
    const { email } = request.body

    try {
        let user = await User.get({ where: { email }})

        if (!user) return response.render("session/forgot-password", {
            user: request.body,
            error: "E-mail não cadastrado"
        })

        request.user = user

        next()
    } catch (error) {
        console.log(error)
    }
}

async function reset(request, response, next) {
    const { email, password, passwordRepeat, token } = request.body
    
    // Recuperar usuário pelo endereço de e-mail
    const user = await User.get({ where: { email }})

    // Validar se o usuário existe
    if (!user) {
        return response.render("session/password-reset", {
            user: request.body,
            token,
            error: "Usuário não encontrado!"
        })
    }

    // Validar se a senha e repetição de senha são iguais
    if (password != passwordRepeat) return response.render("session/password-reset", {
        user: request.body,
        token,
        error: "Repita exatamente a mesma senha!"
    })

    // Validar se o token enviado é igual ao gerado para o usuário
    if (token != user.reset_token) return response.render("session/password-reset", {
        user: request.body,
        token,
        error: "Token inválido! Por favor, solicite uma nova recuperação de senha."
    })

    // Validar se o token expirou
    let now = new Date()
    now = now.setHours(now.getHours())

    if (now > user.reset_token_expires) return response.render("session/password-reset", {
        user: request.body,
        token,
        error: "Token expirado! Por favor, solicite uma nova recuperação de senha."
    })
    
    request.user = user

    next()
}

module.exports = {
    login,
    forgot,
    reset
}