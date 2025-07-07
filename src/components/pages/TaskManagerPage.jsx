import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { taskService } from '@/services/api/taskService'
import CategorySidebar from '@/components/organisms/CategorySidebar'
import TaskHeader from '@/components/organisms/TaskHeader'
import TaskList from '@/components/organisms/TaskList'
import TaskModal from '@/components/organisms/TaskModal'
import ConfirmDialog from '@/components/molecules/ConfirmDialog'

const TaskManagerPage = () => {
  const { categoryId } = useParams()
  
  // Data state
  const [tasks, setTasks] = useState([])
  const [categories, setCategories] = useState([])
  const [filteredTasks, setFilteredTasks] = useState([])
  
  // Loading/Error state
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  // UI state
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTasks, setSelectedTasks] = useState([])
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  // Load initial data
  useEffect(() => {
    loadData()
  }, [])

  // Filter tasks based on category and search
  useEffect(() => {
    filterTasks()
  }, [tasks, categoryId, searchQuery])

  const loadData = async () => {
    try {
      setLoading(true)
      setError('')
      
      const [tasksData, categoriesData] = await Promise.all([
        taskService.getAllTasks(),
        taskService.getAllCategories()
      ])
      
      setTasks(tasksData)
      setCategories(categoriesData)
    } catch (err) {
      setError('Failed to load tasks. Please try again.')
      toast.error('Failed to load tasks')
    } finally {
      setLoading(false)
    }
  }

  const filterTasks = () => {
    let filtered = [...tasks]

    // Filter by category
    if (categoryId) {
      filtered = filtered.filter(task => 
        task.category.toLowerCase() === categoryId.toLowerCase()
      )
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(query) ||
        task.category.toLowerCase().includes(query)
      )
    }

    // Sort by priority and due date
    filtered.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority]
      
      if (priorityDiff !== 0) return priorityDiff
      
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate) - new Date(b.dueDate)
      }
      
      return new Date(b.createdAt) - new Date(a.createdAt)
    })

    setFilteredTasks(filtered)
  }

  const handleAddTask = () => {
    setEditingTask(null)
    setShowTaskModal(true)
  }

  const handleEditTask = (task) => {
    setEditingTask(task)
    setShowTaskModal(true)
  }

  const handleSubmitTask = async (taskData) => {
    try {
      if (editingTask) {
        const updatedTask = await taskService.updateTask(editingTask.Id, taskData)
        setTasks(prev => prev.map(t => t.Id === editingTask.Id ? updatedTask : t))
        toast.success('Task updated successfully')
      } else {
        const newTask = await taskService.createTask(taskData)
        setTasks(prev => [...prev, newTask])
        toast.success('Task added successfully')
      }
      
      // Refresh categories to update counts
      const categoriesData = await taskService.getAllCategories()
      setCategories(categoriesData)
      
    } catch (err) {
      toast.error('Failed to save task')
    }
  }

  const handleToggleComplete = async (taskId, completed) => {
    try {
      const updatedTask = await taskService.updateTask(taskId, { completed })
      setTasks(prev => prev.map(t => t.Id === taskId ? updatedTask : t))
      
      if (completed) {
        toast.success('Task completed! 🎉')
      } else {
        toast.info('Task marked as incomplete')
      }
    } catch (err) {
      toast.error('Failed to update task')
    }
  }

  const handleDeleteTask = async (taskId) => {
    try {
      await taskService.deleteTask(taskId)
      setTasks(prev => prev.filter(t => t.Id !== taskId))
      setSelectedTasks(prev => prev.filter(id => id !== taskId))
      
      // Refresh categories to update counts
      const categoriesData = await taskService.getAllCategories()
      setCategories(categoriesData)
      
      toast.success('Task deleted successfully')
    } catch (err) {
      toast.error('Failed to delete task')
    }
  }

  const handleSelectTask = (taskId) => {
    setSelectedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    )
  }

  const handleBulkComplete = async () => {
    try {
      await taskService.bulkUpdateTasks(selectedTasks, { completed: true })
      setTasks(prev => prev.map(t => 
        selectedTasks.includes(t.Id) 
          ? { ...t, completed: true, completedAt: new Date().toISOString() }
          : t
      ))
      setSelectedTasks([])
      toast.success(`${selectedTasks.length} tasks completed!`)
    } catch (err) {
      toast.error('Failed to complete tasks')
    }
  }

  const handleBulkDelete = () => {
    setShowDeleteConfirm(true)
  }

  const confirmBulkDelete = async () => {
    try {
      await taskService.bulkDeleteTasks(selectedTasks)
      setTasks(prev => prev.filter(t => !selectedTasks.includes(t.Id)))
      setSelectedTasks([])
      
      // Refresh categories to update counts
      const categoriesData = await taskService.getAllCategories()
      setCategories(categoriesData)
      
      toast.success('Tasks deleted successfully')
    } catch (err) {
      toast.error('Failed to delete tasks')
    } finally {
      setShowDeleteConfirm(false)
    }
  }

  const getPageTitle = () => {
    if (categoryId) {
      const category = categories.find(c => c.name.toLowerCase() === categoryId.toLowerCase())
      return category ? `${category.name} Tasks` : 'Tasks'
    }
    return 'All Tasks'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-white to-primary/5">
      <div className="flex">
        {/* Sidebar */}
        <CategorySidebar categories={categories} />
        
        {/* Main Content */}
        <div className="flex-1 p-8">
          <TaskHeader
            title={getPageTitle()}
            onSearch={setSearchQuery}
            onAddTask={handleAddTask}
            selectedCount={selectedTasks.length}
            onBulkComplete={handleBulkComplete}
            onBulkDelete={handleBulkDelete}
          />
          
          <div className="mt-8">
            <TaskList
              tasks={filteredTasks}
              loading={loading}
              error={error}
              onRetry={loadData}
              onToggleComplete={handleToggleComplete}
              onUpdateTask={handleSubmitTask}
              onDeleteTask={handleDeleteTask}
              selectedTasks={selectedTasks}
              onSelectTask={handleSelectTask}
              onAddTask={handleAddTask}
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      <TaskModal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        onSubmit={handleSubmitTask}
        task={editingTask}
        categories={categories}
      />

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={confirmBulkDelete}
        title="Delete Tasks"
        message={`Are you sure you want to delete ${selectedTasks.length} selected tasks? This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
      />
    </div>
  )
}

export default TaskManagerPage