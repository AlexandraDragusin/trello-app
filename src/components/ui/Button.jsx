"use client";

export default function Button({
  children,
  onClick,
  variant = "pink",
  className = "",
}) {
  const base =
    "px-4 py-2 rounded font-medium transition-colors duration-150";

  const styles = {
    pink: "bg-pink-600 text-white hover:bg-pink-700",
    gray: "bg-gray-400 text-white hover:bg-gray-500",
    red: "bg-red-500 text-white hover:bg-red-600",
    green: "bg-green-500 text-white hover:bg-green-600",
  };

  return (
    <button
      onClick={onClick}
      className={`${base} ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
