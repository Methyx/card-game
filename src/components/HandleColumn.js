import { useDraggable } from "@dnd-kit/core";

// components
import Card from "./Card";

const HandleColumn = ({ cards, index, borderColorOnMove }) => {
  const card = cards[index];
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${card?.color}-${card?.value}`,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0) scale(1.05)`,
        zIndex: 100,
        boxShadow: `0 0 10px 5px ${borderColorOnMove}`,
      }
    : undefined;

  return index === cards.length ? (
    <></>
  ) : card.side === "up" ? (
    <div
      className="card-in-column"
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
    >
      <Card color={card.color} value={card.value} side={card.side} />
      <HandleColumn
        cards={cards}
        index={index + 1}
        borderColorOnMove={borderColorOnMove}
      />
    </div>
  ) : (
    <div className="card-in-column" ref={setNodeRef} style={style} disabled>
      <Card color={card.color} value={card.value} side={card.side} />
      <HandleColumn
        cards={cards}
        index={index + 1}
        borderColorOnMove={borderColorOnMove}
      />
    </div>
  );
};

export default HandleColumn;
