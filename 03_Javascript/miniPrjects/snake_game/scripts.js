const canvas = document.querySelector(".canv");
const ctx = canvas.getContext("2d");
console.log(ctx);
//dividing  the canvas in to 10 by 10 px
const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

let snake = [];
snake[0] = {
    x: (Math.floor(Math.random() * columns)) * scale,
    y: (Math.floor(Math.random() * rows)) * scale
}
let food = {
    x: (Math.floor(Math.random() * columns)) * scale,
    y: (Math.floor(Math.random() * rows)) * scale
}
//calling drow function

let d = "right";
document.onkeydown = direction;
function direction(event) {
    let key = event.keyCode;
    if (key == 37 && d != "right") {
        d = "left";

    }
    else if (key == 38 && d != "down") {
        d = "up";
    }
    else if (key == 39 && d != "left") {
        d = "right";
    }
    else if (key == 40 && d != "up") {
        d = "down"
    }
}
let playGame = setInterval(draw, 200);
function checkeatSelf(head, array) {
    for (let i = 0; i <= array.lenght; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
        else return false;

    }

}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = "black";
        ctx.strokeStyle = "white";
        ctx.fillRect(snake[i].x, snake[i].y, scale, scale);
        ctx.strokeRect(snake[i].x, snake[i].y, scale, scale);
    }

    //food 

    ctx.fillStyle = "gold";
    ctx.strokeStyle = "white";
    ctx.fillRect(food.x, food.y, scale, scale);
    ctx.strokeRect(food.x, food.y, scale, scale);


    // old position
    let snakex = snake[0].x;
    let snakey = snake[0].y;
    //trun in direction
    if (d == "left") snakex -= scale;
    if (d == "up") snakey -= scale;
    if (d == "down") snakey += scale;
    if (d == "right") snakex += scale;

    if (snakex > canvas.width) snakex = 0;
    if (snakey > canvas.height) snakey = 0;
    if (snakex < 0) snakex = canvas.width;
    if (snakey < 0) snakey = canvas.height;
    let newHead = {
        x: snakex,
        y: snakey
    }
    if (checkeatSelf(newHead, snake)) {
        clearInterval(playGame);
        alert("game over");
    }

    if (snakex == food.x && snakey == food.y) {

        food = {
            x: (Math.floor(Math.random() * columns)) * scale,
            y: (Math.floor(Math.random() * rows)) * scale
        }
    }
    else {
        snake.pop();
    }

    snake.unshift(newHead);

}
//check wether the eat it self


