import { cookie } from "@/shared/lib/cookie";
import { signAccess, signRefresh, verifyRefresh } from "@/shared/lib/jwt";
import { prisma } from "@/shared/lib/prisma";
import { sha256 } from "@/shared/lib/tokenHash";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";

function ttlToMs(ttl: string, fallbackMs: number) {
    const v = ttl.trim();

    if (/^\d+$/.test(v)) return Number(v) * 1000;

    const m = v.match(/^(\d+)\s*([smhd])$/i);
    if (!m) return fallbackMs;

    const n = Number(m[1]);
    const unit = m[2].toLowerCase();

    const mult =
        unit === "s" ? 1000 :
            unit === "m" ? 60_000 :
                unit === "h" ? 3_600_000 :
                    86_400_000;

    return n * mult;
}

export async function POST() {
    // Get refresh token from cookies
    const cookiesStore = await cookies();
    const refreshToken = cookiesStore.get("refreshToken")?.value;

    if (!refreshToken) {
        return new Response(JSON.stringify(
            { error: "Refresh token not found" }),
            { status: 400 }
        );
    }

    // Basic validation of the refresh token
    const { sub: userId } = verifyRefresh(refreshToken);

    const tokenHash = sha256(refreshToken);

    const storedToken = await prisma.refreshToken.findUnique(
        { where: { tokenHash }, include: { user: true } },
    )

    if (!storedToken || storedToken.userId !== userId) {
        return new Response(JSON.stringify(
            { error: "Invalid refresh token" }),
            { status: 401 }
        );
    }

    if (storedToken.revokedAt) {
        return new Response(JSON.stringify(
            { error: "Refresh token has been revoked" }),
            { status: 401 }
        );
    }

    const now = new Date();
    if (storedToken.expiresAt <= now) {
        return new Response(JSON.stringify(
            { error: "Refresh token has expired" }),
            { status: 401 }
        );
    }

    // Rotate refresh token: revoke the old one and issue a new one
    const tid = randomUUID();
    const nextRefresh = signRefresh({ sub: userId, tid });

    const refreshTtlMs = ttlToMs(
        process.env.REFRESH_TOKEN_TTL ?? "7d",
        7 * 86_400_000
    );
    const nextExpiresAt = new Date(Date.now() + refreshTtlMs);

    await prisma.$transaction([
        prisma.refreshToken.update({
            where: { id: storedToken.id },
            data: { revokedAt: now },
        }),
        prisma.refreshToken.create({
            data: {
                userId,
                tokenHash: sha256(nextRefresh),
                expiresAt: nextExpiresAt,
            },
        }),
    ]);

    const accessToken = signAccess({
        sub: userId,
        email: storedToken.user.email,
        role: storedToken.user.role
    });

    // Set new tokens in cookies
    const responseData = Response.json({
        message: "ok",
    });

    responseData.headers.append("Set-Cookie", cookie("accessToken", accessToken, 15 * 60));
    responseData.headers.append("Set-Cookie", cookie("refreshToken", nextRefresh, 7 * 24 * 60 * 60));

    return responseData;
}
