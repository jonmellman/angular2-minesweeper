import {Injectable} from 'angular2/core';
import {Tile} from 'app/js/tile';

@Injectable()
export class BoardManager {
	tiles: tile[][];
	createTiles(x: number, y: number, difficulty: number): void {
		this.tiles = [];
		for (var i = 0; i < x; i++) {
			for (var j = 0; j < y; j++) {
				this.tiles[i] = this.tiles[i] || [];
				var isMine: boolean = Math.random() < difficulty; // e.g. difficulty 0 means no mines, difficulty 1 means all mines
				this.tiles[i][j] = new Tile(isMine);
			}
		}
	}
	hasTiles(): boolean {
		return this.tiles.length > 0;
	}
	getTiles(): tile[][]{
		return this.tiles;
	}
	uncover(tile: tile) {
		console.log('uncovering', tile);
		tile.uncover();
	}
}