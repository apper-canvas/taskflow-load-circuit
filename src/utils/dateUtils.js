import { format, isToday, isTomorrow, isPast, isValid } from 'date-fns'

export const formatDueDate = (date) => {
  if (!date || !isValid(new Date(date))) return null
  
  const dateObj = new Date(date)
  
  if (isToday(dateObj)) {
    return 'Today'
  } else if (isTomorrow(dateObj)) {
    return 'Tomorrow'
  } else {
    return format(dateObj, 'MMM d, yyyy')
  }
}

export const isOverdue = (date) => {
  if (!date || !isValid(new Date(date))) return false
  return isPast(new Date(date)) && !isToday(new Date(date))
}

export const formatDateForInput = (date) => {
  if (!date || !isValid(new Date(date))) return ''
  return format(new Date(date), 'yyyy-MM-dd')
}

export const createDateFromInput = (dateString) => {
  if (!dateString) return null
  return new Date(dateString)
}