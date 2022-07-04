//obter quizzes API, GET: https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes
//ele envia um objeto com 50 ultimos quizzes;

//da pra mudar a versão do link para "v7" para testar
let url = 'https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes';
let quizzes;
let divQuizz = document.querySelector('.all-quizzes');
let obj
let questions = []
let answers = []
let perguntas
let alternativasSelecionadas = 0
let pontos = 0
let quantidadeCliques = 0



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

function pegarIdQuizz(elemento, idQuizz){
    
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
            <div class="box-img-question catch-${i}" >
                <div class="question" style="background-color:${perguntas[i].color}">
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
function misturar() { 
    return Math.random() - 0.5; 
}
function addQuestoes(){
 
    //saber quantidade de perguntas
    for (let j = 0; j < perguntas.length ; j++){
        
        answers = perguntas[j].answers
        
        let perguntaEsp = perguntas[j].answers

        let divResposta = document.querySelector(`.catch-${questions[j]}`)
        //misturar?
        answers.sort(misturar)
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


function respostaSelecionar(click, resultado){
    //saber quantidade de vezes clicou
    
    
    let perguntaSelecionada = click.parentNode
    let respostaCerta = perguntaSelecionada.querySelector('.true')    
    let respostaErrada = perguntaSelecionada.querySelectorAll('.false')
    
    //adicionar classe wrong em todas as eradas
    for (let i = 0; i < respostaErrada.length; i++) {
        respostaErrada[i] = perguntaSelecionada.querySelector('.false')
        respostaErrada[i].classList.add('wrong')
        //remover onclick
        respostaErrada[i].removeAttribute('onclick')   
        
    }
    //remover onclick
    respostaCerta.removeAttribute('onclick')

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

    //contador de respostas certas
    if (Boolean(resultado)){
        pontos++
    }
    
    quantidadeCliques ++ 
    
    fimDoQuizz()
 
    //setTimeout(fimDoQuizz, 2000)
}

function fimDoQuizz(){
    
    
    if(perguntas.length === quantidadeCliques){
        let pontosTotal = pontos * 10;
        let totalPerguntas =  perguntas.length * 10;

        let pontosFinal = (pontosTotal / totalPerguntas) * 100;
        pontosFinal = pontosFinal.toFixed()
        console.log(pontosFinal)

        for(let i = 0; i < obj.levels.length; i++){
            //console.log(obj.levels.length)
            console.log(obj.levels[i].minValue)
            
            if((pontosFinal === obj.levels[i].minValue || pontosFinal >= obj.levels[i].minValue) && obj.levels[i].minValue != 0){
                let divResultado = document.querySelector('.result-all')
                    divResultado.classList.remove('esconder')

                    divResultado.innerHTML = `
                    <div class="box-result">
                    <div class="box-img-result">

                    <div class="result-text">
                        <p>${obj.levels[i].title}</p>
                    </div>
          
                    <div class="result">
                        <img src="${obj.levels[i].image}" alt="">
                        <p>${obj.levels[i].text}</p>
                    </div>
        
                </div>
                </div>
        
                <div class="restart">
                <button class="restart-game" onclick="reiniciarQuizz()">Reiniciar Quizz</button>
                <button class="back-home" onclick="voltarHome()">Voltar para home</button>
                </div>
                `
                let element = document.querySelector('.result')
                element.scrollIntoView()
            }
            if (pontosFinal >= obj.levels[i].minValue && obj.levels[i].minValue === 0){
                let divResultado = document.querySelector('.result-all')
                    divResultado.classList.remove('esconder')

                    divResultado.innerHTML = `
                    <div class="box-result">
                    <div class="box-img-result">

                    <div class="result-text">
                        <p>${obj.levels[i].title}</p>
                    </div>
          
                    <div class="result">
                        <img src="${obj.levels[i].image}" alt="">
                        <p>${obj.levels[i].text}</p>
                    </div>
        
                </div>
                </div>
        
                <div class="restart">
                <button class="restart-game" onclick="reiniciarQuizz()">Reiniciar Quizz</button>
                <button class="back-home" onclick="voltarHome()">Voltar para home</button>
                </div>
                `
                let element = document.querySelector('.result')
                element.scrollIntoView()
            }
            
        }           
    }

}

function reiniciarQuizz(){
    let esconder1 = document.querySelector('.result-all')
    let esconder2 = document.querySelectorAll('.options')
}

function voltarHome(){
    
    window.location.reload();

}