const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static("public"))
server.set("view engine", "njk")

nunjucks.configure("views", {
   express: server,
   autoescape: false,
   noCache: true
})

server.get("/", (request, response) => {
    const data = {
        avatar_url: "https://avatars2.githubusercontent.com/u/30900823?s=460&u=30f4e9405542d446de2b5772405d25158b6370c9&v=4",
        name: "Felipe Ferreira",
        role: "2º dan - Aikikai",
        description: 'Professor da escola de Aikido Kyoukai Recife. Felipe Ferreira sensei é graduado 2º dan pela Aikikai e é aluno do Leonardo Sodré sensei, 5º Aikikai. Filiação: <a href="https://aikidopesquisa.wordpress.com" target="_blank">APA</a>',
        links: [
            { name: "Github", url: "https://github.com/felipebsferreira" },
            { name: "Twitter", url: "https://twitter.com/felipbsferreira"},
            { name: "LinkedIn", url: "https://www.linkedin.com/in/felipe-ferreira-5a791921/"}
        ]
    }

    return response.render("about", { data })
})

server.get("/portfolio", (request, response) => {
    return response.render("portfolio", { items: videos })
})

server.get("/video", (request, response) => {
    const id = request.query.id

    const video = videos.find((video) => {
        return video.id == id
    })

    if (!video) {
        return response.send("Video not found")
    }

    return response.render("video", { item: video })
})

server.listen(5000, () => {
    console.log("server is running")
})