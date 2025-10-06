import { seedTransactions } from "@/app/actions/seed";

export const GET = async () => {
    const result = await seedTransactions();
    return Response.json(result);
}