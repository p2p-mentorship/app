export const messageTemplate = "The nonce is {nonce}";

export const JWT_SECRET = process.env.JWT_SECRET || "";

export function getNonceMessage(nonce: string) {
    return messageTemplate.replace("{nonce}", nonce);
}
