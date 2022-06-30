//obter quizzes API, GET: https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes
//ele envia um objeto com 50 ultimos quizzes;

//da pra mudar a versão do link para "v7" para testar
let url = 'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes';
let quizzes;
let divQuizz = document.querySelector('.all-quizzes');

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
    console.log("clicou")
    let esconder = document.querySelector('.display-one');
    let esconder2 = document.querySelector('.display-two');
    
    esconder.classList.add('esconder');
    esconder2.classList.add('esconder');

    let aparecer = document.querySelector(".d-8");
    aparecer.classList.remove('esconder')
}


//--------------------------------------------------------------------------------------------
// CLICAR EM UM QUIZZ
// chamar um GET PRA https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/ID_DO_QUIZZ
//ONDE ID DO QUIZZ ESTA NO IDQUIZZ
let idQuizz

function pegarIdQuizz(click, idQuizz){
    
    console.log(click)
    console.log(idQuizz)
    //console.log(idQuizz)
    let promessa = axios.get(`${url}/${idQuizz}`);
    promessa.then(abrirQuizz)
    promessa.catch(erroPromessa)
    
}


function abrirQuizz (resposta){
    let obj = resposta.data

    
    console.log(obj.title)
    console.log(obj.questions[1].title)

    //esconder pagina anterior
    let esconder = document.querySelector('.display-one');
    let esconder2 = document.querySelector('.display-two');
    esconder.classList.add('esconder');
    esconder2.classList.add('esconder');

    //adicionar a pagina do quizz
    let aparecer = document.querySelector('.box-questions');
    let aparecer2 = document.querySelector('.quizz-top')
    aparecer.classList.remove('esconder');
    aparecer2.classList.remove('esconder');


    //adicionar o quizz no template
    //topo -> adc na div do "quizz-top" 
    let divAdd = document.querySelector('.quizz-top')
        divAdd.innerHTML += `
            <div class="top-img">
                <img src="${obj.image}" alt="">
                <p>${obj.title}</p>
            </div>
            `
   
    //perguntas -> adc na div do "box-img-question"
    //ARRUMAR A COR DA DIV QUESTION

    for(i = 0; i < obj.questions.length ; i++){
        let divQuestion = document.querySelector('.box-img-question')
        console.log(obj.questions[i])
        console.log(obj.questions[i].answers[i].image)
        console.log(obj.questions[i].title)

        divQuestion.innerHTML += `
        <div class="question">
                <p>${obj.questions[i].title}</p>
            </div>
    
    
            <div class="options">
                <img src="${obj.questions[i].answers[i].image}" alt="">
                <p>${obj.questions[i].answers[i].text}</p>
            </div>

            <div class="options">
                <img src="${obj.questions[i].answers[i].image}" alt="">
                <p>${obj.questions[i].answers[i].text}</p>
            </div>

            <div class="options">
                <img src="${obj.questions[i].answers[i].image}" alt="">
                <p>${obj.questions[i].answers[i].text}</p>
            </div>
            
            <div class="options">
                <img src="${obj.questions[i].answers[i].image}" alt="">
                <p>${obj.questions[i].answers[i].text}</p>
            </div>
            `
            }

}
