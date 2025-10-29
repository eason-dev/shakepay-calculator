import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support - Shakepay ShakingSats Calculator",
  description: "Support me with a coffee or follow for more useful tools. Send Bitcoin via Shakepay or donate directly.",
  openGraph: {
    title: "Support - Shakepay ShakingSats Calculator",
    description: "Support me with a coffee or follow for more useful tools. Send Bitcoin via Shakepay or donate directly.",
  },
};

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
