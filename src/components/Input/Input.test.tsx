/*
    this is a test file for the input component
*/
import { render, screen } from '@testing-library/react';
import Input from '.';

describe('Input component unit testing', () => {
    // this test for input component with explanation should render input with placeholder
    it('should render input with placeholder', () => {
        render(<Input placeholder="Search" />);
        const inputElement = screen.getByPlaceholderText(/search/i);
        expect(inputElement).toMatchSnapshot();
    });
});
