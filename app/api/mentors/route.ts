import { checkJwtToken } from "@/app/utils";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
    let data: any;
    try {
        data = await req.json();
    } catch (err) {
        return NextResponse.json({ error: "invalid request body" }, { status: 400 });
    }

    const { name, description, telegramUsername } = data;

    if (!name || !description || !telegramUsername) {
        return NextResponse.json({ error: "invalid request body" }, { status: 400 });
    }

    const bearer = req.headers.get("Authorization");

    if (!bearer || bearer.split(" ").length !== 2 || bearer.split(" ")[0] !== "Bearer") {
        return NextResponse.json({ error: "invalid auth token" }, { status: 401 })
    }

    const token = bearer.split(" ")[1];
    const address = checkJwtToken(token);
    if (address == null) {
        return NextResponse.json({ error: "invalid auth token" }, { status: 401 })
    }

    const query = await prisma.mentor.create({
        data: {
            name,
            description,
            address,
            telegramUsername
        }
    });

    return NextResponse.json({ query });
}

export const GET = async (req: NextRequest) => {
    const mentors = await prisma.mentor.findMany();

    return NextResponse.json({ mentors });
}
