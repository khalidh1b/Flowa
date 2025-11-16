'use server';

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// scans receipt image and extracts transaction data
export const scanReceipt = async (base64String: string, mimeType: string): Promise<any> => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

        const prompt = `
            You are an expert at reading receipts from images.
            Extract the following information and return ONLY valid JSON.

            Required fields:
            {
            "amount": number,           // total amount paid
            "date": "YYYY-MM-DD",       // date in ISO format
            "description": "string",    // short summary of items bought
            "merchantName": "string",   // store or restaurant name
            "category": "string"        // one of: housing, transportation, groceries, utilities, entertainment, food, shopping, healthcare, education, personal, travel, insurance, gifts, bills, other-expense
            }

            If uncertain, make your best guess.
            If the image clearly is NOT a receipt, respond with {} ONLY.

            Return only JSON with no extra text.
        `;

        // send image and prompt to AI for analysis
        const result = await model.generateContent([
            {
                inlineData: { data: base64String, mimeType },
            },
            prompt,
        ]);

        // get the text response from AI
        const text = result?.response?.text?.();
        if (!text) throw new Error("Empty response from Gemini");

        // clean up the response and parse as JSON
        const cleaned = text.replace(/```(?:json)?\n?/g, "").trim();
        return JSON.parse(cleaned);

    } catch (error) {
        console.error("Error scanning receipt:", error);
        throw new Error("Failed to scan receipt");
    }
};