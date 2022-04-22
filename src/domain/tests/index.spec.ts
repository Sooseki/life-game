// @ts-ignore see https://github.com/jest-community/jest-extended#setup
import * as matchers from "jest-extended";
import { Game } from "../controller/game";
import { Cell } from "../controller/cell";
import { boolean } from "mathjs";
import { Grid } from "../controller/grid";
expect.extend(matchers);

it("jest-extended is included", function () {
  expect([1, 0]).toIncludeSameMembers([0, 1]);
});

it("is cell a boolean", function () {
  const cell = new Cell();
  expect(cell.state).toBeBoolean;
});

it("row indexes of grid is a table of coords", function () {
  const grid = new Grid();
  expect(grid.grid).toBeArray;
});

it("next gen is a coherent table", function () {
  const grid = new Grid();
  console.table(grid.grid);
  grid.calculateNextGen();
  console.table(grid.grid);
  expect(grid.grid).toBeArray;
});