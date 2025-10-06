import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

export async function POST(req) {
    const rawBody = await req.text();
    const headerPayload = headers();

    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If any necessary headers are missing, immediately return a 400 error
    if (!svix_id || !svix_timestamp || !svix_signature || !webhookSecret) {
        console.error("Missing required Svix headers or CLERK_WEBHOOK_SECRET.");
        return new NextResponse("Error occured -- missing headers or secret", {
            status: 400
        });
    }

    // Verify the webhook
    let evt;
    try {
        const wh = new Webhook(webhookSecret);
        // The verification uses the raw body string, not the parsed JSON object
        evt = wh.verify(rawBody, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        });
    } catch (err) {
        console.error("Error verifying webhook:", err);
        return new NextResponse("Error occured -- Invalid signature", {
            status: 400
        });
    }

    // The event payload (evt.data) is the parsed JSON object from the raw body
    const { id, email_addresses, primary_email_address_id, first_name, username } = evt.data;
    const eventType = evt.type;

    if (!id) {
        return new NextResponse("Error occured -- user ID missing in payload", { status: 400 });
    }

    // Helper to find the primary email address
    const getPrimaryEmail = (emails, primaryId) => {
        return emails?.find(e => e.id === primaryId)?.email_address || emails?.[0]?.email_address;
    };

    // Handle the event
    try {
        switch (eventType) {
            case "user.created": {
                const primaryEmail = getPrimaryEmail(email_addresses, primary_email_address_id);
                
                await db.user.create({
                    data: {
                        clerkUserId: id,
                        email: primaryEmail,
                        name: first_name || username || "New User",
                    },
                });
                console.log(`User created in DB: ${id}`);
                break;
            }

            case "user.updated": {
                const primaryEmail = getPrimaryEmail(email_addresses, primary_email_address_id);

                await db.user.update({
                    where: { clerkUserId: id },
                    data: {
                        email: primaryEmail,
                        name: first_name || username || "User",
                    },
                });
                console.log(`User updated in DB: ${id}`);
                break;
            }

            case "user.deleted": {
                await db.user.delete({
                    where: { clerkUserId: id },
                });
                console.log(`User deleted from DB: ${id}`);
                break;
            }

            default: {
                console.log(`Unhandled event type: ${eventType}`);
            }
        }
    } catch (error) {
        console.error(`Database error handling ${eventType} for user ${id}:`, error);
        return new NextResponse('Internal database error', { status: 500 });
    }


    // Return a success response
    return new NextResponse('Webhook received and processed', { status: 200 });
}