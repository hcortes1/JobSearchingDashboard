import OnboardingWizard from "@/components/onboarding/OnboardingWizard";

export default function OnboardingPage() {
  return (
    <div className="max-w-xl mx-auto py-4">
      <div className="mb-6">
        <h1
          className="text-2xl font-bold text-foreground tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Welcome aboard.
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Let&apos;s build your profile so we can match you with the right roles.
        </p>
      </div>
      <OnboardingWizard />
    </div>
  );
}
