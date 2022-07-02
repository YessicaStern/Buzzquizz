//observaçoões gerais
//alert executado varias vezes em d-9 e d-10
//ajeitar comparação de url
//níveis só prossegue com 2 clicks 
/******************************************** Desktop 8  ***********************************************/

let d8=document.querySelector(".d-8");
let d9= document.querySelector(".d-9");
let d10= document.querySelector(".d-10");
let d11= document.querySelector(".d-11");
let desktop9=document.querySelector(".desktop-9");
let desktop10=document.querySelector(".desktop-10");
let desktop11=document.querySelector(".desktop-11");
d11.classList.remove("esconder");

let tituloQuiz;
let URLimg; 
let qtdPerguntas;
let qtdNiveis;
let perguntasFechadas;
let detalhesPerguntas;
let selecionado;
let dadosPerguntas=[];


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
        gerarNiveis();
    }else{ 
        alert("O Título do quizz deve ter de 20-65 caracteres, o mínimo de perguntas do quizz são 3 e o mínimo de níveis do quizz são 2 :)")
    }
}




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


function SeguirCriarNiveis(){

    for(let i=1; i<=qtdPerguntas; i++){
        
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
        
        let URLimgCerta =new URL (imgCerta);
        let URLimgErr1 = new URL (imgErr1);
        let URLimgErr2 = new URL (imgErr2);
        let URLimgErr3= new URL (imgErr3);*/
    

        // ajeitar isso aqui
      /*  try {

            URLimgCerta= new URL (imgCerta);
            URLimgErr1= new URL (imgErr1);
            URLimgErr2= new URL (imgErr2);
            URLimgErr3= new URL (imgErr3);
               
            } catch (error) {
                
            }
        */

        ObjPerguntas={
			title: textoPergunta,
			color: corDeFundo,
			answers: [
				{
					text: respCerta,
					image:URLimgCerta,
					isCorrectAnswer: true
				},
				{
					text: respErr1,
					image: URLimgErr1,
					isCorrectAnswer: false
				},
                {
					text: respErr2,
					image: URLimgErr2,
					isCorrectAnswer: false
				},
                {
					text: respErr3,
					image: URLimgErr3,
					isCorrectAnswer: false
				}
			]
           
		}
       
    if(textoPergunta.length>=20 && corDeFundo[0]==="#" && corDeFundo.length===7 &&  corDeFundo.match(/[0-9A-Fa-f]{6}/g) && respErr1!="" && respErr2 !="" && respErr3!="" && respCerta!="" && URLimgCerta && URLimgErr1 && URLimgErr2 && URLimgErr3){
         if(dadosPerguntas.includes(ObjPerguntas)){
            console.log("já incluso")
         }else{
            dadosPerguntas.push(ObjPerguntas);
            console.log(dadosPerguntas);
            console.log(dadosPerguntas.length);
            if(dadosPerguntas.length==qtdPerguntas){    
                d10.classList.remove("esconder");         
                d9.classList.add("esconder");
            }
         }

    }else{
        alert("Para continuar os campos não devem estar vazios, o texto da pergunta deve ter no mínimo 20 caracteres, a cor precisa ser no formato hexadecimal e as imagens no formato de URL");
    } 
}  
}

/********************************************************    NIVEIS     *******************************************************/


let selecionadoNiveis;
let dadosNiveis=[];

