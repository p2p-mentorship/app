"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "./config";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConnectKitProvider } from "connectkit";
import { AuthContextProvider } from "./contexts/AuthContexts";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <ConnectKitProvider>
              <AuthContextProvider>
                {children}
              </AuthContextProvider>
            </ConnectKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
