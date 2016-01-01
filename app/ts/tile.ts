import {Point} from 'app/js/utils';

export class Tile {
	isUncovered: boolean = false;
	numNeighboringMines: number = 0;
	isMine: boolean = false;
	constructor(public position: point) {

	}
	uncover() {
		this.isUncovered = true;
	}
}