"use strict";

class Game {
	board;
	element;
	nextElement;
	interval;
	paused = false;
	speed = 600;
	points = 0;

	constructor(options) {
		this.board = new Board();
		this.options = options;
		this.element = new Element({board: this.board});
		this.nextElement = new Element({board: this.board});
		if (typeof this.options !== 'undefined' && typeof this.options.speed !== 'undefined') {
			this.speed = this.options.speed;
		}
		this.start();
	}

	/**
	 * Pause the game if the game was paused before start it again
	 */
	pause() {
		if (this.paused) {
			this.start();
			return;
		}
		clearInterval(this.interval);
		this.paused = true;
	}

	/**
	 * Set interval or the gravity
	 * @return {[type]} [description]
	 */
	start() {
		this.paused = false;
		this.interval = setInterval(this.tick.bind(this), this.speed);
	}

	/**
	 * interval's functionality. This way we could bind this into it
	 */
	tick() {
		if (!this.isGameOver() && !this.element.canMoveDown()) {
			this.element.copyToBoard();
			this.element = this.nextElement;
			this.nextElement = new Element({board: this.board});
		}
		this.element.down();
	}

	/**
	 * Check if the first row is full. If so, set game to over
	 * @return {Boolean} [description]
	 */
	isGameOver() {
		return this.board.positions[0].some(e => typeof e !== 'undefined');
	}

	/**
	 * Main function which draw and set elements on the screen
	 * @return {[type]} [description]
	 */
	run() {
		let points = this.board.removeFilledLines();
		this.updateScore(points);
		this.board.draw();
		this.board.preview(this.nextElement);
		this.element.draw();
		if (game.isGameOver()) {
			this.paused = true;
			//stop the game, draw gameover screen
			clearInterval(this.interval);
			drawGameOver();
		}
	}

	/**
	 * Update the score of the game and set maxScore
	 * @param  Number points
	 */
	updateScore(points) {
		this.points += points;
		//set max score
		if (maxScore < this.points) {
			maxScore = this.points;
		}
	}
}