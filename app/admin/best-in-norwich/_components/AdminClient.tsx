"use client";

import { useState } from "react";
import { Check, Loader2, X } from "lucide-react";

// Moderation UI for /admin/best-in-norwich. Server component fetches the rows
// and passes them in; this handles the buttons and the sign-in form.

const lora = { fontFamily: "var(--font-lora), Georgia, serif" } as const;

export interface PendingNominee {
  id: string;
  category_key: string;
  category_label: string;
  name: string;
  url: string | null;
  created_at: string;
}

async function post(payload: Record<string, unknown>) {
  const res = await fetch("/api/best-in-norwich/admin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
  return data;
}

export function SignIn() {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        setError("");
        try {
          await post({ action: "login", token });
          window.location.reload();
        } catch (err) {
          setError(err instanceof Error ? err.message : "Something went wrong.");
          setBusy(false);
        }
      }}
      className="max-w-sm space-y-4"
    >
      <label className="block text-sm font-semibold text-brand-text" style={lora}>
        Admin token
        <input
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          autoComplete="current-password"
          className="mt-1 w-full rounded-lg border-2 border-brand-text/15 bg-brand-bg px-4 py-3 text-base font-normal text-brand-text outline-none transition focus:border-brand-accent"
          style={lora}
        />
      </label>
      {error && (
        <p className="text-sm text-red-700" role="alert" style={lora}>
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={busy}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-accent px-6 py-3 text-lg font-bold text-brand-white transition hover:opacity-90 disabled:opacity-60 min-h-[48px]"
        style={{ fontFamily: "var(--font-caveat), cursive" }}
      >
        {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        Sign in
      </button>
    </form>
  );
}

export function NomineeList({ nominees }: { nominees: PendingNominee[] }) {
  const [rows, setRows] = useState(nominees);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function act(id: string, action: "approve" | "reject") {
    setBusyId(id);
    setError("");
    try {
      await post({ action, id });
      setRows((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusyId(null);
    }
  }

  if (rows.length === 0) {
    return (
      <p className="text-lg text-muted-foreground" style={lora}>
        Nothing waiting. All caught up.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {error && (
        <p className="text-sm text-red-700" role="alert" style={lora}>
          {error}
        </p>
      )}

      {rows.map((row) => (
        <div
          key={row.id}
          className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-brand-text/10 bg-brand-white p-4"
        >
          <div className="min-w-0">
            <p
              className="text-xs font-semibold uppercase tracking-widest text-brand-accent"
              style={lora}
            >
              {row.category_label}
            </p>
            <p className="text-lg font-bold text-brand-text" style={lora}>
              {row.name}
            </p>
            {row.url && (
              <a
                href={row.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-brand-accent underline underline-offset-2 break-all"
                style={lora}
              >
                {row.url}
              </a>
            )}
            <p className="text-xs text-muted-foreground mt-1" style={lora}>
              {new Date(row.created_at).toLocaleString("en-GB")}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={busyId === row.id}
              onClick={() => act(row.id, "approve")}
              className="inline-flex items-center gap-1.5 rounded-full bg-brand-accent px-4 py-2 text-sm font-semibold text-brand-white transition hover:opacity-90 disabled:opacity-60 min-h-[44px]"
              style={lora}
            >
              {busyId === row.id ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <Check className="h-4 w-4" aria-hidden="true" />
              )}
              Approve
            </button>
            <button
              type="button"
              disabled={busyId === row.id}
              onClick={() => act(row.id, "reject")}
              className="inline-flex items-center gap-1.5 rounded-full border border-brand-text/15 px-4 py-2 text-sm font-semibold text-muted-foreground transition hover:border-red-300 hover:text-red-700 disabled:opacity-60 min-h-[44px]"
              style={lora}
            >
              <X className="h-4 w-4" aria-hidden="true" />
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export function SignOutButton() {
  return (
    <button
      type="button"
      onClick={async () => {
        await post({ action: "logout" }).catch(() => {});
        window.location.reload();
      }}
      className="text-sm text-muted-foreground underline underline-offset-4 hover:text-brand-accent"
      style={lora}
    >
      Sign out
    </button>
  );
}
