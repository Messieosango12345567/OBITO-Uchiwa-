const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
const scoreEl = document.getElementById("score")
const up = document.getElementById("up")
const left = document.getElementById("left")
const right = document.getElementById("right")
const down = document.getElementById("down")
const restart = document.getElementById("restart")
const play = document.getElementById("play")
const pause = document.getElementById("pause")
const darkmode = document.getElementById("darkmode")
const showsett = document.getElementById("showsett")
const highScoreEl = document.getElementById("highscore")
const body = document.getElementById("body")
const h2 = document.getElementById("h2")
const levelEl = document.getElementById("level")
const help = document.getElementById("help")
const showHelp = document.getElementById("showhelp")
const cWidth = canvas.width;
const cHeight = canvas.height;
const l1 = 2
const l2 = 5
const l3 = 10
const l4 = 15
const l5 = 20
let level = l1
levelEl.addEventListener("change", () =>{
switch(true) {
case levelEl.value == 1:
level = l1
break;
case levelEl.value == 2:
level = l2
break;
case levelEl.value == 3:
level = l3
break;
case levelEl.value == 4:
level = l4
break;
case levelEl.value == 5:
level = l5
break; 
}
})
let cBgStroke
let cBackground
let snakeColor
let foodColor
let stroke
let headColor
let unitSize = 15
let running
let pauseGame = false
let xV = 0
let yV = -unitSize
let foodX;
let foodY;
let score = 0
let hScore = localStorage.getItem("high-score") || 0
let snake = [
{x: 11 * unitSize, y: 19 * unitSize},
{x: 11 * unitSize, y: 20 * unitSize},
{x: 11 * unitSize, y: 21 * unitSize},
]

let goRightx = false
let goLeftx = false
let goDownx = false
let goUpx = true

up.addEventListener("click", function(){
if (goRightx === true || goLeftx === true) {
	xV = 0
	yV = -unitSize
	goUpx = true
	goLeftx = false
	goRightx = false
	goDownx = false	
}});

down.addEventListener("click", function(){
if (goRightx === true || goLeftx === true) {
	xV = 0
	yV = unitSize
	goDownx = true
	goUpx = false
	goLeftx = false
	goRightx = false
}});


left.addEventListener("click", function(){
if (goUpx === true || goDownx === true) {
	xV = -unitSize
	yV = 0
	goLeftx = true
	goRightx = false
	goDownx = false
	goUpx = false
}});

right.addEventListener("click", function(){
if (goUpx === true || goDownx === true) {
	xV = unitSize
	yV = 0
	goRightx = true
	goLeftx = false
	goDownx = false
	goUpx = false
}});

pause.addEventListener("click", function() {
if (running === true) {
	pauseGame = true
	
}});

play.addEventListener("click", function(){
if (pauseGame === true){
pauseGame = false
newTick()
}});

function gameStart(){
    running = true
	createFood();
	newTick();
};

function newTick(){
	if (running === true && pauseGame === false) {
	setTimeout(() => {	
	clearBoard()
	drawFood()
	drawSnake()
	moveSnake()
	gameOver()
	newTick()
	}, 1000/level) 
	}	else if (pauseGame === true) {
	if (darkmode.checked) {
	ctx.font = "50px MV Boli";
	ctx.fillStyle = "white";
	ctx.textAlign ="center";
	ctx.fillText("|| PAUSED ||", cWidth / 2, cHeight / 2)
	} else {
	ctx.font = "50px MV Boli";
	ctx.fillStyle = "black";
	ctx.textAlign ="center";
	ctx.fillText("|| PAUSED ||", cWidth / 2, cHeight / 2)
		}
	} else {
		displayGameOver()
	}
	if (darkmode.checked) {
	cBackground = "black"
	snakeColor = "white"
	foodColor = "orange"
	stroke = "gray"
	headColor = "lightgreen"
	scoreEl.classList.add("darkscore")
	canvas.classList.add("canvasdark")
	highScoreEl.classList.add("darkHighScore")
	body.classList.add("bodydark")
	up.classList.add("pdark")
	right.classList.add("pdark")
	left.classList.add("pdark")
	down.classList.add("pdark")
	play.classList.add("darkplay")
	h2.classList.add("h2dark")
	restart.classList.add("restartdark")
	pause.classList.add("pausedark")
	settings.classList.add("darksettings")
	help.classList.add("darkhelp")
	} 
	else {
	cBackground = "white"
	snakeColor = "lightgreen"
	foodColor = "red"
	stroke = "black"
	headColor = "white"
	scoreEl.classList.remove("darkscore")
	canvas.classList.remove("canvasdark")
	highScoreEl.classList.remove("darkHighScore")
	body.classList.remove("bodydark")
	up.classList.remove("pdark")
	down.classList.remove("pdark")
	left.classList.remove("pdark")
	play.classList.remove("darkplay")
	right.classList.remove("pdark")
	h2.classList.remove("h2dark")
	restart.classList.remove("restartdark")
	pause.classList.remove("pausedark")
	settings.classList.remove("darksettings")
	help.classList.remove("darkhelp")
		}
};

