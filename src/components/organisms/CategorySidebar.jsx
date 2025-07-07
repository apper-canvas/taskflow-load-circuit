import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { cn } from '@/utils/cn'
import CategoryPill from '@/components/molecules/CategoryPill'
import ApperIcon from '@/components/ApperIcon'

const CategorySidebar = ({ categories, className }) => {
  const { categoryId } = useParams()
  const navigate = useNavigate()

  const handleCategoryClick = (category) => {
    if (category.name === 'All Tasks') {
      navigate('/')
    } else {
      navigate(`/category/${category.name.toLowerCase()}`)
    }
  }

  const allTasksCategory = {
    Id: 0,
    name: 'All Tasks',
    color: '#5B4FE8',
    taskCount: categories.reduce((sum, cat) => sum + cat.taskCount, 0)
  }

  const allCategories = [allTasksCategory, ...categories]

  return (
    <div className={cn(
      "w-72 bg-gradient-to-b from-background to-white/50 backdrop-blur-premium border-r border-gray-200 h-screen overflow-y-auto",
      className
    )}>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
            <ApperIcon name="CheckSquare" size={20} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gradient font-display">
            TaskFlow
          </h2>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
            Categories
          </h3>
          
          {allCategories.map((category) => (
            <CategoryPill
              key={category.Id}
              category={category}
              isActive={
                category.name === 'All Tasks' 
                  ? !categoryId 
                  : categoryId === category.name.toLowerCase()
              }
              onClick={() => handleCategoryClick(category)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategorySidebar