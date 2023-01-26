import { useDraggable } from "@dnd-kit/core";

// style
import "../style/card.css";

// function
const colorIcon = (color) => {
  switch (color) {
    case "spade":
      return <i className="bi-suit-spade-fill" style={{ color: "black" }}></i>;
    case "heart":
      return <i className="bi-heart-fill" style={{ color: "red" }}></i>;
    case "diamond":
      return <i className="bi-diamond-fill" style={{ color: "red" }}></i>;
    case "club":
      return <i className="bi-suit-club-fill" style={{ color: "black" }}></i>;
    default:
      return;
  }
};

const Card = ({ color, value, side }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${color}-${value}`,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 100,
      }
    : undefined;

  return value ? (
    <div
      className={side === "down" ? "card back" : "card"}
      ref={setNodeRef}
      style={style}
      disabled={side === "down" ? true : false}
    >
      {side === "up" && (
        <div className="card-top" {...listeners} {...attributes}>
          <div className="top">
            <span>{value}</span>
            {colorIcon(color)}
          </div>
          <div className="middle">{colorIcon(color)}</div>
          <div className="bottom-card">
            <span>{value}</span>
            {colorIcon(color)}
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="empty-card"></div>
  );
};

export default Card;
