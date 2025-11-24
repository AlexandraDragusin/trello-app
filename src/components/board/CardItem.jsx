"use client";

export default function CardItem({ card, onClick }) {
  return (
    <div
      className="bg-gray-50 p-2 rounded cursor-pointer hover:bg-gray-100 shadow-sm"
      onClick={onClick}
    >
      <h3 className="font-medium text-gray-800">{card.title}</h3>
      <p className="text-gray-500 text-sm truncate">{card.description}</p>
    </div>
  );
}
