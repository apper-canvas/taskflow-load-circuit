import tasksData from '@/services/mockData/tasks.json'
import categoriesData from '@/services/mockData/categories.json'

// In-memory storage for runtime modifications
let tasks = [...tasksData]
let categories = [...categoriesData]

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const taskService = {
  async getAllTasks() {
    await delay(300)
    return [...tasks]
  },

  async getTaskById(id) {
    await delay(200)
    const task = tasks.find(t => t.Id === parseInt(id))
    return task ? { ...task } : null
  },

  async createTask(taskData) {
    await delay(400)
    const newTask = {
      Id: Math.max(...tasks.map(t => t.Id)) + 1,
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null
    }
    tasks.push(newTask)
    
    // Update category task count
    const category = categories.find(c => c.name.toLowerCase() === taskData.category.toLowerCase())
    if (category) {
      category.taskCount += 1
    }
    
    return { ...newTask }
  },

  async updateTask(id, updates) {
    await delay(300)
    const index = tasks.findIndex(t => t.Id === parseInt(id))
    if (index === -1) return null
    
    const oldTask = tasks[index]
    const updatedTask = { ...oldTask, ...updates }
    
    // Handle completion status change
    if (updates.completed !== undefined) {
      updatedTask.completedAt = updates.completed ? new Date().toISOString() : null
    }
    
    tasks[index] = updatedTask
    return { ...updatedTask }
  },

  async deleteTask(id) {
    await delay(300)
    const index = tasks.findIndex(t => t.Id === parseInt(id))
    if (index === -1) return false
    
    const task = tasks[index]
    tasks.splice(index, 1)
    
    // Update category task count
    const category = categories.find(c => c.name.toLowerCase() === task.category.toLowerCase())
    if (category && category.taskCount > 0) {
      category.taskCount -= 1
    }
    
    return true
  },

  async bulkUpdateTasks(taskIds, updates) {
    await delay(400)
    const updatedTasks = []
    
    for (const id of taskIds) {
      const index = tasks.findIndex(t => t.Id === parseInt(id))
      if (index !== -1) {
        const oldTask = tasks[index]
        const updatedTask = { ...oldTask, ...updates }
        
        if (updates.completed !== undefined) {
          updatedTask.completedAt = updates.completed ? new Date().toISOString() : null
        }
        
        tasks[index] = updatedTask
        updatedTasks.push({ ...updatedTask })
      }
    }
    
    return updatedTasks
  },

  async bulkDeleteTasks(taskIds) {
    await delay(400)
    const deletedTasks = []
    
    // Sort IDs in descending order to avoid index shifting issues
    const sortedIds = taskIds.map(id => parseInt(id)).sort((a, b) => b - a)
    
    for (const id of sortedIds) {
      const index = tasks.findIndex(t => t.Id === id)
      if (index !== -1) {
        const task = tasks[index]
        deletedTasks.push({ ...task })
        tasks.splice(index, 1)
        
        // Update category task count
        const category = categories.find(c => c.name.toLowerCase() === task.category.toLowerCase())
        if (category && category.taskCount > 0) {
          category.taskCount -= 1
        }
      }
    }
    
    return deletedTasks
  },

  async getAllCategories() {
    await delay(200)
    return [...categories]
  },

  async getTasksByCategory(categoryName) {
    await delay(300)
    const filteredTasks = tasks.filter(t => 
      t.category.toLowerCase() === categoryName.toLowerCase()
    )
    return filteredTasks.map(t => ({ ...t }))
  },

  async searchTasks(query) {
    await delay(250)
    const searchTerm = query.toLowerCase()
    const filteredTasks = tasks.filter(t => 
      t.title.toLowerCase().includes(searchTerm) ||
      t.category.toLowerCase().includes(searchTerm)
    )
    return filteredTasks.map(t => ({ ...t }))
  }
}