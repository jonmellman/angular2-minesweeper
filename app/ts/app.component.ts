import {Component} from 'angular2/core';
import {BoardComponent} from 'app/js/board.component';
import {GameManager} from 'app/js/game-manager.service';

@Component({
	selector: 'my-app',
	template: `
		<h1>Minesweeper</h1>
		<my-board
			[rows]="rows"
			[columns]="columns"
			[difficulty]="difficulty"
			[class.disabled]="gameManager.isGameOver">
		 </my-board>
	`,
	 styles: [`
		 .disabled {
			pointer-events: none;	 
		 }
		 * {
		 	font-family: 'Roboto', sans-serif;
		 	font-weight: 300;
		 }
	`],
	directives: [BoardComponent],
	providers: [GameManager]
})
export class AppComponent {
	rows: number;
	columns: number;
	difficulty: number; // % chance a tile is a mine

	constructor(private gameManager: GameManager) {
		this.rows = 20;
		this.columns = 40;
		this.difficulty = .15;
	}

}