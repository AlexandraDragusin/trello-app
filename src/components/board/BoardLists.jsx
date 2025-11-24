"use client";

import List from "./List";

export default function BoardLists({ lists, setLists, onCardSelect }) {
  const deleteList = (id) => setLists(lists.filter((l) => l.id !== id));

  const updateList = (id, updatedList) => {
    setLists(lists.map((l) => (l.id === id ? updatedList : l)));
  };

  return (
    <div className="flex gap-6 overflow-x-auto">
      {lists.map((list) => (
        <List
          key={list.id}
          list={list}
          onDelete={() => deleteList(list.id)}
          onUpdate={(updatedList) => updateList(list.id, updatedList)}
          onCardSelect={onCardSelect}
        />
      ))}
    </div>
  );
}
