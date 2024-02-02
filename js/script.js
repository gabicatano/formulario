import { salvarDados } from "./salva-dados.js";

let botaoCEP = document.querySelector("#floatingCEP");
let botaoEmail = document.querySelector("#floatingEmail");
let botaoBairro = document.querySelector("#floatingBairro");
let botaoRua = document.querySelector("#floatingRua");
let botaoNumero = document.querySelector("#floatingNumero");
let botaoComplemento = document.querySelector("#floatingComplemento");
let botaoNome = document.querySelector("#floatingNome");
let botaoCidade = document.querySelector("#floatingCidade");
let botaoEstado = document.querySelector("#floatingEstado");
let botaoEnviar = document.querySelector("#botao");
let erroEmail = document.querySelector("#span-email");
let erroCEP = document.querySelector("#span-cep");

// verifica email

function verificaEmail(){
    var emailDigitado = botaoEmail.value
    const regexEmail = /\S+@\S+\.\S+/

    if(!emailDigitado.match(regexEmail)){
        erroEmail.innerHTML = `Email inválido! Digite um email válido!`;
        return false;
    } else {
        erroEmail.innerHTML = ``;
        return true;
    }
}

// valida CEP

function validaCEP(){
    let cepDigitado = botaoCEP.value;
    const regexCEP = /^[0-9]{8}$/;

    if(cepDigitado.length !== 8 || !cepDigitado.match(regexCEP)){
        erroCEP.innerHTML = `CEP inválido! Digite um CEP válido!`;
        return false;
    } else {
        erroCEP.innerHTML = ``;
        return true;
    }
}

// function cepExiste(){
//     let logradouro = botaoRua.value;

//     if(logradouro == 'undefined'){
//         erroCEP.innerHTML = `Esse CEP não existe!`;
//         return false;
//     } else {
//         return true;
//     }
// }

// chama a API

async function chamaAPI(){
    let cepDigitado = botaoCEP.value;

    try{
        await fetch(`https://viacep.com.br/ws/${cepDigitado}/json`)
        .then(response => response.json())
        .then(function(data){
            botaoBairro.value = `${data.bairro}`;
            botaoRua.value = `${data.logradouro}`;
            botaoCidade.value = `${data.localidade}`;
            botaoEstado.value = `${data.uf}`;

            if(botaoRua.value == 'undefined'){
                erroCEP.innerHTML = `Esse CEP não existe! Digite um CEP válido!`
            }
        })
        return true;
    }

    catch {
         console.log("Erro ao conectar com a API CEP!")
    } 
}

// verifica o CEP

function verificaCEP(){
    if(validaCEP() == true){
        chamaAPI();
    }
}

// limpa o formulário

function limpaFormulario() {
    botaoBairro.value = "";
    botaoRua.value = "";
    botaoCidade.value = "";
    botaoEstado.value = "";
    botaoNome.value = "";
    botaoNumero.value = "";
    botaoComplemento.value = "";
    botaoEmail.value = "";
    botaoCEP.value = "";
}

// envia e verifica os dados

function enviaDados(){
    if(verificaEmail() == true && validaCEP() == true){
        salvarDados();
        limpaFormulario();
    }
}

botaoCEP.addEventListener("input", validaCEP);
botaoEmail.addEventListener("input", verificaEmail);
botaoRua.addEventListener("click", verificaCEP);
botaoEnviar.addEventListener("click", enviaDados);