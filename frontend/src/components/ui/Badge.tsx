import { cn } from '../../lib/utils'

interface BadgeProps {
  label:    string
  color?:   'green' | 'blue' | 'red' | 'yellow' | 'orange' | 'gray' | 'purple' | 'teal'
  size?:    'sm' | 'md'
}

export default function Badge({
  label,
  color = 'gray',
  size  = 'md',
}: BadgeProps) {

  const colors = {
    green:  'bg-green-100 text-green-800',
    blue:   'bg-blue-100 text-blue-800',
    red:    'bg-red-100 text-red-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    orange: 'bg-orange-100 text-orange-800',
    gray:   'bg-gray-100 text-gray-700',
    purple: 'bg-purple-100 text-purple-800',
    teal:   'bg-teal-100 text-teal-800',
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
  }

  return (
    <span className={cn(
      'inline-flex items-center font-semibold rounded-full',
      colors[color],
      sizes[size]
    )}>
      {label}
    </span>
  )
}