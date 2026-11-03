import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ask Ally",
};

export default function AskAllyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
