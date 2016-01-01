import {Component} from 'angular2/core';
import {BoardComponent} from 'app/js/board.component';

@Component({
  selector: 'my-app',
  template: `
    	<h1>Minesweeper</h1>
      <my-board [rows]="rows" [columns]="columns" [difficulty]="difficulty"></my-board>
    `,
  directives: [BoardComponent]
})
export class AppComponent {
  public rows: number;
  public columns: number;
  public difficulty: number; // % chance a tile is a mine
  constructor() {
    this.rows = 20;
    this.columns = 40;
    this.difficulty = .15;
  };
}