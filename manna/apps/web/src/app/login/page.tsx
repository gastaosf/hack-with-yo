"use client";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const { ready, authenticated, login } = usePrivy();
  const router = useRouter();

  useEffect(() => {
    if (ready && authenticated) router.replace("/dashboard");
  }, [ready, authenticated, router]);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{
        background:
          "linear-gradient(160deg, #0d1321 0%, #111c30 50%, #0f2232 100%)",
      }}
    >
      <div className="w-full max-w-[380px] animate-slide-up">
        {/* Logo */}
        <div className="text-center mb-12">
          <div className="text-3xl font-bold text-[#4ec99b] tracking-tight">
            manna
          </div>
          <div className="text-[15px] text-white/50 mt-2">B2B Euro Savings</div>
        </div>

        {/* Card */}
        <div
          className="rounded-[24px] p-8"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(12px)",
          }}
        >
          <h1 className="text-[28px] font-bold text-white mb-2">
            Sign in to Manna
          </h1>
          <p className="text-[15px] text-white/60 mb-8">
            Enter your business email to continue
          </p>

          <Button
            className="w-full"
            size="lg"
            onClick={login}
            disabled={!ready}
          >
            Continue with email →
          </Button>

          <p className="text-center text-[12px] text-white/35 mt-6 leading-relaxed">
            By continuing, you agree to our{" "}
            <span className="text-white/50 cursor-pointer hover:text-white/70">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="text-white/50 cursor-pointer hover:text-white/70">
              Privacy Policy
            </span>
          </p>
        </div>

        {/* Trust signals */}
        <div className="mt-8 text-center text-[13px] text-white/35">
          SEPA bank transfer · No minimum · Withdraw anytime
        </div>
      </div>
    </div>
  );
}
