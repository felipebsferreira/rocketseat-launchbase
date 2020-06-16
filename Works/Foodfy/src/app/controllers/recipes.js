const Recipe = require("../models/recipe")
const File = require("../models/file")

module.exports = {
    admin (request, response) {
        return response.redirect("/admin/recipes")
    },
    
    async index (request, response) {
        try {
            let results = await Recipe.getAll()
            const recipes = results.rows.map(recipe => {
                return {
                    ...recipe,
                    image_path: recipe.image_path.replace("public", "")
                }
            })
    
            return response.render("recipes/index", { recipes })
        } catch(error) {
            return response.send(`${error}`)
        }
    },
    
    async show (request, response) {
        try {
            const recipeId = request.params.id
        
            let results = await Recipe.getById(recipeId)
            
            if (results.rows.length == 0)
                return response.send("Recipe not found!")    
        
            const recipe = results.rows[0]
    
            results = await File.getFilesByRecipeId(recipeId)
            const files = results.rows.map(file => {
                return {
                    ...file,
                    path: file.path.replace("public", "")
                }
            })
                
            return response.render("recipes/details", { recipe, files })
        } catch(error) {
            return response.send(`${error}`)
        }
    },
    
    async create (request, response) {
        try {
            let results = await Recipe.getChefOptions()
            const chefs = results.rows
    
            return response.render("recipes/create", { create: true, chefs })
        } catch(error) {
            return response.send(`${error}`)
        }
    },
    
    async edit (request, response) {
        try {
            const recipeId = request.params.id
        
            let results = await Recipe.getChefOptions()
            const chefs = results.rows
    
            results = await Recipe.getById(recipeId)
            if (results.rows.length == 0)
                return response.send("Recipe not found!")
    
            const recipe = results.rows[0]
    
            results = await File.getFilesByRecipeId(recipeId)
    
            const files = results.rows.map(file => {
                return {
                    ...file,
                    path: file.path.replace("public", "")
                }
            })
                
            return response.render("recipes/edit", { recipe, chefs, files })
        } catch(error) {
            return response.send(`${error}`)
        }
    },
    
    async post (request, response) {
        try {
            const keys = Object.keys(request.body)
        
            for (let key of keys) {
                if (request.body[key] == "") {
                    return response.send("Please, fill in all fields!")
                }
            }
        
            if (request.files.length == 0)
                return response.send('Please, send at least one image!')
        
            const { title, ingredients, preparations, information, chef_id } = request.body
    
            const recipeData = {
                title,
                ingredients,
                preparations,
                information,
                chef_id
            }
        
            let results = await Recipe.create(recipeData)
            const recipeId = results.rows[0].id
    
            const filePromises = request.files.map(file => File.create({ ...file }, recipeId))
            await Promise.all(filePromises)
    
            return response.redirect(`/admin/recipes/${recipeId}`)
        } catch(error) {
            return response.send(`${error}`)
        }
    },
    
    async put (request, response) {
        try {
            const { removed_files, id, title, chef_id, ingredients, preparations, information } = request.body
        
            let filePromises
    
            if (removed_files) {
                let removedIds = removed_files.split(",")
                removedIds.splice(removedIds.length - 1, 1)
    
                console.log(removedIds.map(id => id))
    
                filePromises = removedIds.map(id => File.delete(id))
                Promise.all(filePromises)
            }
    
            if (request.files && request.files.length > 0) {
                filePromises = request.files.map(file => File.create({ ...file }, id))
                await Promise.all(filePromises)
            }
    
            const data = {
                id,
                title,
                chef_id,
                ingredients,
                preparations,
                information
            }
            
            await Recipe.update(data)
    
            return response.redirect(`/admin/recipes/${data.id}`)
        } catch(error) {
            return response.send(`${error}`)
        }
    },
    
    async delete (request, response) {
        try {
            const { id: recipeId }  = request.body
        
            await File.deleteFilesByRecipeId(recipeId)
            await Recipe.delete(recipeId)
    
            return response.redirect("/admin/recipes/")
        } catch(error) {
            return response.send(`${error}`)
        }
    }
}