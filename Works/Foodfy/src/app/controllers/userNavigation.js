const data = require("../../../data")
const Recipe = require("../models/recipe")
const Chef = require("../models/chef")

exports.home = function (request, response) {
    Recipe.getAll(recipes => {
        return response.render("userNavigation/home", { recipes })
    })
}

exports.about = function (request, response) {
    return response.render("userNavigation/about")
}

exports.recipes = function (request, response) {
    let { filter } = request.query

    if (!filter)
        filter = ""

    Recipe.getAll(recipes => {
        return response.render("userNavigation/recipes", { recipes, filter })
    }, filter)
}

exports.details = function (request, response) {
    const id = request.params.id

    Recipe.getById(id, results => {
        if (results.length == 0)
            return response.send("Recipe not found!")

        return response.render("userNavigation/details", { recipe: results[0] })    
    })
}

exports.chefs = function (request, response) {
    Chef.getAll(chefs => {
        return response.render("userNavigation/chefs", { chefs })
    })
}