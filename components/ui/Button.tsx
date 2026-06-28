import React from "react";

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLAnchorElement, Props>(
  ({ children, className = "", ...props }, ref) => (
    <a
      ref={ref}
      className={`py-2 min-w-[200px] button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px] ${className}`}
      {...props}
    >
      {children}
    </a>
  )
);

Button.displayName = "Button";

export default Button;
