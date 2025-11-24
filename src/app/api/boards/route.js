// app/api/boards/route.js
import { NextResponse } from 'next/server';
import connect from "@/lib/mongodb";
import Board from "@/models/Board";
import { transformBoard } from "@/lib/mongoUtils";

export async function POST(request) {
  try {
    await connect();
    const { name } = await request.json();
    
    const board = await Board.create({ 
      name, 
      lists: [] 
    });
    
    return NextResponse.json(transformBoard(board.toObject()));
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connect();
    const boards = await Board.find().lean();
    return NextResponse.json(boards.map(transformBoard));
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}