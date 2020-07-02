const User = require("../models/User")
const Product = require("../models/Product")
const { formatCpfCnpj, formatCep } = require('../../lib/utils')

module.exports = {
    registerForm(request, response) {
        return response.render("user/register")
    },

    async show (request, response) {
        const { user } = request

        user.cpf_cnpj = formatCpfCnpj(user.cpf_cnpj)
        user.cep = formatCep(user.cep)

        return response.render("user/index", { user })
    },

    async post(request, response) {
        const userId = await User.create(request.body)

        request.session.userId = userId

        return response.redirect("/users")
    },

    async update(request, response) {
        try {
            const { user } = request
            let { name, email, cpf_cnpj, cep, address } = request.body

            cpf_cnpj = cpf_cnpj.replace(/\D/g, "")
            cep = cep.replace(/\D/g, "")

            await User.update(user.id, {
                name,
                cpf_cnpj,
                email,
                cep,
                address
            })

            return response.render("user/index", {
                user: request.body,
                success: "Conta atualizada com sucesso!"
            })
        } catch (error) {
            console.log(error)
            return response.render("user/index", {
                user: request.body,
                error: "Algum erro aconteceu."
            })
        }
    },

    async delete(request, response) {
        try {
            await User.delete(request.body.id)
            request.session.destroy()

            return response.render("session/login", {
                success: "Conta deletada com sucesso!"
            })
        } catch(error) {
            console.log(error)
            return response.render("user/index", {
                user: request.body,
                error: "Ocorreu um erro inesperado! Por favor, tente novamente."
            })
        }
    }
}