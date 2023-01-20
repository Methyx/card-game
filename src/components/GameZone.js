// components
import CardsColumn from "./CardsColumn";
import Card from "./Card";

// functions
import initGame from "../functions/initGame";

// style
import "../style/gameZone.css";

const GameZone = () => {
  const [deck, columns] = initGame();
  return (
    <div className="game-zone">
      <div className="top"></div>
      <div className="bottom">
        {columns.map((item, index) => {
          return <CardsColumn key={index} cards={item} />;
        })}
      </div>
    </div>
  );
};

export default GameZone;
