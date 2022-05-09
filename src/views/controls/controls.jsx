import React from "react";

export const Controls = ({interval, myRef, setGameInterval, grid, count}) => {

  const changeSpeed = function (event, speed) {
    clearInterval(interval);
    let context = myRef.current.getContext("2d");
    
    if (speed == 0) {
      return;
    }

    setGameInterval(grid, context, speed, count);
  }

  return (
    <>
      <div className="controls">
        <button onClick={(e) => changeSpeed(e, 0)}>||</button>
        <button onClick={(e) => changeSpeed(e, 3)}>x1</button>
        <button onClick={(e) => changeSpeed(e, 2)}>x2</button>
        <button onClick={(e) => changeSpeed(e, 1)}>x3</button>
        <button onClick={(e) => changeSpeed(e, 0.1)}>x10</button>
      </div>
    </>
  );
}