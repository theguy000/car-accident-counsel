import { useState, useEffect, useRef } from 'react'

function SlotNumber({ value, duration = 2000 }) {
  const [displayValue, setDisplayValue] = useState('0')
  const [isAnimating, setIsAnimating] = useState(false)
  const hasAnimated = useRef(false)
  const elementRef = useRef(null)

  // Extract numeric part and suffix
  const parseValue = (val) => {
    // Handle $67M+ format
    if (val.includes('$') && val.includes('M')) {
      const match = val.match(/\$?([\d.]+)M\+?/)
      if (match) {
        return { number: parseFloat(match[1]) * 1000000, prefix: '$', suffix: 'M+', format: 'million' }
      }
    }
    // Handle 5,000+ format
    if (val.includes(',')) {
      const num = parseFloat(val.replace(/,/g, '').replace('+', ''))
      return { number: num, prefix: '', suffix: '+', format: 'number' }
    }
    // Handle 95% format
    if (val.includes('%')) {
      const num = parseFloat(val.replace('%', ''))
      return { number: num, prefix: '', suffix: '%', format: 'percent' }
    }
    // Handle 25+ format
    if (val.includes('+')) {
      const num = parseFloat(val.replace('+', ''))
      return { number: num, prefix: '', suffix: '+', format: 'number' }
    }
    // Default
    const num = parseFloat(val) || 0
    return { number: num, prefix: '', suffix: '', format: 'number' }
  }

  const { number: targetNumber, prefix, suffix, format } = parseValue(value)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true
            setIsAnimating(true)
            
            const steps = 60
            const increment = targetNumber / steps
            let current = 0
            let step = 0

            const timer = setInterval(() => {
              step++
              current += increment

              if (step >= steps) {
                current = targetNumber
                setIsAnimating(false)
                clearInterval(timer)
              }

              let formattedValue = ''
              if (format === 'million') {
                formattedValue = `${prefix}${(current / 1000000).toFixed(1)}${suffix}`
              } else if (format === 'percent') {
                formattedValue = `${Math.floor(current)}${suffix}`
              } else if (current >= 1000) {
                formattedValue = `${prefix}${Math.floor(current).toLocaleString()}${suffix}`
              } else {
                formattedValue = `${prefix}${Math.floor(current)}${suffix}`
              }

              setDisplayValue(formattedValue)
            }, duration / steps)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (elementRef.current) {
      const parentElement = elementRef.current.closest('.about-stat-item')
      if (parentElement) {
        observer.observe(parentElement)
      }
    }

    return () => {
      observer.disconnect()
    }
  }, [value, duration, targetNumber, prefix, suffix, format])

  return (
    <div className="slot-number-wrapper" ref={elementRef}>
      <div className={`slot-number ${isAnimating ? 'rolling' : ''}`}>
        {displayValue}
      </div>
    </div>
  )
}

export default SlotNumber


