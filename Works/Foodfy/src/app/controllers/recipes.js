const fs = require("fs")
const data = require("../../../data")

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

    const recipe = {
        title,
        image_url,
        ingredients,
        preparations,
        information,
        chef_id
    }

    Recipe.create(recipe, id => {
        return response.redirect(`/admin/recipes/${id}`)
    })
}

exports.put = function (request, response) {
    const { id, title, image_url, author, ingredients, preparations, information } = request.body

    let foundIndex
    data.recipes.find((recipe, index) => {
        if (recipe.id == id) {
            foundIndex = index
            return true
        }
    })

    data.recipes[foundIndex] = {
        ...data.recipes[foundIndex],
        title: title,
        image_url: image_url,
        author: author,
        ingredients: ingredients,
        preparations: preparations,
        information: information
    }

    fs.writeFile("data.json", JSON.stringify(data, null, 4), (err) => {
        if (err) {
            return response.send("An error occurred while writting the file.")
        } else {
            return response.redirect(`/admin/recipes/${id}`)
        }
    })
}

exports.delete = function (request, response) {
    const { id }  = request.body

    data.recipes = data.recipes.filter(recipe => {
        return recipe.id != id
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 4), (err) => {
        if (err) {
            return response.send("An error occurred while writting the file.")
        } else {
            return response.redirect("/admin/recipes/")
        }
    })
}