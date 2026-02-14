"use client";

// providers
import { MarketsProvider } from "../providers/marketprovider";
// app/layout.tsx or MarketsLayout.tsx
export default async function MarketsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MarketsProvider>{children}</MarketsProvider>;
}
