function loginForm(request, response) {
    return response.render("session/login")
}

function forgotForm(request, response) {
    return response.render("session/forgot-password")
}

function resetForm(request, response) {
    return response.render("session/reset-password")
}

function login(request, response) {
    request.session.userId = request.user.id
    request.session.userName = request.user.name
    request.session.userEmail = request.user.email
    request.session.userIsAdmin = request.user.is_admin

    return response.redirect('/admin/users/profile')
}

function logout(request, response) {
    request.session.destroy()
    return response.redirect("/")
}

function forgot(request, response) {
    return response.render("session/forgot-password")
}

function reset(request, response) {
    return response.render("session/reset-password")
}

module.exports = {
    loginForm,
    forgotForm,
    resetForm,
    login,
    logout,
    forgot,
    reset
}