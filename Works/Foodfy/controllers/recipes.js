const fs = require("fs")
const data = require("../data")

exports.index = function (request, response) {
    return response.render("recipes/index", { recipes: data.recipes })
}

exports.show = function (request, response) {
    const id = request.params.id

    const recipe = data.recipes.find(recipe => {
        return recipe.id == id
    })

    if (!recipe) {
        return response.send("Recipe not found!")
    }

    return response.render("recipes/details", { recipe })
}

exports.create = function (request, response) {
    return response.render("recipes/create", { create: true })
}

exports.edit = function (request, response) {
    const id = request.params.id

    const recipe = data.recipes.find(recipe => {
        return recipe.id == id
    })

    if (!recipe) {
        return response.send("Recipe not found!")
    }

    return response.render("recipes/edit", { recipe })
}

exports.post = function (request, response) {
    const { title, image, author, ingredients, preparations, information } = request.body

    let newId = 1

    for (let recipe of data.recipes) {
        if (newId <= recipe.id) {
            newId = recipe.id + 1
        }
    }

    data.recipes.push({
        id: Number(newId),
        title,
        image,
        author,
        ingredients,
        preparations,
        information
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 4), (err) => {
        if (err) {
            return response.send("An error occurred while writting the file.")
        } else {
            return response.redirect(`/admin/recipes/${newId}`)
        }
    })
}

exports.put = function (request, response) {
    const { id, title, image, author, ingredients, preparations, information } = request.body

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
        image: image,
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