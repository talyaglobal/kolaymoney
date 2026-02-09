import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', size = 'default', ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    
    const variantStyles = {
      default: "bg-primary text-white hover:bg-primary/90",
      outline: "border-2 border-black bg-white hover:bg-black hover:text-white",
      ghost: "hover:bg-gray-100"
    }
    
    const sizeStyles = {
      default: "px-4 py-2",
      sm: "px-3 py-1.5 text-sm",
      lg: "px-8 py-4 text-lg"
    }
    
    return (
      <button
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button }
