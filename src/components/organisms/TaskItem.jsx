import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import { formatDueDate, isOverdue } from '@/utils/dateUtils'
import Checkbox from '@/components/atoms/Checkbox'
import Button from '@/components/atoms/Button'
import PriorityBadge from '@/components/molecules/PriorityBadge'
import ApperIcon from '@/components/ApperIcon'

const TaskItem = ({ 
  task, 
  onToggleComplete, 
  onUpdateTask, 
  onDeleteTask,
  isSelected,
  onSelect 
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    setEditTitle(task.title)
  }, [task.title])

  const handleCompleteToggle = () => {
    if (!task.completed) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 1000)
    }
    onToggleComplete(task.Id, !task.completed)
  }

  const handleSaveEdit = () => {
    if (editTitle.trim() && editTitle !== task.title) {
      onUpdateTask(task.Id, { title: editTitle.trim() })
    }
    setIsEditing(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSaveEdit()
    } else if (e.key === 'Escape') {
      setEditTitle(task.title)
      setIsEditing(false)
    }
  }

  const dueDateFormatted = formatDueDate(task.dueDate)
  const isTaskOverdue = isOverdue(task.dueDate)

  return (
    <motion.div
      className={cn(
        "bg-white rounded-xl p-4 shadow-card hover:shadow-card-hover transition-all duration-200 relative",
        task.completed && "opacity-75",
        isSelected && "ring-2 ring-primary/50 bg-primary/5"
      )}
      whileHover={{ scale: 1.01 }}
      layout
    >
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`
              }}
            />
          ))}
        </div>
      )}

<div className="flex items-start gap-3">
        <div className="flex items-center gap-2 mt-1">
          <Checkbox
            checked={task.completed}
            onChange={handleCompleteToggle}
            className="checkbox-fill"
          />
          <button
            onClick={onSelect}
            className={cn(
              "w-4 h-4 rounded-full border-2 transition-all duration-200 relative",
              isSelected 
                ? "bg-white border-primary" 
                : "border-gray-300 hover:border-primary"
            )}
          >
            {isSelected && (
              <div className="absolute inset-1 bg-primary rounded-full" />
            )}
          </button>
        </div>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onBlur={handleSaveEdit}
              onKeyDown={handleKeyPress}
              className="w-full text-lg font-medium text-gray-900 bg-transparent border-none outline-none focus:ring-0"
              autoFocus
            />
          ) : (
            <h3
              className={cn(
                "text-lg font-medium cursor-pointer hover:text-primary transition-colors",
                task.completed && "line-through text-gray-500"
              )}
              onClick={() => setIsEditing(true)}
            >
              {task.title}
            </h3>
          )}

          <div className="flex items-center gap-3 mt-2">
            <PriorityBadge priority={task.priority} />
            
            {dueDateFormatted && (
              <div className={cn(
                "flex items-center gap-1 text-sm",
                isTaskOverdue && !task.completed ? "text-error" : "text-gray-500"
              )}>
                <ApperIcon name="Calendar" size={14} />
                <span>{dueDateFormatted}</span>
                {isTaskOverdue && !task.completed && (
                  <ApperIcon name="AlertCircle" size={14} className="text-error" />
                )}
              </div>
            )}

            <div className="flex items-center gap-1 text-sm text-gray-500">
              <div 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: '#5B4FE8' }}
              />
              <span className="capitalize">{task.category}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ApperIcon name="Edit2" size={16} />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDeleteTask(task.Id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-error hover:text-error"
          >
            <ApperIcon name="Trash2" size={16} />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default TaskItem