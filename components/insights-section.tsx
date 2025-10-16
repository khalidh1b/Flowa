import { Card } from "@/components/ui/card"
import { TrendingUp, Mail, BarChart3, Calendar } from "lucide-react"

export const InsightsSection = () => {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">

          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-sm text-accent font-medium">
              <TrendingUp className="size-4" />
              <span>Smart Analytics</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
              Real-Time Insights.{" "}
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                Smarter Decisions.
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              Get personalized financial insights delivered right to your inbox. AI analyzes your spending patterns and
              helps you make better financial decisions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">

            <Card className="p-8 bg-gradient-to-br from-primary/5 to-transparent border-border/50">
              <div className="space-y-6">
                <div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <BarChart3 className="size-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Instant Receipt Processing</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Upload any receipt and watch AI extract transaction details with 97% accuracy. No more manual data
                    entry—just snap, upload, and done.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="size-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <div className="size-2 rounded-full bg-primary" />
                      </div>
                      <span>Automatic categorization</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="size-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <div className="size-2 rounded-full bg-primary" />
                      </div>
                      <span>Multi-currency support</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="size-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <div className="size-2 rounded-full bg-primary" />
                      </div>
                      <span>75% faster than manual entry</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-accent/5 to-transparent border-border/50">
              <div className="space-y-6">
                <div className="size-14 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Mail className="size-7 text-accent" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Monthly Financial Reports</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Receive AI-generated insights every month analyzing your spending habits, identifying trends, and
                    suggesting ways to optimize your budget.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="size-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <div className="size-2 rounded-full bg-accent" />
                      </div>
                      <span>Personalized recommendations</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="size-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <div className="size-2 rounded-full bg-accent" />
                      </div>
                      <span>Spending pattern analysis</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="size-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <div className="size-2 rounded-full bg-accent" />
                      </div>
                      <span>65% increase in engagement</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <Card className="mt-8 p-8 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-primary/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="size-14 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Calendar className="size-7 text-primary" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1">Track Daily, Weekly & Monthly</h4>
                  <p className="text-sm text-muted-foreground">
                    View your financial data across any time period with dynamic charts
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
