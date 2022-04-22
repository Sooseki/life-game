// @ts-ignore see https://github.com/jest-community/jest-extended#setup
import * as matchers from "jest-extended";
import { Game } from "../controller/game";
import { Cell } from "../controller/cell";
import { Grid } from "../controller/grid";
expect.extend(matchers);

it("jest-extended is included", function () {
  expect([1, 0]).toIncludeSameMembers([0, 1]);
});

it("is cell a boolean", function () {
  const cell = new Cell();
  expect(cell.state).toBeBoolean;
});


const grid = new Grid();
it("row indexes of grid is a table", function () {
  expect(grid.grid).toBeArray;
});

it("row indexes of grid is a table of Cells", function () {
  const cell = grid.grid[grid.delay][grid.delay];
  expect(cell).toBeObject;
});

it("next gen is a coherent table", function () {
  grid.calculateNextGen();
  expect(grid.grid).toBeArray;
});

it("next gen is a table of cells", function () {
  const cell = grid.grid[grid.delay][grid.delay];
  expect(cell).toBeArray;
});