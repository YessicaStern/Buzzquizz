//obter quizzes API, GET: https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes
//ele envia um objeto com 50 ultimos quizzes;

let url = 'https://mock-api.driven.com.br/api/v4/buzzquizz/';
let quizzes = [];
let divQuizz = document.querySelector('.all-quizzes');

renderizarQuizzes();

//-------------------------------------------------------------------------------------------
//catch e then 
function erroPromessa() {
    console.log("não funcionou");
}
function executarPromessa(resposta) {  
    quizzes = resposta.data;
}


//-------------------------------------------------------------------------------------------
function renderizarQuizzes() {
    let promessa = axios.get(`${url}quizzes`);

    promessa.then(executarPromessa);
    promessa.catch(erroPromessa);
    

    for (i = 0 ; i < quizzes.length ; i ++){
        divQuizz.innerHTML += `
        <div class="quizz">
        <img src="${quizzes[i].image}" alt="">
        <p>${quizzes[i].title}</p>
        </div>
        `
    }
    
}
