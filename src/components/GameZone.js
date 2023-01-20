import { useState } from "react";

// components
import CardsColumn from "./CardsColumn";
import Card from "./Card";
import CardsStack from "./CardsStack";

// functions
import initGame from "../functions/initGame";

// style
import "../style/gameZone.css";

const GameZone = () => {
  const [initDeck, initColumns] = initGame();

  const [deck, setDeck] = useState(initDeck);
  const [columns, setColumns] = useState(initColumns);
  const [stacks, setStacks] = useState([[], [], [], []]);
  const [rejected, setRejected] = useState([]);

  const handleDeckPick = () => {
    if (deck.length > 0) {
      const newDeck = [...deck];
      const newRejected = [...rejected];
      const cardPicked = newDeck.shift();
      setDeck(newDeck);
      cardPicked.side = "up";
      newRejected.push(cardPicked);
      setRejected(newRejected);
    }
  };

  return (
    <div className="game-zone">
      <div className="top">
        {stacks.map((item, index) => {
          return <CardsStack key={index} cards={item} />;
        })}
        <div onClick={handleDeckPick} style={{ width: "100%" }}>
          <CardsStack cards={deck} />
        </div>

        <CardsStack cards={rejected} />
      </div>
      <div className="bottom">
        {columns.map((item, index) => {
          return <CardsColumn key={index} cards={item} />;
        })}
      </div>
    </div>
  );
};

export default GameZone;
