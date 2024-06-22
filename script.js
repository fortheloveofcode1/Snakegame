let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('food.wav');
const gameOver = new Audio('gameover.mp3');
const moveSound = new Audio('move.wav');
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }]
food = { x: 6, y: 7 }


//functions for game
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;

    }
    lastPaintTime = ctime;
    gameEngine();

}
function isCollide(snake) {
    //snake colliding to self
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    if (snake[0].x >= 18 || snake[0].x < 0 || snake[0].y >= 18 || snake[0].y < 0) {

        return true;

    }
}


function gameEngine() {
    //update the snake array and food
    if (isCollide(snakeArr)) {
        gameOver.play();
        inputDir = { x: 0, y: 0 };
        alert("Game Over,press any Key to play");
        snakeArr = [{ x: 13, y: 15 }];
        score = 0;

    }
    //eaten food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
        foodSound.play();
        score += 1;
        scoreBox.innerHTML = "Score : " + score
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem('hiscore', JSON.stringify(hiscoreval));
            highscoreBox.innerHTML = "High score : " + hiscoreval;
        }

        let a = 2;
        let b = 17;
        //generate food in random order 
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }

    }

    //Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] }
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    //display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);

    });

    //display the food

    FoodElement = document.createElement('div');
    FoodElement.style.gridRowStart = food.y;
    FoodElement.style.gridColumnStart = food.x;
    FoodElement.classList.add('food');
    board.appendChild(FoodElement);

}





//logic
let hiscore = localStorage.getItem('hiscore');
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem('hiscore', JSON.stringify(hiscoreval));
}
else {
    hiscoreval = JSON.parse(hiscore);
    highscoreBox.innerHTML = "High Score: " + hiscore
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }
    moveSound.play();
    switch (e.key) {
        case 'ArrowUp':
            inputDir.y = -1;
            inputDir.x = 0;
            break;
        case 'ArrowDown':
            inputDir.y = 1;
            inputDir.x = 0;
            break;
        case 'ArrowLeft':
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case 'ArrowRight':
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    }

});


