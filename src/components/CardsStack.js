import { useDroppable } from "@dnd-kit/core";

// components
import Card from "./Card";
import HandleStack from "./HandleStack";

// style
import "../style/cardsStack.css";

const CardsStack = ({ id, cards, borderColorOnMove }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });
  const style = {
    border: isOver ? "3px solid var(--bs-success)" : null,
  };

  const isCards = cards.length > 0;
  return (
    <div className="cards-stack" ref={setNodeRef} style={style}>
      {isCards ? (
        <div>
          {cards.map((item, index) => {
            return (
              <HandleStack
                card={item}
                key={index}
                borderColorOnMove={borderColorOnMove}
              />
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
