import { Grid } from "../domain/controller/grid";
import "./index.css";
import React, { useRef, useState, useEffect } from "react";

export const Main = () => {

  // Initialize game grid
  let grid;
  const myRef = useRef();

  // Initialize useful consts
  const baseSpeed = 1000;
  const index = 300;
  const [width, setWidth] = useState(5);
  const [height, setHeight] = useState(5);

  // Initialize empty interval
  let interval;


  useEffect(() => {
    if (myRef.current) {
      let context = myRef.current.getContext("2d");
      context.fillRect(25, 25, 100, 100);
      drawGrid(20 * index, 10 * index, myRef.current);
    }
  }, []);

  const displayCells = function (context, color = "red") {
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

  const changeSpeed = function (event, speed) {
    clearInterval(interval);
    let context = myRef.current.getContext("2d");

    if (speed == 0) {
      return;
    }

    interval = setInterval(() => {
      setGameInterval(context);
    }, baseSpeed * speed);

  }

  const setGameInterval = function(context) {
    displayCells(context, "orange");
    grid.calculateNextGen();
    displayCells(context);
  }

  const startGame = function(event) {
    event.preventDefault();
    event.target.classList.add('hide');

    grid = new Grid(width, height);
    let context = myRef.current.getContext("2d");
    displayCells(context);

    interval = setInterval(() => {
      setGameInterval(context);
    }, baseSpeed * 3);

    return () => clearInterval(interval);
  }

  return (
    <>
      <div className="container">

        <canvas ref={myRef} height={10 * index} width={20 * index}></canvas>

        <form onSubmit={startGame} className="playButton">
          <div>
            <label>Starter width</label>
            <input type="number" value={width} onChange={(e) => setWidth(e.target.value)}/>
          </div>
          <div>
            <label>Starter height</label>
            <input type="number" value={height} onChange={(e) => setHeight(e.target.value)}/>
          </div>
          <input type="submit" value="Play" />
        </form>

        <div className="controls">
          <button onClick={(e) => changeSpeed(e, 0)}>||</button>
          <button onClick={(e) => changeSpeed(e, 3)}>x1</button>
          <button onClick={(e) => changeSpeed(e, 2)}>x2</button>
          <button onClick={(e) => changeSpeed(e, 1)}>x3</button>
        </div>

      </div>
    </>
  );
};
