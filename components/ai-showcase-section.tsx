import { Scan, Brain, Zap } from "lucide-react"
import Image from "next/image";

export const AIShowcaseSection = () => {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary font-medium">
              <Brain className="size-4" />
              <span>Powered by Advanced AI</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
              Financial Intelligence That{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Thinks for You
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              Let AI handle the heavy lifting. From scanning receipts to generating insights, Flowa automates your
              financial workflow.
            </p>
          </div>

          <div className="relative">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-border/50 shadow-2xl bg-gradient-to-br from-primary/5 via-background to-accent/5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
              <Image
                src="https://res.cloudinary.com/dksiicemx/image/upload/v1759771476/financial-dashboard_zfdadk.png"
                alt="AI-powered receipt scanning"
                className="w-full h-full object-cover opacity-90"
                width={100}
                height={100}
              />
            </div>

            <div className="absolute top-8 -left-4 md:left-8 w-56 p-4 rounded-xl bg-card/95 backdrop-blur-sm border border-border shadow-xl">
              <div className="flex items-start gap-3">
                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Scan className="size-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Smart Receipt Scan</div>
                  <div className="text-xs text-muted-foreground mt-1">97% accuracy in data extraction</div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-8 -right-4 md:right-8 w-56 p-4 rounded-xl bg-card/95 backdrop-blur-sm border border-border shadow-xl">
              <div className="flex items-start gap-3">
                <div className="size-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Zap className="size-5 text-accent" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Instant Insights</div>
                  <div className="text-xs text-muted-foreground mt-1">Real-time financial analysis</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
};