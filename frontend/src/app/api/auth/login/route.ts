import { NextResponse } from "next/server"
import type { LoginResponse, ApiError } from "@/types"

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    // Validação básica
    if (!username || !password) {
      return NextResponse.json({ message: "Nome de usuário e senha são obrigatórios" }, { status: 400 })
    }

    if (!process.env.BACKEND_URL) {
      console.error("BACKEND_URL não está configurado nas variáveis de ambiente");
      return NextResponse.json(
        { message: "Erro de configuração do servidor" },
        { status: 500 }
      );
    }

    // Fazer requisição para o backend Python
    const response = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })

    let data: LoginResponse | ApiError;
    try {
      data = (await response.json()) as LoginResponse | ApiError;
    } catch (error) {
      console.error("Erro ao processar resposta do backend:", error);
      return NextResponse.json(
        { message: "Resposta inválida do servidor" },
        { status: 500 }
      );
    }

    if (!response.ok) {
      return NextResponse.json(
        { message: (data as ApiError).detail || "Credenciais inválidas" },
        { status: response.status }
      );
    }

    // Retornar resposta do backend
    return NextResponse.json({
      username,
      access_token: (data as LoginResponse).access_token,
    })
  } catch (error) {
    console.error("Erro no login:", {
      error,
      backendUrl: process.env.BACKEND_URL,
    });
    return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 })
  }
}
