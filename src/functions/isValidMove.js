// functions
import { isFollowingValue, isOppositeColors } from "../functions/handleCards";

const isValidMove = (cardMoving, dropPlace, columns, stacks) => {
  let validation = true;
  switch (dropPlace[0]) {
    case "column":
      const lastCardIndexColumn = columns[dropPlace[1]].length - 1;
      if (lastCardIndexColumn >= 0) {
        const previousCard = columns[dropPlace[1]][lastCardIndexColumn];
        validation =
          isFollowingValue(cardMoving.cards[0], previousCard) &&
          isOppositeColors(previousCard, cardMoving.cards[0]);
      } else {
        if (cardMoving.cards[0].value !== "K") {
          validation = false;
        }
      }
      break;
    case "stack":
      if (cardMoving.cards.length > 1) {
        validation = false;
        break;
      } else {
        const card = cardMoving.cards[0];

        const lastCardIndexStack = stacks[dropPlace[1]].length - 1;
        if (lastCardIndexStack >= 0) {
          const lastCardInStack = stacks[dropPlace[1]][lastCardIndexStack];
          validation =
            card.color === lastCardInStack.color &&
            isFollowingValue(lastCardInStack, card);
        } else {
          if (card.value !== "A") {
            validation = false;
          }
        }
        break;
      }
    default:
      validation = false;
      break;
  }
  return validation;
};

export default isValidMove;
