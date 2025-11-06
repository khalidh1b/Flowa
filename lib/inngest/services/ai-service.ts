import { GoogleGenerativeAI } from "@google/generative-ai";
import { DEFAULT_INSIGHTS } from "../config/constants";

export class AIService {
  private genAI: GoogleGenerativeAI;
  private maxRetries = 3;
  private retryDelay = 1000;

  constructor() {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY environment variable is not set");
    }
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }

  async generateFinancialInsights(stats: {
    totalIncome: number;
    totalExpenses: number;
    byCategory: Record<string, number>;
  }, month: string): Promise<string[]> {
    const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    Analyze this financial data and provide 3 concise, actionable insights.
    Focus on spending patterns and practical advice.
    Keep it friendly and conversational.

    Financial Data for ${month}:
    - Total Income: ₹${stats.totalIncome}
    - Total Expenses: ₹${stats.totalExpenses}
    - Net Income: ₹${stats.totalIncome - stats.totalExpenses}
    - Expense Categories: ${Object.entries(stats.byCategory)
            .map(([category, amount]) => `${category}: ₹${amount}`)
            .join(", ")}

    Format the response as a JSON array of strings, like this:
    ["insight 1", "insight 2", "insight 3"]
  `;

    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

        const insights = JSON.parse(cleanedText);
        
        // Validate the response format
        if (Array.isArray(insights) && insights.every(item => typeof item === 'string')) {
          return insights;
        }
        
        throw new Error("Invalid response format from AI service");
      } catch (error) {
        console.error(`AI Service attempt ${attempt} failed:`, error);
        
        if (attempt === this.maxRetries) {
          console.error("All retry attempts exhausted, using default insights");
          return [...DEFAULT_INSIGHTS];
        }
        
        // Exponential backoff
        await this.delay(this.retryDelay * Math.pow(2, attempt - 1));
      }
    }

    return [...DEFAULT_INSIGHTS];
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
};