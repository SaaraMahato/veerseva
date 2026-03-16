import { Check } from 'lucide-react'
import { cn } from '../../lib/utils'

interface Step {
  label: string
  description?: string
}

interface StepperProps {
  steps:       Step[]
  currentStep: number  // 0-based index
}

export default function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep
          const isActive    = index === currentStep

          return (
            <div key={index} className="flex items-center flex-1">
              {/* Circle */}
              <div className="flex flex-col items-center">
                <div className={cn(
                  'w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm transition-all',
                  isCompleted && 'bg-green-700 text-white',
                  isActive    && 'bg-green-700 text-white ring-4 ring-green-100',
                  !isCompleted && !isActive && 'bg-gray-100 text-gray-400'
                )}>
                  {isCompleted
                    ? <Check size={16} />
                    : <span>{index + 1}</span>
                  }
                </div>
                <span className={cn(
                  'mt-2 text-xs font-medium text-center max-w-20',
                  isActive    ? 'text-green-700' : 'text-gray-500'
                )}>
                  {step.label}
                </span>
              </div>
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className={cn(
                  'flex-1 h-0.5 mx-2 mb-5 transition-all',
                  isCompleted ? 'bg-green-700' : 'bg-gray-200'
                )} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
