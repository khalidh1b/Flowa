import { render, screen } from "@testing-library/react";
import SignInPage from "@/app/(auth)/sign-in/[[...sign-in]]/page";
import React from "react";

jest.mock("@clerk/nextjs", () => ({
    SignIn: () => React.createElement("div", null, "mock signin component"),
}));

describe("SignInPage", () => {
    
    //unit test
    it("renders the signin component", () => {
        render(<SignInPage/>)
        expect(screen.getByText("mock signin component")).toBeInTheDocument()
    })

    //snapshot test
    it("matches snapshot", () => {
        const { asFragment } = render(<SignInPage/>)
        expect(asFragment()).toMatchSnapshot()
    })
});