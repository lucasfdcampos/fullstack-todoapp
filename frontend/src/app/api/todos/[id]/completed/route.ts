import { NextRequest, NextResponse } from "next/server"
import type { ApiError, Todo } from "@/types"


export async function PATCH(request: NextRequest) {
  try {
    const url = request.nextUrl;
    const completed = url.searchParams.get('completed') === 'true';

    const pathParts = url.pathname.split('/');
    const todoId = pathParts[pathParts.length - 2]; // pega o [id] da URL

    const token = request.headers.get('authorization')?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ message: "Token de autenticação não fornecido" }, { status: 401 })
    }

    const response = await fetch(`${process.env.BACKEND_URL}/todos/${todoId}/completed?completed=${completed}`, {
      method: "PATCH",
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
        { message: (data as ApiError).detail || "Erro ao atualizar status da tarefa" },
        { status: response.status },
      )
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro ao atualizar status da tarefa:", error)
    return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 })
  }
}
