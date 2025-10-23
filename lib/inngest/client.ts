import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({
    id: "Flowa",
    name: "Flowa",
    retryFunction: async (attempt: number) => ({
        delay: Math.pow(2, attempt) * 1000, // Exponential backoff
        maxAttempt: 2,
    })
});
