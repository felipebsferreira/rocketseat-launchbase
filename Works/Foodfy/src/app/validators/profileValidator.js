const { compare } = require("bcryptjs")

const User = require("../models/user")

async function profile(request, response, next) {
    const { name, email, password } = request.body
    const oldEmail = request.session.userEmail

    try {
        if (name == "") return response.render("profiles/index", {
            email,
            isNameInvalid: true,
            error: "Por favor, informe o nome do usuário.",
            userIsAdmin: request.session.userIsAdmin
        })

        if (email == "") return response.render("profiles/index", {
            name,
            isEmailInvalid: true,
            error: "Por favor, informe o e-mail do usuário.",
            userIsAdmin: request.session.userIsAdmin
        })

        if (email != oldEmail) {
            const existingUser = await User.getByEmail(email)
            
            if (existingUser) return response.render("profiles/index", {
                name,
                email: oldEmail,
                isEmailInvalid: true,
                error: "Já existe um usuário cadastrado com este e-mail. Por favor, insira outro.",
                userIsAdmin: request.session.userIsAdmin
            })
        }
        
        const user = await User.getByEmail(oldEmail)

        const isPasswordCorrect = await compare(password, user.password)

        if (!isPasswordCorrect) return response.render("profiles/index", {
            name,
            email,
            isPasswordInvalid: true,
            error: "Senha incorreta. Por favor, tente novamente.",
            userIsAdmin: request.session.userIsAdmin
        })
    } catch(error) {
        console.log(error)
        return response.render("profiles/index", {
            name,
            email,
            error: "Ocorreu um erro inexperado. Por favor, tente novamente.",
            userIsAdmin: request.session.userIsAdmin
        })
    }
    
    next()
}

module.exports = {
    profile
}