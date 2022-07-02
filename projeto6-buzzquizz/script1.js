//obter quizzes API, GET: https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes
//ele envia um objeto com 50 ultimos quizzes;

//da pra mudar a versão do link para "v7" para testar
let url = 'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes';
let quizzes;
let divQuizz = document.querySelector('.all-quizzes');
let obj
let questions = []
let answers = []
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
    
    //add todos os quizzes
    for (i = 0 ; i < quizzes.length ; i ++){
        divQuizz.innerHTML += `
        <div class="quizz" onclick="pegarIdQuizz(this, ${quizzes[i].id})">
        <img src="${quizzes[i].image}" alt="">
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
            <div class="box-img-question catch-${i}">
                <div class="question">
                    <p>${perguntas[i].title}</p>
                </div>
            </div>
        </div>
            `
        questions.push(i)
        }

    //ADD RESPOSTAS
    addQuestoes()

}

function addQuestoes(){
 

    //saber quantidade de perguntas
    for (let j = 0; j < perguntas.length ; j++){

        let perguntaEsp = perguntas[j].answers

        let divResposta = document.querySelector(`.catch-${questions[j]}`)

        //add respostas
        for (let i = 0; i < perguntas[j].answers.length; i++){

            divResposta.innerHTML += 
            `
            <div class="options catchAnswer-${i} ${perguntaEsp[i].isCorrectAnswer}" onclick="respostaSelecionar(this, ${perguntaEsp[i].isCorrectAnswer})">
                <img src="${perguntaEsp[i].image}" alt="">
                <p>${perguntaEsp[i].text}</p>
            </div>
            `
        }        
    } 

}

let alternativasSelecionadas = 0
let pontos = 0
let quantidadeCliques = 0

function respostaSelecionar(click, resultado){

    //saber quantidade de vezes clicou
    if (click) {
        quantidadeCliques++
    }
    
    let perguntaSelecionada = click.parentNode
    let respostaCerta = perguntaSelecionada.querySelector('.true')    
    let respostaErrada = perguntaSelecionada.querySelectorAll('.false')
    
    //adicionar classe wrong em todas as eradas
    for (let i = 0; i < respostaErrada.length; i++) {
        respostaErrada[i] = perguntaSelecionada.querySelector('.false')
        respostaErrada[i].classList.add('wrong')
    }


    //saber quantidade de resposta por pergunta
    let quantidade = perguntaSelecionada.querySelectorAll('.options')
    answers = quantidade
    
    //adiciona opacity em todas as respostas
    for (let i = 0; i < answers.length; i++) {

        let todos = perguntaSelecionada.querySelector(`.catchAnswer-${i}`)

        //respostaErrada.classList.add('wrong')
        todos.classList.add('opacity')

    }

    //adiciona classe correct
    respostaCerta.classList.add('correct')

    //remove classe opacity da resposta escolhida
    click.classList.remove('opacity')

    //contador de pontos
    if (Boolean(resultado)){
        pontos++
    }
    
}

//FALTA FAZER TRAVAR O CLICK, PARA N PODER CLICAR MAIS DE UMA VEZ