const express = require("express")
const routes = express.Router()

const HomeController = require("../app/controllers/HomeController")

const users = require('./users')
const products = require('./products')

// Home routes
routes.get("/", HomeController.index)

// User routes
routes.use('/users', users)

// Product routes
routes.use('/products', products)

// Alias
routes.get("/ads/create", (request, response) => {
    return response.redirect("/products/create")
})

routes.get("/accounts", (request, response) => {
    return response.redirect("/users/login")
})

module.exports = routes