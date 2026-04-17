"use client";
import { signIn } from "next-auth/react";

export default function AdminLogin() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="bg-zinc-900 border border-zinc-800 p-10 w-full max-w-sm text-center">
        <p className="text-[#C4882A] text-xs font-bold uppercase tracking-widest mb-2">Admin</p>
        <h1 className="text-white text-2xl font-black mb-8">Ayanco CMS</h1>
        <button
          onClick={() => signIn("google", { callbackUrl: "/admin" })}
          className="w-full h-11 bg-[#C4882A] hover:bg-[#D4952E] text-black font-bold text-sm transition-colors"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}