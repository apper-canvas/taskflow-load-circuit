import React from 'react'
import { cn } from '@/utils/cn'
import SearchBar from '@/components/molecules/SearchBar'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const TaskHeader = ({ 
  title,
  onSearch,
  onAddTask,
  selectedCount = 0,
  onBulkComplete,
  onBulkDelete,
  className 
}) => {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gradient font-display">
          {title}
        </h1>
        
        <Button 
          onClick={onAddTask}
          variant="primary"
          className="gap-2 shadow-glow"
        >
          <ApperIcon name="Plus" size={18} />
          Add Task
        </Button>
      </div>
      
      <div className="flex items-center gap-4">
        <SearchBar 
          onSearch={onSearch}
          placeholder="Search tasks..."
          className="flex-1"
        />
        
        {selectedCount > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg">
            <span className="text-sm text-primary font-medium">
              {selectedCount} selected
            </span>
            <div className="flex gap-1">
              <Button
                onClick={onBulkComplete}
                variant="success"
                size="sm"
                className="gap-1"
              >
                <ApperIcon name="Check" size={14} />
                Complete
              </Button>
              <Button
                onClick={onBulkDelete}
                variant="danger"
                size="sm"
                className="gap-1"
              >
                <ApperIcon name="Trash2" size={14} />
                Delete
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TaskHeader