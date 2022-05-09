import React, { useState } from "react";
import { Grid } from "../../domain/controller/grid";

export const Form  = ({setGrid, setContext}) => {
  
  const [width, setWidth] = useState(5);
  const [height, setHeight] = useState(5);

  const startGame = function(event) {
    event.preventDefault();
    event.target.classList.add('hide');
    
    // Initialize grid
    let newGrid = new Grid(width, height);
    setGrid(newGrid);
    setContext(newGrid);
  }

  return (
    <>
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
    </>
  )
}