const express = require("express")
const routes = express.Router()

const multer = require("./app/middlewares/multer")
const SessionValidator = require("./app/validators/sessionValidator")

// Rotas para usuários visitantes
const VisitorController = require("./app/controllers/VisitorController")

routes.get("/", VisitorController.home)
routes.get("/about", VisitorController.about)
routes.get("/recipeslist", VisitorController.recipes)
routes.get("/recipeslist/:id", VisitorController.details)
routes.get("/chefslist", VisitorController.chefs)

// Rotas de controle de sessão
const SessionController = require("./app/controllers/SessionController")

routes.get('/login', SessionController.loginForm) // Mostra o formulário de login
routes.get('/login/forgot', SessionController.forgotForm) // Mostra o formulário de "esqueceu a senha"
routes.get('/login/reset', SessionController.resetForm) // Mostra o formulário de reset de senha

routes.get('/logout', SessionValidator.isUserLoged, SessionController.logout) // Realiza o logout do usuário

routes.post('/login', SessionValidator.login, SessionController.login) // Realiza o login do usuário
routes.post('/login/forgot', SessionValidator.forgot, SessionController.forgot) // Envia link de reset de senha por e-mail
routes.put('/login/reset', SessionValidator.reset, SessionController.reset) // Realiza o reset de senha

// Rotas de perfil de usuário logado
const ProfileController = require("./app/controllers/ProfileController")
const ProfileValidator = require("./app/validators/profileValidator")

routes.get('/admin/users/profile', SessionValidator.isUserLoged, ProfileController.index) // Mostrar o formulário com dados do usuário logado
routes.put('/admin/users/profile', SessionValidator.isUserLoged, ProfileValidator.profile, ProfileController.put) // Editar o usuário logado

// Rotas que o administrador irá acessar para gerenciar usuários
const UserController = require("./app/controllers/UserController")
const UserValidator = require("./app/validators/userValidator")

routes.get('/admin/users', SessionValidator.isUserLoged, SessionValidator.onlyAdminAllowed, UserController.list) // Mostrar a lista de usuários cadastrados
routes.get('/admin/users/create', SessionValidator.isUserLoged, SessionValidator.onlyAdminAllowed, UserController.createForm) // Mostrar formulário para criação de um usuário qualquer
routes.get('/admin/users/:id', SessionValidator.isUserLoged, SessionValidator.onlyAdminAllowed, UserController.editForm) // Mostrar formulário para edição de um usuário qualquer

routes.post('/admin/users', SessionValidator.isUserLoged, SessionValidator.onlyAdminAllowed, UserValidator.user, UserController.post) // Cadastrar um usuário
routes.put('/admin/users', SessionValidator.isUserLoged, SessionValidator.onlyAdminAllowed, UserValidator.user, UserController.put) // Editar um usuário
routes.delete('/admin/users', SessionValidator.isUserLoged, SessionValidator.onlyAdminAllowed, UserController.remove) // Deletar um usuário

// Rotas para cadastro de receitas
const RecipeController = require("./app/controllers/RecipeController")

routes.get("/admin", SessionValidator.isUserLoged, RecipeController.admin) // Mostrar a lista de receitas
routes.get("/admin/recipes", SessionValidator.isUserLoged, RecipeController.index) // Mostrar a lista de receitas
routes.get("/admin/recipes/create", SessionValidator.isUserLoged, RecipeController.create) // Mostrar formulário de nova receita
routes.get("/admin/recipes/:id", SessionValidator.isUserLoged, RecipeController.show) // Exibir detalhes de uma receita
routes.get("/admin/recipes/:id/edit", SessionValidator.isUserLoged, SessionValidator.onlyAdminAllowed, RecipeController.edit); // Mostrar formulário de edição de receita

routes.post("/admin/recipes", SessionValidator.isUserLoged, SessionValidator.onlyAdminAllowed, multer.array("images", 5), RecipeController.post); // Cadastrar nova receita
routes.put("/admin/recipes", SessionValidator.isUserLoged, SessionValidator.onlyAdminAllowed, multer.array("images", 5), RecipeController.put); // Editar uma receita
routes.delete("/admin/recipes", SessionValidator.isUserLoged, SessionValidator.onlyAdminAllowed, RecipeController.delete); // Deletar uma receita

// Rotas para cadastro de chefs
const ChefController = require("./app/controllers/ChefController")

routes.get("/admin/chefs", SessionValidator.isUserLoged, ChefController.index) // Mostrar a lista de chefs
routes.get("/admin/chefs/create", SessionValidator.isUserLoged, SessionValidator.onlyAdminAllowed, ChefController.create) // Mostrar formulário de novo chef
routes.get("/admin/chefs/:id", SessionValidator.isUserLoged, ChefController.show) // Exibir detalhes de um chef
routes.get("/admin/chefs/:id/edit", SessionValidator.isUserLoged, SessionValidator.onlyAdminAllowed, ChefController.edit); // Mostrar formulário de edição de um chef

routes.post("/admin/chefs", SessionValidator.isUserLoged, SessionValidator.onlyAdminAllowed, multer.single("avatar"), ChefController.post); // Cadastrar novo chef
routes.put("/admin/chefs", SessionValidator.isUserLoged, SessionValidator.onlyAdminAllowed, multer.single("avatar"), ChefController.put); // Editar um chef
routes.delete("/admin/chefs", SessionValidator.isUserLoged, SessionValidator.onlyAdminAllowed, ChefController.delete); // Deletar um chef

module.exports = routes
