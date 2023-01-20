// components
import Card from "./Card";

// style
import "../style/cardsColumn.css";

const CardsColumn = ({ cards }) => {
  return (
    <div className="cardColumn">
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
