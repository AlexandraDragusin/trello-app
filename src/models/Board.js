// models/Board.js
import mongoose from "mongoose";

const CardSchema = new mongoose.Schema({
  _id: String,
  title: String,
  description: String,
}, { _id: true });

const ListSchema = new mongoose.Schema({
  _id: String,
  name: String,
  cards: [CardSchema],
}, { _id: true });

const BoardSchema = new mongoose.Schema({
  name: String,
  lists: [ListSchema],
});

const Board = mongoose.models.Board || mongoose.model("Board", BoardSchema);

export default Board;
