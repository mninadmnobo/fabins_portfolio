import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges Tailwind class names, resolving conflicts in favour of the last one.
 *
 * `clsx` handles the conditional forms — arrays, objects, `false && '…'` — and
 * `twMerge` then removes classes that would fight each other. Plain string
 * concatenation cannot do this: `'p-4' + ' p-8'` leaves both in the class list
 * and the winner depends on stylesheet order, whereas `cn('p-4', 'p-8')`
 * correctly yields `'p-8'`.
 *
 * That property is what makes component-level overrides work — a component can
 * ship a default class and let a caller replace it via a prop.
 *
 * @example
 *   cn('rounded-full border', isActive && 'border-accent', className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}