// components
import Card from "./Card";

// style
import "../style/cardsStack.css";

const CardsDeck = ({ cards }) => {
  const isCards = cards.length > 0;
  return (
    <div>
      {isCards ? (
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
      )}
    </div>
  );
};

export default CardsDeck;
