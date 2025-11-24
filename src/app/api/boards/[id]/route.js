// app/api/boards/[id]/route.js
import { NextResponse } from 'next/server';
import connect from "@/lib/mongodb";
import Board from "@/models/Board";

export async function GET(request, { params }) {
  try {
    await connect();
    const { id } = await params;
    const board = await Board.findById(id).lean();
    
    if (!board) {
      return NextResponse.json({ error: 'Board not found' }, { status: 404 });
    }
    
    const plainBoard = {
      ...board,
      _id: board._id.toString(),
      lists: (board.lists || []).map(list => ({
        ...list,
        _id: list._id?.toString() || Date.now().toString(),
        id: list._id?.toString() || Date.now().toString(),
        cards: (list.cards || []).map(card => ({
          ...card,
          _id: card._id?.toString() || Date.now().toString(),
          id: card._id?.toString() || Date.now().toString(),
        })),
      })),
    };
    
    return NextResponse.json(plainBoard);
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
      { new: true }
    ).lean();
    
    if (!updatedBoard) {
      return NextResponse.json({ error: 'Board not found' }, { status: 404 });
    }
    
    const plainBoard = {
      ...updatedBoard,
      _id: updatedBoard._id.toString(),
      lists: (updatedBoard.lists || []).map(list => ({
        ...list,
        _id: list._id?.toString() || Date.now().toString(),
        id: list._id?.toString() || Date.now().toString(),
        cards: (list.cards || []).map(card => ({
          ...card,
          _id: card._id?.toString() || Date.now().toString(),
          id: card._id?.toString() || Date.now().toString(),
        })),
      })),
    };
    
    return NextResponse.json(plainBoard);
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