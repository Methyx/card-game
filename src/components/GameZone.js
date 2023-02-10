import { useContext, useState, useEffect } from "react";
import { DndContext } from "@dnd-kit/core";

// components
import CardsColumn from "./CardsColumn";
import CardsStack from "./CardsStack";
import CardsDeck from "./CardsDeck";
import Celebration from "./Celebration";

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
    gameWon,
    setGameWon,
  } = useContext(GameContext);

  // STATES
  const [cardMoving, setCardMoving] = useState({
    id: null,
    startPlace: null,
    index: null,
    cards: null,
  });
  const [borderColorOnMove, setBorderColorOnMove] = useState("red");

  // Functions
  const handleDragStart = (event) => {
    const idTab = event.active.id.split("-");
    const search = searchCardsMoving(columns, stacks, rejected, {
      color: idTab[0],
      value: idTab[1],
    });
    if (search) {
      setCardMoving({
        id: event.active.id,
        startPlace: search.place,
        index: search.number,
        cards: search.cards,
      });
      // console.log(cardMoving);
    }
  };

  const handleDragOver = (event) => {
    if (event.over) {
      // console.log(event.over);
      const overPlace = event.over.id?.split("-");
      if (overPlace && overPlace.length > 0 && cardMoving?.cards) {
        if (isValidMove(cardMoving, overPlace, columns, stacks)) {
          setBorderColorOnMove("green");
        } else {
          setBorderColorOnMove("red");
        }
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
      setCardMoving({
        id: null,
        startPlace: null,
        index: null,
        cards: null,
      });
    }
  };

  // check if 4 stacks are full --> WIN
  useEffect(() => {
    let win = true;
    for (let i = 0; i < stacks.length; i++) {
      if (stacks[i].length !== 13) {
        win = false;
      }
    }
    if (win) {
      setGameWon(true);
    }
  }, [stacks, setGameWon]);

  // Return
  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div className="game-zone">
        {gameWon ? (
          <Celebration />
        ) : (
          <>
            <div className="top-game-zone">
              {stacks.map((item, index) => {
                return (
                  <CardsStack
                    id={`stack-${index}`}
                    key={index}
                    cards={item}
                    borderColorOnMove={borderColorOnMove}
                  />
                );
              })}
              <div
                className="deck"
                onClick={() =>
                  handleDeckPick(deck, setDeck, rejected, setRejected)
                }
                style={{ width: "100%" }}
              >
                <CardsDeck cards={deck} />
              </div>

              <CardsStack
                id={"rejected"}
                cards={rejected}
                borderColorOnMove={borderColorOnMove}
              />
            </div>
            <div className="bottom-game-zone">
              {columns.map((item, index) => {
                return (
                  <CardsColumn
                    id={`column-${index}`}
                    key={index}
                    cards={item}
                    borderColorOnMove={borderColorOnMove}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
    </DndContext>
  );
};

export default GameZone;
