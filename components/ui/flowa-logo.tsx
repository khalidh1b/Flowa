import Link from "next/link";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import fla from '@/public/flowa.png';

export const FlowaLogo = () => {
    return (
        <Link href="/" className="flex items-end gap-1 mb-4">
          <div className="flex h-9 w-9 items-end justify-center rounded-xl">
            <Image src={fla} width={100} height={100} alt="Logo"/>
            {/* <Sparkles className="h-6 w-6 text-primary-foreground" /> */}
          </div>
          <span className="text-2xl font-bold text-foreground">Flowa</span>
        </Link>
    )
};