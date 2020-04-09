// Intro

const user = {
    name: "Felipe",
    transactions: [],
    balance: 0
}

// Adicionar transações

function createTransaction(user, transaction) {
    if (transaction.type === "credit") {
        user.balance += transaction.value
    } else {
        user.balance -= transaction.value
    }

    user.transactions.push(transaction)
}

// Relatórios

function getHigherTransactionByType(user, type) {
    let higherValue = 0
    
    for (let transaction of user.transactions) {
        if (transaction.type == type && transaction.value > higherValue) {
            higherValue = transaction.value
        }
    }

    return { type: type, value: higherValue }
}

function getAverageTransactionValue(user) {
    let average = 0

    for (let transaction of user.transactions) {
        average += transaction.value
    }

    return user.transactions.length == 0 ? 0 : average / user.transactions.length
}

function getTransactionsCount(user) {
    let countCredits = 0
    let countDebits = 0

    for (let transaction of user.transactions) {
        if (transaction.type === "credit") {
            countCredits++
        } else {
            countDebits++
        }
    }

    return { credit: countCredits, debit: countDebits }
}

createTransaction(user, { type: "credit", value: 50 })
createTransaction(user, { type: "credit", value: 120 })
createTransaction(user, { type: "debit", value: 80 })
createTransaction(user, { type: "debit", value: 30 })
createTransaction(user, { type: "debit", value: 21 })

console.log(user.balance)

console.log(getHigherTransactionByType(user, "credit"))
console.log(getHigherTransactionByType(user, "debit"))

console.log(getAverageTransactionValue(user))

console.log(getTransactionsCount(user))
