import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'

export const messageTemplate = "The nonce is {nonce}";

export const JWT_SECRET = process.env.JWT_SECRET || "";

export function getNonceMessage(nonce: string) {
    return messageTemplate.replace("{nonce}", nonce);
}

export const wagmiConfig = createConfig({
    chains: [mainnet],
    transports: {
        [mainnet.id]: http(),
    },
})
