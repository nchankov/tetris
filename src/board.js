"use strict";

class Board {
	/**
	 * How long it the board
	 * @type {Number}
	 */
	width = 10;
	/**
	 * How tall is the board
	 * @type {Number}
	 */
	height = 20;
	positions = new Array(this.height);

	constructor() {
		//update each position with sub array of length this.width
		for (let i = 0; i < this.positions.length; i++) {
			this.positions[i] = new Array(this.width);
		}
	}

	/**
	 * Set the position with particular color indicating that it's occupied
	 * @param Number row
	 * @param Number col
	 * @param Color color
	 */
	set(row, col, color = null) {
		if (typeof this.positions[row] !== 'undefined') {
			this.positions[row][col] = color;
		}
	}

	/**
	 * Check if the position requested is empty
	 * @param  Number  row [description]
	 * @param  Number  col [description]
	 * @return Boolean
	 */
	isEmpty(row, col) {
		if (typeof this.positions[row] !== 'undefined' && typeof this.positions[row][col] === 'undefined') {
			return true;
		}
		return false;
	}

	/**
	 * remove lines which are fully filled and count the points
	 * @return Number points
	 */
	removeFilledLines() {
		this.positions = this.positions.filter((row) => {
			for(let i = 0; i < row.length;i++) {
				if(typeof row[i] == 'undefined') {
					return true;
				}
			}
			return false;
		});
		let points = 0;
		while(this.positions.length < this.height) {
			this.positions.unshift(new Array(10));
			points += 10;
		}
		return points;
	}

	/**
	 * Draw preview of next element
	 * @param  {[type]} nextElement [description]
	 * @return {[type]}             [description]
	 */
	preview(nextElement) {
		text('next:', 330, 50);
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 2; j++) {
				drawPosition(11 + i, 2 + j, boardColor);
			}
		}

		//load next element
		let el = nextElement.element;
		for (let k = 0; k < el.pos[0].length; k++) {
			drawPosition(11 + el.pos[0][k][0], 2 + el.pos[0][k][1], el.color);
		}
	}

	/**
	 * Draw board on the screen
	 */
	draw() {
		for (let row = 0; row < this.positions.length; row++) {
			for (let col = 0; col < this.positions[row].length; col++) {
				drawPosition(col, row, this.positions[row][col]);
			}
		}
	}
}