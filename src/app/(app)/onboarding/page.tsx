"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCompanyProfile } from "@/hooks/useCompanyProfile";
import { Building2, Globe, FileText, Mail, CheckCircle2, Loader2 } from "lucide-react";

type Step = "name" | "country" | "registration" | "email" | "verifying" | "approved";

export default function OnboardingPage() {
  const router = useRouter();
  const { saveProfile, isOnboarded } = useCompanyProfile();

  const [step, setStep] = useState<Step>("name");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [registration, setRegistration] = useState("");
  const [email, setEmail] = useState("");

  // If already onboarded, redirect to dashboard
  useEffect(() => {
    if (isOnboarded) {
      router.replace("/dashboard");
    }
  }, [isOnboarded, router]);

  const startVerification = () => {
    setStep("verifying");
    const delay = 6000 + Math.random() * 2000;
    setTimeout(() => setStep("approved"), delay);
  };

  const completeOnboarding = async () => {
    await saveProfile({
      name,
      country,
      registration,
      email,
      onboardingComplete: true,
    });
    router.replace("/dashboard");
  };

  const stepIndex = ["name", "country", "registration", "email", "verifying", "approved"].indexOf(step);
  const progressPercent = Math.min(((stepIndex + 1) / 6) * 100, 100);

  return (
    <div className="min-h-screen bg-[#fafaf5] flex flex-col">
      {/* Progress bar */}
      <div className="h-1 bg-gray-100">
        <div
          className="h-full bg-[#2d9f6f] transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="flex-1 flex flex-col px-6 pt-12">
        {/* Logo */}
        <div className="text-center mb-10">
          <p className="text-xl font-bold text-[#0d1321] tracking-wide">manna</p>
          <p className="text-xs text-gray-400 mt-1">Business account setup</p>
        </div>

        {/* Step: Company Name */}
        {step === "name" && (
          <div className="page-enter flex flex-col gap-6">
            <div className="w-12 h-12 rounded-xl bg-[#0d1321]/5 flex items-center justify-center">
              <Building2 size={22} className="text-[#0d1321]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#0d1321]">What is your company name?</h2>
              <p className="text-sm text-gray-400 mt-1">This will appear on your account and card.</p>
            </div>
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Acme GmbH"
              className="w-full bg-white rounded-xl px-4 py-4 text-sm font-medium text-[#0d1321] shadow-sm border border-gray-100 focus:outline-none focus:border-[#2d9f6f] transition-colors"
            />
            <button
              disabled={!name.trim()}
              onClick={() => setStep("country")}
              className="w-full bg-[#0d1321] text-white rounded-xl py-4 text-sm font-semibold disabled:opacity-30 transition-opacity active:scale-[0.98]"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step: Country */}
        {step === "country" && (
          <div className="page-enter flex flex-col gap-6">
            <div className="w-12 h-12 rounded-xl bg-[#0d1321]/5 flex items-center justify-center">
              <Globe size={22} className="text-[#0d1321]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#0d1321]">Where is your company registered?</h2>
              <p className="text-sm text-gray-400 mt-1">We support businesses across the EU and EEA.</p>
            </div>
            <input
              autoFocus
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="e.g. Germany"
              className="w-full bg-white rounded-xl px-4 py-4 text-sm font-medium text-[#0d1321] shadow-sm border border-gray-100 focus:outline-none focus:border-[#2d9f6f] transition-colors"
            />
            <button
              disabled={!country.trim()}
              onClick={() => setStep("registration")}
              className="w-full bg-[#0d1321] text-white rounded-xl py-4 text-sm font-semibold disabled:opacity-30 transition-opacity active:scale-[0.98]"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step: Registration Number */}
        {step === "registration" && (
          <div className="page-enter flex flex-col gap-6">
            <div className="w-12 h-12 rounded-xl bg-[#0d1321]/5 flex items-center justify-center">
              <FileText size={22} className="text-[#0d1321]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#0d1321]">Company registration number</h2>
              <p className="text-sm text-gray-400 mt-1">Your official trade register or company number.</p>
            </div>
            <input
              autoFocus
              value={registration}
              onChange={(e) => setRegistration(e.target.value)}
              placeholder="e.g. HRB 123456 B"
              className="w-full bg-white rounded-xl px-4 py-4 text-sm font-medium text-[#0d1321] shadow-sm border border-gray-100 focus:outline-none focus:border-[#2d9f6f] transition-colors"
            />
            <button
              disabled={!registration.trim()}
              onClick={() => setStep("email")}
              className="w-full bg-[#0d1321] text-white rounded-xl py-4 text-sm font-semibold disabled:opacity-30 transition-opacity active:scale-[0.98]"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step: Contact Email */}
        {step === "email" && (
          <div className="page-enter flex flex-col gap-6">
            <div className="w-12 h-12 rounded-xl bg-[#0d1321]/5 flex items-center justify-center">
              <Mail size={22} className="text-[#0d1321]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#0d1321]">Company contact email</h2>
              <p className="text-sm text-gray-400 mt-1">We&apos;ll use this for account notifications.</p>
            </div>
            <input
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. treasury@acme.de"
              className="w-full bg-white rounded-xl px-4 py-4 text-sm font-medium text-[#0d1321] shadow-sm border border-gray-100 focus:outline-none focus:border-[#2d9f6f] transition-colors"
            />
            <button
              disabled={!email.trim()}
              onClick={startVerification}
              className="w-full bg-[#0d1321] text-white rounded-xl py-4 text-sm font-semibold disabled:opacity-30 transition-opacity active:scale-[0.98]"
            >
              Submit for verification
            </button>
          </div>
        )}

        {/* Step: Verifying */}
        {step === "verifying" && (
          <div className="page-enter flex flex-col items-center gap-6 pt-12">
            <div className="w-20 h-20 rounded-full bg-[#0d1321]/5 flex items-center justify-center">
              <Loader2 size={32} className="text-[#0d1321] animate-spin" />
            </div>
            <div className="text-center">
              <h2 className="text-lg font-bold text-[#0d1321]">Verifying your company</h2>
              <p className="text-sm text-gray-400 mt-2">This usually takes a few seconds...</p>
            </div>
          </div>
        )}

        {/* Step: Approved */}
        {step === "approved" && (
          <div className="page-enter flex flex-col items-center gap-6 pt-12">
            <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
              <CheckCircle2 size={40} className="text-green-500" />
            </div>
            <div className="text-center">
              <h2 className="text-lg font-bold text-[#0d1321]">Company approved</h2>
              <p className="text-sm text-gray-400 mt-2">
                Welcome to Manna, {name}. Your business account is ready.
              </p>
            </div>
            <button
              onClick={completeOnboarding}
              className="w-full bg-[#0d1321] text-white rounded-xl py-4 text-sm font-semibold active:scale-[0.98]"
            >
              Go to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
