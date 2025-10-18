import Link from 'next/link';
import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { Button } from './ui/button';
import { LayoutDashboard, Loader2, PenBox } from 'lucide-react';
import { checkUser } from '@/lib/checkUser';
import { FlowaLogo } from '@/components/ui/flowa-logo'

export const Header = async () => {
    await checkUser();
    
    return (
        <div className='fixed top-0 w-full  backdrop-blur-sm z-50'>
            <nav className='container mx-auto px-4 py-4 flex items-center justify-between'>
                <FlowaLogo/>

                <div className='flex items-center space-x-4'>
                    <SignedIn>
                        <Link href={"/dashboard"} className='text-gray-600 hover:text-blue-600 flex items-center gap-2'>
                            <Button variant="outline">
                                <LayoutDashboard size={18} />
                                <span className='hidden md:inline'> Dashboard </span>
                            </Button>
                        </Link>

                        <Link href={"/transaction/create"}>
                            <Button className='flex items-center gap-2'>
                                <PenBox size={18} />
                                <span className='hidden md:inline'> Add Transaction </span>
                            </Button>
                        </Link>
                    </SignedIn>

                    <SignedOut>
                        <SignInButton forceRedirectUrl='/dashboard'>
                            <Button variant="outline"> Login </Button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton appearance={{
                            elements: {
                                avatarBox: "w-10 h-10"
                            }
                        }} />
                    </SignedIn>
                </div>
            </nav>
        </div>
    )
};