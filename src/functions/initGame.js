// functions
import generatePack from "./generatePack";

const initGame = () => {
  const deck = generatePack();
  const columns = [[], [], [], [], [], []];
  // init game
  let n = 6;
  for (let i = 0; i < 6; i++) {
    for (let j = 1; j <= n; j++) {
      const card = deck.shift();
      if (j === n) {
        card.side = "up";
      }
      columns[j - 1].push(card);
    }
    n--;
  }
  return [deck, columns];
};

export default initGame;
