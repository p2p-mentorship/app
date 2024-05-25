import { getNonceMessage } from "@/app/config";
import { generateNonce } from "@/app/utils";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { isAddress } from "viem";
const prisma = new PrismaClient();

export const GET = async (req: NextRequest, { params: { address } }: { params: { address: string } }) => {
    // validate the address
    if (!isAddress(address)) {
        return NextResponse.json({ error: "invalid address" }, { status: 400 });
    }

    let nonceEntry = await prisma.nonceTable.findUnique({ where: { address } });
    if (nonceEntry) {
        return NextResponse.json({ message: getNonceMessage(nonceEntry.nonce) });
    }

    const nonce = generateNonce();

    await prisma.nonceTable.create({
        data: {
            address,
            nonce
        }
    });

    return NextResponse.json({ message: getNonceMessage(nonce) });
} 