function clearBoard(){
	ctx.fillStyle = cBackground
	ctx.fillRect(0,0,cWidth,cHeight)
};

function createFood(){
	foodX = Math.floor(Math.random() * cWidth / unitSize) * unitSize
	foodY = Math.floor(Math.random() * cHeight / unitSize) * unitSize	
	while (
	snake.some((unitSize) => unitSize.x === foodX && unitSize.y === foodY)) {
	createFood()
}};

function drawFood(){
	ctx.fillStyle = foodColor;
	ctx.fillRect(foodX, foodY, unitSize, unitSize)
	ctx.strokeStyle = stroke
	ctx.strokeRect(foodX, foodY, unitSize, unitSize)
}

function drawSnake(){
	ctx.fillStyle = snakeColor;
	ctx.strokeStyle = stroke;
	snake.forEach(snakePart => {
	ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize)
	ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize)
})};

function moveSnake(){
	const head = {x: snake[0].x + xV, y: snake[0].y + yV}
	ctx.fillStyle = headColor
	ctx.strokeStyle = stroke
	ctx.fillRect(head.x, head.y, unitSize, unitSize)
	ctx.strokeRect(head.x, head.y, unitSize, unitSize)	
	snake.unshift(head)
	if (snake[0].x == foodX && snake[0].y == foodY) {
	if(levelEl.value == 1) {
	score++
	}
	else if(levelEl.value == 2) {
	score+=2
	}
	else if(levelEl.value == 3) {
	score+=5
	}
	else if(levelEl.value == 4) {
	score+=7
	}
	else if(levelEl.value == 5) {
	score+=10
	}
	
	scoreEl.textContent = `⭐ ${score}`
	createFood()
}
	else {
	snake.pop()
	}
};

function gameOver(){
	if (snake[0].x < 0 || snake[0].y < 0
	|| snake[0].x >= cWidth || snake[0].y >= cHeight)
	 {
	running = false }
	for (let i = 1; i < snake.length; i++) {
	if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
	running = false
		}
	}
	localStorage.setItem("high-score", hScore)
	hScore = Math.max(score, hScore)
	highScoreEl.innerHTML = `🏆 ${hScore}`
};

function displayGameOver(){
	ctx.font = "50px MV Boli";
	ctx.fillStyle = "red";
	ctx.textAlign ="center";
	ctx.fillText("GAME OVER!", cWidth / 2, cHeight / 2)
};

restart.addEventListener("click", function(){
	if (running === false) {
	score = 0
	scoreEl.textContent = `⭐ ${score}`
	xV = 0
	yV = -unitSize
	snake = [ 
{x: 11 * unitSize, y: 19 * unitSize},
{x: 11 * unitSize, y: 20 * unitSize},
{x: 11 * unitSize, y: 21 * unitSize},
	]
	gameStart()
	 goRightx = false
	 goLeftx = false
	 goDownx = false
	 goUpx = true
}});

function showSettings(){
	showsett.classList.add("open-settings")
	pauseGame = true
};

function closeSettings(){
	showsett.classList.remove("open-settings")
	pauseGame = false
	newTick()
};

function openHelp(){
	showHelp.classList.add("open-help")
	pauseGame = true
}

function closeHelp(){
	showHelp.classList.remove("open-help")
		pauseGame = false
		newTick()	
}
gameStart()
