// app/board/[id]/BoardClient.js
"use client";

import { useState } from "react";
import BoardHeader from "@/components/board/BoardHeader";
import BoardLists from "@/components/board/BoardLists";
import CardModal from "@/components/board/CardModal";

export default function BoardClient({ board, boardId }) {
  const [lists, setLists] = useState(board.lists || []);
  const [selectedCard, setSelectedCard] = useState(null);

  const syncLists = async (updatedLists) => {
    setLists(updatedLists);
    await fetch(`/api/boards/${boardId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lists: updatedLists }),
    });
  };

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-6 text-pink-600">{board.name}</h1>

      <BoardHeader lists={lists} setLists={syncLists} />
      <BoardLists lists={lists} setLists={syncLists} onCardSelect={setSelectedCard} />

      {selectedCard && (
        <CardModal
          card={selectedCard}
          setCard={setSelectedCard}
          lists={lists}
          setLists={syncLists}
          onClose={() => setSelectedCard(null)}
        />
      )}
    </main>
  );
}
