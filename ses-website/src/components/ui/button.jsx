import { forwardRef } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * Shadcn-style Button. Variants are bridged to the site's existing `.btn`
 * design-system classes so the look stays identical while exposing the
 * standard Shadcn API (variant, size, asChild).
 */
const buttonVariants = cva('btn', {
  variants: {
    variant: {
      orange: 'btn-orange',
      royal: 'btn-royal',
      navy: 'btn-navy',
      outline: 'btn-outline-navy',
      outlineLight: 'btn-outline-light',
      outlineRoyal: 'btn-outline-royal',
    },
    size: {
      default: '',
      sm: '!px-4 !py-2 text-xs',
      lg: '!px-6 !py-3.5',
      full: 'w-full justify-center',
    },
  },
  defaultVariants: { variant: 'orange', size: 'default' },
})

const Button = forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button'
  return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
})
Button.displayName = 'Button'

export { Button, buttonVariants }
