import { Grid } from "./grid";
import { Cell } from './cell';

export class Game {

  grid: Cell[][];

  constructor() {
    this.init();
  }

  init() {
    const grid = new Grid();
    this.grid = grid.getGrid();
  }
}