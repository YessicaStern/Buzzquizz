promessa = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
promessa.then(executarPromessa);

function executarPromessa(resposta){
    console.log(resposta);
    console.log(resposta.data);
}