"use strict";
/*
TODO:
1. Make on key hold element to accelerate
2. Sometimes next element don't show up on the screen. related to gameover related to pause as well

6. tidy up the code
 */
let squareWidth = 30;
let width = 480;
let height = 600;
let boardColor = 20;
let fr = 60;
let speed = 600;
let maxScore = 0;
let game;
let offset = 0;

function setup() {
	frameRate(fr);
	let gameCanvas = createCanvas(width, height);
    gameCanvas.parent("game");
	game = new Game({speed: speed});
}

function draw() {
	clear();
	background(220);
	game.run();
	drawPoints(game.points, game.maxScore);
}

function keyPressed() {
	nav();
}

/**
 * Navigation
 */
function nav() {
	//reset game
	if (keyIsDown(27)) { //esc
		game = new Game({speed: speed});
	}
	//pause game
	if (keyIsDown(32)) { //space
		game.pause();
	}
	//if it's paused don't allow movements
	if (game.paused) {
		return false;
	}
	//rotate
	if (keyIsDown(UP_ARROW)) {
		game.element.rotate();
	}
	//move left
	if (keyIsDown(LEFT_ARROW)) {
		game.element.move(-1);
	}
	//move fown
	if (keyIsDown(RIGHT_ARROW)) {
		game.element.move(1);
	}
	//accelerate down
	if (keyIsDown(DOWN_ARROW)) {
		game.element.down();
	}
	return false;
}

function drawPosition(x, y, color = null) {
	if (!color) {
		fill(boardColor);
	} else {
		fill(color);
	}
	rect(offset + x * squareWidth, y * squareWidth, squareWidth, squareWidth);
}

function drawPoints(points) {
	textSize(32);
	textFont('Orbitron');
	fill('black');
	text('points:', 330, 180);
	text(points, 330, 230);
	text('max:', 330, 280);
	text(maxScore, 330, 320);
}

function drawGameOver() {
	textSize(32);
	textFont('Orbitron');
	fill('red');
	stroke('black');
	text('GAME OVER', 38, 180);
}