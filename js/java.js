// scripts/java.js

// Obtém o canvas e o contexto
var canvas = document.getElementById('backgroundCanvas');
var context = canvas.getContext('2d');

// Função para ajustar o tamanho do canvas
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// Ajusta o tamanho do canvas inicialmente e em caso de redimensionamento
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Inicializa as variáveis
var maxx = canvas.width;
var maxy = canvas.height;
var halfx = maxx / 2;
var halfy = maxy / 2;
var dotCount = 30;
var dots = [];

// Cria os pontos
for (var i = 0; i < dotCount; i++) {
  dots.push(new dot());
}

// Função de renderização
function render() {
  // Criar um gradiente linear da esquina superior esquerda para a inferior direita
  var gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  
  // Adicionar cores ao gradiente
  gradient.addColorStop(0, "#000000"); // Preto no início
  gradient.addColorStop(0.5, "#2C0000"); // Vermelho escuro no meio
  gradient.addColorStop(1, "#600000"); // Vermelho no final

  // Definir o gradiente como o fundo
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height); // Preencher o fundo com o gradiente

  // Desenhar e mover os pontos
  for (var i = 0; i < dotCount; i++) {
    dots[i].draw();
    dots[i].move();
  }
  
  // Continuar a animação
  requestAnimationFrame(render);
}




// Classe dot
function dot() {
  this.rad_x = 2 * Math.random() * halfx + 1;
  this.rad_y = 1.2 * Math.random() * halfy + 1;
  this.alpha = Math.random() * 360 + 1;
  this.speed = Math.random() * 100 < 50 ? 1 : -1;
  this.speed *= 0.05;
  this.size = Math.random() * 5 + 1;
  this.color = 255; // Cor vermelha
}

// Desenho do ponto
dot.prototype.draw = function() {
  var dx = halfx + this.rad_x * Math.cos(this.alpha / 180 * Math.PI);
  var dy = halfy + this.rad_y * Math.sin(this.alpha / 180 * Math.PI);
  context.fillStyle = "rgb(" + this.color + ",0,0)"; // Vermelho
  context.beginPath();
  context.arc(dx, dy, this.size / 2, 0, Math.PI * 2, false);
  context.fill();
};

// Movimento do ponto
dot.prototype.move = function() {
  this.alpha += this.speed;
};

// Inicia a animação
render();
