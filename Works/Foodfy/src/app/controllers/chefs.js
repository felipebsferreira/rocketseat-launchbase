const { age, date } = require("../../lib/utils")
const Chef = require("../models/chef")

exports.index = function (request, response) {
    Chef.getAll(chefs => {
        response.render("chefs/index", { chefs })
    })
}

exports.show = function (request, response) {
    const id = request.params.id

    Chef.getById(id, true, chefAndRecipes => {
        if (chefAndRecipes.length == 0)
            response.send("Chef not found!")
        
        chef = {
            id: chefAndRecipes[0].id,
            name: chefAndRecipes[0].name,
            avatarUrl: chefAndRecipes[0].avatar_url,
            totalRecipes: chefAndRecipes[0].total_recipes
        }

        return response.render("chefs/details", { chef, recipes: chefAndRecipes })
    })
}

exports.edit = function (request, response) {
    const id = request.params.id

    Chef.getById(id, false, result => {
        if (result.length == 0)
            response.send("Chef not found!")
        
        chef = {
            id: result[0].id,
            name: result[0].name,
            avatarUrl: result[0].avatar_url,
        }

        return response.render("chefs/edit", { chef })
    })
}

exports.create = function (request, response) {
    return response.render("chefs/create")
}

exports.post = function (request, response) {
    const keys = Object.keys(request.body)

    for (let key of keys) {
        if (request.body[key] == "")
            return response.send("Please, fill in all fields!")
    }

    Chef.create(request.body, chef => {
        return response.redirect(`/admin/chefs/${chef.id}`)
    })
}

exports.put = function (request, response) {
    const keys = Object.keys(request.body)

    for (let key of keys) {
        if (request.body[key] == "")
            return response.send("Please, fill in all fields!")
    }

    Chef.update(request.body, () => {
        return response.redirect(`/admin/chefs/${request.body.id}`)
    })
}

exports.delete = function (request, response) {
    Chef.delete(request.body.id, isSuccess => {
        if (isSuccess)
            response.redirect("/admin/chefs")
        else {
            response.send("Unable to delete a chef associated with one or more recipes!")
        }
    })
}