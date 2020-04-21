const express = require("express")
const routes = express.Router()

const userNavigation = require("./controllers/userNavigation")

routes.get("/", userNavigation.home)
routes.get("/about", userNavigation.about)
routes.get("/recipeslist", userNavigation.recipes)
routes.get("/recipeslist/:id", userNavigation.details)

const recipes = require("./controllers/recipes")

routes.get("/admin/recipes", recipes.index) // Mostrar a lista de receitas
routes.get("/admin/recipes/create", recipes.create) // Mostrar formulário de nova receita
routes.get("/admin/recipes/:id", recipes.show) // Exibir detalhes de uma receita
routes.get("/admin/recipes/:id/edit", recipes.edit); // Mostrar formulário de edição de receita

routes.post("/admin/recipes", recipes.post); // Cadastrar nova receita
routes.put("/admin/recipes", recipes.put); // Editar uma receita
routes.delete("/admin/recipes", recipes.delete); // Deletar uma receita

module.exports = routes
