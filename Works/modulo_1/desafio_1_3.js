// Usuários e tecnologias

let usuarios = [
    { nome: "Carlos", tecnologias: ["HTML", "CSS"] },
    { nome: "Jasmine", tecnologias: ["JavScript", "CSS"] },
    { nome: "Tuane", tecnologias: ["HTML", "Node.js"] }
]

for (let usuario of usuarios) {
    console.log(`${usuario.nome} trabalha com ${usuario.tecnologias.join(', ')}`);
}

// Busca por tecnologia

console.log();

function usuarioTrabalhaComCSS(usuario) {
    for (let tecnologia of usuario.tecnologias) {
        if (tecnologia === "CSS") {
            return true;
        }
    }

    return false;
}

for (let usuario of usuarios) {
    if (usuarioTrabalhaComCSS(usuario)) {
        console.log(`O usuário ${usuario.nome} tabalha com CSS.`)
    } else {
        console.log(`O usuário ${usuario.nome} não tabalha com CSS.`)
    }
}

// Soma de despesas e receitas

console.log();

usuarios = [
    {
      nome: "Salvio",
      receitas: [115.3, 48.7, 98.3, 14.5],
      despesas: [85.3, 13.5, 19.9]
    },
    {
      nome: "Marcio",
      receitas: [24.6, 214.3, 45.3],
      despesas: [185.3, 12.1, 120.0]
    },
    {
      nome: "Lucia",
      receitas: [9.8, 120.3, 340.2, 45.3],
      despesas: [450.2, 29.9]
    }
];

function calculaSaldo(receitas, despesas) {
    let totalReceitas = somaNumeros(receitas);
    let totalDespesas = somaNumeros(despesas);

    return totalReceitas - totalDespesas;
}

function somaNumeros(numeros) {
    let total = 0;
    
    for (let numero of numeros) {
        total += numero;
    }

    return total;
}

for (let usuario of usuarios) {
    const saldo = calculaSaldo(usuario.receitas, usuario.despesas);
    
    if (saldo >= 0)
        console.log(`${usuario.nome} possui saldo POSITIVO de ${saldo.toFixed(2)}.`);
    else
        console.log(`${usuario.nome} possui saldo NEGATIVO de ${saldo.toFixed(2)}.`);
}