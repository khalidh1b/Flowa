import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

// get the current user from clerk and our database
export const getCurrentUser = async () => {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error("you need to be signed in to do this");
  }

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("we couldn't find your account");
  }

  return user;
};