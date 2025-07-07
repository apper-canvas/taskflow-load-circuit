import React from 'react'
import { cn } from '@/utils/cn'

const TaskFormField = ({ 
  label, 
  children, 
  required = false,
  error,
  className 
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-error ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-sm text-error">{error}</p>
      )}
    </div>
  )
}

export default TaskFormField