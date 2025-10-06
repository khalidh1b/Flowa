import { Shield, Lock, Eye, CheckCircle2 } from "lucide-react"
import { Card } from "@/components/ui/card"

export const SecuritySection = () => {
  const securityFeatures = [
    {
      icon: Shield,
      title: "Bank-Level Encryption",
      description: "256-bit SSL encryption protects all your financial data",
    },
    {
      icon: Lock,
      title: "Secure Authentication",
      description: "Multi-factor authentication and secure token management",
    },
    {
      icon: Eye,
      title: "Privacy First",
      description: "Your data is never shared or sold to third parties",
    },
  ]

  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">

          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary font-medium">
              <Shield className="size-4" />
              <span>Enterprise-Grade Security</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
              Your Financial Data is{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">100% Secure</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              We take security seriously. Your financial information is protected with industry-leading encryption and
              security protocols.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {securityFeatures.map((feature, index) => (
              <Card
                key={index}
                className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-colors"
              >
                <div className="space-y-4">
                  <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="size-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="size-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">SOC 2 Compliant</div>
                  <div className="text-sm text-muted-foreground">Audited security standards</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="size-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">GDPR Ready</div>
                  <div className="text-sm text-muted-foreground">Full data privacy compliance</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="size-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">99.9% Uptime</div>
                  <div className="text-sm text-muted-foreground">Always available when you need it</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
