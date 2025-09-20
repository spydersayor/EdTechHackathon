"use client"

import { useEffect, useState } from "react"

interface ProgressBarProps {
  value: number
  max?: number
  className?: string
  showLabel?: boolean
  animated?: boolean
}

export function ProgressBar({
  value,
  max = 100,
  className = "",
  showLabel = false,
  animated = true,
}: ProgressBarProps) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setDisplayValue(value)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      setDisplayValue(value)
    }
  }, [value, animated])

  const percentage = Math.min((displayValue / max) * 100, 100)

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-1">
        {showLabel && <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>}
        <span className="text-sm text-gray-500 dark:text-gray-400">{Math.round(percentage)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
