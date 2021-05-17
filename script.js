'use strict';

const display = document.getElementById ('display'); //gravando o display em uma variavel
const numeros = document.querySelectorAll ('[id *=tecla]'); //ta pegando todos os ids que possui a palavra tecla, faz isso colocando o * antes do =
const operadores = document.querySelectorAll ('[id *=operador]');

let novoNumero = true;
let operador;
let numeroAnterior;

const operacaoPendente = () => operador !== undefined;

const calcular = () => {
    if (operacaoPendente()) {
        const numeroAtual = parseFloat(display.textContent.replace(',','.'));
        novoNumero = true;
        const resultado = eval (`${numeroAnterior}${operador}${numeroAtual}`);
        atualizarDisplay(resultado);

        // if (operador == '+') {
            
        //     atualizarDisplay(numeroAnterior + numeroAtual);
        // }else if (operador == '-') {
        //     atualizarDisplay(numeroAnterior - numeroAtual);
        // }else if (operador == '*') {
        //     atualizarDisplay(numeroAnterior * numeroAtual);
        // }else if (operador == '/') {
        //     atualizarDisplay(numeroAnterior / numeroAtual);
        // }
    }
}

const atualizarDisplay = (texto) => {
    if (novoNumero){
        display.textContent = texto.toLocaleString('BR');  //se for um numero novo, vai substitui no display e nao concatenar, ai joga pra false dps
        novoNumero = false; //no evento de click dos operadores vai jogar pra true de novo pra quando for clicar no numero substituir 
    } else {

        display.textContent += texto; //se não for um novo numero vai concatenar
    }
    
} //o += vai concatenar os números no display, ou seja, vai colocando um do lado do outro ao inves de apagar um e colocar outro

const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent); //(evento) é uma arrow, ou seja, vai disparar isso. Target e textContent é pra pegar o texto da tecla

//criando o evento para cada tecla, pra capturar o clique:

numeros.forEach (numero =>
    numero.addEventListener('click', inserirNumero) //pega um numero e adiciona a cada numero um evento, que é o inserirNumero
    );

const selecionarOperador = (evento) => {
  if(!novoNumero) { //so vai realizar o que ta dentro se não for um numero novo (!)
    calcular();
    novoNumero = true; //quando clicar no operador vai jogar essa const prs true
    operador = evento.target.textContent; //vai gravar o operador na variavel
    numeroAnterior = parseFloat(display.textContent.replace(',','.')); //vai gravar os nº nessa variavel pra realizar o calculo dps
   
 }
}
  

operadores.forEach (operador => operador.addEventListener('click', selecionarOperador));

const ativarIgual = () => {
    calcular();
    operador = undefined;
}
document.getElementById('igual').addEventListener('click', ativarIgual);

const limparDisplay = () => display.textContent = '';
document.getElementById('limparDisplay').addEventListener('click', limparDisplay); //limpa somente o que ta no display, deixando guardado o resto 

const limparCalculo = () => {
    limparDisplay();
    operador = undefined;
    novoNumero = undefined;
    numeroAnterior = undefined;
} //ta zerando tudo
document.getElementById('limparCalculo').addEventListener('click', limparCalculo);

const removerUltimoNumero = () => display.textContent = display.textContent.slice(0, -1);
document.getElementById('backspace').addEventListener('click', removerUltimoNumero);

const inverterSinal = () => {
    novoNumero = true;
    atualizarDisplay(display.textContent * -1);
}
document.getElementById('inverter').addEventListener('click', inverterSinal);

const existeDecimal = () => display.textContent.indexOf(',') !== -1;
const existeValor = () => display.textContent.length > 0;
const inserirDecimal = () => {
    if (!existeDecimal()){
        if (existeValor()){
            atualizarDisplay(',');
        }else {
            atualizarDisplay('0,');
        }
    }
}
document.getElementById('decimal').addEventListener('click', inserirDecimal)

const mapaTeclado = {
    '0' : 'tecla0',
    '1' : 'tecla1',
    '2' : 'tecla2',
    '3' : 'tecla3',
    '4' : 'tecla4',
    '5' : 'tecla5',
    '6' : 'tecla6',
    '7' : 'tecla7',
    '8' : 'tecla8',
    '9' : 'tecla9',
    '/' : 'operadorDividir',
    '*' : 'operadorMultiplicar',
    '+' : 'operadorAdicionar',
    '-' : 'operadorSubtrair',
    '=' : 'igual',
    'Enter' : 'igual',
    'Backsapce' : 'backspace',
    'c' : 'limparDisplay',
    'Escape' : 'limparCalculo',
    ',' : 'decimal'
}

const mapearTeclado = (evento) => {
    const tecla = evento.key;
    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1;
    if (teclaPermitida()) document.getElementById(mapaTeclado[tecla]).click();

}

document.addEventListener('keydown', mapearTeclado);