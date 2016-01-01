import {Component, OnInit} from 'angular2/core';
import {Tile} from 'app/js/tile';
import {BoardManager} from 'app/js/board-manager.service';

@Component({
	selector: 'my-tile',
	inputs: ['tile'],
	template: `
		<div
			(click)="_boardManager.uncover(tile)"
			[class.uncovered]="tile.isUncovered"
			[class.covered]="!tile.isUncovered"
			[class.mine]="tile.isMine"
			[class.safe]="!tile.isMine"
			>
		</div>
	  `,
	 styles: [`
	 	div {
	 		background-color: lavender;
		    width: 10px;
		    height: 10px;
		    border: 1px solid black;
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
	 `],
	 providers: [BoardManager]
})
export class TileComponent implements OnInit {
	tile: tile;
	uncovered: boolean;
	constructor(private _boardManager: BoardManager) {}
	ngOnInit() {
		
	}
}