import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat — Orion AI",
  description: "Chat with Orion, a state-of-the-art AI assistant for reasoning, coding, and creative tasks.",
};

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
