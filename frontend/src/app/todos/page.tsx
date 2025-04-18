"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { TodoList } from "@/components/todo-list"

export default function TodosPage() {
  const router = useRouter()
  const [isAuthChecked, setIsAuthChecked] = useState(false)
  
  useEffect(() => {
    // Check if user is logged in
    const checkAuth = () => {
      try {
        const userData = localStorage.getItem("user")
        if (!userData) {
          router.push("/")
          return
        }
        
        // Parse the user data to validate it
        const user = JSON.parse(userData)
        if (!user || !user.token) {
          localStorage.removeItem("user") // Clear invalid data
          router.push("/")
          return
        }
        
        // User is authenticated
        setIsAuthChecked(true)
      } catch (error) {
        console.error("Error checking authentication:", error)
        router.push("/")
      }
    }
    
    checkAuth()
  }, [router])
  
  if (!isAuthChecked) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Verificando autenticação...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Todo App</h1>
          <p className="text-muted-foreground">
            Gerencie suas tarefas de forma simples e eficiente
          </p>
        </div>
        <TodoList />
      </div>
    </div>
  )
}