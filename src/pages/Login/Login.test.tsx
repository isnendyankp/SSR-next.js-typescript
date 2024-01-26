import Login from '.';
import { render } from '@testing-library/react';
import { useRouter } from 'next/router';


//  digunakan untuk mock implementation dari useRouter
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe("Login Component", () => {

    // digunakan untuk mereset mock implementation dari useRouter
    beforeEach(() => {
      (useRouter as jest.Mock).mockReturnValue({
        route: '/',
        pathname: '',
        query: '',
        asPath: '',
        push: jest.fn().mockResolvedValue(true),
        replace: jest.fn().mockResolvedValue(true),
      });
    });

    // test login component mempunyai useFormik hook
    it("should have useFormik hook", () => {
        const { getByTestId } = render(<Login />);
        const loginForm = getByTestId("login-form");
        expect(loginForm).toMatchSnapshot();
    });
});