import { NextRequest, NextResponse } from "next/server"
import type { ApiError, Todo } from "@/types"

export async function GET(request: NextRequest) {
  try {
    const url = request.nextUrl;
    const pathParts = url.pathname.split('/');
    const todoId = pathParts[pathParts.length - 1]; // pega o [id] da URL

    const token = request.headers.get('authorization')?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ message: "Token de autenticação não fornecido" }, { status: 401 })
    }

    // Fazer requisição para o backend Python
    const response = await fetch(`${process.env.BACKEND_URL}/todos/${todoId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.status === 404) {
      return NextResponse.json({ message: "Tarefa não encontrada" }, { status: 404 })
    }

    const data = (await response.json()) as Todo

    if (!response.ok) {
      return NextResponse.json(
        { message: (data as ApiError).detail || "Erro ao buscar tarefa" },
        { status: response.status },
      )
    }

    // Retornar resposta do backend
    return NextResponse.json(data)
  } catch (error) {
    console.error("Erro ao buscar tarefa:", error)
    return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { title, description } = await request.json();
    const url = request.nextUrl;
    const pathParts = url.pathname.split('/');
    const todoId = pathParts[pathParts.length - 1]; // pega o [id] da URL

    const token = request.headers.get('authorization')?.split(' ')[1];

    if (!token) {
      return NextResponse.json(
        { message: "Token de autenticação não fornecido" },
        { status: 401 },
      );
    }

    if (!title) {
      return NextResponse.json(
        { message: "Título da tarefa é obrigatório" },
        { status: 400 },
      );
    }

    const response = await fetch(`${process.env.BACKEND_URL}/todos/${todoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description }),
    });

    const data = (await response.json()) as Todo

    if (!response.ok) {
      return NextResponse.json(
        { message: (data as ApiError).detail || "Erro ao atualizar tarefa" },
        { status: response.status },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
    return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = request.nextUrl;
    const pathParts = url.pathname.split('/');
    const todoId = pathParts[pathParts.length - 1]; // pega o [id] da URL

    const token = request.headers.get('authorization')?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ message: "Token de autenticação não fornecido" }, { status: 401 })
    }

    // Fazer requisição para o backend Python
    const response = await fetch(`${process.env.BACKEND_URL}/todos/${todoId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.status === 404) {
      return NextResponse.json({ message: "Tarefa não encontrada" }, { status: 404 })
    }

    if (!response.ok) {
      const data = await response.json()
      return NextResponse.json(
        { message: (data as ApiError).detail || "Erro ao excluir tarefa" },
        { status: response.status },
      )
    }

    // Retornar resposta de sucesso
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro ao excluir tarefa:", error)
    return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 })
  }
}
