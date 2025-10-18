import React, { ReactNode } from 'react'
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { Loader2 } from 'lucide-react';

interface AuthLayoutProps {
  children: ReactNode;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className='flex justify-center pt-40'>
      <ClerkLoading>
        <div><Loader2 className='animate-spin w-7 w-7'/> Loading...</div>
      </ClerkLoading>

      <ClerkLoaded>
        <SignedIn>
          <div>{children}</div>
        </SignedIn>

        <SignedOut>
          <div>{children}</div>
        </SignedOut>
      </ClerkLoaded>
      </div>
  )
}

export default AuthLayout;