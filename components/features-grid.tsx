import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, ScanLine, Target, Wallet, Globe, Sparkles } from "lucide-react"

const features = [
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Real-time financial dashboards with daily, weekly, and monthly spending breakdowns and dynamic visualizations.",
  },
  {
    icon: ScanLine,
    title: "Smart Receipt Scanner",
    description:
      "Upload bills or receipts and let AI extract structured data with 97% accuracy, reducing manual entry by 75%.",
  },
  {
    icon: Target,
    title: "Budget Planning",
    description:
      "Set smart budgets and get AI-powered recommendations to optimize your spending and reach financial goals.",
  },
  {
    icon: Wallet,
    title: "Multi-Account Support",
    description: "Connect and manage multiple bank accounts and credit cards in one unified dashboard.",
  },
  {
    icon: Globe,
    title: "Multi-Currency",
    description: "Track expenses across different currencies with automatic conversion and real-time exchange rates.",
  },
  {
    icon: Sparkles,
    title: "Automated Insights",
    description:
      "Monthly financial summaries delivered via email with personalized insights to drive smarter budgeting.",
  },
]

export const FeaturesGrid = () => {
  return (
    <section className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
            Everything you need to manage your finances
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Powerful features designed to give you complete control over your financial life
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="border-border/50 hover:border-primary/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="size-6 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}