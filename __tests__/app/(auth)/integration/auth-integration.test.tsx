import React from "react";
import { render, screen, within } from "@testing-library/react";
import AuthLayout from "@/app/(auth)/layout";
import SignInPage from "@/app/(auth)/sign-in/[[...sign-in]]/page";
import SignUpPage from "@/app/(auth)/sign-up/[[...sign-up]]/page";

jest.mock("@clerk/nextjs", () => ({
  ClerkLoading: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="clerk-loading">{children}</div>
  ),
  ClerkLoaded: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="clerk-loaded">{children}</div>
  ),
  SignedIn: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="signed-in">{children}</div>
  ),
  SignedOut: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="signed-out">{children}</div>
  ),
  SignIn: () => <div data-testid="mock-signin">mock signin component</div>,
  SignUp: () => <div data-testid="mock-signup">mock signup component</div>,
}));

describe("Auth Integration: AuthLayout + SignIn", () => {
  it("renders SignInPage for signed out state", () => {
    render(
      <AuthLayout>
        <SignInPage />
      </AuthLayout>
    );

    const signedOut = screen.getByTestId("signed-out");
    expect(within(signedOut).getByTestId("mock-signin")).toBeInTheDocument();
  });
});

describe("Auth Integration: AuthLayout + SignUp", () => {
  it("renders SignUpPage for signed out state", () => {
    render(
      <AuthLayout>
        <SignUpPage />
      </AuthLayout>
    );

    const signedOut = screen.getByTestId("signed-out");
    expect(within(signedOut).getByTestId("mock-signup")).toBeInTheDocument();
  });
});
