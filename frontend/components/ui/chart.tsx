'use client'

import * as React from 'react'
import * as Recharts from 'recharts'
import { cn } from '@/lib/utils'

const THEMES = { light: '', dark: '.dark' } as const

export type ChartConfig = {
  [key: string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) throw new Error('useChart must be used within a <ChartContainer />')
  return context
}

type ChartContainerProps = React.ComponentProps<'div'> & {
  config: ChartConfig
  children: React.ReactElement | React.ReactElement[]
  id?: string
}

export function ChartContainer({ id, className, children, config, ...props }: ChartContainerProps) {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, '')}`

  // Ensure ResponsiveContainer receives a single ReactElement
  const content = Array.isArray(children) ? <>{children}</> : children

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <Recharts.ResponsiveContainer>{content}</Recharts.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(([_, cfg]) => cfg.theme || cfg.color)
  if (!colorConfig.length) return null

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => ` 
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color = itemConfig.theme?.[theme as keyof typeof itemConfig.theme] || itemConfig.color
    return color ? `  --color-${key}: ${color};` : ''
  })
  .join('\n')}
}
`
          )
          .join('\n'),
      }}
    />
  )
}

/* -------------------------------- Tooltip types -------------------------------- */

type TooltipItemValue = number | string | Array<number | string> | null | undefined

type TooltipItem = {
  value?: TooltipItemValue
  name?: string
  color?: string
  dataKey?: string | number
  payload?: any
  [key: string]: any
}

export type ChartTooltipContentProps = {
  active?: boolean
  payload?: TooltipItem[]
  className?: string
  label?: React.ReactNode
  labelClassName?: string
  hideLabel?: boolean
  hideIndicator?: boolean
  indicator?: 'line' | 'dot' | 'dashed'
  formatter?: (
    value: TooltipItemValue,
    name?: string,
    entry?: TooltipItem,
    index?: number,
    payload?: any
  ) => React.ReactNode
  nameKey?: string
  labelKey?: string
  color?: string
  labelFormatter?: (label: any, payload?: TooltipItem[]) => React.ReactNode
}

export const ChartTooltipContent: React.FC<ChartTooltipContentProps> = ({
  active,
  payload,
  className,
  indicator = 'dot',
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
}) => {
  const { config } = useChart()

  if (!active || !payload?.length) return null

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload.length) return null
    const [item] = payload
    const key = `${labelKey || item.dataKey || item.name || 'value'}`
    const itemConfig = getPayloadConfigFromPayload(config, item, key)
    const value =
      !labelKey && typeof label === 'string'
        ? config[label as string]?.label || label
        : itemConfig?.label
    if (!value) return null
    if (labelFormatter) {
      return <div className={cn('font-medium', labelClassName)}>{labelFormatter(value, payload)}</div>
    }
    return <div className={cn('font-medium', labelClassName)}>{value}</div>
  }, [payload, hideLabel, label, labelFormatter, labelClassName, config, labelKey])

  const nestLabel = payload.length === 1 && indicator !== 'dot'

  return (
    <div
      className={cn(
        'border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl',
        className
      )}
    >
      {!nestLabel ? tooltipLabel : null}
      <div className="grid gap-1.5">
        {payload.map((item, index) => {
          const key = `${nameKey || item.name || item.dataKey || 'value'}`
          const itemConfig = getPayloadConfigFromPayload(config, item, key)
          const indicatorColor =
            color || (item.payload?.fill as string | undefined) || (item.color as string | undefined)

          const hasValue = item.value !== undefined && item.value !== null
          const displayValue = Array.isArray(item.value)
            ? item.value.join(', ')
            : typeof item.value === 'number'
            ? item.value.toLocaleString()
            : String(item.value ?? '')

          return (
            <div
              key={(item.dataKey as React.Key) ?? index}
              className={cn(
                '[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5',
                indicator === 'dot' && 'items-center'
              )}
            >
              {formatter && hasValue && item.name ? (
                <>{formatter(item.value, item.name, item, index, item.payload)}</>
              ) : (
                <>
                  {itemConfig?.icon ? (
                    <itemConfig.icon />
                  ) : (
                    !hideIndicator && (
                      <div
                        className={cn('shrink-0 rounded-[2px]', {
                          'h-2.5 w-2.5': indicator === 'dot',
                          'w-1': indicator === 'line',
                          'w-0 border-[1.5px] border-dashed bg-transparent': indicator === 'dashed',
                          'my-0.5': nestLabel && indicator === 'dashed',
                        })}
                        style={
                          {
                            backgroundColor: indicator === 'dot' ? indicatorColor : undefined,
                            borderColor: indicator !== 'dot' ? indicatorColor : undefined,
                          } as React.CSSProperties
                        }
                      />
                    )
                  )}
                  <div
                    className={cn(
                      'flex flex-1 justify-between leading-none',
                      nestLabel ? 'items-end' : 'items-center'
                    )}
                  >
                    <div className="grid gap-1.5">
                      {nestLabel ? tooltipLabel : null}
                      <span className="text-muted-foreground">{itemConfig?.label || item.name}</span>
                    </div>
                    {hasValue && (
                      <span className="text-foreground font-mono font-medium tabular-nums">
                        {displayValue}
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* -------------------------------- Legend -------------------------------- */

type LegendItemPayload = {
  value?: React.ReactNode
  color?: string
  dataKey?: string | number
  payload?: any
  [key: string]: any
}

type ChartLegendContentProps = {
  className?: string
  hideIcon?: boolean
  payload?: LegendItemPayload[]
  verticalAlign?: 'top' | 'bottom'
  nameKey?: string
}

export const ChartLegendContent: React.FC<ChartLegendContentProps> = ({
  className,
  hideIcon = false,
  payload,
  verticalAlign = 'bottom',
  nameKey,
}) => {
  const { config } = useChart()
  if (!payload?.length) return null
  return (
    <div
      className={cn(
        'flex items-center justify-center gap-4',
        verticalAlign === 'top' ? 'pb-3' : 'pt-3',
        className
      )}
    >
      {payload.map((item, index) => {
        const key = `${nameKey || (item.dataKey as string) || 'value'}`
        const itemConfig = getPayloadConfigFromPayload(config, item, key)
        return (
          <div
            key={(item.value as string) || index}
            className="[&>svg]:text-muted-foreground flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3"
          >
            {itemConfig?.icon && !hideIcon ? (
              <itemConfig.icon />
            ) : (
              <div
                className="h-2 w-2 shrink-0 rounded-[2px]"
                style={{ backgroundColor: item.color } as React.CSSProperties}
              />
            )}
            {itemConfig?.label ?? item.value}
          </div>
        )
      })}
    </div>
  )
}

/* ---------------------------- Helper: config lookup ---------------------------- */

function getPayloadConfigFromPayload(config: ChartConfig, payload: any, key: string) {
  if (typeof payload !== 'object' || payload === null) return undefined
  const payloadPayload = payload.payload ?? undefined
  let configLabelKey = key
  if (key in payload && typeof payload[key] === 'string') configLabelKey = payload[key]
  else if (payloadPayload && key in payloadPayload && typeof payloadPayload[key] === 'string')
    configLabelKey = payloadPayload[key]
  return config[configLabelKey] ?? config[key]
}

/* ---------------------------------- Exports ---------------------------------- */

export { ChartStyle }
export const ChartTooltip = Recharts.Tooltip
export const ChartLegend = Recharts.Legend