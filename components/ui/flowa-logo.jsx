import Link from "next/link";
import { Sparkles } from "lucide-react";

export const FlowaLogo = () => {
    return (
        <Link href="/" className="flex items-center gap-2 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <Sparkles className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-foreground">Flowa</span>
        </Link>
    )
};