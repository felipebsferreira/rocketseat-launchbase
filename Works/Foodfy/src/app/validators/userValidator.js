const User = require("../models/user")

async function user(request, response, next) {
    const user = {
        id: request.body.id,
        name: request.body.name,
        email: request.body.email,
        isAdmin: request.body.isAdmin ? true : false
    }
    
    const page = request.route.methods.post ? "users/create" : "users/edit"

    try {
        if (user.name == "") return response.render(page, {
            user,
            isNameInvalid: true,
            error: "Por favor, informe o nome do usuário.",
            userIsAdmin: request.session.userIsAdmin
        })

        if (user.email == "") return response.render(page, {
            user,
            isEmailInvalid: true,
            error: "Por favor, informe o e-mail do usuário.",
            userIsAdmin: request.session.userIsAdmin
        })

        if (request.route.methods.put) {
            const registeredUser = await User.getById(user.id)

            if (user.email != registeredUser.email) {
                const existingUser = await User.getByEmail(user.email)
                
                if (existingUser) return response.render(page, {
                    user,
                    isEmailInvalid: true,
                    error: "Já existe um usuário cadastrado com este e-mail. Por favor, insira outro.",
                    userIsAdmin: request.session.userIsAdmin
                })
            }
        } else {
            const existingUser = await User.getByEmail(user.email)
            
            if (existingUser) return response.render(page, {
                user,
                isEmailInvalid: true,
                error: "Já existe um usuário cadastrado com este e-mail. Por favor, insira outro.",
                userIsAdmin: request.session.userIsAdmin
            })
        }
    } catch(error) {
        console.log(error)
        return response.render(page, {
            user,
            error: "Ocorreu um erro inexperado. Por favor, tente novamente.",
            userIsAdmin: request.session.userIsAdmin
        })
    }
    
    next()
}

module.exports = {
    user
}