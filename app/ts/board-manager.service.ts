import {Injectable} from 'angular2/core';
import {Tile} from 'app/js/tile';
import {Point} from 'app/js/utils';

@Injectable()
export class BoardManager {
	private tiles: tile[][];
	createTiles(rows: number, columns: number, difficulty: number): void {
		// create blank tiles
		this.tiles = [];
		for (var i = 0; i < rows; i++) {
			for (var j = 0; j < columns; j++) {
				this.tiles[i] = this.tiles[i] || [];
				var position = new Point(i, j);
				this.tiles[i][j] = new Tile(position);
			}
		}


		// lay mines (naive)
		this.tiles.forEach(function(row) {
			row.forEach(function(tile) {
				tile.isMine = Math.random() < difficulty; // e.g. difficulty 0 means no mines, difficulty 1 means all mines
				if (tile.isMine) {
					// our neighbors now have one more mine as a neighbor
					this.getNeighboringTiles(tile).forEach(function(neighbor) {
						neighbor.numNeighboringMines++;
					});
				}
			}, this);
		}, this);
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
		if (tile.numNeighboringMines === 0) {
			var neighbors = this.getNeighboringTiles(tile);
			var uncoverHelper = this.uncoverHelper;
			neighbors.forEach(function(t) {
				if (!t.isUncovered) {
					t.uncover();
					uncoverHelper(t);
				}
			});
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
		var neighboringPoints = [];
		var pos = tile.position;
		
		for (var i = -1; i <= 1; i++) {
			for (var j = -1; j <= 1; j++) {
				neighboringPoints.push(new Point(pos.x + i, pos.y + j));
			}
		}

		return neighboringPoints
			.map(this.getTileAt)
			.filter(function(tile) {
				return !!tile;
			});
	}
	private getTileAt = (pos: point): tile => {
		return this.tiles[pos.x] && this.tiles[pos.x][pos.y];
	}
}