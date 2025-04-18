import { NextResponse } from "next/server"
import type { ApiError } from "@/types"

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json()

    if (!username || !email || !password) {
      return NextResponse.json({ message: "Todos os campos são obrigatórios" }, { status: 400 })
    }

    const response = await fetch(`${process.env.BACKEND_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { message: (data as ApiError).detail || "Erro ao registrar usuário" },
        { status: response.status },
      )
    }

    return NextResponse.json({ username })
  } catch (error) {
    console.error("Erro no registro:", error)
    return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 })
  }
}
