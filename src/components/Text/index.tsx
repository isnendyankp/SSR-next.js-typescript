import { HTMLAttributes } from "react";


interface Props extends HTMLAttributes<HTMLParagraphElement> {
    children: string;
}


const Text = ({ children, ...props } : Props) => {

    return (
        <p {...props}>{children}</p>
    )
}

export default Text;


// Progress:
// 1. cr8 Text component
// 2. Cr8 type Props with children props with type string
// 3. Add children props/parameter with type Props to Text component
// 4. Render children props/parameter to p element
// 5. Add extends HTMLAttributes<HTMLParagraphElement> to Props type
// 6. Add props with type Props to Text component and spread it to p element
// 7. Add ...props to p element
// 8. import HTMLAttributes from react