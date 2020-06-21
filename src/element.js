"use strict";

class Element {
	board;
	rotation = 0;
	element;
	position = {x: 0, y: -1};
	constructor(options) {
		//set the element which will be used
		this.element = (typeof options.element === 'undefined') ? this.getElement() : options.element;
		//assign instance of the board
		this.board = options.board;
		this.position.y = 0;
		//offset the element to the center of the board
		this.move(this.element.offset);
		this.position.y = -1;
	}

	/**
	 * Get element from elements at random
	 * @return {[type]} [description]
	 */
	getElement() {
		return elements[Math.floor(Math.random() * elements.length)];
	}

	/**
	 * Rotate element
	 */
	rotate() {
		this.rotation++;
		if (this.rotation >= this.element.pos.length) {
			this.rotation = 0;
		}
		//Make adjustment if the element is out of the board
		this.adjust();
	}

	/**
	 * Move element left of right
	 * @param Number direction could be either 1 or -1 by default
	 */
	move(direction) {
		if (this.canMoveSideways(direction)) {
			this.position.x += direction;
		}
	}

	/**
	 * Set element fown for speed running
	 */
	down() {
		let el = this.element.pos[this.rotation];
		if (this.canMoveDown()) {
			this.position.y++;
		}
	}

	/**
	 * If the element can't move down anymore, set it as permanent on the board
	 */
	copyToBoard() {
		let el = this.element.pos[this.rotation];
		for (let i = 0; i < el.length; i++) {
			this.board.set(el[i][1] + this.position.y, el[i][0] + this.position.x, this.element.color);
		}
	}

	/**
	 * Check if the element can move down
	 * @return Boolean
	 */
	canMoveDown() {
		let el = this.element.pos[this.rotation];
		if (
			//the board below is empty
			el.every((e) => this.board.isEmpty(e[1] + this.position.y + 1, e[0] + this.position.x)) &&
			//the element doesn't exceed the height
			!el.some((e) => e[1] + this.position.y + 1 >= this.board.height)
		) {
			return true;
		}
		return false;
	}

	/**
	 * Check if the element is not near to board ends or run into prefilled positions
	 * @param  Number direction either 1 or -1
	 * @return Boolean
	 */
	canMoveSideways(direction) {
		let el = this.element.pos[this.rotation];
		if (
			(direction < 0 && (
				el.every((e) => e[0] + this.position.x > 0) &&
				el.every((e) => this.board.isEmpty(e[1] + this.position.y, e[0] + this.position.x - 1))
			)) ||
			(direction > 0 && (
				el.every((e) => e[0] + this.position.x < (this.board.width - 1)) &&
				el.every((e) => this.board.isEmpty(e[1] + this.position.y, e[0] + this.position.x + 1))
			))
		) {
			return true;
		}
		return false;
	}

	/**
	 * Draw the element on the screen
	 * @return {[type]} [description]
	 */
	draw() {
		let pos = this.element.pos[this.rotation];
		for (let i = 0; i < pos.length; i++) {
			drawPosition(pos[i][0] + this.position.x, pos[i][1] + this.position.y, this.element.color);
		}
	}

	/**
	 * adjust position if the element is rotated and next to board
	 * @return {[type]}
	 */
	adjust() {
		let el = this.element.pos[this.rotation];
		while(el.some((e) => e[0] + this.position.x < 0)) {
			this.move(1);
		}
		while(el.some((e) => e[0] + this.position.x >= this.board.width)) {
			this.move(-1);
		}
	}
}