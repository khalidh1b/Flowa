import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";
import type { User } from "@prisma/client";

// Constants
const DEFAULT_USER_NAME = "Unknown User";
const USER_CREATION_ERROR = "Failed to check or create user";
const MISSING_EMAIL_ERROR = "User has no email address";
const DB_OPERATION_ERROR = "Database operation failed in checkUser for clerkUserId";

// Types
type CheckUserResult = User | null;
type ClerkUser = Awaited<ReturnType<typeof currentUser>>;

// constructs a user's display name from their Clerk profile
const constructUserName = (firstName: string | null, lastName: string | null): string => {
    const first = firstName?.trim() || "";
    const last = lastName?.trim() || "";
    
    if (first && last) {
        return `${first} ${last}`;
    }
    return first || last || DEFAULT_USER_NAME;
};

// Extracts the primary email from Clerk user
const getPrimaryEmail = (user: NonNullable<ClerkUser>): string => {
    const primaryEmail = user.emailAddresses[0]?.emailAddress;
    
    if (!primaryEmail) {
        throw new Error(MISSING_EMAIL_ERROR);
    }
    
    return primaryEmail;
};

// Checks if a user exists in the database and creates one if not found
export const checkUser = async (): Promise<CheckUserResult> => {
    const user = await currentUser();

    if (!user) {
        return null;
    }

    try {
        const userRecord = await db.user.upsert({
            where: {
                clerkUserId: user.id,
            },
            update: {},
            create: {
                clerkUserId: user.id,
                name: constructUserName(user.firstName, user.lastName),
                imageUrl: user.imageUrl || "",
                email: getPrimaryEmail(user),
            },
        });

        return userRecord;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(`${DB_OPERATION_ERROR}: ${user.id}`, {
            error: errorMessage,
            clerkUserId: user.id,
            timestamp: new Date().toISOString(),
        });
        
        // Re-throw with more specific error for upstream handling
        throw new Error(`${USER_CREATION_ERROR}: ${errorMessage}`);
    }
};