import { Card, CardContent } from "@/components/ui/card"
import { UserPlus, TrendingUp, Lightbulb } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Create Your Account",
    description: "Sign up in seconds with secure authentication. Connect your accounts and start tracking immediately.",
  },
  {
    number: "02",
    icon: TrendingUp,
    title: "Track Your Spending",
    description:
      "Upload receipts, add transactions manually, or sync automatically. Our AI categorizes everything for you.",
  },
  {
    number: "03",
    icon: Lightbulb,
    title: "Get Insights",
    description:
      "Receive personalized financial insights and recommendations. Make smarter decisions with AI-powered analytics.",
  },
]

export const HowItWorks = () => {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">How it works</h2>
          <p className="text-lg text-muted-foreground text-pretty">Get started with Flowa in three simple steps</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative">

                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                )}

                <Card className="relative border-border/50 hover:border-primary/50 transition-colors">
                  <CardContent className="pt-6">
                    <div className="space-y-4">

                      <div className="text-6xl font-bold text-primary/20">{step.number}</div>

                      <div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon className="size-7 text-primary" />
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-2xl font-semibold">{step.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
