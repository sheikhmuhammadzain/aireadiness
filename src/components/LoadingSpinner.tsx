import { SpinnerGap } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const LoadingSpinner = ({ size = 'md', className }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  }

  return (
    <SpinnerGap
      className={cn(
        'animate-spin',
        sizeClasses[size],
        className
      )}
    />
  )
}

export default LoadingSpinner;