import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { fieldCls } from './input'

const Textarea = forwardRef(({ className, ...props }, ref) => (
  <textarea ref={ref} className={cn(fieldCls, 'resize-y', className)} {...props} />
))
Textarea.displayName = 'Textarea'

export { Textarea }
