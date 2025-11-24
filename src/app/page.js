// app/page.js
import connect from "@/lib/mongodb";
import Board from "@/models/Board";
import HomeClient from "./HomeClient";
import { transformBoards } from "@/lib/mongoUtils";

export default async function HomePage() {
  await connect();

  const boardsData = await Board.find().lean();

  const boards = transformBoards(boardsData);

  return <HomeClient initialBoards={boards} />;
}