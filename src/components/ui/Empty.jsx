import React from 'react'
import { cn } from '@/utils/cn'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  title = "No tasks yet",
  message = "Start by adding your first task to get organized!",
  actionText = "Add Task",
  onAction,
  icon = "CheckSquare",
  className 
}) => {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center py-12 px-4",
      className
    )}>
      <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 flex items-center justify-center mb-6">
        <ApperIcon name={icon} size={40} className="text-primary" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      
      <p className="text-gray-600 text-center mb-8 max-w-md">
        {message}
      </p>
      
      {onAction && (
        <Button 
          onClick={onAction}
          variant="primary"
          className="gap-2"
        >
          <ApperIcon name="Plus" size={16} />
          {actionText}
        </Button>
      )}
    </div>
  )
}

export default Empty