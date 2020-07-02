const { compare } = require('bcryptjs')

const User = require('../models/user')

async function login(request, response, next) {
    const { email, password } = request.body
    
    try {
        const user = await User.getByEmail(email)
        
        if (!user) return response.render('session/login', {
            isEmailInvalid: true,
            error: "Usuário não encontrado."
        })

        const isPasswordCorrect = await compare(password, user.password)

        if (!isPasswordCorrect) return response.render('session/login', {
            user,
            isPasswordInvalid: true,
            error: "Senha inválida. Por favor, digite novamente."
        })

        request.user = user
    } catch(error) {
        console.log(error)
        return response.render('session/login', {
            user,
            error: "Ocorreu um erro inexperado. Por favor, tente novamente."
        })
    }

    next()
}

async function forgot(request, response, next) {
    const { email } = request.body

    try {
        if (email == "") return response.render("session/forgot-password", {
            isEmailInvalid: true,
            error: "Por favor, informe o e-mail do usuário."
        })

        const existingUser = await User.getByEmail(email)
        
        if (!existingUser) return response.render("session/forgot-password", {
            isEmailInvalid: true,
            error: "Não existe nenhum usuário cadastrado com este e-mail. Por favor, insira o e-mail correto."
        })
    } catch(error) {
        console.log(error)
        return response.render("session/forgot-password", {
            email,
            error: "Ocorreu um erro inexperado. Por favor, tente novamente."
        })
    }
    
    next()
}

async function reset(request, response, next) {
    const { email, password, passwordRepeat } = request.body

    try {
        if (email == "") return response.render("session/reset-password", {
            isEmailInvalid: true,
            error: "Por favor, informe o e-mail do usuário."
        })

        const existingUser = await User.getByEmail(email)
        
        if (!existingUser) return response.render("session/reset-password", {
            isEmailInvalid: true,
            error: "Não existe nenhum usuário cadastrado com este e-mail. Por favor, insira o e-mail correto."
        })

        if (password == "") return response.render("session/reset-password", {
            email,
            isPasswordInvalid: true,
            error: "Por favor, informe a nova senha."
        })

        if (passwordRepeat != password) return response.render("session/reset-password", {
            email,
            isPasswordRepeatInvalid: true,
            error: "Por favor, repita exatamente a mesma senha."
        })
    } catch(error) {
        console.log(error)
        return response.render("session/reset-password", {
            email,
            error: "Ocorreu um erro inexperado. Por favor, tente novamente."
        })
    }
    
    next()
}

function isUserLoged(request, response, next) {
    if (!request.session.userId) {
        return response.redirect("/")
    }

    next()
}

async function onlyAdminAllowed(request, response, next) {
    if (!request.session.userIsAdmin) {
        try {
            return response.render("profiles/index", {
                name: request.session.userName,
                email: request.session.userEmail,
                error: "Esta ação só é permitida para administradores.",
                userIsAdmin: request.session.userIsAdmin
            })
        } catch (error) {
            console.log(error)
            return response.render("profiles/index", {
                name: request.session.userName,
                email: request.session.userEmail,
                error: "Ocorreu um erro inexperado. Por favor, tente novamente.",
                userIsAdmin: request.session.userIsAdmin
            })
        }
    }

    next()
}

module.exports = {
    login,
    forgot,
    reset,
    isUserLoged,
    onlyAdminAllowed
}