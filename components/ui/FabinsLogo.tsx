'use client'

import React from 'react'

interface FabinsLogoProps {
  className?: string
  alt?: string
}

/**
 * Brand mark. Both variants are rendered and swapped with CSS only, so the
 * correct logo is present on first paint in either theme (no hydration flash).
 */
export const FabinsLogo: React.FC<FabinsLogoProps> = ({
  className = 'h-14 w-auto',
  alt = 'FABINS — Fabric Inspection Automation',
}) => (
  <span className="relative inline-flex shrink-0 items-center">
    <img
      src="/fabins-logo-light-mode.png"
      alt={alt}
      className={`block object-contain dark:hidden ${className}`}
    />
    <img
      src="/fabins-logo-dark-mode.png"
      alt=""
      aria-hidden="true"
      className={`hidden object-contain dark:block ${className}`}
    />
  </span>
)
