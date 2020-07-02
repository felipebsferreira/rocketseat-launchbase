const nodemailer = require("nodemailer")

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "6c24ac4fd5e9b9",
        pass: "15777dfc231e68"
    }
})