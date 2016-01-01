import {Injectable} from 'angular2/core';
import {Tile} from 'app/js/tile';
import {Point} from 'app/js/utils';

@Injectable()
export class BoardManager {
	private tiles: tile[][];
	createTiles(x: number, y: number, difficulty: number): void {
		this.tiles = [];
		for (var i = 0; i < x; i++) {
			for (var j = 0; j < y; j++) {
				this.tiles[i] = this.tiles[i] || [];
				var isMine: boolean = Math.random() < difficulty; // e.g. difficulty 0 means no mines, difficulty 1 means all mines
				var point = new Point(i, j);
				this.tiles[i][j] = new Tile(isMine, point);
			}
		}
	}
	hasTiles(): boolean {
		return this.tiles.length > 0;
	}
	getTiles(): tile[][]{
		return this.tiles;
	}
	uncover = (tile: tile) => { // need to use arrow function to preserve `this` reference
		tile.uncover();
		if (tile.isMine) {
			alert('game over!');
		} else {
			this.uncoverHelper(tile);
		}
	}
	private uncoverHelper = (tile: tile) => {
		var numNeighboringMines = this.getNumNeighboringMines(tile);
		var uncoverHelper = this.uncoverHelper;

		if (numNeighboringMines === 0) {
			var neighbors = this.getNeighboringTiles(tile);
			neighbors.forEach(function(t) {
				if (!t.isUncovered) {
					t.uncover();
					uncoverHelper(t);
				}
			});
		} else {
			tile.setNumNeighboringMines(numNeighboringMines);
		}
	}
	private getNumNeighboringMines(tile: tile) {
		return this.getNeighboringTiles(tile)
			.filter(function(tile) {
				return tile && tile.isMine;
			})
			.length;
	}

	private getNeighboringTiles = (tile: tile): tile[] => {
		var pos = tile.position;
		var neighbors = [];
		for (var i = -1; i <= 1; i++) {
			for (var j = -1; j <= 1; j++) {
				neighbors.push(new Point(pos.x + i, pos.y + j));
			}
		}

		return neighbors
			.map(this.getTileAt)
			.filter(function(tile) {
				return !!tile;
			});
	}
	private getTileAt = (pos: point): tile => {
		return this.tiles[pos.x] && this.tiles[pos.x][pos.y];
	}
}