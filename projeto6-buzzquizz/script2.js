/******************************************** Desktop 8  ***********************************************/

let d9= document.querySelector(".d-9");
let d8=document.querySelector(".d-8");


let tituloQuiz;
let URLimg; 
let qtdPerguntas;
let qtdNiveis ;


function SeguirCriarPerguntas(){

    tituloQuiz =document.querySelector(".titulo").value;
    qtdPerguntas =document.querySelector(".qtd-perguntas").value;
    qtdNiveis =document.querySelector(".qtd-niveis").value;
    let img =document.querySelector(".URL-img").value;

    URLimg=  new URL (img);

   if(tituloQuiz.length>=20 && tituloQuiz.length<=65 && qtdPerguntas>=3 && qtdNiveis>=2 && URLimg){
        d8.classList.add("esconder");
        d9.classList.remove("esconder");
    }else{ 
        alert("O Título do quizz deve ter de 20-65 caracteres, o mínimo de perguntas do quizz são 3 e o mínimo de níveis do quizz são 2 :)")
    }
}



let d10= document.querySelector(".d-10");


let textoPergunta;
let corDeFundo;
let respCerta;
let respErr1;
let respErr2;
let respErr3;
let URLimgCerta;
let URLimgErr1;
let URLimgErr2;
let URLimgErr3;

function SeguirCriarNiveis(){

    textoPergunta= document.querySelector(".texto-pergunta").value;
    corDeFundo= document.querySelector(".cor-de-fundo-pergunta").value;
    respCerta= document.querySelector(".resp-certa").value;
    respErr1= document.querySelector(".resp-err1").value;
    respErr2= document.querySelector(".resp-err2").value;
    respErr3= document.querySelector(".resp-err3").value;

    let imgCerta= document.querySelector(".URL-img-resp-certa").value;
    let imgErr1= document.querySelector(".URL-img-resp-err1").value;
    let imgErr2= document.querySelector(".URL-img-resp-err2").value;
    let imgErr3= document.querySelector(".URL-img-resp-err3").value;
    
    URLimgCerta= new URL (imgCerta);
    URLimgErr1= new URL (imgErr1);
    URLimgErr2= new URL (imgErr2);
    URLimgErr3= new URL (imgErr3);
    
    if(textoPergunta.length>=20 && corDeFundo[0]==="#" && corDeFundo.length===7 &&  corDeFundo.match(/[0-9A-Fa-f]{6}/g) && respErr1!="" && respErr2 !="" && respErr3!="" && respCerta!="" && URLimgCerta && URLimgErr1 && URLimgErr2 && URLimgErr3){
        d9.classList.add("esconder");
        d10.classList.remove("esconder");

    }else{
        alert("Para continuar os campos não devem estar vazios, o texto da pergunta deve ter no mínimo 20 caracteres, a cor precisa ser no formato hexadecimal e as imagens no formato de URL")
    }

   
}




