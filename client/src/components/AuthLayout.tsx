// AuthLayout.tsx
export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen flex flex-col gap-4 items-center justify-center px-4 py-10">
      <h1 className="text-8xl font-bold">EventX</h1>
      {children}
    </main>
  );
}
