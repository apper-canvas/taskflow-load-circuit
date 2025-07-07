import React from 'react'
import { cn } from '@/utils/cn'

const Badge = React.forwardRef(({ 
  className, 
  variant = 'default',
  size = 'default',
  children,
  ...props 
}, ref) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    error: 'bg-error/10 text-error',
    high: 'bg-gradient-to-r from-error to-red-600 text-white shadow-md',
    medium: 'bg-gradient-to-r from-warning to-orange-500 text-white shadow-md',
    low: 'bg-gradient-to-r from-success to-green-600 text-white shadow-md'
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    default: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-base'
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium transition-all duration-200',
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </span>
  )
})

Badge.displayName = 'Badge'

export default Badge