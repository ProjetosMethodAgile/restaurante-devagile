import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";
import { UserContextProvider } from "../context/userContext";
import getUserId from "../actions/user/getUserId";

const roboto = Roboto({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "DevAgile Restaurante",
  description: "Sistema em desenvolvimento",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: user } = await getUserId();

  return (
    <UserContextProvider user={user}>
      <html lang="pt-BR">
        <body
          className={`${poppins.variable} ${roboto.variable}  antialiased `}
        >
          {children}
        </body>
      </html>
    </UserContextProvider>
  );
}
