import {Component, OnInit} from 'angular2/core';
import {Tile} from 'app/js/tile';

@Component({
	selector: 'my-tile',
	inputs: ['tile', 'onTileClick'],
	template: `
		<div
			(click)="onTileClick(tile)"
			class="_{{tile.numNeighboringMines}}"
			[class.uncovered]="tile.isUncovered"
			[class.covered]="!tile.isUncovered"
			[class.mine]="tile.isMine"
			[class.safe]="!tile.isMine"
			>
			{{tile.isUncovered && tile.numNeighboringMines || ''}}
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
	 	div.uncovered.safe._0 {
	 		background-color: white;
	 	}
	 	div.uncovered.safe._1 {
	 		background-color: #C5E0A4;
	 	}
	 	div.uncovered.safe._2 {
	 		background-color: #F7F98F;
	 	}
	 	div.uncovered.safe._3 {
	 		background-color: #FFD27E;
	 	}
	 	div.uncovered.safe._4 {
	 		background-color: red;
	 	}
	 	div.uncovered.safe._5 {
	 		background-color: firebrick;
	 		color: white;
	 	}
	 	div.uncovered.safe._6 {
	 		background-color: firebrick;
	 		color: white;
	 	}
	 	div.uncovered.safe._7 {
	 		background-color: firebrick;
	 		color: white;
	 	}
	 	div.uncovered.safe._8 {
	 		background-color: firebrick;
	 		color: white;
	 	}
	 `]
})
export class TileComponent {
	tile: tile;
	uncovered: boolean;
	constructor() {}
}