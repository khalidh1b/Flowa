import React from "react";
import { render } from "@testing-library/react";
import AuthLayout from "@/app/(auth)/layout";

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
}));


describe("AuthLayout", () => {
  it("renders correctly (snapshot) for loading state", () => {
    const { asFragment, getByTestId } = render(<AuthLayout>Test Its Content</AuthLayout>);
    expect(getByTestId("clerk-loading")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders correctly (snapshot) for signed in state", () => {
    const { asFragment, getByTestId } = render(<AuthLayout>Test Its Content</AuthLayout>);
    expect(getByTestId("signed-in")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders correctly (snapshot) for signed out state", () => {
    const { asFragment, getByTestId } = render(<AuthLayout>Test Its Content</AuthLayout>);
    expect(getByTestId("signed-out")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});