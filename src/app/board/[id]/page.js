// app/board/[id]/page.js
import connect from "@/lib/mongodb";
import Board from "@/models/Board";
import BoardClient from "./BoardClient";
import { transformBoard } from "@/lib/mongoUtils";

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

  const board = transformBoard(boardData);

  return <BoardClient board={board} boardId={board._id} />;
}