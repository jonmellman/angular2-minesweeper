import {Component, OnInit} from 'angular2/core';
import {Tile} from 'app/js/tile';

@Component({
	selector: 'my-tile',
	inputs: ['tile'],
	template: `
		<div (click)="onTileClick()"></div>
	  `,
	 styles: [`
	 	div {
	 		background-color: lavender;
		    width: 10px;
		    height: 10px;
		    border: 1px solid black;
	 	}

	 	div:hover {
	 		background-color: lightblue;
	 		cursor: pointer;
	 	}
	 `]
})
export class TileComponent implements OnInit {
	tile: tile;
	constructor() {}
	ngOnInit() {
		
	}
	onTileClick() {
		console.log(this.tile);
	}
}