import { Game } from "../domain/controller/game";
import { Circle, Stage, Layer, Rect, Text } from "react-konva";
import Konva from "konva";

export const Main = () => {
  const game = new Game();
  console.table(game);

  return (
    <div>
      <p>test</p>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Text text="Try click on rect" />
          <Circle x={0} y={0} draggable radius={50} fill={"green"} />
        </Layer>
      </Stage>
    </div>
  );
};
