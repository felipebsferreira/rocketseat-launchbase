const Recipe = require("../models/recipe")
const Chef = require("../models/chef")
const File = require("../models/file")

module.exports = {
    async home (request, response) {
        try {
            let results = await Recipe.getAll()
            const recipes = results.rows.map(recipe => {
                return {
                    ...recipe,
                    image_path: recipe.image_path.replace("public", "")
                }
            })
            
            return response.render("visitors/home", { recipes })
        } catch (error) {
            return response.send(`${error}`)
        }
    },
    
    about (request, response) {
        return response.render("visitors/about")
    },
    
    async recipes (request, response) {
        try {
            let { filter } = request.query
                orderByUpdated = false
        
            if (!filter)
                filter = ""
            else
                orderByUpdated = true
        
            let results = await Recipe.getAll(filter, orderByUpdated)
            const recipes = results.rows.map(recipe => {
                return {
                    ...recipe,
                    image_path: recipe.image_path.replace("public", "")
                }
            })
        
            return response.render("visitors/recipes", { recipes, filter })
        } catch(error) {
            return response.send(`${error}`)
        }
    },
    
    async details (request, response) {
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
                
            return response.render("visitors/details", { recipe, files })
        } catch(error) {
            return response.send(`${error}`)
        }
    },
    
    async chefs (request, response) {
        try {
            const results = await Chef.getAll()
            const chefs = results.rows.map(row => {
                return {
                    ...row,
                    avatar_path: row.avatar_path.replace("public", "")
                }
            })
        
            return response.render("visitors/chefs", { chefs })
        } catch (error) {
            return response.send(`${error}`)
        }
    }
}