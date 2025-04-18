import LoginForm from "@/components/login-form"
import { ThemeToggle } from "@/components/theme-toggle"

export default function RegisterPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-light dark:bg-gray-900 p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <LoginForm />
    </main>
  )
}
