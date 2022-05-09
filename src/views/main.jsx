import "./index.css";
import React, { useRef, useState, useEffect } from "react";
import { Controls } from "./controls/controls";
import { Form } from "./form/form";

export const Main = () => {

  const myRef = useRef();

  // Initialize useful consts
  const baseSpeed = 1000;
  const index = 300;
  const [gameInterval, setGameIntervals] = useState("");
  const [grid, setGrid] = useState();
  
  // initialize grid
  // let grid;

  useEffect(() => {
    if (myRef.current) {
      let context = myRef.current.getContext("2d");
      context.fillRect(25, 25, 100, 100);
      drawGrid(20 * index, 10 * index, myRef.current);
    }
  }, []);

  const displayCells = function (grid, context, color = "red") {
    grid.grid.map((cell) => {
      context.fillStyle = color;
      context.fillRect(
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

  const setGameInterval = function(newGrid, context, speed = 3) {
    setGameIntervals(setInterval(() => {
      // Show prev alive cells
      displayCells(newGrid, context, "orange");
      // Calculate next Gen
      newGrid.calculateNextGen();
      // Display them
      displayCells(newGrid, context);
    }, baseSpeed * speed));
  }

  const setContext = function(newGrid) {
    // Get canvas context
    let context = myRef.current.getContext("2d");
    displayCells(newGrid, context);

    setGameInterval(newGrid, context);
    return () => clearInterval(gameInterval);
  }

  return (
    <>
      <div className="container">

        <canvas ref={myRef} height={10 * index} width={20 * index}></canvas>

        <Form setGrid={setGrid} setContext={setContext}></Form>

        <Controls interval={gameInterval} myRef={myRef} setGameInterval={setGameInterval} grid={grid}></Controls>

      </div>
    </>
  );
};
