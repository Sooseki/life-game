import { Grid } from "../domain/controller/grid";
import { Cell } from "../domain/controller/cell";
import "./index.css";
import React, { useRef, useState, useEffect } from "react";

export const Main = () => {
  const grid = new Grid();

  const myRef = useRef();
  useEffect(() => {
    if (myRef.current) {
      let context = myRef.current.getContext("2d");
      context.fillRect(25, 25, 100, 100);
      drawGrid(50 * index, 15 * index, myRef.current);
      displayCells(grid.grid, context);

      const timeout = setInterval(() => {
        clearCells(grid.grid, context);
        grid.calculateNextGen();
        displayCells(grid.grid, context);
      }, 2000);
    }
  }, []);

  let index = 300;

  const displayCells = function (grid, context) {
    grid.map((cell) => {
      context.fillStyle = "red";
      context.fillRect(
        cell.x * 20 + index + 1,
        cell.y * 20 + index + 1,
        18,
        18
      );
    });
  };

  const clearCells = function (grid, context) {
    grid.map((cell) => {
      context.fillStyle = "red";
      context.clearRect(
        cell.x * 20 + index + 1,
        cell.y * 20 + index + 1,
        18,
        18
      );
    });
  };

  const drawGrid = function (w, h, canvas) {
    let ctx = canvas.getContext("2d");
    ctx.canvas.width = w;
    ctx.canvas.height = h;

    for (let x = 0.5; x <= w; x += 20) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      for (let y = 0.5; y <= h; y += 20) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
    }
    ctx.stroke();
  };

  return (
    <>
      <div className="container">
        <canvas ref={myRef} height={15 * index} width={50 * index}></canvas>
      </div>
    </>
  );
};
