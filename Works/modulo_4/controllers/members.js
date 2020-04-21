const fs = require("fs")
const data = require("../data.json")
const utils = require("../utils")

// Show index
exports.index = function (request, response) {

    const members = []

    for (let member of data.members) {
        members.push({
            id: member.id,
            name: member.name,
            email: member.email,
            weight: member.weight,
            height: member.height,
            avatar_url: member.avatar_url
        })
    }

    return response.render("members/index", { members })
}

// Show create 
exports.create = function (request, response) {
    return response.render("members/create")
}

// Show info
exports.show = function (request, response) {
    const { id } = request.params

    const foundMember = data.members.find((member) => {
        return member.id == id
    })

    if (!foundMember) {
        return response.send("Member not found!")
    }
    
    const member = {
        ...foundMember,
        birth: utils.date(foundMember.birth).birthDay,
        gender: foundMember.gender == "M" ? "Masculino" : "Feminino"
    }

    return response.render("members/show", { member })
}

// Create
exports.post = function (request, response) {
    const keys = Object.keys(request.body)

    for (let key of keys) {
        if (request.body[key] == "") {
            return response.send("Please, fill in all fields!")
        }
    }

    let newId = 1

    for (let member of data.members) {
        if (newId <= member.id) {
            newId = member.id + 1
        }
    }

    request.body.id = Number(newId)
    request.body.birth = Date.parse(request.body.birth)

    const { weight, height } = request.body

    data.members.push({
        ...request.body,
        weight: Number(weight),
        height: Number(height)
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 4), (err) => {
        if (err) {
            return response.send("An error occurred while writting the file.")
        } else {
            return response.redirect(`/members/${newId}`)
        }
    })
}

// Show edit
exports.edit = function (request, response) {
    const { id } = request.params

    const foundMember = data.members.find((member) => {
        return member.id == id
    })

    if (!foundMember) {
        return response.send("Member not found!")
    }

    foundMember.birth = utils.date(foundMember.birth).iso
    
    return response.render("members/edit", { member: foundMember })
}

// Put
exports.put = function (request, response) {
    const keys = Object.keys(request.body)

    for (let key of keys) {
        if (request.body[key] == "") {
            return response.send("Please, fill in all fields!")
        }
    }
    
    const { id } = request.body
    let index = 0

    const foundMember = data.members.find((member, foundIndex) => {
        if (member.id == id) {
            index = foundIndex
            return true
        }
    })

    if (!foundMember) {
        return response.send("Member not found!")
    }

    data.members[index] = {
        ...foundMember,
        ...request.body,
        id: Number(request.body.id),
        birth: Date.parse(request.body.birth)
    }

    fs.writeFile("data.json", JSON.stringify(data, null, 4), (err) => {
        if (err) {
            return response.send("An error occurred while writting the file.")
        } else {
            return response.redirect(`/members/${id}`)
        }
    })
}

// Delete
exports.delete = function (request, response) {
    const { id } = request.body

    const filteredMembers = data.members.filter((member) => {
        return member.id != id
    })

    data.members = filteredMembers

    fs.writeFile("data.json", JSON.stringify(data, null, 4), (err) => {
        if (err) {
            return response.send("An error occurred while writting the file.")
        } else {
            return response.redirect(`/members`)
        }
    })
}