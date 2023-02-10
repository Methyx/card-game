import { useDroppable } from "@dnd-kit/core";

// components
import HandleColumn from "./HandleColumn";

// style
import "../style/cardsColumn.css";

const CardsColumn = ({ id, cards, borderColorOnMove }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div
      className="cardColumn"
      ref={setNodeRef}
      style={{
        border: isOver ? "3px solid var(--bs-success)" : null,
        height: `calc(var(--card-height) * ${1.1 + cards.length * 0.25})`,
      }}
    >
      <HandleColumn
        cards={cards}
        index={0}
        borderColorOnMove={borderColorOnMove}
      />
    </div>
  );
};

export default CardsColumn;
