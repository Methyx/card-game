import { useDraggable } from "@dnd-kit/core";

// components
import Card from "./Card";

const HandleStack = ({ card }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${card?.color}-${card?.value}`,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 100,
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
