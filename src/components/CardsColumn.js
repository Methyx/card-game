import { useDroppable } from "@dnd-kit/core";

// components
import Card from "./Card";

// style
import "../style/cardsColumn.css";

const CardsColumn = ({ id, cards }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div
      className="cardColumn"
      ref={setNodeRef}
      style={{
        border: isOver ? "1px solid green" : null,
        height: `calc(var(--card-height) * ${1 + cards.length * 0.15})`,
      }}
    >
      {cards.map((item, index) => {
        return (
          <div
            className="card-in-column"
            key={index}
            style={{
              top: `calc(var(--card-height) * ${index * 0.15})`,
            }}
          >
            <Card color={item.color} value={item.value} side={item.side} />
          </div>
        );
      })}
    </div>
  );
};

export default CardsColumn;
