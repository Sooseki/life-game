import { Game } from "../domain/controller/game";
export const Main = () => {
  const game = new Game();
  console.table(game.grid);
  return (
    <div>
      <p>salut</p>
    </div>
  );
};