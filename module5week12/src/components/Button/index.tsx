import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const Button = ({ label, ...props }: Props) => {
  return (
    <button
      {...props}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
    >
      {label}
    </button>
  );
};

export default Button;

// Progress:
// 1. cr8 Button component
// 2. Add interface Props with Label props with type string
// 3. add extends ButtonHTMLAttributes<HTMLButtonElement> to Props type
// 4. Add label with type Props to Button component and spread it to button element
// 5. Render label props/parameter to button element
// 6. Add ...props to button element
// 7. import ButtonHTMLAttributes from react
// 8. Quick fix with add datatype button with input Props type
// 9. Add styling button with tailwind className props to button element
