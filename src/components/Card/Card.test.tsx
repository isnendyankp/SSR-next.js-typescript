/*
    this is a test file for the Card component
*/

import Card from ".";
import { render, screen } from "@testing-library/react";

describe('Card component unit testing', () => {

// this test for card component with explanation should render card with border
    it('should render card with border', () => {
        render(<Card border>Card with border</Card>);
        const cardElement = screen.getByText(/card with border/i);
        expect(cardElement).toMatchSnapshot();
    });
}
);