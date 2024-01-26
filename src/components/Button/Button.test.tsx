import Button from ".";
import { render, screen } from "@testing-library/react";

describe('Button component unit testing', () => {

// this test for button component with explanation should render button with label
  it('should render button with label', () => {
    render(<Button label="Click me" />);
    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).toMatchSnapshot();
  });
});