import OnboardingWizard from "@/components/onboarding/OnboardingWizard";

// TODO: Phase 3 — multi-step wizard, save to UserProfile, OpenAI job matching
export default function OnboardingPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Welcome! Let's set up your profile.</h1>
      <OnboardingWizard />
    </div>
  );
}
