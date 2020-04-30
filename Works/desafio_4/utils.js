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

    return {
        day,
        month,
        year,
        iso: `${year}-${month}-${day}`,
        birthDay: `${day}/${month}`,
        format: `${day}/${month}/${year}`
    }
}

exports.graduation = function(educational_level) {
    switch (educational_level) {
        case "high_school":
            return "Ensino Médio Completo"

        case "undergraduate":
            return "Ensino Superior Completo"

        case "master":
            return "Mestrado"

        case "doctor":
            return "Doutorado"
    }
}

exports.schoolYear = function(school_year) {
    switch (school_year) {
        case "elementary_5":
            return "5º ano do ensino fundamental"

        case "elementary_6":
            return "6º ano do ensino fundamental"

        case "elementary_7":
            return "7º ano do ensino fundamental"

        case "elementary_8":
            return "8º ano do ensino fundamental"

        case "high_school_1":
            return "1º ano do ensino médio"

        case "high_school_2":
            return "2º ano do ensino médio"

        case "high_school_3":
            return "3º ano do ensino médio"
    }
}