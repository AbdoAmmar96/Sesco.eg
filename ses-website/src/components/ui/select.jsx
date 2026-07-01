import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { fieldCls } from './input'

/** Native styled select — keeps React Hook Form integration simple. */
const Select = forwardRef(({ className, children, ...props }, ref) => (
  <select ref={ref} className={cn(fieldCls, 'appearance-none bg-no-repeat pr-10', className)} {...props}>
    {children}
  </select>
))
Select.displayName = 'Select'

export { Select }
