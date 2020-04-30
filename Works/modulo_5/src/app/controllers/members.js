const { date } = require("../../lib/utils")
const Member = require("../models/member")

module.exports = {
    index (request, response) {
        Member.all(members => {
            return response.render("members/index", { members })
        })
    },

    create (request, response) {
        Member.instructorsSelectOptions(instructorOptions => {
            return response.render("members/create", { instructorOptions })
        })
    },

    show (request, response) {
        const id = request.params.id
        
        Member.getById(id, (member) => {
            if (!member) {
                return response.send("Member not found!")
            }
            member.birth = date(member.birth).birthDay
            member.gender = member.gender == "M" || member.gender == "m" ? "Masculino" : "Feminino"

            return response.render("members/show", { member })
        })
    },

    edit (request, response) {
        const id = request.params.id
        
        Member.getById(id, (member) => {
            if (!member) {
                return response.send("Member not found!")
            }

            member.birth = date(member.birth).iso
            member.gender = member.gender.toUpperCase()

            Member.instructorsSelectOptions(instructorOptions => {
                return response.render("members/edit", { member, instructorOptions })
            })
        })
    },

    post (request, response) {
        const keys = Object.keys(request.body)

        for (let key of keys) {
            if (request.body[key] == "") {
                return response.send("Please, fill in all fields!")
            }
        }

        Member.create(request.body, (member) => {
            return response.redirect(`/members/${member.id}`)
        })
    },

    put (request, response) {
        const keys = Object.keys(request.body)

        for (let key of keys) {
            if (request.body[key] == "") {
                return response.send("Please, fill in all fields!")
            }
        }
        
        Member.update(request.body, () => {
            return response.redirect(`/members/${request.body.id}`)
        })
    },

    delete (request, response) {
        Member.delete(request.body.id, () => {
            return response.redirect("/members")
        })
    }
}