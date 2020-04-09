const classA = [
    {
        nome: 'Mayk',
        nota: 9.8
    },
    {
        nome: 'Diego',
        nota: 10
    },
    {
        nome: 'Fulano',
        nota: 2
    }
]

const classB = [
    {
        nome: 'Robson',
        nota: 5,
    },
    {
        nome: 'Cleiton',
        nota: 3.1
    },
    {
        nome: 'Ciclano',
        nota: 8.2
    },
    {
        nome: 'Novo Aluno',
        nota: 2
    }
]

function computeAverage(alunos) {
    let soma = 0;
    
    for (let i = 0; i < alunos.length; i++) {
        soma += alunos[i].nota
    }

    return soma / alunos.length
}

function sendMessage(media, turma) {
    if (media > 5) {
        console.log(`A média da ${turma} foi de ${media}. Parabéns!`)
    } else {
        console.log(`A média da ${turma} foi menor que 5.`)
    }
}

function marcarComoReprovado(aluno) {
    aluno.reprovado = false

    if (aluno.nota < 5) {
        aluno.reprovado = true
    }
}

function enviarMensagemReprovado(aluno) {
    if (aluno.reprovado) {
        console.log(`O aluno ${aluno.nome} está reprovado.`)
    }
}

function checarAlunosReprovados(alunos) {
    for (let aluno of alunos) {
        marcarComoReprovado(aluno)
        enviarMensagemReprovado(aluno)
    }
}

const mediaA = computeAverage(classA)
const mediaB = computeAverage(classB)

sendMessage(mediaA, 'turma A')
sendMessage(mediaB, 'turma B')

checarAlunosReprovados(classA)
checarAlunosReprovados(classB)