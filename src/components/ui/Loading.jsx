import React from 'react'
import { cn } from '@/utils/cn'

const Loading = ({ className }) => {
  return (
    <div className={cn("space-y-4", className)}>
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-8 w-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg animate-pulse bg-[length:200%_100%] bg-[position:-200%_0%]" style={{
          animation: 'shimmer 2s infinite'
        }} />
        <div className="h-10 w-32 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg animate-pulse bg-[length:200%_100%] bg-[position:-200%_0%]" style={{
          animation: 'shimmer 2s infinite'
        }} />
      </div>

      {/* Task items skeleton */}
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-4 shadow-card">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-md animate-pulse bg-[length:200%_100%] bg-[position:-200%_0%]" style={{
                animation: 'shimmer 2s infinite'
              }} />
              <div className="flex-1 space-y-2">
                <div className="h-5 w-3/4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse bg-[length:200%_100%] bg-[position:-200%_0%]" style={{
                  animation: 'shimmer 2s infinite'
                }} />
                <div className="flex items-center gap-2">
                  <div className="h-4 w-16 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse bg-[length:200%_100%] bg-[position:-200%_0%]" style={{
                    animation: 'shimmer 2s infinite'
                  }} />
                  <div className="h-4 w-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse bg-[length:200%_100%] bg-[position:-200%_0%]" style={{
                    animation: 'shimmer 2s infinite'
                  }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  )
}

export default Loading