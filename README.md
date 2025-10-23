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
- **Clerk** for user sessions and secure sign-in.
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
| Frontend     | **Next.js 15 (App Router)**| React-based, server-side rendering with Turbopack    |
| Styling      | **Tailwind CSS v4**        | Utility-first, customizable styling                  |
| UI           | **shadcn/ui**              | Accessible, modern UI components                     |
| Backend      | **PostgreSQL**             | Database with connection pooling                     |
| Auth         | **Clerk**                  | User authentication and session management           |
| ORM          | **Prisma**                 | Type-safe DB client & schema management              |
| AI Services  | **Gemini API (Google)**    | Receipt scanning & monthly insights                  |
| Jobs         | **Inngest**                | Event-driven background workflows                    |
| Security     | **Arcjet**                 | Rate limiting and bot protection                     |
| Email        | **Resend**                 | Email delivery for insights and notifications        |
| Testing      | **Jest + React Testing Library** | Comprehensive testing framework               |
| Deployment   | **Railway**                | Serverless hosting & CI/CD                           |

---

## 📁 Project Structure

```bash
.
├── app/               # Next.js App Router pages & layouts
│   ├── (auth)/        # Authentication routes (sign-in, sign-up)
│   ├── (main)/        # Protected routes (dashboard, account, transaction)
│   ├── (api)/         # API routes (Inngest, seed, webhooks)
│   ├── (lib)/         # Zod validation schemas and types
│   └── globals.css    # Global styles and Tailwind imports
├── actions/           # Server actions for CRUD operations
├── components/        # Reusable UI components and landing page sections
├── data/              # Static config (categories, currencies, landing data)
├── emails/            # React Email templates for insights
├── hooks/             # Custom React hooks (including modular transaction table)
├── lib/               # Utilities (Prisma, Arcjet, Inngest, etc.)
├── prisma/            # Database schema and migrations
├── public/            # Static assets and images
├── __tests__/          # Jest test suites for components and hooks
├── utils/             # Chart utilities and data processors
├── jest.config.ts     # Jest configuration with TypeScript support
├── middleware.ts      # Arcjet + Clerk middleware for security and auth
└── example-env.txt    # Environment variable template
```


## 🏁 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database (or Supabase)
- Clerk account for authentication
- Google Gemini API key
- Resend API key for emails

### Installation

1. **Clone the repo:**  
    ```bash
    git clone https://github.com/iamkhalidhussein/Flowa.git
    cd Flowa
    ```

2. **Install dependencies:**  
    ```bash
    npm install
    # or
    pnpm install
    ```

3. **Configure environment:**  
    ```bash
    cp example-env.txt .env
    ```
    Update the following environment variables:
    - `DATABASE_URL` & `DIRECT_URL`: PostgreSQL connection strings
    - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` & `CLERK_SECRET_KEY`: Clerk authentication
    - `CLERK_WEBHOOK_SECRET`: Clerk webhook for user sync
    - `GEMINI_API_KEY`: Google Gemini for AI features
    - `RESEND_API_KEY`: Email delivery service
    - `ARCJET_KEY`: Rate limiting and security

4. **Set up the database:**  
    ```bash
    npx prisma generate
    npx prisma db push
    # Optional: Seed with sample data
    npm run dev
    # Visit /api/seed to populate sample data
    ```

5. **Run locally:**  
    ```bash
    npm run dev
    ```
    The app will be available at `http://localhost:3000`

### Testing

```bash
# Run all tests with coverage
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm test -- --coverage
```


## 🛡️ Security & Privacy

- **Authentication**: Secure user authentication via Clerk with session management
- **Rate Limiting**: Arcjet-powered rate limiting to prevent abuse
- **Bot Protection**: Automated bot detection and filtering
- **Data Encryption**: All data encrypted in transit and at rest
- **Input Validation**: Comprehensive Zod schema validation
- **Privacy First**: No financial data shared with unauthorized third parties
- **Webhook Security**: Signed webhooks for secure user synchronization


## 🤖 AI Capabilities

- **Receipt Parsing:** Gemini API extracts structured data from images.
- **Insight Generation:** LLM analyzes transactions for trends and recommendations.
- **Continuous Improvement:** Models retrain with anonymized data for better accuracy.

## 🚀 Advanced Features

### Multi-Currency Support
- Support for 100+ currencies including USD, EUR, JPY, GBP, and more
- Real-time currency conversion and display
- Per-account currency configuration

### Recurring Transactions
- Automated recurring transaction processing
- Support for daily, weekly, monthly, and yearly intervals
- Smart notifications for upcoming recurring expenses

### Advanced Transaction Management
- Bulk transaction operations with selection
- Advanced filtering and sorting capabilities
- Pagination for large transaction datasets
- Receipt attachment and AI-powered data extraction

### Comprehensive Testing
- Unit tests for all custom hooks and utilities
- Integration tests for authentication flows
- Snapshot testing for UI components
- Test coverage reporting and analysis

### Modular Architecture
- Refactored transaction table hook suite for better maintainability
- Separation of concerns with individual, reusable hooks
- Comprehensive TypeScript definitions
- Performance optimizations with memoization

## 💡 Future Roadmap

- Advanced budgeting tools with spending limits and alerts
- Mobile app (iOS/Android) with offline support
- Bank integration via Plaid for automatic transaction sync
- Investment portfolio tracking and analysis
- Collaborative features for shared accounts
- Advanced AI-powered financial recommendations
- Export functionality for tax reporting
- Multi-language support



## 🧪 Development Notes

### Architecture Highlights
- **Modular Hook Design**: The transaction table functionality is split into focused hooks (`useSelection`, `usePagination`, `useFiltersAndSorting`, `useTransactionActions`)
- **Type Safety**: Full TypeScript coverage with strict configuration
- **Performance**: Optimized with React.memo, useMemo, and useCallback patterns
- **Error Handling**: Comprehensive error boundaries and validation
- **Accessibility**: ARIA labels and keyboard navigation support

### Key Directories
- `hooks/use-transaction-table/`: Modular hook suite with individual README documentation
- `__tests__/`: Comprehensive test suite matching the source structure
- `app/actions/`: Server-side actions for secure database operations
- `lib/inngest/`: Event-driven background job processing
- `emails/`: React Email templates for user communications

## 🙌 Contributing

We welcome contributions! Please see our contributing guidelines for:
- Code style and formatting standards
- Testing requirements
- Pull request process
- Issue reporting guidelines

## 🚀 Try Flowa Today!

Experience smarter finance management with AI.  
[Get Started](https://flowa-production.up.railway.app)

## 📝 License

This project is licensed under the MIT License.
