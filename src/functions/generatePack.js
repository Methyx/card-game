const shuffleDeck = (deck) => {
  const nbshuffles = 500;
  for (let i = 0; i < nbshuffles; i++) {
    const index1 = Math.random() * deck.length;
    const card = deck.splice(index1, 1)[0];
    const index2 = Math.random() * deck.length;
    deck.splice(index2, 0, card);
  }
  return deck;
};

const generatePack = () => {
  const colors = ["spade", "heart", "diamond", "club"];
  const values = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];
  const deck = [];
  for (let i = 0; i < colors.length; i++) {
    for (let j = 0; j < values.length; j++) {
      deck.push({
        color: colors[i],
        value: values[j],
        side: "down",
      });
    }
  }
  return shuffleDeck(deck);
};

export default generatePack;
