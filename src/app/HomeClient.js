// app/HomeClient.js
"use client";

import { useState, useEffect } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import BoardCard from "./BoardCard";

export default function HomeClient() {
  const [boards, setBoards] = useState([]);
  const [newBoardName, setNewBoardName] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch boards on component mount
  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const res = await fetch('/api/boards');
      if (!res.ok) throw new Error('Failed to fetch boards');
      
      const boardsData = await res.json();
      setBoards(boardsData);
    } catch (error) {
      console.error('Error fetching boards:', error);
      alert('Error loading boards: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const addBoard = async () => {
    if (!newBoardName.trim()) return;

    try {
      const res = await fetch("/api/boards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newBoardName }),
      });
      
      if (!res.ok) throw new Error('Failed to create board');
      
      const board = await res.json();
      setBoards([...boards, board]);
      setNewBoardName("");
    } catch (error) {
      console.error('Error creating board:', error);
      alert('Failed to create board: ' + error.message);
    }
  };

  const deleteBoard = async (id) => {
    try {
      await fetch(`/api/boards/${id}`, { method: "DELETE" });
      // Re-fetch to ensure we have latest data
      await fetchBoards();
    } catch (error) {
      console.error('Error deleting board:', error);
      alert('Failed to delete board: ' + error.message);
    }
  };

  const updateBoard = async (id, newName) => {
    try {
      const res = await fetch(`/api/boards/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });

      if (!res.ok) throw new Error('Failed to update board');
      
      // Re-fetch to ensure we have latest data
      await fetchBoards();
      return true;
    } catch (error) {
      console.error('Error saving edit:', error);
      alert('Failed to save board name: ' + error.message);
      return false;
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 p-10">
        <h1 className="text-3xl font-bold mb-6 text-pink-600">Alello</h1>
        <div className="text-center">Loading boards...</div>
      </main>
    );
  }

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