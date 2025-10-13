import "./globals.css";
import Providers from "./providers";
import Topbar from "@/components/Topbar";

export const metadata = {
  title: "Spring Mintyn",
  description: "Mintyn Frontend Test",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Topbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
