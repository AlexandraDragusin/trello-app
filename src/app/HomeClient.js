// app/HomeClient.js
"use client";

import { useState } from "react";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import BoardCard from "./BoardCard";

export default function HomeClient({ initialBoards }) {
  const [boards, setBoards] = useState(initialBoards || []);
  const [newBoardName, setNewBoardName] = useState("");

  const addBoard = async () => {
    if (!newBoardName.trim()) return;
    
    const res = await fetch("/api/boards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newBoardName }),
    });
    
    const board = await res.json();
    setBoards([...boards, board]);
    setNewBoardName("");
  };

  const deleteBoard = async (id) => {
    await fetch(`/api/boards/${id}`, { method: "DELETE" });
    setBoards(boards.filter((b) => b._id !== id));
  };

  const updateBoard = async (id, newName) => {
    try {
      const res = await fetch(`/api/boards/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });

      if (!res.ok) throw new Error('Failed to update board');
      
    //   const updated = await res.json();
    //   setBoards(boards.map((b) => (b._id === id ? updated : b)));
	  await fetchBoards();
      return true;
    } catch (error) {
      console.error('Error saving edit:', error);
      alert('Failed to save board name: ' + error.message);
      return false;
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-6 text-pink-600">Alello</h1>

      {/* Create new board */}
      <div className="flex gap-2 mb-6">
        <Input
          placeholder="New board name"
          value={newBoardName}
          onChange={(e) => setNewBoardName(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addBoard()}
        />
        <Button onClick={addBoard}>
          Add Board
        </Button>
      </div>

      {/* Board grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {boards.map((board) => (
          <BoardCard
            key={board._id}
            board={board}
            onDelete={deleteBoard}
            onUpdate={updateBoard}
          />
        ))}
        
        {boards.length === 0 && (
          <div className="col-span-3 text-center py-8 text-gray-500">
            No boards yet. Create your first board!
          </div>
        )}
      </div>
    </main>
  );
}