import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";

export function generateNonce() {
    const options = "ABCDEDFGHIJKLMNOPQRSTUVWXYZ";
    let nonce = "";
    for (let i = 0; i < 32; i++) {
        if (i !== 0 && i % 8 === 0) {
            nonce += "-";
        }
        nonce += options.charAt(Math.floor(Math.random() * options.length));
    }
    return nonce;
}

export function createJwtToken(username: string) {
    var token = jwt.sign({ username }, JWT_SECRET);

    return token;
}

export function checkJwtToken(token: string) {
    try {
        const { username } = jwt.verify(token, JWT_SECRET) as { username: string, iat: number };
        return username;
    } catch (err) {
        return null;
    }
}