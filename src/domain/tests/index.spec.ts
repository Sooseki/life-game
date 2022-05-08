// @ts-ignore see https://github.com/jest-community/jest-extended#setup
import * as matchers from "jest-extended";
import { Cell } from "../controller/cell";
import { Grid } from "../controller/grid";
expect.extend(matchers);

it("jest-extended is included", function () {
  expect([1, 0]).toIncludeSameMembers([0, 1]);
});

it("cell has a boolean property", function () {
  const cell = new Cell(1, 1, true, false);
  expect(cell.state).toEqual(true);
});

const grid = new Grid();
it("row indexes of grid is a table", function () {
  expect(grid.grid).toBeArray;
});

it("row indexes of grid is a table of Cells", function () {
  const cell = grid[0];
  expect(cell).toBeObject;
});

it("next gen is a coherent table", function () {
  grid.calculateNextGen();
  expect(grid.grid).toBeArray;
});

it("next gen is a table of cells", function () {
  const cell = grid.grid[0];
  expect(cell).toBeObject;
});

it("table of cells is correctly set when chosen", function () {
  const table = 
  [
    new Cell(1, 1, true, false), new Cell(1, 2, true, false),
    new Cell(2, 1, false, false), new Cell(2, 2, true, false)
  ];

  const currentGrid = new Grid(table, 2, 2);
  expect(currentGrid.grid).toEqual([
    new Cell(1, 1, true, false), 
    new Cell(1, 2, true, false),
    new Cell(2, 1, false, false),
    new Cell(2, 2, true, false),
  ]);
});

it("next gen is correctly calculated from chosen table of cells", function () {
  const table = 
  [
    new Cell(1, 1, true, false), new Cell(1, 2, true, false),
    new Cell(2, 1, false, false), new Cell(2, 2, true, false)
  ];

  let currentGrid = new Grid(table, 2, 2);
  currentGrid.calculateNextGen();

  console.log(currentGrid.grid);

  expect(currentGrid.grid).toEqual([
    new Cell(1, 1, true, false), 
    new Cell(1, 2, true, false),
    new Cell(2, 1, true, false),
    new Cell(2, 2, true, false),
  ]);
});
