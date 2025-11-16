import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";
import type { User } from "@prisma/client";
import { ERROR_MESSAGES } from "@/hooks/use-transaction-form";

const DEFAULT_USER_NAME = "Unknown User";
const USER_CREATION_ERROR = "Failed to check or create user";
const MISSING_EMAIL_ERROR = "User has no email address";

// builds display name from user's first and last name 
const constructUserName = (firstName: string | null, lastName: string | null): string => {
    const first = firstName?.trim();
    const last = lastName?.trim();
    return (first && last) ? `${first} ${last}` : first || last || DEFAULT_USER_NAME;
};

// extracts primary email from Clerk user profile
const getPrimaryEmail = (user: Awaited<ReturnType<typeof currentUser>>) => {
    const email = user?.emailAddresses[0]?.emailAddress;
    if (!email) throw new Error(MISSING_EMAIL_ERROR);
    return email;
};

// authenticates current user and ensures database record exists
export const checkUser = async (): Promise<User | null> => {
    const user = await currentUser();
    if (!user) return null;

    try {
        return await db.user.upsert({
            where: { clerkUserId: user.id },
            update: {},
            create: {
                clerkUserId: user.id,
                name: constructUserName(user.firstName, user.lastName),
                imageUrl: user.imageUrl ?? "",
                email: getPrimaryEmail(user),
            },
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error(`Database operation failed for clerkUserId ${user.id}`, {
            error: message,
            clerkUserId: user.id,
            timestamp: new Date().toISOString(),
        });
        
        throw new Error(`${USER_CREATION_ERROR}: ${ERROR_MESSAGES}`);
    }
};