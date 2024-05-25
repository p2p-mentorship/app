import { getNonceMessage } from "@/app/config";
import { createJwtToken } from "@/app/utils";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { verifyMessage } from "viem";
const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
    let data: any;
    try {
        data = await req.json();
    } catch (err) {
        return NextResponse.json({ error: "invalid request body" }, { status: 400 });
    }

    const { address, signature } = data;

    if (!address || !signature) {
        return NextResponse.json({ error: "invalid request body" }, { status: 400 });
    }

    // const nonceEntry = await prisma.nonceTable.findUnique({ where: { address } });

    // if (!nonceEntry) {
    //     return NextResponse.json({ error: "nonce not generated" }, { status: 400 });
    // }

    // if (!(await verifyMessage({ address, message: getNonceMessage(nonceEntry.nonce), signature }))) {
    //     return NextResponse.json({ error: "invalid signature" }, { status: 401 });
    // }

    const token = createJwtToken(address);

    return NextResponse.json({ token });
}