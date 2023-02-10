import { useDraggable } from "@dnd-kit/core";

// components
import Card from "./Card";

const HandleStack = ({ card, borderColorOnMove }) => {
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

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="card-in-stack"
      {...attributes}
      {...listeners}
    >
      <Card color={card.color} value={card.value} side={card.side} />
    </div>
  );
};

export default HandleStack;
