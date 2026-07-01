import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

const fieldCls =
  'w-full rounded-lg border border-line bg-white px-4 py-3 text-sm text-navy-800 placeholder:text-navy-400 outline-none transition-colors focus:border-brand-royal focus:ring-2 focus:ring-brand-royal/15 disabled:cursor-not-allowed disabled:opacity-60'

const Input = forwardRef(({ className, type = 'text', ...props }, ref) => (
  <input ref={ref} type={type} className={cn(fieldCls, className)} {...props} />
))
Input.displayName = 'Input'

export { Input, fieldCls }
