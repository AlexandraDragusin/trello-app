// components/board/BoardLists.js
"use client";

import List from "./List";

export default function BoardLists({ lists, setLists, onCardSelect }) {
  const deleteList = (id) => setLists(lists.filter((l) => l._id !== id));

  const updateList = (id, updatedList) => {
    setLists(lists.map((l) => (l._id === id ? updatedList : l)));
  };

  return (
    <div className="flex gap-6 overflow-x-auto">
      {lists.map((list) => (
        <List
          key={list._id}
          list={list}
          onDelete={() => deleteList(list._id)}
          onUpdate={(updatedList) => updateList(list._id, updatedList)}
          onCardSelect={onCardSelect}
        />
      ))}
    </div>
  );
}
