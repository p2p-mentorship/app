"use client"

import { useModal } from "connectkit";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useAccount, useSignMessage } from "wagmi";
import axios from "axios";

interface IAuthContext {
    connect: () => Promise<void>;
    token: string | null;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [nonceMessage, setNonceMessage] = useState<string | null>(null);

    const { address } = useAccount();

    const { signMessage, data } = useSignMessage();
    const { openSIWE } = useModal();

    useEffect(() => {
        if (!address) {
            setNonceMessage(null);
            return;
        }

        const oldToken = localStorage.getItem(`token-${address}`);
        if (oldToken) {
            setToken(oldToken);
        } else {
            (async () => {
                const { data: { message } } = await axios.get(`/api/auth/get-nonce-message/${address}`);
                setNonceMessage(message);
                signMessage({ message });
            })();
        }
    }, [address]);

    async function connect() {
        if (!address) {
            // setOpen(true);
            openSIWE(true);
            return;
        }

        if (!nonceMessage) return;

        signMessage({ message: nonceMessage });
    }

    useEffect(() => {
        if (!address || !data) {
            return;
        }

        (async () => {
            const { data: { token } } = await axios.post(`/api/auth/sign-in`, { address, signature: data });
            setToken(token);
            localStorage.setItem(`token-${address}`, token);
        })();
    }, [address, data]);

    console.log(token);

    console.log(data);

    return <AuthContext.Provider value={{ connect, token }}>
        {children}
    </AuthContext.Provider>
}

export const useAuthContext = () => useContext(AuthContext);
