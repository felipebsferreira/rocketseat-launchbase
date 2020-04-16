const express = require("express")
const routes = express.Router()

const teachers = require("./teachers")

routes.get("/", (request, response) => {
    return response.redirect("/teachers")
})

routes.get("/teachers", teachers.index)

routes.get("/teachers/create", (request, response) => {
    return response.render("teachers/create")
})

routes.post("/teachers", teachers.create)
routes.get("/teachers/:id", teachers.show)
routes.get("/teachers/:id/edit", teachers.edit)
routes.put("/teachers", teachers.put)
routes.delete("/teachers", teachers.delete)

module.exports = routes