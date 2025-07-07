import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TaskItem from '@/components/organisms/TaskItem'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'

const TaskList = ({ 
  tasks,
  loading,
  error,
  onRetry,
  onToggleComplete,
  onUpdateTask,
  onDeleteTask,
  selectedTasks,
  onSelectTask,
  onAddTask
}) => {
  if (loading) return <Loading />
  
  if (error) return <Error message={error} onRetry={onRetry} />
  
  if (!tasks || tasks.length === 0) {
    return (
      <Empty 
        title="No tasks found"
        message="Start by adding your first task to get organized!"
        actionText="Add Task"
        onAction={onAddTask}
      />
    )
  }

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {tasks.map((task) => (
          <motion.div
            key={task.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <TaskItem
              task={task}
              onToggleComplete={onToggleComplete}
              onUpdateTask={onUpdateTask}
              onDeleteTask={onDeleteTask}
              isSelected={selectedTasks.includes(task.Id)}
              onSelect={() => onSelectTask(task.Id)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default TaskList