// lib/mongoUtils.js
import mongoose from "mongoose";

export function transformBoard(board) {
  if (!board) return null;

  return {
    ...board,
    _id: board._id.toString(),
    lists: (board.lists || []).map(transformList),
  };
}

export function transformList(list) {
  const listId = list._id?.toString() || new mongoose.Types.ObjectId().toString();
  
  return {
    ...list,
    _id: listId,
    cards: (list.cards || []).map(transformCard),
  };
}

export function transformCard(card) {
  const cardId = card._id?.toString() || new mongoose.Types.ObjectId().toString();
  
  return {
    ...card,
    _id: cardId,
  };
}

export function transformBoards(boards) {
  return boards.map(transformBoard);
}