const { age, date } = require("../../lib/utils")
const Chef = require("../models/chef")
const File = require("../models/file")

module.exports = {
    async index (request, response) {
        try {
            const results = await Chef.getAll()
            const chefs = results.rows.map(row => {
                return {
                    ...row,
                    avatar_path: row.avatar_path.replace("public", "")
                }
            })
        
            return response.render("chefs/index", { chefs })
        } catch(error) {
            return response.send(`${error}`)
        }
    },
    
    async show (request, response) {
        try {
            const id = request.params.id
        
            const results = await Chef.getById(id, true)
            if (results.rows.length == 0)
                return response.send("Chef not found!")
        
            const recipes = results.rows.map(row => {
                if (row.total_recipes == '0') {
                    return {
                        ...row
                    }
                } else {
                    return {
                        ...row,
                        image_path: row.image_path.replace("public", "") || ""
                    }
                }
            })
            
            const chef = {
                id: recipes[0].id,
                name: recipes[0].name,
                avatarPath: recipes[0].avatar_path.replace("public", ""),
                totalRecipes: recipes[0].total_recipes
            }
        
            return response.render("chefs/details", { chef, recipes })
        } catch(error) {
            return response.send(`${error}`)
        }
    },
    
    async edit (request, response) {
        try {
            const id = request.params.id
        
            const results = await Chef.getById(id, false)
            if (results.rows.length == 0)
                return response.send("Chef not found!")
                
            const chef = {
                id: results.rows[0].id,
                name: results.rows[0].name,
                avatarPath: results.rows[0].avatar_path,
            }
        
            return response.render("chefs/edit", { chef })
        } catch(error) {
            return response.send(`${error}`)
        }
    },
    
    create (request, response) {
        return response.render("chefs/create")
    },
    
    async post (request, response) {
        try {
            const keys = Object.keys(request.body)
        
            for (let key of keys) {
                if (request.body[key] == "")
                    return response.send("Please, fill in all fields!")
            }
        
            let results = await File.create(request.file)
            request.body.fileId = results.rows[0].id
        
            results = await Chef.create(request.body)
            const chefId = results.rows[0].id
            
            return response.redirect(`/admin/chefs/${chefId}`)
        } catch(error) {
            return response.send(`${error}`)
        }
    },
    
    async put (request, response) {
        try {
            const keys = Object.keys(request.body)
        
            for (let key of keys) {
                if (key != "avatar" && request.body[key] == "")
                    return response.send("Please, fill in all fields!")
            }
        
            let fileId, oldFileId
        
            if (request.file) {
                let results = await File.create(request.file)
                fileId = results.rows[0].id
        
                request.body.fileId = fileId
        
                results = await Chef.getFileId(request.body.id)
                oldFileId = results.rows[0].file_id
            }
        
            await Chef.update(request.body)
        
            if (oldFileId) {
                await File.deleteChefAvatar(oldFileId)
            }
            
            return response.redirect(`/admin/chefs/${request.body.id}`)
        } catch(error) {
            return response.send(`${error}`)
        }
    },
    
    async delete (request, response) {
        try {
            let results = await Chef.getFileId(request.body.id)
            const fileId = results.rows[0].file_id
        
            results = await Chef.delete(request.body.id)
        
            if (results.hasFailed) {
                return response.send("Unable to delete a chef associated with one or more recipes!")
            }
            else {
                await File.deleteChefAvatar(fileId)
                return response.redirect("/admin/chefs")
            }
        } catch(error) {
            return response.send(`${error}`)
        }
    }
}