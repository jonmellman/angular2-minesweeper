import {Injectable, Inject} from 'angular2/core';
import {Tile} from 'app/js/tile';
import {Point} from 'app/js/utils';
import {GameManager} from 'app/js/game-manager.service';

@Injectable()
export class BoardManager {
	private tiles: tile[][];
	private gameManager: GameManager;
	constructor(@Inject(GameManager) gameManager: GameManager) {
		this.gameManager = gameManager;
	}

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
		this.forEachTile(function(tile) {
			tile.isMine = Math.random() < difficulty; // e.g. difficulty 0 means no mines, difficulty 1 means all mines
			if (tile.isMine) {
				// our neighbors now have one more mine as a neighbor
				this.getNeighboringTiles(tile).forEach(function(neighbor) {
					neighbor.numNeighboringMines++;
				});
			}
		});
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
			this.revealAllMines();
			this.gameManager.endGame();
			
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
	private revealAllMines() {
		this.forEachTile(function(tile) {
			if (tile.isMine) {
				tile.uncover();
			}
		});
	}
	private forEachTile(callback, thisArg?) {
		this.tiles.forEach(function(row) {
			row.forEach(function(tile) {
				callback.bind(this)(tile);
			}, this);
		}, this);
	}
}