"use client";

import { http, createConfig } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { rainbowkitBurnerWallet } from "burner-connector";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";


export const wagmiConfig = createConfig({
    connectors: connectorsForWallets([
        {
            groupName: "Supported Wallets",
            wallets: [rainbowkitBurnerWallet],
        },
    ],
        {
            appName: "p2pmentorship.com",
            projectId: "",
        },
    ),
    chains: [mainnet],
    transports: {
        [mainnet.id]: http(),
    },
})
