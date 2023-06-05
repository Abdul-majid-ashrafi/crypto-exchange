import { render, screen, cleanup } from '@testing-library/react';
import SigninComponent from './Components/Authentication/Signin';
import SignupComponent from './Components/Authentication/Signup';

// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup);


test('renders the Login page', () => {
  render(<SigninComponent />);

  expect(screen.getByRole("heading")).toHaveTextContent(/Sign in/);
  expect(screen.getByTestId('email-input')).toBeEmptyDOMElement();
  expect(screen.getByTestId('email-input')).toBeRequired();
  expect(screen.getByTestId('pass-input')).toBeEmptyDOMElement();
  expect(screen.getByTestId('pass-input')).toBeRequired();
});


test('renders the Signup page', () => {
  render(<SignupComponent />);

  expect(screen.getByRole("heading")).toHaveTextContent(/Create a new account/);
  expect(screen.getByTestId('username-input')).toBeEmptyDOMElement();
  expect(screen.getByTestId('username-input')).toBeRequired();

  expect(screen.getByTestId('signup-email-input')).toBeEmptyDOMElement();
  expect(screen.getByTestId('signup-email-input')).toBeEmptyDOMElement();

  expect(screen.getByTestId('signup-pass-input')).toBeRequired();
  expect(screen.getByTestId('signup-pass-input')).toBeRequired();

  expect(screen.getByTestId('address-input')).toBeRequired();
  expect(screen.getByTestId('address-input')).toBeRequired();

  expect(screen.getByTestId('button')).toHaveAccessibleName()

});