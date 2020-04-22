const utils = require("../../lib/utils")

module.exports = {
    index (request, response) {
        return response.render("members/index", { members })
    },

    create (request, response) {
        return response.render("members/create")
    },

    show (request, response) {
        return response.send("show")
    },

    edit (request, response) {
        return response.send("edit")
    },

    post (request, response) {
        const keys = Object.keys(request.body)

        for (let key of keys) {
            if (request.body[key] == "") {
                return response.send("Please, fill in all fields!")
            }
        }

        const { id, name, avatar_url, gender, services, birth, created_at } = request.body

        return response.send("post")
    },

    put (request, response) {
        const keys = Object.keys(request.body)

        for (let key of keys) {
            if (request.body[key] == "") {
                return response.send("Please, fill in all fields!")
            }
        }
        
        return response.send("put")
    },

    delete (request, response) {
        return response.send("delete")
    }
}