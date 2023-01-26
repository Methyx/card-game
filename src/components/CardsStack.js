import { useDroppable } from "@dnd-kit/core";

// components
import Card from "./Card";

// style
import "../style/cardsStack.css";

const CardsStack = ({ id, cards }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });
  const style = {
    border: isOver ? "1px solid green" : null,
  };

  const isCards = cards.length > 0;
  return (
    <div
      className="cards-stack"
      ref={id !== "deck" ? setNodeRef : null}
      style={style}
    >
      {isCards ? (
        <div>
          {cards.map((item, index) => {
            return (
              <div className="card-in-stack" key={index}>
                <Card color={item.color} value={item.value} side={item.side} />
              </div>
            );
          })}
        </div>
      ) : (
        <Card />
      )}
    </div>
  );
};

export default CardsStack;
