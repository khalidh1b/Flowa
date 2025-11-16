'use server';

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import aj from "@/lib/arcjet";
import { request } from "@arcjet/next";

// gets the current authenticated user
export const getCurrentUser = async () => {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }
    return userId;
};

// finds user in database using clerk user id
export const findUserByClerkId = async (clerkUserId: string) => {
    const user = await db.user.findUnique({
        where: { clerkUserId },
    });

    if (!user) {
        throw new Error("User not found");
    }
    return user;
};

// checks if user is allowed to make requests
export const checkRateLimit = async (userId: string) => {
    const req = await request();
    const decision = await aj.protect(req, {
        userId,
        requested: 1,
    });

    if (decision.isDenied()) {
        if (decision.reason.isRateLimit()) {
            const { remaining, reset } = decision.reason;
            console.error({
                code: "RATE_LIMIT_EXCEEDED",
                details: { remaining, resetInSeconds: reset },
            });
            throw new Error("Too many requests. Please try again later.");
        }
        throw new Error("Request Blocked");
    }
};

// gets authenticated user with full database info
export const getAuthenticatedUser = async () => {
    const userId = await getCurrentUser();
    return findUserByClerkId(userId);
};