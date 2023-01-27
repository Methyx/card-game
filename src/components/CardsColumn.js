import { useDroppable } from "@dnd-kit/core";

// components
import HandleColumn from "./HandleColumn";

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
      <HandleColumn cards={cards} index={0} />
    </div>
  );
};

export default CardsColumn;
