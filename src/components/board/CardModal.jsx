// components/board/CardModal.js
"use client";

import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function CardModal({ card, setCard, lists, setLists, onClose }) {
  const save = () => {
    setLists(
      lists.map((list) =>
        list._id === card.listId
          ? {
              ...list,
              cards: list.cards.map((c) => (c._id === card._id ? { ...card } : c)),
            }
          : list
      )
    );
    onClose();
  };

  const deleteCard = () => {
    setLists(
      lists.map((list) =>
        list._id === card.listId
          ? { ...list, cards: list.cards.filter((c) => c._id !== card._id) }
          : list
      )
    );
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4 text-gray-500">Edit Card</h2>

      <Input
        value={card.title}
        onChange={(e) => setCard({ ...card, title: e.target.value })}
        placeholder="Card title"
        className="w-full mb-3"
      />

      <textarea
        value={card.description}
        onChange={(e) => setCard({ ...card, description: e.target.value })}
        className="border-2 border-gray-300 p-2 rounded w-full mb-3 h-24 bg-white text-gray-800 focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
        placeholder="Card description"
      />

      <div className="flex justify-between mt-4">
        <Button onClick={save}>Save</Button>
        <Button variant="red" onClick={deleteCard}>
          Delete
        </Button>
        <Button variant="gray" onClick={onClose}>
          Close
        </Button>
      </div>
    </Modal>
  );
}