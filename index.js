const {select, input, checkbox} = require('@inquirer/prompts')

let meta = {
    value: "Tomar 3 litros de água por dia",
    checked: false
}

let metas = [meta]

async function cadastrarMeta(){
    const meta = await input({message: "Digite a meta:"})

    if(meta.length ==0){
        console.log('A meta não pode ser vazia.')
        return
    }

    metas.push({ value: meta, checked: false})
}

async function listarMetas(){
    const respostas = await checkbox({
        message: "(Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o enter para finalizar esta etapa)",
        choices: [...metas],
        instructions: false
    })

    if(respostas.length == 0){
        console.log("Nenhuma meta selecionada!")
        return
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    console.log("Meta(s) marcada(s) como concluida(s)")
}

async function start(){

    while(true){

    const opcao = await select({
        message: "Menu >",
        choices: [
            {
                name: "Cadastrar meta",
                value: "cadastrar"
            },
            {
                name: "Listar metas",
                value: "listar"
            },
            {
                name: "Sair",
                value: "sair"
            }
        ]
    })

    switch(opcao){
        case "cadastrar":
            await cadastrarMeta()
            console.log(metas)
            break
        case "listar":
            await listarMetas()
            break
        case "sair":
            console.log("Até a próxima!")
            return
    }
    }
}

start()