// app/HomeClient.js
"use client";

import { useState } from "react";
import Link from "next/link";
import Input from "@/components/ui/Input"; // Importă componenta Input
import Button from "@/components/ui/Button"; // Importă componenta Button

export default function HomeClient({ initialBoards }) {
  const [boards, setBoards] = useState(initialBoards || []);
  const [newBoardName, setNewBoardName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState("");

  // Add a new board
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

  // Delete board
  const deleteBoard = async (id) => {
    await fetch(`/api/boards/${id}`, { method: "DELETE" });
    setBoards(boards.filter((b) => b._id !== id));
  };

  // Save edited board
  const saveEdit = async (id) => {
    try {
      const res = await fetch(`/api/boards/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editedName }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Server error:', errorText);
        throw new Error(`Failed to update board: ${res.status}`);
      }

      const updated = await res.json();
      setBoards(boards.map((b) => (b._id === id ? updated : b)));
      setEditingId(null);
      setEditedName("");
    } catch (error) {
      console.error('Error saving edit:', error);
      alert('Failed to save board name: ' + error.message);
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
        />
        <Button onClick={addBoard}>
          Add Board
        </Button>
      </div>

      {/* Board grid */}
      <div className="grid grid-cols-3 gap-4">
        {boards.map((board) => (
          <div
            key={board._id}
            className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition"
          >
            {editingId === board._id ? (
              <div className="flex flex-col gap-2">
                <Input
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
                <div className="flex gap-2">
                  <Button 
                    onClick={() => saveEdit(board._id)}
                    variant="green"
                  >
                    Save
                  </Button>
                  <Button 
                    onClick={() => setEditingId(null)}
                    variant="gray"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <Link href={`/board/${board._id}`}>
                  <h2 className="text-xl font-semibold text-pink-500 cursor-pointer">
                    {board.name}
                  </h2>
                </Link>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => {
                      setEditingId(board._id);
                      setEditedName(board.name);
                    }}
                    className="text-yellow-600 text-sm hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteBoard(board._id)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}