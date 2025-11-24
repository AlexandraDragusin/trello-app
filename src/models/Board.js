import mongoose from "mongoose";

const CardSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const ListSchema = new mongoose.Schema({
  name: String,
  cards: [CardSchema],
});

const BoardSchema = new mongoose.Schema({
  name: String,
  lists: [ListSchema],
});

const Board = mongoose.models.Board || mongoose.model("Board", BoardSchema);

export default Board;
