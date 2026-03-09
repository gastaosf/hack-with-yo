"use client";

import { useLoginWithEmail, usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function LoginPage() {
  const { authenticated } = usePrivy();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"email" | "code">("email");
  const [error, setError] = useState("");

  const { sendCode, loginWithCode, state } = useLoginWithEmail({
    onComplete: () => router.replace("/dashboard"),
    onError: (err) => setError(String(err) ?? "Something went wrong"),
  });

  useEffect(() => {
    if (authenticated) router.replace("/dashboard");
  }, [authenticated, router]);

  const isPending = state.status === "sending-code" || state.status === "awaiting-code-input";

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    await sendCode({ email });
    setStep("code");
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    await loginWithCode({ code });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f1729] px-6">
      {/* Logo */}
      <div className="mb-12 text-center">
        <div className="text-4xl font-bold text-white tracking-widest mb-1">manna</div>
        <div className="text-sm text-white/40 tracking-wider">Business Savings</div>
      </div>

      {/* Card */}
      <div className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl">
        {step === "email" ? (
          <form onSubmit={handleSendCode} className="flex flex-col gap-4">
            <div>
              <h2 className="text-lg font-semibold text-[#0f1729] mb-1">Sign in</h2>
              <p className="text-sm text-gray-400">Enter your company email address</p>
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0f1729] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/40 focus:border-[#c9a84c] transition"
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={!email || isPending}
              className="w-full bg-[#0f1729] text-white rounded-xl py-3 text-sm font-semibold hover:bg-[#1a2744] disabled:opacity-40 transition-colors"
            >
              {isPending ? "Sending..." : "Continue"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyCode} className="flex flex-col gap-4">
            <div>
              <h2 className="text-lg font-semibold text-[#0f1729] mb-1">Check your email</h2>
              <p className="text-sm text-gray-400">
                We sent a 6-digit code to <span className="font-medium text-[#0f1729]">{email}</span>
              </p>
            </div>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="000000"
              maxLength={6}
              inputMode="numeric"
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-2xl text-center text-[#0f1729] font-bold tracking-[0.5em] placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/40 focus:border-[#c9a84c] transition"
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={code.length < 6 || isPending}
              className="w-full bg-[#0f1729] text-white rounded-xl py-3 text-sm font-semibold hover:bg-[#1a2744] disabled:opacity-40 transition-colors"
            >
              {isPending ? "Verifying..." : "Sign in"}
            </button>
            <button
              type="button"
              onClick={() => { setStep("email"); setCode(""); setError(""); }}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              Use a different email
            </button>
          </form>
        )}
      </div>

      <p className="mt-8 text-xs text-white/20 text-center max-w-xs">
        Access is restricted to KYB-verified companies only.
      </p>
    </div>
  );
}
