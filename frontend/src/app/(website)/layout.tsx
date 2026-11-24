import React from "react";
import { WebsiteHeader } from "@/components/layout/WebsiteHeader";
import { WebsiteFooter } from "@/components/layout/WebsiteFooter";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen min-w-0 w-full overflow-x-clip">
      <WebsiteHeader />
      <main className="flex-grow">{children}</main>
      <WebsiteFooter />
    </div>
  );
}
