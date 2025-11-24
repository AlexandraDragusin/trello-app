// app/api/boards/[id]/route.js
import { NextResponse } from 'next/server';
import connect from "@/lib/mongodb";
import Board from "@/models/Board";
import { transformBoard } from "@/lib/mongoUtils";

export async function GET(request, { params }) {
  try {
    await connect();
    const { id } = await params;
    const board = await Board.findById(id).lean();
    
    if (!board) {
      return NextResponse.json({ error: 'Board not found' }, { status: 404 });
    }
    
    return NextResponse.json(transformBoard(board));
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    await connect();
    const { id } = await params;
    const data = await request.json();
    
   const updatedBoard = await Board.findByIdAndUpdate(
      id, 
      data, 
      { 
        new: true,
        strict: false,
        runValidators: false
      }
    ).lean();
    
    if (!updatedBoard) {
      return NextResponse.json({ error: 'Board not found' }, { status: 404 });
    }
    
    return NextResponse.json(transformBoard(updatedBoard));
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connect();
    const { id } = await params;
    
    const deletedBoard = await Board.findByIdAndDelete(id);
    
    if (!deletedBoard) {
      return NextResponse.json({ error: 'Board not found' }, { status: 404 });
    }
    
    return new Response(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}