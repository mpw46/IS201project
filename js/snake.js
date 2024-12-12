const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const gridWidth = canvas.width / gridSize;
const gridHeight = canvas.height / gridSize;

let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let dx = 1; // Initial direction (right)
let dy = 0;
let score = 0;

// Load the chocolate bar image
const chocolateImage = new Image();
chocolateImage.src = 'chocolate_bar.png';

function gameLoop() {
  update();
  draw();
}

function update() {
  // Move the snake
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  // Check for food
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = generateFood();
  } else {
    snake.pop(); // Remove tail if no food
  }

  // Check for collisions
  if (
    head.x < 0 ||
    head.x >= gridWidth ||
    head.y < 0 ||
    head.y >= gridHeight ||
    checkSelfCollision(head)
  ) {
    alert('Game Over! Score: ' + score);
    resetGame();
  }
}

function checkSelfCollision(head) {
  return snake.slice(1).some(part => part.x === head.x && part.y === head.y);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  drawFood();
}

function drawSnake() {
  snake.forEach(part => {
    ctx.fillStyle = 'green';
    ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize, gridSize);
  });
}

function drawFood() {
  ctx.drawImage(chocolateImage, food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

function generateFood() {
  return {
    x: Math.floor(Math.random() * gridWidth),
    y: Math.floor(Math.random() * gridHeight),
  };
}

function resetGame() {
  snake = [{ x: 10, y: 10 }];
  food = generateFood();
  dx = 1;
  dy = 0;
  score = 0;
}

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      if (dy !== 1) { dx = 0; dy = -1; }
      break;
    case 'ArrowDown':
      if (dy !== -1) { dx = 0; dy = 1; }
      break;
    case 'ArrowLeft':
      if (dx !== 1) { dx = -1; dy = 0; }
      break;
    case 'ArrowRight':
      if (dx !== -1) { dx = 1; dy = 0; }
      break;
  }
});

// Start game loop after the image has loaded
chocolateImage.onload = () => {
  setInterval(gameLoop, 100);
};