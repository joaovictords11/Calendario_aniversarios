const inputNome = document.querySelector('#name')
const inputData = document.querySelector('#birth-date')
const btnSalvar = document.querySelector('.save-button')
const formulario = document.querySelector('.js-form')
const ulPessoas = document.querySelector('.lista-pessoas')
const btnLimpar = document.querySelector('.btnLimpar');

let pessoas = JSON.parse(localStorage.getItem('pessoas')) || []

function atualizarDados(){
    localStorage.setItem('pessoas', JSON.stringify(pessoas))
}

function criarElementoPessoa(pessoa){
    const li = document.createElement('li');
    li.classList.add('lista-pessoas__item');

    const paragrafo = document.createElement('p');
    paragrafo.textContent = pessoa.nome + " - " + pessoa.data
    paragrafo.classList.add('lista-pessoas__pessoa')

    const btnEditar = document.createElement('button')
    btnEditar.classList.add('lista-pessoas__btnEditar')
    btnEditar.textContent = "Editar"

    btnEditar.onclick = () => {
        const novoNome = prompt("Nome atualizado:", pessoa.nome)
        const novaData = prompt("Data de nascimento atualizada(dd/mm/aaaa):", pessoa.data)

        verificarFormatoData = (novaData) => {
            const novaDataFormato = /^\d{2}\/\d{2}\/\d{4}$/
            return novaDataFormato.test(novaData)
        }

        verificarFormatoNome = (novoNome) => {
            novoNomeFormato = /^[a-zA-ZÀ-ú. ]+$/
            if (!novoNomeFormato.test(novoNome)) {
                return false
            }else if (novoNome.length < 3 && novoNome.length > 120) {
                return false
            }else{
                return true
            }
        }
        
        if(verificarFormatoNome(novoNome) && verificarFormatoData(novaData)){
            paragrafo.textContent = novoNome + " - " + novaData
            pessoa.nome = novoNome
            pessoa.data = novaData
            atualizarDados()
        }
    }

    li.append(paragrafo)
    li.append(btnEditar)

    return li;
}

pessoas.forEach(pessoa => {
    const elementoPessoa = criarElementoPessoa(pessoa)
    ulPessoas.append(elementoPessoa)
});

btnLimpar.onclick = () =>{
    const seletor = document.querySelectorAll('.lista-pessoas__item')
    seletor.forEach(elementoPessoa => {
        elementoPessoa.remove()
    })
    pessoas = []
    atualizarDados()
}

formulario.addEventListener('submit', () => {   
    const data = inputData.value
    const parts = data.split("-") //Divide a data em 3 partes e forma um Array
    const dataFormatada = `${parts[2]}/${parts[1]}/${parts[0]}`
    const pessoa = {nome: inputNome.value, data: dataFormatada} 
    pessoas.push(pessoa)       
    atualizarDados()  
})
