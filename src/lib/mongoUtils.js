// lib/mongoUtils.js
export function transformBoard(board) {
  if (!board) return null;

  return {
    ...board,
    _id: board._id.toString(),
    lists: (board.lists || []).map(transformList),
  };
}

export function transformList(list) {
  const listId = list._id?.toString() || Date.now().toString();
  
  return {
    ...list,
    _id: listId,
    cards: (list.cards || []).map(transformCard),
  };
}

export function transformCard(card) {
  const cardId = card._id?.toString() || Date.now().toString();
  
  return {
    ...card,
    _id: cardId,
  };
}

export function transformBoards(boards) {
  return boards.map(transformBoard);
}