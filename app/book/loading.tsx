export default function Loading() {
  return (
    <main className="min-h-screen bg-brand-bg flex items-center justify-center">
      <div className="flex flex-col items-center gap-4" role="status" aria-label="Loading booking page">
        <div
          className="w-12 h-12 rounded-full border-4 border-brand-accent/25 border-t-brand-accent animate-spin"
          aria-hidden="true"
        />
        <p
          className="text-sm text-brand-text/70"
          style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
        >
          Loading booking...
        </p>
      </div>
    </main>
  );
}
