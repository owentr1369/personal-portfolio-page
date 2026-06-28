import React from "react";

type Size = "sm" | "md" | "lg";

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  size?: Size;
  fullWidth?: boolean;
}

const sizeClasses: Record<Size, string> = {
  sm: "py-1 px-3 text-sm min-w-[120px] max-w-[120px]",
  md: "py-2 min-w-[200px] max-w-[200px]",
  lg: "py-3 px-6 text-lg min-w-[240px] max-w-[240px]",
};

const Button = React.forwardRef<HTMLAnchorElement, Props>(
  (
    { children, className = "", size = "md", fullWidth = false, ...props },
    ref
  ) => (
    <a
      ref={ref}
      className={`button-primary text-center text-white cursor-pointer rounded-lg ${
        fullWidth ? "w-full max-w-none min-w-0" : sizeClasses[size]
      } ${className}`}
      {...props}
    >
      {children}
    </a>
  )
);

Button.displayName = "Button";

export default Button;
