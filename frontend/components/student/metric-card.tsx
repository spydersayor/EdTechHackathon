"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
  valueClassName?: string
}

export function MetricCard({ title, value, subtitle, icon: Icon, trend, className, valueClassName }: MetricCardProps) {
  const numericValue = typeof value === "string" ? Number.parseInt(value.replace(/[^\d]/g, "")) || 0 : value
  const isNumeric = typeof value === "number" || !isNaN(numericValue)

  return (
    <Card className={cn("animate-fade-in-up hover:shadow-lg transition-all duration-300", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={cn("text-sm font-medium text-foreground")}>{title}</CardTitle>
        <Icon className={cn("h-4 w-4 text-foreground")} />
      </CardHeader>
      <CardContent>
        <div className={cn("text-2xl font-bold text-foreground", valueClassName)}>
          {isNumeric ? (
            <AnimatedCounter
              end={numericValue}
              suffix={typeof value === "string" ? value.replace(/[\d,]/g, "") : ""}
              className="animate-count-up"
            />
          ) : (
            <span className="animate-count-up">{value}</span>
          )}
        </div>
        {subtitle && <p className={cn("text-xs mt-1 text-muted-foreground")}>{subtitle}</p>}
        {trend && (
          <div className="flex items-center mt-2">
            <span
              className={cn(
                "text-xs font-medium",
                trend.isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400",
              )}
            >
              {trend.isPositive ? "+" : ""}
              {trend.value}%
            </span>
            <span className={cn("text-xs ml-1 text-muted-foreground")}>from last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
