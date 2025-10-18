"use client";

import { useAuth } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const AuthRedirect = () => {
    const router = useRouter();
    const { isLoaded, isSignedIn } = useAuth();

    useEffect(() => {
        if(isLoaded && isSignedIn) {
            router.replace('/dashboard');
        }
    }, [isLoaded, isSignedIn, router]);

    if(!isLoaded) {
        return (
            <div>
                <Loader2 className="w-8 h-8 animate-spin h-screen mx-auto" />
            </div>
        )
    };

    return null;
};