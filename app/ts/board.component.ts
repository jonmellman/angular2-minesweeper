import {Component, Input, OnInit} from 'angular2/core';
import {TileComponent} from 'app/js/tile.component';
import {Tile} from 'app/js/tile';
import {BoardManager} from 'app/js/board-manager.service';

@Component({
	selector: 'my-board',
	inputs: ['x', 'y', 'difficulty'],
	template: `
		<table *ngIf="boardManager.hasTiles()">
			<tbody>
				<tr *ngFor="#row of boardManager.getTiles()">
					<td *ngFor="#tile of row">
						<my-tile [tile]="tile" [onTileClick]="boardManager.uncover"></my-tile>
					</td>
				</tr>
			</tbody>
		</table>
	  `,
  	directives: [TileComponent],
	providers: [BoardManager]
})
export class BoardComponent implements OnInit {
	x: number;
	y: number;
	difficulty: number;
	rand: number;
	constructor(boardManager: BoardManager) {
		this.boardManager = boardManager;
	};
	ngOnInit() {
		this.boardManager.createTiles(this.x, this.y, this.difficulty);
	}
}