import "./index.css";
import React, { useRef, useState, useEffect } from "react";
import { Controls } from "./controls/Controls";
import { Form } from "./form/Form";
import { Canvas } from "./canvas/Canvas";
import { Count } from "./count/Count";

export const Main = () => {

  const myRef = React.useRef();

  // Initialize useful consts
  const baseSpeed = 1000;
  const index = 300;
  const [gameInterval, setGameIntervals] = useState("");
  const [grid, setGrid] = useState();
  const [count, setCount] = useState(1);

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

  const setGameInterval = function(newGrid, context, speed = 3, tempCount) {
    setGameIntervals(setInterval(() => {
      // Show prev alive cells
      displayCells(newGrid, context, "orange");
      // Calculate next Gen
      newGrid.calculateNextGen();
      // Display them
      displayCells(newGrid, context);
      
      tempCount ? tempCount++ : count++;
      setCount(tempCount);

    }, baseSpeed * speed));
  }

  const setContext = function (newGrid) {
    // Get canvas context

    let context = myRef.current.getContext("2d");
    displayCells(newGrid, context);

    setGameInterval(newGrid, context);
    return () => clearInterval(gameInterval);
  }

  return (
    <>
      <div className="container">

        {/* <canvas ref={myRef} height={10 * index} width={20 * index}></canvas> */}

        <Form setGrid={setGrid} setContext={setContext}></Form>
        <Canvas ref={myRef} />
        <Controls interval={gameInterval} myRef={myRef} setGameInterval={setGameInterval} grid={grid} count={count}></Controls>

        <Count count={count}></Count>

      </div>
    </>
  );
};
