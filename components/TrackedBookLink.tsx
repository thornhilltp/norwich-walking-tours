"use client";

import React from "react";
import { trackEvent } from "@/lib/tracking";

interface TrackedBookLinkProps {
  location: string;
  className?: string;
  children: React.ReactNode;
  href?: string;
}

export function TrackedBookLink({
  location,
  className,
  children,
  href = "/book",
}: TrackedBookLinkProps) {
  return (
    <a
      href={href}
      onClick={() => trackEvent("book_cta_click", { location })}
      className={className}
    >
      {children}
    </a>
  );
}
