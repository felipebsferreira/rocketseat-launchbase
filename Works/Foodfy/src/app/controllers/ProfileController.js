const User = require("../models/user")

function index(request, response) {
    return response.render("profiles/index", {
        name: request.session.userName,
        email: request.session.userEmail,
        userIsAdmin: request.session.userIsAdmin
    })
}

async function put(request, response) {
    const { name, email } = request.body

    try {
        await User.update({
            name,
            email,
            id: request.session.userId
        })

        request.session.userName = name
        request.session.userEmail = email
    } catch(error) {
        console.log(error)

        return response.render("profiles/index", {
            name,
            email,
            error: "Ocorreu um erro inexperado. Por favor, tente novamente.",
            userIsAdmin: request.session.userIsAdmin
        })
    }

    return response.render("profiles/index", {
        name,
        email,
        success: "Usuário atualizado com sucesso.",
        userIsAdmin: request.session.userIsAdmin
    })
}

module.exports = {
    index,
    put
}