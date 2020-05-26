const Recipe = require("../models/recipe")

exports.admin = function (request, response) {
    return response.redirect("/admin/recipes")
}

exports.index = function (request, response) {
    Recipe.getAll(recipes => {
        return response.render("recipes/index", { recipes })
    })
}

exports.show = function (request, response) {
    const id = request.params.id

    Recipe.getById(id, results => {
        if (results.length == 0)
            return response.send("Recipe not found!")    
        
        return response.render("recipes/details", { recipe: results[0] })
    })
}

exports.create = function (request, response) {
    Recipe.getChefOptions(chefs => {
        return response.render("recipes/create", { create: true, chefs })
    })
}

exports.edit = function (request, response) {
    const id = request.params.id

    Recipe.getChefOptions(chefs => {
        Recipe.getById(id, results => {
            if (results.length == 0)
                return response.send("Recipe not found!")    
            
            return response.render("recipes/edit", { recipe: results[0], chefs })
        })
    })
}

exports.post = function (request, response) {
    const { title, image_url, ingredients, preparations, information, chef_id } = request.body

    const data = {
        title,
        image_url,
        ingredients,
        preparations,
        information,
        chef_id
    }

    Recipe.create(data, id => {
        return response.redirect(`/admin/recipes/${id}`)
    })
}

exports.put = function (request, response) {
    const { id, title, image_url, chef_id, ingredients, preparations, information } = request.body

    const data = {
        id: id,
        title: title,
        image_url: image_url,
        chef_id: chef_id,
        ingredients: ingredients,
        preparations: preparations,
        information: information
    }

    Recipe.update(data, () => {
        return response.redirect(`/admin/recipes/${data.id}`)
    })
}

exports.delete = function (request, response) {
    const { id }  = request.body

    Recipe.delete(id, () => {
        return response.redirect("/admin/recipes/")
    })
}