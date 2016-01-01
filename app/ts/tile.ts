import {Point} from 'app/js/utils';

export class Tile {
	isUncovered: boolean = false;
	numNeighboringMines: string = '';
	constructor(public isMine: boolean, public position: point) {

	}
	uncover() {
		this.isUncovered = true;
	}
	setNumNeighboringMines(n: number) {
		this.numNeighboringMines = n.toString();
	}
	getNumNeighboringMines(): string {
		return this.numNeighboringMines;
	}
}