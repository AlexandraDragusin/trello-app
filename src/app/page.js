// app/page.js
import connect from "@/lib/mongodb";
import Board from "@/models/Board";
import HomeClient from "./HomeClient";

export default async function HomePage() {
  await connect();

  const boardsData = await Board.find().lean();

  // Convert _id fields to strings
  const boards = boardsData.map((board) => ({
    ...board,
    _id: board._id.toString(),
    lists: (board.lists || []).map((list) => ({
      ...list,
      _id: list._id?.toString() || Date.now().toString(),
      id: list._id?.toString() || Date.now().toString(),
      cards: (list.cards || []).map((card) => ({
        ...card,
        _id: card._id?.toString() || Date.now().toString(),
        id: card._id?.toString() || Date.now().toString(),
      })),
    })),
  }));

  return <HomeClient initialBoards={boards} />;
}