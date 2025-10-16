import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Image from "next/image";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-accent/5">

      <div className="absolute top-20 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 py-24 md:py-32 lg:py-40 relative">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-accent to-primary rounded-full opacity-75 blur animate-border-flow" />
            <div className="relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-background border border-primary/30 text-sm font-medium">
              <Sparkles className="size-4 text-primary animate-pulse" />
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent font-semibold">
                AI-Powered Financial Intelligence
              </span>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
            Master Your Finances with{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              AI Precision
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            An AI-powered financial analytics platform that helps you track, analyze, and optimize your spending with
            real-time insights. Built for the modern financial mind.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="gap-2 text-base">
              Get Started Free
              <ArrowRight className="size-5" />
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
            <div className="space-y-1">
              <div className="text-3xl md:text-4xl font-bold text-primary">97%</div>
              <div className="text-sm text-muted-foreground">AI Accuracy</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl md:text-4xl font-bold text-primary">75%</div>
              <div className="text-sm text-muted-foreground">Time Saved</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl md:text-4xl font-bold text-primary">65%</div>
              <div className="text-sm text-muted-foreground">More Engaged</div>
            </div>
          </div>
        </div>

        <div className="relative mt-16 max-w-5xl mx-auto">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-border/50 shadow-2xl bg-card">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
            <Image src="/financial-dashboard0.png" alt="Flowa Dashboard" fill style={{ objectFit: "cover" }} className="w-full h-full object-cover"/>
          </div>

          <div className="absolute -top-8 -left-8 w-64 p-4 rounded-xl bg-card border border-border shadow-xl hidden lg:block">
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Sparkles className="size-6 text-primary" />
              </div>
              <div>
                <div className="text-sm font-medium">Receipt Scanned</div>
                <div className="text-xs text-muted-foreground">$127.50 detected</div>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-8 -right-8 w-64 p-4 rounded-xl bg-card border border-border shadow-xl hidden lg:block">
            <div className="space-y-2">
              <div className="text-sm font-medium">Monthly Insights</div>
              <div className="text-xs text-muted-foreground">Your spending is 12% lower this month</div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-primary rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
