// functions
import generatePack from "./generatePack";

const initGame = () => {
  const deck = generatePack();
  // init game
  const columns = [];
  let n = 6;
  for (let i = 0; i < 6; i++) {
    columns[i] = [];
    for (let j = 0; j < n; j++) {
      const card = deck.shift();
      if (j === n - 1) {
        card.side = "up";
      }
      columns[i].push(card);
    }
    n--;
  }
  return [deck, columns];
};

export default initGame;
