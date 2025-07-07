import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { formatDateForInput, createDateFromInput } from '@/utils/dateUtils'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Select from '@/components/atoms/Select'
import TaskFormField from '@/components/molecules/TaskFormField'
import ApperIcon from '@/components/ApperIcon'

const TaskModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  task = null,
  categories = []
}) => {
  const [formData, setFormData] = useState({
    title: '',
    priority: 'medium',
    category: 'personal',
    dueDate: ''
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        priority: task.priority || 'medium',
        category: task.category || 'personal',
        dueDate: formatDateForInput(task.dueDate) || ''
      })
    } else {
      setFormData({
        title: '',
        priority: 'medium',
        category: 'personal',
        dueDate: ''
      })
    }
    setErrors({})
  }, [task, isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validation
    const newErrors = {}
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Prepare submission data
    const submitData = {
      ...formData,
      title: formData.title.trim(),
      dueDate: formData.dueDate ? createDateFromInput(formData.dueDate) : null
    }

    onSubmit(submitData)
    onClose()
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }))
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-floating p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {task ? 'Edit Task' : 'Add New Task'}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ApperIcon name="X" size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <TaskFormField 
                label="Task Title" 
                required
                error={errors.title}
              >
                <Input
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="Enter task title..."
                  autoFocus
                />
              </TaskFormField>

              <TaskFormField label="Priority">
                <Select
                  value={formData.priority}
                  onChange={(e) => handleChange('priority', e.target.value)}
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </Select>
              </TaskFormField>

              <TaskFormField label="Category">
                <Select
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category.Id} value={category.name.toLowerCase()}>
                      {category.name}
                    </option>
                  ))}
                </Select>
              </TaskFormField>

              <TaskFormField label="Due Date (Optional)">
                <Input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => handleChange('dueDate', e.target.value)}
                />
              </TaskFormField>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={onClose}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="flex-1"
                >
                  {task ? 'Update Task' : 'Add Task'}
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default TaskModal