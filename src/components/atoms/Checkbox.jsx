import React from 'react'
import { cn } from '@/utils/cn'
import ApperIcon from '@/components/ApperIcon'

const Checkbox = React.forwardRef(({ 
  className, 
  checked,
  onChange,
  ...props 
}, ref) => {
  return (
    <div className="relative">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={onChange}
        ref={ref}
        {...props}
      />
      <div 
        className={cn(
          'w-5 h-5 rounded-md border-2 cursor-pointer transition-all duration-200 flex items-center justify-center',
          checked 
            ? 'bg-gradient-to-r from-primary to-secondary border-primary' 
            : 'border-gray-300 hover:border-primary',
          className
        )}
        onClick={() => onChange && onChange({ target: { checked: !checked } })}
      >
        {checked && (
          <ApperIcon 
            name="Check" 
            size={12} 
            className="text-white animate-bounce-subtle" 
          />
        )}
      </div>
    </div>
  )
})

Checkbox.displayName = 'Checkbox'

export default Checkbox