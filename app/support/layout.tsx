import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support - Shakepay ShakingSats Calculator",
  description: "Support the Shakepay ShakingSats Calculator development. Send Bitcoin via Shakepay or donate directly.",
  openGraph: {
    title: "Support - Shakepay ShakingSats Calculator",
    description: "Support the Shakepay ShakingSats Calculator development. Send Bitcoin via Shakepay or donate directly.",
  },
};

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
