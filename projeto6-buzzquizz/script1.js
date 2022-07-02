//obter quizzes API, GET: https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes
//ele envia um objeto com 50 ultimos quizzes;

//da pra mudar a versão do link para "v7" para testar
let url = 'https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes';
let quizzes;
let divQuizz = document.querySelector('.all-quizzes');
let obj
let teste = []
let perguntas

renderizarQuizzes();

//localStorage.setItem("chave", `id`)
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
        <div class="quizz" onclick="pegarIdQuizz(this, ${quizzes[i].id})">
        <img src="${quizzes[i].image}" alt="teste">
        <p>${quizzes[i].title}</p>
        </div>
        `
    }

}

function renderizarQuizzes() {
    let promessa = axios.get(`${url}`);

    promessa.then(executarPromessa);
    promessa.catch(erroPromessa);    

}

//--------------------------------------------------------------------------------------------
// ao clicar no "criar quizz" - muda para pagina de criação de quizz
function botaoCriarQuizz (){
    let esconder = document.querySelector('.display-one');
    let esconder2 = document.querySelector('.display-two');
    
    esconder.classList.add('esconder');
    esconder2.classList.add('esconder');

    let aparecer = document.querySelector(".d-8");
    aparecer.classList.remove('esconder')

}

//--------------------------------------------------------------------------------------------

function pegarIdQuizz(click, idQuizz){
   
    let promessa = axios.get(`${url}/${idQuizz}`);
    promessa.then(abrirQuizz)
    promessa.catch(erroPromessa)
    
}

function abrirQuizz (resposta){
    obj = resposta.data

    //esconder pagina anterior
    let esconder = document.querySelector('.display-one');
    let esconder2 = document.querySelector('.display-two');
    esconder.classList.add('esconder');
    esconder2.classList.add('esconder');

    //adicionar a pagina do quizz
    let aparecer = document.querySelector('.push-question');
    let aparecer2 = document.querySelector('.quizz-top')
    aparecer.classList.remove('esconder');
    aparecer2.classList.remove('esconder');

    addTemplateQuizz()
      
}

function addTemplateQuizz(){
        
    //ADD TOPO
    let divAdd = document.querySelector('.quizz-top')
    divAdd.innerHTML += `
          <div class="top-img">
              <img src="${obj.image}" alt="">
              <p>${obj.title}</p>
          </div>
          `

    perguntas = obj.questions

    //ADD PERGUNTAS
    for(let i = 0; i < obj.questions.length ; i++){
        let divQuestion = document.querySelector('.push-question')
        
        divQuestion.innerHTML += `

        <div class="box-questions">
            <div class="box-img-question">
                <div class="question">
                    <p>${perguntas[i].title}</p>
                </div>
                <div class="add-question catch-${i}"></div>
            </div>
        </div>
            `
        teste.push(i)
        }

    //ADD RESPOSTAS
    addQuestoes()

}

function addQuestoes(){

    for (let j = 0; j < perguntas.length ; j++){

        let perguntaEsp = perguntas[j].answers

        let divResposta = document.querySelector(`.catch-${teste[j]}`)
        
        for (let i = 0; i < perguntas[j].answers.length; i++){

            divResposta.innerHTML += 
            `
            <div class="options" onclick="respostaVerificar(this, ${perguntaEsp[i].isCorrectAnswer})">
                <img src="${perguntaEsp[i].image}" alt="">
                <p>${perguntaEsp[i].text}</p>
            </div>
            `
        }

    }
   
}

function respostaVerificar(click, booleanoResposta){
    console.log(booleanoResposta)
    console.log(Boolean(booleanoResposta))

    console.log(click)
    
    if (Boolean(booleanoResposta)){
        console.log("voce acertou")
        
    }
    else{
        console.log("voce errou")
    }
}