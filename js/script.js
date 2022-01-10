// CONSTANTES QUE SELECIONAM CLASSES DO CSS
const D2 = document.querySelector('.macuxibattleD2');
const BACKGROUND = document.querySelector('.background');

// VARIAIS
let isJumping = false;
let isGameOver = false;
let position = 0;
var ponts = 0;

// FUNÇÕES DE SOM 

let Click = () => {
  const audioClick = new Audio('sounds/click.mp3');
  audioClick.play();
}
let Pulou = () => {
  const audioPulou = new Audio('sounds/pulou.wav');
  audioPulou.play();
}
let Morreu = () => {
  const audioMorreu = new Audio('sounds/morreu.mp3');
  audioMorreu.play();
}


// PRINCIPAIS FUNÇÕES: -----------------------------------------------> 

// Verificando teclas pressionadas (Barra de Espaço)
function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
      Pulou();
    }
  }
}

// Fazer O Macuxi 2D pular:
function jump() {
  isJumping = true;

// Intervalo enquanto for maior ou igual a 150
  let upInterval = setInterval(() => {
    if (position >= 150) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          D2.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      // Subindo
      position += 20;
      D2.style.bottom = position + 'px';
    }
  }, 20);
}

function createBala() {
  const bala = document.createElement('div');
  let balaPosition = 1800; //1000
  let randomTime = Math.random() * 6000; // 6000;

  if (isGameOver) return;

  bala.classList.add('bala');
  BACKGROUND.appendChild(bala);
  bala.style.left = balaPosition + 'px';

  let leftTimer = setInterval(() => {
    if (balaPosition < -60) {
      // Saiu da tela
      clearInterval(leftTimer);
      BACKGROUND.removeChild(bala);
      // Contador de Pontos:
      ponts++;
      console.log(ponts);

    } else if (balaPosition > 0 && balaPosition < 60 && position < 60) {
      // Game over
      clearInterval(leftTimer);
      isGameOver = true;
      document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1><h2 class="ponts"> Você fez '+ ponts +' pontos.</h2><br><a class="game-over-btn" href="macuxi-battle-d2.html">Jogar Novamente!</a><div class="batlle-2d"><img src="image/D2.png"><br><h3>Macuxi Battle 2d 1.0</h3><br>by Dalmo Mendes<br>Github.com/DalmoMendes<br>dalmosilvamendes@gmail.com<br>Site:ceproirr.com.br</div>';
      document.body.style="background-color: red";
      Morreu();
    } else {
      balaPosition -= 10;
      bala.style.left = balaPosition + 'px';
    }
  }, 20);

  setTimeout(createBala, randomTime);
}

createBala();
document.addEventListener('keyup', handleKeyUp);
