// app/BoardCard.js
"use client";

import { useState } from "react";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function BoardCard({ board, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(board.name);

  const handleSave = async () => {
    const success = await onUpdate(board._id, editedName);
    if (success) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedName(board.name);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${board.name}"?`)) {
      onDelete(board._id);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition min-h-[120px]">
      {isEditing ? (
        // Edit Mode
        <div className="flex flex-col gap-3">
          <Input 
            value={editedName} 
            onChange={(e) => setEditedName(e.target.value)}
            autoFocus
          />
          <div className="flex gap-2">
            <Button onClick={handleSave} variant="pink" className="flex-1">
              Save
            </Button>
            <Button onClick={handleCancel} variant="gray" className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        // View Mode
        <>
          <Link href={`/board/${board._id}`} className="flex-1">
            <h2 className="text-xl font-semibold text-pink-500 hover:text-pink-600 cursor-pointer mb-3">
              {board.name}
            </h2>
          </Link>
          
          <div className="flex gap-3 justify-end pt-2 border-t border-gray-100">
            <button
              onClick={() => {
                setEditedName(board.name);
                setIsEditing(true);
              }}
              className="text-yellow-600 hover:text-yellow-700 text-sm font-medium"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-red-500 hover:text-red-600 text-sm font-medium"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}