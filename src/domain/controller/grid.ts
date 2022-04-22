import { Cell } from './cell';

export class Grid {

  delay: number = 1000;
  width: number = 5;
  height: number = 5;
  grid: Cell[][];
  nextGenGrid: boolean[][];
  deadCellToCheck: boolean[][];

  constructor() {
    this.grid = new Array(this.height);
    this.nextGenGrid = new Array(this.height);
    this.deadCellToCheck = new Array(this.height + 2);

    for ( let row = (this.delay - 1) ; row < this.height + (this.delay + 1) ; row++ ) {
      this.deadCellToCheck[row] = new Array(this.width + 2);
    }

    this.generateGrid();
  }

  getGrid() {
    return this.grid;
  }

  generateGrid() {
    for (let row = this.delay ; row < this.height + this.delay ; row++) {
      this.grid[row] = new Array(this.width);
      this.nextGenGrid[row] = new Array(this.width);

      for (let col = this.delay ; col < this.width + this.delay ; col++) {
        let cell = new Cell();
        if ( cell.getState() ) {
          this.grid[row][col] = cell;
          this.nextGenGrid[row][col] = true;
        }
      }
    }
  }

  calculateNextGen() {
    let siblings = 0;

    // CHECK PREV ALIVE CELLS
    // ==========================================

    for ( let row in this.grid ) {
      for ( let col in this.grid[row] ) {
        let colNum: number = +col;
        let rowNum: number = +row;
        this.nextGenGrid[row][col] = false;

        for ( let rowIndex = -1; rowIndex <= 1; rowIndex ++ ) {
          for ( let colIndex = -1; colIndex <= 1; colIndex ++ ) {
            if ( rowIndex == 0 && colIndex == 0 ) {
              continue;
            }
            if( this.grid[rowNum + rowIndex] && this.grid[rowNum + rowIndex][colNum + colIndex] && this.grid[rowNum + rowIndex][colNum + colIndex].getState() == true) {
              siblings ++;
            } else {
              // ADD SIBLINGS DEAD CELLS TO CHECK IF ALIVE
              this.deadCellToCheck[rowNum + rowIndex][colNum + colIndex] = true;
            }
          }
        }

        if ( 2 <= siblings && siblings <= 3 ) {
          this.nextGenGrid[row][col] = true;
        }

        siblings = 0;
      }
    }

    // CHECK PREV DEAD CELLS
    // ============================================

    for ( let row in this.deadCellToCheck ) {
      for ( let col in this.deadCellToCheck[row] ) {
        let colNum: number = +col;
        let rowNum: number = +row;

        for ( let rowIndex = -1; rowIndex <= 1; rowIndex ++ ) {
          for ( let colIndex = -1; colIndex <= 1; colIndex ++ ) {
            if ( rowIndex == 0 && colIndex == 0 ) {
              continue;
            }
            if( this.grid[rowNum + rowIndex] && this.grid[rowNum + rowIndex][colNum + colIndex] && this.grid[rowNum + rowIndex][colNum + colIndex].getState() == true) {
              siblings ++;
            }
          }
        } // <- fait la vérification des cellules mortes autour des vivantes

        if ( siblings == 3 ) {
          if ( ! this.nextGenGrid[row] ) { 
            this.nextGenGrid[row] = new Array();
          }
          this.nextGenGrid[row][col] = true; // <- force sa vie
        }

        siblings = 0;
      }
    }

    for ( let row in this.nextGenGrid ) {
      this.grid[row] = new Array();
      for ( let col in this.nextGenGrid[row] ) {
        if ( ! this.grid[row][col] ) {
          this.grid[row][col] = new Cell;
        }
        this.grid[row][col].setState(this.nextGenGrid[row][col]);
      }
    }
    this.deadCellToCheck = [];
  }
}