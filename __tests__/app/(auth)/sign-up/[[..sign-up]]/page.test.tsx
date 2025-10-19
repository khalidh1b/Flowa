import { render, screen } from "@testing-library/react";
import SignUpPage from "@/app/(auth)/sign-up/[[...sign-up]]/page";
import React from "react";

jest.mock("@clerk/nextjs", () => ({
    SignUp: () => React.createElement("div", null, "mock signup component"),
}));

describe("SignUpPage", () => {
    
    //unit test
    it("renders the signup component", () => {
        render(<SignUpPage/>)
        expect(screen.getByText("mock signup component")).toBeInTheDocument()
    })

    //snapshot test
    it("matches snapshot", () => {
        const { asFragment } = render(<SignUpPage/>)
        expect(asFragment()).toMatchSnapshot()
    })
});