//tirar esse gerar dps
gerarNiveis();
function gerarNiveis(){
    for (i=0; i<qtdNiveis;i++){
        NiveisFechados=`<div class"editar"><div class="quadros"><h4 class="h4-desktop-8a11"> Nível ${i+1}</h4><img class="icone-escrever" onclick="clickNiveis(this)" src="./imagens/escrever.png"></div>
        <div class="esconder nivel-${i+1}">
        <h4 class="h4-desktop-8a11">Nível ${i+1}</h4>
        
        <input type="text" placeholder="Título do nível" class="titulo-nivel"/>
        <input type="text" placeholder="% de acerto mínima" class="porcentagem"/>
        <input type="text" placeholder="URL da imagem do nível" class="URL-img-nivel"/>
        <input type="text" placeholder=" Descrição do nível" class="descricao"/>
     </div></div> `
        desktop10.innerHTML+=NiveisFechados;
    }
    desktop10.innerHTML+= `<button class="botao-desktop" onclick="finalizarQuiz()" ><h5 class="h5-desktop-8a11">Finalizar Quizz</h5></button>`
}
let arr=[];
function clickNiveis(el){   
    selecionadoNiveis = document.querySelector(".desktop-10 .selecionadoNiveis");
    if(selecionadoNiveis){
        selecionadoNiveis.querySelector(".esconder").classList.add("quadros");
        selecionadoNiveis.querySelector(".quadros").classList.remove("esconder");
        selecionadoNiveis.querySelector(".box-10").classList.add("esconder");
        selecionadoNiveis.querySelector(".esconder").classList.remove("box-10");
        selecionadoNiveis.classList.remove("selecionadoNiveis");
    }
    el.parentNode.parentNode.classList.add("selecionadoNiveis");
    el.parentNode.parentNode.querySelector(".esconder").classList.add("box-10");
    el.parentNode.parentNode.querySelector(".box-10").classList.remove("esconder");
    el.parentNode.classList.add("esconder");
    el.parentNode.classList.remove("quadros");
}
let comparador=[];


function finalizarQuiz(){

    for(let i=1;i<=qtdNiveis;i++){

        let niveis=document.querySelector(`.nivel-${i}`);

        let tituloNivel=niveis.querySelector(".titulo-nivel").value;
        let porcentagem=niveis.querySelector(".porcentagem").value;
        let imgNivel=niveis.querySelector(".URL-img-nivel").value;
        let descricao=niveis.querySelector(".descricao").value;*/

       /* try {
           
        } catch (error) {
            
        }*/
        let URLimgNivel= new URL (imgNivel);

        ObjNiveis={
			title: tituloNivel,
			image: URLimgNivel,
			text: descricao,
			minValue: porcentagem
        }
        comparador.push(porcentagem); // executado com dois clicks (consertar isso);
        if(tituloNivel.length>=10 && porcentagem!="" && porcentagem>=0 && porcentagem<=100 && descricao.length>=30 && URLimgNivel && comparador.includes("0")){

            if(arr.includes(niveis)){
                console.log("já incluso");
                
             }else{
                arr.push(niveis);
                dadosNiveis.push(ObjNiveis)
                console.log(dadosNiveis);

                if(dadosNiveis.length==qtdNiveis){    
                    d10.classList.add("esconder");
                    d11.classList.remove("esconder");
                    PostQuizz();
                }
             }

         }else{
            alert("O Título do nível deve ter no mínimo 10 caracteres, a porcentagem deve ser de 0-100, pelo menos uma das porcentagens mínimas deve ser =0, a imagem deve ser no formato de URL e a descrição deve ter no mínimo 30 caracteres!!")
         }
    }
}

let ObjFinal;
let idFin;
let titleFin;
let imageFin;

function PostQuizz(){
    ObjFinal={
        title: tituloQuiz,
        image: URLimg,
        questions: dadosPerguntas,
        levels: dadosNiveis
    }

    let promessa=axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes",ObjFinal);
    promessa.then(VerObjeto);
   // promessa.catch();
}


function VerObjeto(resposta){
    console.log(resposta);
    idFin=resposta.data.id;
    titleFin=resposta.data.title;
    imageFin=resposta.data.image;
    PegarQuizFeito();
}
//let idFin=9436;
//PegarQuizFeito();
function  PegarQuizFeito(){
    let promessa= axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${idFin}`)
    promessa.then(chamarQuiz);  
}
function chamarQuiz(resposta){
    console.log(resposta);
    let carregarQuiz=`<img class="imagem-do-quizz" src="${resposta.data.image}"/><h3 class="h3-escrita-da-img">${resposta.data.title}</h3>
    <button class="botao-acessar-quizz"><h5 class="h5-desktop-8a11" >Acessar Quizz</h5></button>
    <div class="voltar-pra-home"><h4 class="voltar-pra-home">Voltar pra home</h4></div>`;
    desktop11.innerHTML+= carregarQuiz;
}
