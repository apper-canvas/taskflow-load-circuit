import React from 'react'
import { cn } from '@/utils/cn'
import Badge from '@/components/atoms/Badge'

const CategoryPill = ({ 
  category, 
  isActive = false, 
  onClick,
  showCount = true 
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 w-full px-4 py-3 rounded-lg text-left transition-all duration-200 hover:bg-white/60 hover:shadow-card',
        isActive 
          ? 'bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 shadow-card' 
          : 'hover:scale-105'
      )}
    >
      <div 
        className="w-3 h-3 rounded-full flex-shrink-0"
        style={{ backgroundColor: category.color }}
      />
      <span className={cn(
        'font-medium flex-1',
        isActive ? 'text-primary' : 'text-gray-700'
      )}>
        {category.name}
      </span>
      {showCount && (
        <Badge variant="secondary" size="sm">
          {category.taskCount}
        </Badge>
      )}
    </button>
  )
}

export default CategoryPill