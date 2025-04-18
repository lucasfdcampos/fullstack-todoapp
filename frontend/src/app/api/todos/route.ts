import { NextResponse } from "next/server"
import type { ApiError } from "@/types"

export async function GET(request: Request) {
  try {
    const { headers } = request
    const token = headers.get("authorization")?.split(" ")[1]

    if (!token) {
      return NextResponse.json({ message: "Token de autenticação não fornecido" }, { status: 401 })
    }

    // Fazer requisição para o backend Python
    const response = await fetch(`${process.env.BACKEND_URL}/todos`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { message: (data as ApiError).detail || "Erro ao buscar tarefas" },
        { status: response.status },
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error)
    return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { headers } = request
    const token = headers.get("authorization")?.split(" ")[1]
    const { title, description } = await request.json()

    if (!token) {
      return NextResponse.json({ message: "Token de autenticação não fornecido" }, { status: 401 })
    }

    if (!title) {
      return NextResponse.json({ message: "Título da tarefa é obrigatório" }, { status: 400 })
    }

    const response = await fetch(`${process.env.BACKEND_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description }),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { message: (data as ApiError).detail || "Erro ao criar tarefa" },
        { status: response.status },
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Erro ao criar tarefa:", error)
    return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 })
  }
}
