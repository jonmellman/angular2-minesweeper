import {BoardManager} from 'app/js/board-manager.service';

export class Tile {
	isUncovered: boolean = false;
	constructor(public isMine: boolean) {

	}
	uncover() {
		this.isUncovered = true;
	}
}