import { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = (props: InputProps) => {
  return (
    <input
      type="text"
      {...props}
      className={`${props.className} block flex-1 border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6`}
    />
  );
};

export default Input;

// Progress:
//  1. cr8 input component
//  2. Add type InputProps with InputHTMLAttributes<HTMLInputElement> from react
//  3. Add props with type InputProps to Input component and spread it to input element
//  4. styling input element with tailwind className props
//  5. add spread props to input element

// Explanation:
//  add spread props to input element biar classNamenya tidak beradu antara className yang di pass in dari HomeContainer dengan className yang di pass in dari input component
