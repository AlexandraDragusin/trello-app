// components/board/List.js
"use client";

import { useState } from "react";
import CardItem from "./CardItem";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function List({ list, onDelete, onUpdate, onCardSelect }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(list.name);

  const saveEdit = () => {
    onUpdate({ ...list, name });
    setEditing(false);
  };

  const addCard = () => {
    const title = prompt("Enter card title:");
    if (!title) return;
    const description = prompt("Enter card description:") || "";
    const newCard = {
      _id: Date.now().toString(),
      title,
      description
    };
    onUpdate({
      ...list,
      cards: [...list.cards, newCard],
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 min-w-[250px]">
      {editing ? (
        <div>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-2"
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
          <h2 className="font-semibold text-lg mb-2 text-gray-500">{list.name}</h2>
          <div className="flex gap-3 mb-4">
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

          <div className="space-y-2">
            {list.cards.map((card) => (
              <CardItem
                key={card._id}
                card={card}
                onClick={() => onCardSelect({ ...card, listId: list._id })}
              />
            ))}
          </div>

          <button
            onClick={addCard}
            className="mt-3 text-pink-600 text-sm hover:underline"
          >
            + Add Card
          </button>
        </>
      )}
    </div>
  );
}