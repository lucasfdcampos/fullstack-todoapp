import LoginForm from "@/components/login-form";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-muted">
      <div className="w-full max-w-md mx-auto">
        <LoginForm />
      </div>
    </div>
  );
}
