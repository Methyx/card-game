import { useState } from "react";
import { DndContext } from "@dnd-kit/core";

// components
import CardsColumn from "./CardsColumn";
import CardsStack from "./CardsStack";
import CardsDeck from "./CardsDeck";

// functions
import initGame from "../functions/initGame";
import {
  searchCardsMoving,
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

  const cardMoving = { id: null, startPlace: null, index: null, cards: null };

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

  const handleDragEnd = (event) => {
    if (event.over) {
      const dropPlace = event.over.id.split("-");
      // drag and drop to same place
      if (cardMoving.startPlace === Number(dropPlace[0])) {
        if (dropPlace.length === 1) {
          cardMoving.id = null;
          return;
        } else {
          if (cardMoving.index === Number(dropPlace[1])) {
            cardMoving.id = null;
            return;
          }
        }
      }
      // dop to another place
      // const card = {
      //   color: cardMoving.id.split("-")[0],
      //   value: cardMoving.id.split("-")[1],
      //   side: "up",
      // };
      let validation = true;
      switch (dropPlace[0]) {
        case "column":
          const newColumns = [...columns];
          const lastCardIndexColumn = newColumns[dropPlace[1]].length - 1;
          if (lastCardIndexColumn >= 0) {
            const previousCard = newColumns[dropPlace[1]][lastCardIndexColumn];
            validation =
              isFollowingValue(cardMoving.cards[0], previousCard) &&
              isOppositeColors(previousCard, cardMoving.cards[0]);
            if (validation) {
              cardMoving.cards.forEach((card) => {
                newColumns[dropPlace[1]].push(card);
              });
              setColumns(newColumns);
            }
          } else {
            if (cardMoving.cards[0].value === "K") {
              cardMoving.cards.forEach((card) => {
                newColumns[dropPlace[1]].push(card);
              });
              setColumns(newColumns);
            } else {
              validation = false;
            }
          }
          break;
        case "stack":
          if (cardMoving.cards.length > 1) {
            validation = false;
            break;
          } else {
            const card = cardMoving.cards[0];
            const newStacks = [...stacks];
            const lastCardIndexStack = newStacks[dropPlace[1]].length - 1;
            if (lastCardIndexStack >= 0) {
              const lastCardInStack =
                newStacks[dropPlace[1]][lastCardIndexStack];
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
          }
        default:
          validation = false;
          break;
      }
      if (validation) {
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
            <CardsDeck cards={deck} />
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
