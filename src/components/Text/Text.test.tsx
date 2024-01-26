/*
    this is a test file for the Text component
*/

import Text from ".";
import { render, screen } from "@testing-library/react";

describe('Text component unit testing', () => {

// this test for text component with explanation should render text with children
    it('should render text with children', () => {
        render(<Text>Text with children</Text>);
        const textElement = screen.getByText(/text with children/i);
        expect(textElement).toMatchSnapshot();
    });
}
);
