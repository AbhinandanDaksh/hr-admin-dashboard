export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#faf9fa] relative flex items-center justify-center p-4 sm:p-8 text-zinc-800 antialiased selection:bg-rose-100 selection:text-rose-900 overflow-x-hidden">
      {/* Soft atmospheric background gradients (calm, subtle, non-intrusive) */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-rose-100/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-pink-100/20 rounded-full blur-[90px] pointer-events-none" />

      <div className="w-full max-w-5xl relative z-10 my-auto">
        {children}
      </div>
    </div>
  );
}


