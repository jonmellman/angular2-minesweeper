import {Injectable} from 'angular2/core';

@Injectable()
export class GameManager {
	isGameOver: boolean = false;
	endGame() {
		this.isGameOver = true;
	}
}