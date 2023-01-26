export const searchCardPlace = (columns, stacks, rejected, card) => {
  for (let i = 0; i < columns.length; i++) {
    const last = columns[i].length - 1;
    if (last >= 0) {
      const lastCard = columns[i][last];
      if (lastCard.value === card.value && lastCard.color === card.color) {
        return { place: "column", number: i };
      }
    }
  }
  for (let i = 0; i < stacks.length; i++) {
    const last = stacks[i].length - 1;
    if (last >= 0) {
      const lastCard = stacks[i][last];
      if (lastCard.value === card.value && lastCard.color === card.color) {
        return { place: "stack", number: i };
      }
    }
  }
  if (
    rejected.length > 0 &&
    rejected[rejected.length - 1].value === card.value &&
    rejected[rejected.length - 1].color === card.color
  ) {
    return { place: "rejected", number: null };
  }
  return null;
};

export const placeCard = (gameCards, card, finalPlace) => {
  let index = 0;
  while (
    gameCards[index].color !== card.color &&
    gameCards[index].value !== card.value &&
    index < gameCards.length
  ) {
    index++;
  }
  gameCards[index].place = finalPlace;
};
