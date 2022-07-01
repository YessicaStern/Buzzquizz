/******************************************** Desktop 8  ***********************************************/

//comparar se url existe para dara o alert nos 3 casos
let d8=document.querySelector(".d-8");
let d9= document.querySelector(".d-9");
let d10= document.querySelector(".d-10");
//d8.classList.remove("esconder");



let tituloQuiz;
let URLimg; 
let qtdPerguntas;
let qtdNiveis ;
let perguntasFechadas;
let detalhesPerguntas;
let desktop9=document.querySelector(".desktop-9");

function SeguirCriarPerguntas(){

    tituloQuiz =document.querySelector(".titulo").value;
    qtdPerguntas =document.querySelector(".qtd-perguntas").value;
    qtdNiveis =document.querySelector(".qtd-niveis").value;
    let img =document.querySelector(".URL-img").value;

 
    try {
        URLimg=  new URL (img);
    } catch (error) {
        
    }

   if(tituloQuiz.length>=20 && tituloQuiz.length<=65 && qtdPerguntas>=3 && qtdNiveis>=2 && URLimg){
        d8.classList.add("esconder");
        d9.classList.remove("esconder");
        gerarPerguntas();
    }else{ 
        alert("O Título do quizz deve ter de 20-65 caracteres, o mínimo de perguntas do quizz são 3 e o mínimo de níveis do quizz são 2 :)")
    }
}
let i;
function gerarPerguntas(){
    for (i=0; i<qtdPerguntas;i++){
        perguntasFechadas=`<div class"editar"><div class="quadros"><h4 class="h4-desktop-8a11"> Pergunta ${[i+1]}</h4><img onclick="clickPerguntas(this)" class="icone-escrever" src="./imagens/escrever.png"></div>
        <div class="esconder pergunta-${i+1}">
            
        <h4 class="h4-desktop-8a11">Pergunta ${i+1}</h4>
         <input type="text" placeholder="Texto da pergunta" class="texto-pergunta"/>
         <input type="text" placeholder=" Cor de fundo da pergunta" class="cor-de-fundo-pergunta"/>
         
         <h4 class="h4-desktop-8a11">Resposta Correta</h4>
         <input type="text" placeholder="Resposta correta" class="resp-certa"/>
         <input type="text" placeholder="URL da imagem" class="URL-img-resp-certa"/>
         
         <h4 class="h4-desktop-8a11">Respostas incorretas</h4>
         <input type="text" placeholder="Resposta incorreta 1" class="resp-err1"/>
         <input type="text" placeholder="URL da imagem 1" class="u URL-img-resp-err1"/>
         <input type="text" placeholder="Resposta incorreta 2" class="resp-err2"/>
         <input type="text" placeholder="URL da imagem 2" class="u URL-img-resp-err2"/>
         <input type="text" placeholder="Resposta incorreta 3" class="resp-err3"/>
         <input type="text" placeholder="URL da imagem 3" class="u URL-img-resp-err3"/>
      </div></div>`
        desktop9.innerHTML+=perguntasFechadas;
    }
    desktop9.innerHTML+=` <button class="botao-desktop" onclick="SeguirCriarNiveis()"><h5 class="h5-desktop-8a11" >Prosseguir pra criar níveis</h5></button>`
}

let selecionado;
function clickPerguntas(el){   
     selecionado = document.querySelector(".desktop-9 .selecionado");
    if(selecionado){
        selecionado.querySelector(".esconder").classList.add("quadros");
        selecionado.querySelector(".quadros").classList.remove("esconder");
        selecionado.querySelector(".box-9").classList.add("esconder");
        selecionado.querySelector(".esconder").classList.remove("box-9");
        selecionado.classList.remove("selecionado");
    }
    el.parentNode.parentNode.classList.add("selecionado");
    el.parentNode.parentNode.querySelector(".esconder").classList.add("box-9");
    el.parentNode.parentNode.querySelector(".box-9").classList.remove("esconder");
    el.parentNode.classList.add("esconder");
    el.parentNode.classList.remove("quadros");
}


let dadosPerguntas=[];

function SeguirCriarNiveis(){

    for(let i=0; i<qtdPerguntas; i++){
        let pergunta=document.querySelector(`.pergunta-${i}`);

        let textoPergunta=pergunta.querySelector(".texto-pergunta").value;
        let corDeFundo=pergunta.querySelector(".cor-de-fundo-pergunta").value;
        let respCerta=pergunta.querySelector(".resp-certa").value;
        let respErr1=pergunta.querySelector(".resp-err1").value;
        let respErr2=pergunta.querySelector(".resp-err2").value;
        let respErr3=pergunta.querySelector(".resp-err3").value;
    
        let imgCerta=pergunta.querySelector(".URL-img-resp-certa").value;
        let imgErr1=pergunta.querySelector(".URL-img-resp-err1").value;
        let imgErr2=pergunta.querySelector(".URL-img-resp-err2").value;
        let imgErr3=pergunta.querySelector(".URL-img-resp-err3").value;
    
        
        URLimgCerta= new URL (imgCerta);
        URLimgErr1= new URL (imgErr1);
        URLimgErr2= new URL (imgErr2);
        URLimgErr3= new URL (imgErr3);

        ObjPerguntas={
			title: "Título da pergunta 1",
			color: "#123456",
			answers: [
				{
					text: "Texto da resposta 1",
					image: "https://http.cat/411.jpg",
					isCorrectAnswer: true
				},
				{
					text: "Texto da resposta 2",
					image: "https://http.cat/412.jpg",
					isCorrectAnswer: false
				}
			]
		}

        


    }


    
    if(textoPergunta.length>=20 && corDeFundo[0]==="#" && corDeFundo.length===7 &&  corDeFundo.match(/[0-9A-Fa-f]{6}/g) && respErr1!="" && respErr2 !="" && respErr3!="" && respCerta!="" && URLimgCerta && URLimgErr1 && URLimgErr2 && URLimgErr3){
        d9.classList.add("esconder");
        d10.classList.remove("esconder");

    }else{
        alert("Para continuar os campos não devem estar vazios, o texto da pergunta deve ter no mínimo 20 caracteres, a cor precisa ser no formato hexadecimal e as imagens no formato de URL")
    }
}

let tituloNivel;
let porcentagem;
let imgNivel;
let descricao;
let  URLimgNivel;

function finalizarQuiz(){
    tituloNivel=document.querySelector(".titulo-nivel").value;
    porcentagem=document.querySelector(".porcentagem").value;
    imgNivel=document.querySelector(".URL-img-nivel").value;
    descricao=document.querySelector(".descricao").value;

    URLimgNivel= new URL (imgNivel);
    
    if(tituloNivel.length>=10 && porcentagem!="" && porcentagem>=0 && porcentagem<=100 && descricao.length>=30 && URLimgNivel ){
        d10.classList.add("esconder");
        //adicionar o quizz
    }else{
       alert("O Título do nível deve ter no mínimo 10 caracteres, a porcentagem deve ser de 0-100, pelo menos uma das porcentagens mínimas deve ser =0, a imagem deve ser no formato de URL e a descrição deve ter no mínimo 30 caracteres!!")
    }
}