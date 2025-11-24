"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function BoardHeader({ lists, setLists }) {
  const [newListName, setNewListName] = useState("");

  const addList = () => {
    if (!newListName.trim()) return;
    setLists([...lists, { id: Date.now(), name: newListName, cards: [] }]);
    setNewListName("");
  };

  return (
    <div className="flex gap-2 mb-6">
      <Input
        placeholder="New list name"
        value={newListName}
        onChange={(e) => setNewListName(e.target.value)}
      />
      <Button onClick={addList}>Add List</Button>
    </div>
  );
}
