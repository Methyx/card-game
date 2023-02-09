const handleDeckPick = (deck, setDeck, rejected, setRejected) => {
  if (deck.length > 0) {
    const newDeck = [...deck];
    const newRejected = [...rejected];
    const cardPicked = newDeck.shift();
    setDeck(newDeck);
    cardPicked.side = "up";
    newRejected.push(cardPicked);
    setRejected(newRejected);
  } else {
    if (rejected.length > 0) {
      const newDeck = [];
      const newRejected = [...rejected];
      const len = newRejected.length;
      for (let i = 0; i < len; i++) {
        const card = newRejected.shift();
        card.side = "down";
        newDeck.push(card);
      }
      setDeck(newDeck);
      setRejected([]);
    }
  }
};

export default handleDeckPick;
