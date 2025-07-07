import React from 'react'
import Badge from '@/components/atoms/Badge'
import ApperIcon from '@/components/ApperIcon'

const PriorityBadge = ({ priority, showIcon = true }) => {
  const priorityConfig = {
    high: {
      variant: 'high',
      icon: 'AlertCircle',
      label: 'High'
    },
    medium: {
      variant: 'medium', 
      icon: 'Clock',
      label: 'Medium'
    },
    low: {
      variant: 'low',
      icon: 'Minus',
      label: 'Low'
    }
  }

  const config = priorityConfig[priority] || priorityConfig.medium

  return (
    <Badge variant={config.variant} size="sm">
      {showIcon && (
        <ApperIcon 
          name={config.icon} 
          size={12} 
          className="mr-1" 
        />
      )}
      {config.label}
    </Badge>
  )
}

export default PriorityBadge