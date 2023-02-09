import { useContext } from "react";
import { DndContext } from "@dnd-kit/core";

// components
import CardsColumn from "./CardsColumn";
import CardsStack from "./CardsStack";
import CardsDeck from "./CardsDeck";

import { GameContext } from "../functions/context";

// functions
import handleDeckPick from "../functions/handleDeckPick";
import isValidMove from "../functions/isValidMove";
import { searchCardsMoving } from "../functions/handleCards";

// style
import "../style/gameZone.css";

const GameZone = () => {
  //init with Game Context
  const {
    deck,
    setDeck,
    columns,
    setColumns,
    stacks,
    setStacks,
    rejected,
    setRejected,
  } = useContext(GameContext);

  const cardMoving = { id: null, startPlace: null, index: null, cards: null };

  const handleDragStart = (event) => {
    cardMoving.id = event.active.id;
    const idTab = event.active.id.split("-");
    const search = searchCardsMoving(columns, stacks, rejected, {
      color: idTab[0],
      value: idTab[1],
    });
    if (search) {
      cardMoving.startPlace = search.place;
      cardMoving.index = search.number;
      cardMoving.cards = search.cards;
      // console.log(cardMoving);
    }
  };

  const handleDragOver = (event) => {
    if (event.over) {
      const overPlace = event.over.id?.split("-");
      if (overPlace && overPlace.length > 0 && cardMoving?.cards) {
        console.log(isValidMove(cardMoving, overPlace, columns, stacks));
      }
    }
  };

  const handleDragEnd = (event) => {
    if (event.over) {
      const dropPlace = event.over.id.split("-");
      const validation = isValidMove(cardMoving, dropPlace, columns, stacks);
      if (validation) {
        switch (dropPlace[0]) {
          case "column":
            const newColumns = [...columns];
            cardMoving.cards.forEach((card) => {
              newColumns[dropPlace[1]].push(card);
            });
            setColumns(newColumns);
            break;
          case "stack":
            const card = cardMoving.cards[0];
            const newStacks = [...stacks];
            newStacks[dropPlace[1]].push(card);
            setStacks(newStacks);
            break;
          default:
            break;
        }
        switch (cardMoving.startPlace) {
          case "column":
            const newColumns = [...columns];
            for (let i = 1; i <= cardMoving.cards.length; i++) {
              newColumns[cardMoving.index].pop();
            }
            const len = newColumns[cardMoving.index].length;
            if (len > 0) {
              newColumns[cardMoving.index][len - 1].side = "up";
            }
            setColumns(newColumns);
            break;
          case "stack":
            const newStacks = [...stacks];
            newStacks[cardMoving.index].pop();
            setStacks(newStacks);
            break;
          case "rejected":
            const newRejected = [...rejected];
            newRejected.pop();
            setRejected(newRejected);
            break;
          default:
            break;
        }
      }
      cardMoving.id = null;
      cardMoving.startPlace = null;
      cardMoving.cards = null;
    }
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div className="game-zone">
        <div className="top-game-zone">
          {stacks.map((item, index) => {
            return (
              <CardsStack id={`stack-${index}`} key={index} cards={item} />
            );
          })}
          <div
            className="deck"
            onClick={() => handleDeckPick(deck, setDeck, rejected, setRejected)}
            style={{ width: "100%" }}
          >
            <CardsDeck cards={deck} />
          </div>

          <CardsStack id={"rejected"} cards={rejected} />
        </div>
        <div className="bottom-game-zone">
          {columns.map((item, index) => {
            return (
              <CardsColumn id={`column-${index}`} key={index} cards={item} />
            );
          })}
        </div>
      </div>
    </DndContext>
  );
};

export default GameZone;
