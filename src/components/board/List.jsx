// components/board/List.js
"use client";

import { useState } from "react";
import CardItem from "./CardItem";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function List({ list, onDelete, onUpdate, onCardSelect }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(list.name);
  const [addingCard, setAddingCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");
  const [newCardDescription, setNewCardDescription] = useState("");

  const saveEdit = () => {
    onUpdate({ ...list, name });
    setEditing(false);
  };

  const startAddCard = () => {
    setAddingCard(true);
    setNewCardTitle("");
    setNewCardDescription("");
  };

  const cancelAddCard = () => {
    setAddingCard(false);
    setNewCardTitle("");
    setNewCardDescription("");
  };

  const saveAddCard = () => {
    if (!newCardTitle.trim()) return;
    
    const newCard = {
      _id: Date.now().toString(),
      title: newCardTitle.trim(),
      description: newCardDescription.trim()
    };
    
    onUpdate({
      ...list,
      cards: [...list.cards, newCard],
    });
    
    setAddingCard(false);
    setNewCardTitle("");
    setNewCardDescription("");
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 min-w-[250px] max-w-[250px] h-fit"> {/* 👈 h-fit pentru înălțime naturală */}
      {editing ? (
        <div>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-2"
            placeholder="List name"
          />
          <div className="flex gap-2">
            <Button onClick={saveEdit}>Save</Button>
            <Button variant="gray" onClick={() => setEditing(false)}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <h2 className="font-semibold text-lg text-gray-500 mb-2 break-words">{list.name}</h2>
            <div className="flex gap-3">
              <button
                onClick={() => setEditing(true)}
                className="text-yellow-600 text-sm hover:underline"
              >
                Edit
              </button>
              <button
                onClick={onDelete}
                className="text-red-500 text-sm hover:underline"
              >
                Delete
              </button>
            </div>
          </div>

          <div className="space-y-2 min-h-[40px]">
            {list.cards.map((card) => (
              <CardItem
                key={card._id}
                card={card}
                onClick={() => onCardSelect({ ...card, listId: list._id })}
              />
            ))}
          </div>
          
          {/* Add Card Section */}
          {addingCard ? (
            <div className="mt-3 p-3 rounded border border-gray-400">
              <Input
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                placeholder="Card title"
                className="w-full mb-2"
                autoFocus
              />
              <textarea
                value={newCardDescription}
                onChange={(e) => setNewCardDescription(e.target.value)}
                placeholder="Card description (optional)"
                className="w-full p-2 border border-gray-300 rounded text-sm resize-none h-16 placeholder-gray-500"
              />
              <div className="flex gap-2 mt-2">
                <Button onClick={saveAddCard} variant="pink" className="text-sm flex-1">
                  Add
                </Button>
                <Button onClick={cancelAddCard} variant="gray" className="text-sm flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <button
              onClick={startAddCard}
              className="mt-3 text-pink-600 text-sm hover:underline w-full text-left"
            >
              + Add Card
            </button>
          )}
        </>
      )}
    </div>
  );
}