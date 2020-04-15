exports.age = function (timestamp) {
    const today = new Date()
    const birth = new Date(timestamp)

    let age = today.getUTCFullYear() - birth.getUTCFullYear()
    const month = today.getUTCMonth() - birth.getUTCMonth()

    if (month < 0 || month == 0 && today.getUTCDate() < birth.getUTCDate()) {
        age = age - 1
    }

    return age
}

exports.date = function (timestamp) {
    const date = new Date(timestamp)

    const year = date.getUTCFullYear()
    const month = `0${date.getUTCMonth() + 1}`.slice(-2)
    const day = `0${date.getUTCDate()}`.slice(-2)

    return `${year}-${month}-${day}`
}