// app/board/[id]/page.js
import connect from "@/lib/mongodb";
import Board from "@/models/Board";
import BoardClient from "./BoardClient";

export default async function BoardPage({ params }) {
  await connect();
  const { id } = await params;
  
  const boardData = await Board.findById(id).lean();

  if (!boardData) {
    return (
      <main className="min-h-screen p-10 bg-gray-100">
        <h1 className="text-3xl font-bold text-pink-600">Board not found</h1>
      </main>
    );
  }

  // Convert _id fields to strings
  const board = {
    ...boardData,
    _id: boardData._id.toString(),
    lists: (boardData.lists || []).map((list) => ({
      ...list,
      _id: list._id?.toString() || Date.now().toString(),
      id: list._id?.toString() || Date.now().toString(),
      cards: (list.cards || []).map((card) => ({
        ...card,
        _id: card._id?.toString() || Date.now().toString(),
        id: card._id?.toString() || Date.now().toString(),
      })),
    })),
  };

  return <BoardClient board={board} boardId={board._id} />;
}