import { Cell } from "./cell";

export class Grid {

  // delay: number = 1000;
  width: number;
  height: number;
  grid: Cell[];
  nextGenGrid: Cell[];
  deadCellToCheck: Cell[];

  constructor(chosenGrid: Cell[] = [], width: number = 5, height: number = 5) {
    this.grid = [];
    this.nextGenGrid = [];
    this.width = width;
    this.height = height;

    this.resetTables();
    this.generateGrid(chosenGrid);
  }

  /*
   * Set grid
   */

  getGrid() {
    return this.grid;
  }

  /*
  * Generate First grid
  */

  generateGrid(chosenGrid: Cell[]) {

    if (chosenGrid.length > 1) {
      this.grid = chosenGrid;
      return;
    }

    for (let row =  0 ; row < this.height ; row++) {
      for (let col = 0 ; col < this.width ; col++) {
        let cell = new Cell(row, col); 

        if ( cell.getState() ) {
          this.grid.push(cell);
        }
      }
    }
  }

  /*
   * Public method to calculate next generation
   */

  calculateNextGen() {
    let siblings = 0;

    // CHECK PREV ALIVE CELLS
    // ==========================================

    this.grid.map(cell => {

      for ( let rowIndex = -1; rowIndex <= 1; rowIndex++) {
        for ( let colIndex = -1; colIndex <= 1; colIndex++) {
          if ( rowIndex == 0 && colIndex == 0 ) {
            continue;
          }
          if( this.grid.some(icell => (icell.x == cell.x + rowIndex && icell.y == cell.y + colIndex && icell.state == true) ? true : false) ) {
            siblings ++;
          } else {
            if (this.deadCellToCheck.some(icell => (icell.x == cell.x + rowIndex && icell.y == cell.y + colIndex) ? true : false ) || this.grid.some(icell => (icell.x == cell.x + rowIndex && icell.y == cell.y + colIndex) ? true : false )) {
              // nothing
            } else {
              this.deadCellToCheck.push(new Cell(cell.x + rowIndex, cell.y + colIndex, false, false));
            }
          }
        }
      }

      if (2 <= siblings && siblings <= 3){
        this.nextGenGrid.push(new Cell(cell.x, cell.y, true, false));
      }

      siblings = 0;
    });

    this.deadCellToCheck.map(cell => {
      for ( let rowIndex = -1; rowIndex <= 1; rowIndex++) {
        for ( let colIndex = -1; colIndex <= 1; colIndex++) {
          if ( rowIndex == 0 && colIndex == 0 ) {
            continue;
          }
          if( this.grid.some(icell => (icell.x == cell.x + rowIndex && icell.y == cell.y + colIndex && icell.state == true) ? true : false) ) {
            siblings ++;
          }
        }
      }

      if (siblings === 3 ){
        this.nextGenGrid.push(new Cell(cell.x, cell.y, true, false));
      }

      siblings =0;
    })

    this.grid = this.nextGenGrid;
    this.resetTables();
  }

  /*
   * Set and reset table of dead cells next to alive ones
   */

  resetTables() {
    this.deadCellToCheck = [];
    this.nextGenGrid = [];
  }
}
