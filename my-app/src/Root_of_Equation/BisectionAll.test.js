import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Bisection from './Bisection'
import "@testing-library/jest-dom";

describe("Bisection", () => {
  test("test screen", () => {
    render(<Bisection />);
    // const linkElement = screen.getByText(/Bisection Methods/i);
    // expect(linkElement).toBeInTheDocument();

    // Input XL
    const xlInput = screen.getByTestId("XL");
    fireEvent.change(xlInput, { target: { value: "1.5" } });

    // Input XR
    const xrInput = screen.getByTestId("XR");
    fireEvent.change(xrInput, { target: { value: "2" } });

    // Input equation
    const equation = screen.getByTestId("Equation");
    fireEvent.change(equation, { target: { value: "x^4-13" } });

    // Click calculate button
    const myBtn = screen.getByTestId("myBtn");
    fireEvent.click(myBtn);

    // Check answer
    const answer = screen.getByTestId("ans");
    console.log(answer.textContent);
    expect(answer.textContent).toBe("  Answer = 1.898829");
  });
});