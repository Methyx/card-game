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
  return value ? (
    <div className={side === "down" ? "card back" : "card"}>
      {side === "up" && (
        <div className="card-top">
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
