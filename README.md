# 💸 Flowa: AI-Powered Finance Platform

**Flowa** is a next-generation financial analytics platform that leverages AI to help users **track**, **analyze**, and **optimize** their spending. With real-time insights, automated receipt scanning, and personalized financial reports, Flowa transforms the way you manage your money.


## 🌟 Why Flowa?

- **Automation First:** Eliminate manual data entry with AI-powered receipt scanning.
- **Actionable Insights:** Get monthly financial summaries and smart recommendations.
- **Secure & Private:** Built with robust authentication and data protection.
- **Intuitive Experience:** Modern UI, dynamic dashboards, and seamless workflows.


## 🚀 Key Features

### 🧾 AI Receipt Scanner
- Upload receipts or bills—AI extracts transaction data instantly.
- Powered by **Google Gemini API** for high-accuracy parsing.
- Auto-fills forms and updates your spending history.

### 📬 Personalized Monthly Insights
- Gemini LLM analyzes your habits and delivers tailored financial reports.
- Receive actionable tips and budgeting suggestions via email.

### 📊 Real-Time Dashboard
- Visualize daily, weekly, and monthly spending.
- Interactive charts, automatic expense categorization, and trend analysis.

### 🔒 Secure Authentication
- **Supabase Auth** for user sessions and secure sign-in.
- Token-based security and privacy controls.

### 📝 Transaction Management
- Effortlessly add, edit, or delete transactions.
- Attach receipts, tag expenses, and filter by category.

### ⚡ Event-Driven Automation
- Background jobs powered by **Inngest** for timely insights and notifications.

---

## 🧠 Tech Stack Overview

| Layer        | Technology                 | Description                                          |
|--------------|----------------------------|------------------------------------------------------|
| Frontend     | **Next.js 14 (App Router)**| React-based, server-side rendering                   |
| Styling      | **Tailwind CSS**           | Utility-first, customizable styling                  |
| UI           | **shadcn/ui**              | Accessible, modern UI components                     |
| Backend      | **Supabase (PostgreSQL)**  | Auth, database, and file storage                     |
| ORM          | **Prisma**                 | Type-safe DB client & schema management              |
| AI Services  | **Gemini API (Google)**    | Receipt scanning & monthly insights                  |
| Jobs         | **Inngest**                | Event-driven background workflows                    |
| Deployment   | **Vercel**                 | Serverless hosting & CI/CD                           |

---

## 📁 Project Structure

```bash
.
├── app/               # Next.js App Router pages & layouts
│   └── (auth)/        # Authentication routes
│   └── (main)/        # Account, Dashboard, Transaction routes
│   └── (api)/         # Inngest, seed, webooks routes
│   └── (lib)/         # containing zod validation schemas
├── actions/           # Server actions & API logic
├── components/        # Reusable UI components
├── data/              # Static config & sample data
├── emails/            # Email templates for insights
├── hooks/             # Custom React hooks
├── lib/               # Utilities (Gemini, DB, etc.)
├── prisma/            # Prisma schemas & migrations
├── public/            # Static assets (images, icons)
└── .env               # Example Environment variables (example-env.txt)
```


## 🏁 Getting Started

1. **Clone the repo:**  
    `git clone https://github.com/iamkhalidhussein/Flowa.git`

2. **Install dependencies:**  
    `npm install`

3. **Configure environment:**  
    Copy `example-env.txt` to `.env` and update credentials.

4. **Run locally:**  
    `npm run dev`


## 🛡️ Security & Privacy

- All data is encrypted in transit and at rest.
- User authentication via Supabase ensures privacy.
- No financial data is shared with third parties.


## 🤖 AI Capabilities

- **Receipt Parsing:** Gemini API extracts structured data from images.
- **Insight Generation:** LLM analyzes transactions for trends and recommendations.
- **Continuous Improvement:** Models retrain with anonymized data for better accuracy.

## 💡 Future Roadmap

- Advanced budgeting tools
- Mobile app (iOS/Android)
- Integration with banks & payment providers


## 📝 License

This project is licensed under the MIT License.


## 🙌 Contributors

Thanks to everyone who has contributed to Flowa!  
Want to join?

## 🚀 Try Flowa Today!

Experience smarter finance management with AI.  
[Get Started](https://flowa-production.up.railway.app)