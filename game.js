// constant variables
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");
const canvasSize = 600;

const snakeBox = 20;
const totalMoves = canvasSize/snakeBox;

// setting the canvas size --
canvas.width = canvasSize;
canvas.height = canvasSize;

// setting the image for food --
const apple = new Image();
apple.src = './assets/images/apple.png';

// Audios --
let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let down = new Audio();
let left = new Audio();
let right = new Audio();

// path for audios --
dead.src = './assets/audio/dead.mp3'
eat.src = './assets/audio/eat.mp3'
up.src = './assets/audio/up.mp3'
down.src = './assets/audio/down.mp3'
left.src = './assets/audio/left.mp3'
right.src = './assets/audio/right.mp3'

// define snake
let snake = [];
snake[0] = {
    x : 9 *  snakeBox,
    y : 10 * snakeBox
};

// define food
let food ={};
getFood();

// score
let score = 0;      

// snake direction
let dir = '';

document.addEventListener("keydown",direction);


// setting keys for game
function direction(){
    let key = event.keyCode;

    if(key==37 && dir != 'RIGHT'){
        dir = 'LEFT'
        left.play();
    }

    else if(key == 38 &&  dir != 'DOWN'){
        dir = 'UP'
        up.play();
    }

    else if (key == 39 && dir != 'LEFT'){
        dir = 'RIGHT'
        right.play();
    }

    else if(key == 40 && dir != 'UP'){
        dir = 'DOWN'
        down.play();
    }
}

// random position for food --
function getFood(){
    food = {
        x: Math.floor( Math.random()*(totalMoves-2-3) +3 )*snakeBox,
        y: Math.floor( Math.random()*(totalMoves-2-3) +3 )*snakeBox
    }
}


// if snake bumbs into itself --
function collisionDetection(head,ar){
    for(i=0;i<ar.length;++i){
        if(ar[i].x == head.x && ar[i].y == head.y){
            return true;
        }
    }
    return false;
}

// user interface --
function render(){

    ctx.fillStyle="#dcdcdc"; // canvas color
    ctx.fillRect(0,0,canvasSize,canvasSize);


    // snake color -- 
    for(let i=0;i<snake.length;++i){
        ctx.fillStyle = i == 0? '#4caf50' : 'white';
        ctx.fillRect(snake[i].x,snake[i].y,snakeBox,snakeBox);

        ctx.strokeStyle = '#e91e63';
        ctx.strokeRect(snake[i].x,snake[i].y,snakeBox,snakeBox)
    }

    // presenting the food --
    ctx.drawImage(apple,food.x,food.y,snakeBox,snakeBox);


    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // determining the movement of snake
    if(dir == 'LEFT') snakeX -= snakeBox;
    if(dir == 'RIGHT') snakeX += snakeBox;
    if(dir == 'UP') snakeY -= snakeBox;
    if(dir == 'DOWN') snakeY += snakeBox;


    // if snake eats food
    if(snakeX == food.x && snakeY == food.y){
        score++;
        eat.play();

        getFood();
    } else {
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };


    // conditions to get gameover --
    if(snakeX<0 || snakeX>=canvasSize || snakeY<0 || snakeY>=canvasSize || collisionDetection(newHead,snake)){
        gameOver();
        return
    }

    snake.unshift(newHead); // UNSHIFT -- popping the head and shifiting to the zeroth position

    ctx.fillStyle = 'black';
    ctx.font = '40px tahoma';
    ctx.fillText(score,10,40)
}

render();

var intervel = setInterval(render,100);

function gameOver(){
    clearInterval(intervel);
    dead.play();

    ctx.fillStyle = "black";
    ctx.font = "40px tahoma"
    ctx.fillText('Game Over!', canvasSize/2-100,canvasSize/2)
}






