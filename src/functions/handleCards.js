export const searchCardsMoving = (columns, stacks, rejected, card) => {
  for (let i = 0; i < columns.length; i++) {
    let index1 = columns[i].length - 1;
    while (index1 >= 0) {
      const lastCard = columns[i][index1];
      if (lastCard.value === card.value && lastCard.color === card.color) {
        return { place: "column", number: i, cards: columns[i].slice(index1) };
      }
      index1--;
    }
  }
  for (let i = 0; i < stacks.length; i++) {
    let index2 = stacks[i].length - 1;
    while (index2 >= 0) {
      const lastCard = stacks[i][index2];
      if (lastCard.value === card.value && lastCard.color === card.color) {
        return { place: "stack", number: i, cards: stacks[i].slice(index2) };
      }
      index2--;
    }
  }
  if (
    rejected.length > 0 &&
    rejected[rejected.length - 1].value === card.value &&
    rejected[rejected.length - 1].color === card.color
  ) {
    return {
      place: "rejected",
      number: null,
      cards: [rejected[rejected.length - 1]],
    };
  }
  return null;
};

export const isOppositeColors = (card1, card2) => {
  let result = false;
  switch (card1.color) {
    case "heart":
    case "diamond":
      result = card2.color === "spade" || card2.color === "club";
      break;
    case "club":
    case "spade":
      result = card2.color === "heart" || card2.color === "diamond";
      break;
    default:
      break;
  }
  return result;
};

export const isFollowingValue = (card1, card2) => {
  const valuesList = [
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
  let result = false;
  const index1 = valuesList.indexOf(card1.value);
  const index2 = valuesList.indexOf(card2.value);
  if (index1 !== -1 && index2 === index1 + 1) {
    result = true;
  }
  return result;
};
