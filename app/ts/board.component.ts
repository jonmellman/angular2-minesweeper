import {Component, Input, OnInit} from 'angular2/core';
import {TileComponent} from 'app/js/tile.component';
import {Tile} from 'app/js/tile';

@Component({
	selector: 'my-board',
	inputs: ['x', 'y', 'difficulty'],
	template: `
		<table *ngIf="tiles">
			<tbody>
				<tr *ngFor="#row of tiles">
					<td *ngFor="#tile of row">
						<my-tile [tile]="tile"></my-tile>
					</td>
				</tr>
			</tbody>
		</table>
	  `,
  	directives: [TileComponent]
})
export class BoardComponent implements OnInit{
	x: number;
	y: number;
	difficulty: number;
	tiles: tile[][];
	constructor() { };
	ngOnInit() {
		this.tiles = [];
		for (var i = 0; i < this.x; i++) {
			for (var j = 0; j < this.y; j++) {
				this.tiles[i] = this.tiles[i] || [];
				var isMine: boolean = Math.random() < this.difficulty; // e.g. difficulty 0 means no mines, difficulty 1 means all mines
				this.tiles[i][j] = new Tile(isMine);
			}
		}

		console.log(this.tiles);
	}
}