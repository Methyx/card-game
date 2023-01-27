import { useState } from "react";
import { DndContext } from "@dnd-kit/core";

// components
import CardsColumn from "./CardsColumn";
import CardsStack from "./CardsStack";

// functions
import initGame from "../functions/initGame";
import {
  searchCardPlace,
  isFollowingValue,
  isOppositeColors,
} from "../functions/handleCards";

// style
import "../style/gameZone.css";

const GameZone = () => {
  const [initDeck, initColumns] = initGame();
  const [deck, setDeck] = useState(initDeck);
  const [columns, setColumns] = useState(initColumns);
  const [stacks, setStacks] = useState([[], [], [], []]);
  const [rejected, setRejected] = useState([]);

  const cardMoving = { id: null, startPlace: null, index: null };

  const handleDeckPick = () => {
    if (deck.length > 0) {
      const newDeck = [...deck];
      const newRejected = [...rejected];
      const cardPicked = newDeck.shift();
      setDeck(newDeck);
      cardPicked.side = "up";
      newRejected.push(cardPicked);
      setRejected(newRejected);
    } else {
      if (rejected.length > 0) {
        const newDeck = [];
        const newRejected = [...rejected];
        const len = newRejected.length;
        for (let i = 0; i < len; i++) {
          const card = newRejected.shift();
          card.side = "down";
          newDeck.push(card);
        }
        setDeck(newDeck);
        setRejected([]);
      }
    }
  };

  const handleDragStart = (event) => {
    cardMoving.id = event.active.id;
    const idTab = event.active.id.split("-");
    const search = searchCardPlace(columns, stacks, rejected, {
      color: idTab[0],
      value: idTab[1],
    });
    if (search) {
      cardMoving.startPlace = search.place;
      cardMoving.index = search.number?.toString() || null;
    }
  };

  const handleDragEnd = (event) => {
    if (event.over) {
      const dropPlace = event.over.id.split("-");
      // drag and drop to same place
      if (cardMoving.startPlace === dropPlace[0]) {
        if (dropPlace.length === 1) {
          cardMoving.id = null;
          return;
        } else {
          if (cardMoving.index === dropPlace[1]) {
            cardMoving.id = null;
            return;
          }
        }
      }
      // dop to another place
      const card = {
        color: cardMoving.id.split("-")[0],
        value: cardMoving.id.split("-")[1],
        side: "up",
      };
      let validation = true;
      switch (dropPlace[0]) {
        case "column":
          const newColumns = [...columns];
          const lastCardIndexColumn = newColumns[dropPlace[1]].length - 1;
          if (lastCardIndexColumn >= 0) {
            const previousCard = newColumns[dropPlace[1]][lastCardIndexColumn];
            validation =
              isFollowingValue(card, previousCard) &&
              isOppositeColors(previousCard, card);
            if (validation) {
              newColumns[dropPlace[1]].push(card);
              setColumns(newColumns);
            }
          } else {
            if (card.value === "K") {
              newColumns[dropPlace[1]].push(card);
              setColumns(newColumns);
            } else {
              validation = false;
            }
          }
          break;
        case "stack":
          const newStacks = [...stacks];
          const lastCardIndexStack = newStacks[dropPlace[1]].length - 1;
          if (lastCardIndexStack >= 0) {
            const lastCardInStack = newStacks[dropPlace[1]][lastCardIndexStack];
            validation =
              card.color === lastCardInStack.color &&
              isFollowingValue(lastCardInStack, card);
            if (validation) {
              newStacks[dropPlace[1]].push(card);
              setStacks(newStacks);
            }
          } else {
            if (card.value === "A") {
              newStacks[dropPlace[1]].push(card);
              setStacks(newStacks);
            } else {
              validation = false;
            }
          }
          break;
        default:
          validation = false;
          break;
      }
      if (validation) {
        switch (cardMoving.startPlace) {
          case "column":
            const newColumns = [...columns];
            newColumns[cardMoving.index].pop();
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
    }
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="game-zone">
        <div className="top">
          {stacks.map((item, index) => {
            return (
              <CardsStack id={`stack-${index}`} key={index} cards={item} />
            );
          })}
          <div
            className="deck"
            onClick={handleDeckPick}
            style={{ width: "100%" }}
          >
            <CardsStack id={"deck"} cards={deck} />
          </div>

          <CardsStack id={"rejected"} cards={rejected} />
        </div>
        <div className="bottom">
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
