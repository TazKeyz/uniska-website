type BrandNameProps = {
  variant?: 'nav' | 'hero' | 'footer'
  className?: string
}

export function BrandName({ variant = 'nav', className = '' }: BrandNameProps) {
  if (variant === 'hero') {
    return (
      <div className={`text-center ${className}`}>
        <p className="font-display text-3xl font-semibold mb-1">Uniska</p>
        <p className="text-xs uppercase tracking-[0.25em] text-ink-muted font-semibold">
          Nails Studio
        </p>
      </div>
    )
  }

  if (variant === 'footer') {
    return (
      <div className={`text-center ${className}`}>
        <p className="font-display text-2xl font-semibold">
          Uniska<span className="text-gradient">.</span>
        </p>
        <p className="text-xs uppercase tracking-[0.2em] text-ink-muted font-semibold mt-1">
          Nails Studio
        </p>
      </div>
    )
  }

  return (
    <span className={`font-display font-semibold tracking-tight leading-tight ${className}`}>
      <span className="text-xl sm:text-2xl">Uniska</span>
      <span className="text-gradient">.</span>
      <span className="block text-[10px] uppercase tracking-[0.18em] text-ink-muted font-body font-semibold">
        Nails Studio
      </span>
    </span>
  )
}
