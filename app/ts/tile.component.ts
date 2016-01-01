import {Component, OnInit} from 'angular2/core';
import {Tile} from 'app/js/tile';

@Component({
	selector: 'my-tile',
	inputs: ['tile', 'onTileClick'],
	template: `
		<div
			(click)="onTileClick(tile)"
			[class.uncovered]="tile.isUncovered"
			[class.covered]="!tile.isUncovered"
			[class.mine]="tile.isMine"
			[class.safe]="!tile.isMine"
			>
			{{tile.isUncovered && tile.getNumNeighboringMines() || ''}}
		</div>
	  `,
	 styles: [`
	 	div {
	 		background-color: lavender;
		    border: 1px solid black;
		    width: 20px;
		    height: 20px;
		    line-height: 20px;
		    text-align: center;
	 	}
	 	div.covered:hover {
	 		background-color: lightblue;
	 		cursor: pointer;
	 	}
	 	div.uncovered.mine {
	 		background-color: black;
	 	}
	 	div.uncovered.safe {
	 		background-color: white;
	 	}
	 `]
})
export class TileComponent {
	tile: tile;
	uncovered: boolean;
	constructor() {}
}