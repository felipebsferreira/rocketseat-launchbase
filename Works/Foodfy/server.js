const express = require("express")
const nunjucks = require("nunjucks")

const data = require("./data")

const server = express()

server.use(express.static("public"))
server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
 })

server.get("/", (request, response) => {
    return response.render("home", { recipes: data })
})

server.get("/about", (request, response) => {
    const info = { isAbout: true }

    return response.render("about", { info })
})

server.get("/recipes", (request, response) => {
    const info = {
        isRecipes: true,
        recipes: data
    }

    return response.render("recipes", { info })
})

server.get("/recipes/:index", (request, response) => {
    const index = request.params.index

    const info = {
        isRecipes: true,
        data: data[index]
    }

    return response.render("details", { info })
})

server.use((request, response) => {
    response.status(404).render("not-found")
})

server.listen("5000", () => {
    console.log("server is running")
})