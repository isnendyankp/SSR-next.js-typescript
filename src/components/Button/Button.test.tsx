import Button from ".";
import { render, screen } from "@testing-library/react";

describe('Button component unit testing', () => {
  it('should render button with label', () => {
    render(<Button label="Click me" />);
    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).toMatchSnapshot();
  });
});