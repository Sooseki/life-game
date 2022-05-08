import { Grid } from "./grid";
import { Cell } from "./cell";

export class Game {
  grid: Grid;
  cells: Cell[];

  constructor() {
    this.init();
  }

  init() {
    const grid = new Grid();
    console.log(grid);
    this.cells = grid.getGrid();
  }

  getGrid() {
    return this.cells;
  }

  getNextGen() {
    this.grid.calculateNextGen();
    this.cells = this.grid.getGrid();
  }
}
