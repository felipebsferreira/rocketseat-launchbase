const data = require("../data")

exports.home = function (request, response) {
    return response.render("userNavigation/home", { recipes: data.recipes })
}

exports.about = function (request, response) {
    return response.render("userNavigation/about")
}

exports.recipes = function (request, response) {
    return response.render("userNavigation/recipes", { recipes: data.recipes })
}

exports.details = function (request, response) {
    const id = request.params.id

    const recipe = data.recipes.find(recipe => {
        return recipe.id == id
    })

    return response.render("userNavigation/details", { recipe })
}