import { Cell } from "./Cell";
import { Grid } from "./Grid";
export const Game = () => {
  class Game {
    grid: typeof Cell[][];

    constructor() {
      this.init();
    }

    init() {
      const grid = new Grid();
      this.grid = grid.getGrid();
    }
  }
};
