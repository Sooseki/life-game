import { Game } from "../domain/controller/game";
import Canvas from "canvas";
export const Main = () => {
  const game = new Game();
  console.table(game.grid);

  return (
    <div>
      <Canvas />
    </div>
  );
};
