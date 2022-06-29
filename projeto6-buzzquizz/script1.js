//obter quizzes API, GET: https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes
//ele envia um objeto com 50 ultimos quizzes;

let url = 'https://mock-api.driven.com.br/api/v4/buzzquizz/';
let quizzes = [];
let divQuizz = document.querySelector('.all-quizzes');
let meusQuizzes

renderizarQuizzes();

//localStorage.setItem("chave", `${quizzes.id}`)
//const chave = localStorage.getItem("chave")
//console.log(chave)

//-------------------------------------------------------------------------------------------
//catch - Erro 
function erroPromessa() {
    console.log("não funcionou");
}

//-------------------------------------------------------------------------------------------
//buscando os quizzes da API
function executarPromessa(resposta) {  
    quizzes = resposta.data;

    for (i = 0 ; i < quizzes.length ; i ++){
        divQuizz.innerHTML += `
        <div class="quizz">
        <img src="${quizzes[i].image}" alt="">
        <p>${quizzes[i].title}</p>
        </div>
        `
    }
}
function renderizarQuizzes() {
    let promessa = axios.get(`${url}quizzes`);

    promessa.then(executarPromessa);
    promessa.catch(erroPromessa);    
}

//--------------------------------------------------------------------------------------------
// ao clicar no "criar quizz"
function botaoCriarQuizz (){
    console.log("clicou")
    let esconder = document.querySelector('.display-one');
    let esconder2 = document.querySelector('.display-two');
    
    esconder.classList.add('esconder');
    esconder2.classList.add('esconder');

    let aparecer = document.querySelector(".d-9");
    aparecer.classList.remove('esconder')
}
