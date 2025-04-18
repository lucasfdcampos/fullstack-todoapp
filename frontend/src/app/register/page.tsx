import RegisterForm from "@/components/register-form";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted bg-light dark:bg-gray-900 px-4">
      <div className="w-full flex items-center justify-center p-8 md:p-12">
        <div className="w-full max-w-lg space-y-8">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
