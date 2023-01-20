// components
import Card from "./Card";

// style
import "../style/cardsStack.css";

const CardsStack = ({ cards }) => {
  const isCards = cards.length > 0;
  return isCards ? (
    <div className="cards-stack">
      {cards.map((item, index) => {
        return (
          <div className="card-in-stack" key={index}>
            <Card color={item.color} value={item.value} side={item.side} />
          </div>
        );
      })}
    </div>
  ) : (
    <Card />
  );
};

export default CardsStack;
