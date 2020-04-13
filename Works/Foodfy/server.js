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
    return response.render("home")
})

server.get("/about", (request, response) => {
    const info = {
        isAbout: true
    }

    return response.render("about", { info })
})

server.get("/recipes", (request, response) => {
    const info = {
        isRecipes: true
    }

    return response.render("recipes", { info })
})

server.listen("5000", () => {
    console.log("server is running")
})