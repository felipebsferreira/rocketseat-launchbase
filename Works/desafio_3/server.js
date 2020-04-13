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
    const data = {
        logo_url: "images/logo.png",
        name: "Rocketseat",
        description: "A menor distância entre você e seus objetivos como programador!",
        tecnologies: [
            "JavaScript",
            "JavaScript ES6+",
            "NodeJS",
            "ReactJS",
            "React Native",
        ],
        links: [
            { url: "http://twitter.com/rocketseat", name: "Twitter", iconClass: "fab fa-twitter"},
            { url: "http://instagram.com/rocketseat_oficial", name: "Instagram", iconClass: "fab fa-instagram"},
            { url: "http://fb.com/rocketseat", name: "Facebook", iconClass: "fab fa-facebook"}
        ]
    }

    response.render("about", { data })
})

server.get("/courses", (request, response) => {
    response.render("courses", { cards: data.cards })
})

server.get("/courses/:id", (request, response) => {
    const id = request.params.id

    response.render("course", { card: data.cards.find((card) => {
        return card.id == id
    })})
})

server.get("/not-found", (request, response) => {
    response.render("not-found")
})

server.use((request, response) => {
    response.status(404).render("not-found")
})

server.listen(5000, () => {
    console.log("server is running")
})