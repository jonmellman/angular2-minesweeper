import {Component} from 'angular2/core';
import {BoardComponent} from 'app/js/board.component';

@Component({
  selector: 'my-app',
  template: `
    	<h1>Minesweeper</h1>
      <my-board [x]="x" [y]="y" [difficulty]="difficulty"></my-board>
    `,
  directives: [BoardComponent]
})
export class AppComponent {
  public x: number;
  public y: number;
  public difficulty: number; // % chance a tile is a mine
  constructor() {
    this.x = 5;
    this.y = 5;
    this.difficulty = .5;
  };
}