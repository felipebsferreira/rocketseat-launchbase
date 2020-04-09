// Cálculo de IMC

const nome1 = "Carlos";
const peso = 84;
const altura = 1.88;

const imc = peso / (altura * altura);

if (imc >= 30) {
    console.log(`${nome1}, você está acima do peso.`)
} else {
    console.log(`${nome1}, você não está acima do peso.`)
}

// Cálculo de aposentadoria

const nome2 = "Silvana";
const sexo = "F";
const idade = 30;
const contribuicao = 31;

if ((sexo === "F" && contribuicao >= 30 && idade + contribuicao >= 85) ||
    (sexo === "M" && contribuicao >= 35 && idade + contribuicao >= 95)) {
    console.log(`${nome2}, você já pode se aposentar!`);
} else {
    console.log(`${nome2}, você ainda não pode se aposentar!`);
}