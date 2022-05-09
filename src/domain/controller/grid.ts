import { Cell } from "./cell";

export class Grid {

  width: number;
  height: number;
  grid: Cell[];
  nextGenGrid: Cell[];
  deadCellToCheck: Cell[];

  constructor(width: number = 5, height: number = 5, chosenGrid: Cell[] = []) {
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

    // CHECK PREV ALIVE CELLS
    // ==========================================

    this.grid.map(cell => {
      if (2 <= this.getAliveSiblings(cell) && this.getAliveSiblings(cell) <= 3){
        this.nextGenGrid.push(new Cell(cell.x, cell.y, true, false));
      }
    });

    this.checkDeadCells()
    this.grid = this.nextGenGrid;
    this.resetTables();
  }

  /*
   * Get dead cells that wil become alive
   */

  checkDeadCells () {
    let siblings = 0;

    this.deadCellToCheck.map(cell => {
      if (this.getAliveSiblings(cell, false) === 3 ){
        this.nextGenGrid.push(new Cell(cell.x, cell.y, true, false));
      }
    })
  }


  /*
   * Get alive siblings to specific cell
   */
  getAliveSiblings(cell: Cell, addDeadCells: boolean = true) {
    let siblings = 0;

    for ( let rowIndex = -1; rowIndex <= 1; rowIndex++) {
      for ( let colIndex = -1; colIndex <= 1; colIndex++) {
        if ( rowIndex == 0 && colIndex == 0 ) {
          continue;
        }
        if( this.grid.some(icell => (icell.x == cell.x + rowIndex && icell.y == cell.y + colIndex && icell.state == true) ? true : false) ) {
          siblings ++;
        } else {
          if (!addDeadCells) {
            continue;
          }
          if (this.deadCellToCheck.some(icell => (icell.x == cell.x + rowIndex && icell.y == cell.y + colIndex) ? true : false ) || this.grid.some(icell => (icell.x == cell.x + rowIndex && icell.y == cell.y + colIndex) ? true : false )) {
            // nothing
          } else {
            this.deadCellToCheck.push(new Cell(cell.x + rowIndex, cell.y + colIndex, false, false));
          }
        }
      }
    }

    return siblings;
  }

  /*
   * Set and reset table of dead cells next to alive ones
   */

  resetTables() {
    this.deadCellToCheck = [];
    this.nextGenGrid = [];
  }
}
