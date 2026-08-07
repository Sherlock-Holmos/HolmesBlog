import SmartLink from '@/components/SmartLink'
import { useEffect, useRef, useState } from 'react'

const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max)
}

/**
 * Rounded Rectangle SDF
 */
const roundedRectSDF = (x, y, width, height, radius) => {
  const px = x - width / 2
  const py = y - height / 2

  const qx = Math.abs(px) - width / 2 + radius
  const qy = Math.abs(py) - height / 2 + radius

  return (
    Math.min(Math.max(qx, qy), 0) +
    Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) -
    radius
  )
}

/**
 * 生成 Liquid Glass 折射位移图
 * R = X displacement, G = Y displacement, 128 = 无位移
 */
const createDisplacementMap = (width, height, radius, bezel = 14) => {
  const dpr = Math.min(window.devicePixelRatio || 1, 2)

  const canvas = document.createElement('canvas')
  canvas.width = Math.round(width * dpr)
  canvas.height = Math.round(height * dpr)

  const ctx = canvas.getContext('2d')
  const imageData = ctx.createImageData(canvas.width, canvas.height)
  const data = imageData.data

  const epsilon = 0.5

  for (let py = 0; py < canvas.height; py++) {
    for (let px = 0; px < canvas.width; px++) {
      const x = px / dpr
      const y = py / dpr

      const sdf = roundedRectSDF(x, y, width, height, radius)

      let dx = 0
      let dy = 0

      // 仅在玻璃内部
      if (sdf <= 0) {
        const distanceFromEdge = -sdf
        // 仅在边缘 bezel 区域产生折射
        const t = clamp(1 - distanceFromEdge / bezel, 0, 1)

        if (t > 0) {
          // SDF 梯度 = 边缘法线
          const gx =
            roundedRectSDF(x + epsilon, y, width, height, radius) -
            roundedRectSDF(x - epsilon, y, width, height, radius)
          const gy =
            roundedRectSDF(x, y + epsilon, width, height, radius) -
            roundedRectSDF(x, y - epsilon, width, height, radius)

          const length = Math.hypot(gx, gy) || 1
          const nx = gx / length
          const ny = gy / length

          // smoothstep
          const strength = t * t * (3 - 2 * t)
          // 向透镜中心采样 → 凸透镜感觉
          dx = -nx * strength
          dy = -ny * strength
        }
      }

      const index = (py * canvas.width + px) * 4
      data[index] = Math.round(clamp(128 + dx * 127, 0, 255))
      data[index + 1] = Math.round(clamp(128 + dy * 127, 0, 255))
      data[index + 2] = 128
      data[index + 3] = 255
    }
  }

  ctx.putImageData(imageData, 0, 0)
  return canvas.toDataURL('image/png')
}

/**
 * Apple Liquid Glass 风格链接按钮
 * 使用 SVG displacement map 实现真正的折射效果
 */
const LiquidGlassLink = ({ index, href, title, children }) => {
  const wrapperRef = useRef(null)
  const [filterData, setFilterData] = useState(null)
  const filterId = `hexo-liquid-glass-${index}`

  useEffect(() => {
    const element = wrapperRef.current
    if (!element) return

    let frame
    const updateFilter = () => {
      const rect = element.getBoundingClientRect()
      const width = Math.round(rect.width)
      const height = Math.round(rect.height)
      if (!width || !height) return

      const radius = Math.min(height / 2 - 1, 30)
      const map = createDisplacementMap(width, height, radius, 14)
      setFilterData({ width, height, map })
    }

    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(updateFilter)
    })
    observer.observe(element)
    updateFilter()

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [])

  const handlePointerMove = event => {
    const element = event.currentTarget
    const rect = element.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    element.style.setProperty('--glass-x', `${x}%`)
    element.style.setProperty('--glass-y', `${y}%`)
  }

  const handlePointerLeave = event => {
    event.currentTarget.style.setProperty('--glass-x', '35%')
    event.currentTarget.style.setProperty('--glass-y', '20%')
  }

  return (
    <div
      ref={wrapperRef}
      className='h-14 w-full sm:w-4/5 md:h-16 md:w-40 lg:h-20'
    >
      {filterData && (
        <svg
          aria-hidden='true'
          className='pointer-events-none absolute h-0 w-0'
        >
          <defs>
            <filter
              id={filterId}
              x='0'
              y='0'
              width={filterData.width}
              height={filterData.height}
              filterUnits='userSpaceOnUse'
              primitiveUnits='userSpaceOnUse'
              colorInterpolationFilters='sRGB'
            >
              <feImage
                href={filterData.map}
                x='0'
                y='0'
                width={filterData.width}
                height={filterData.height}
                preserveAspectRatio='none'
                result='displacement'
              />
              <feDisplacementMap
                in='SourceGraphic'
                in2='displacement'
                scale='13'
                xChannelSelector='R'
                yChannelSelector='G'
                result='refracted'
              />
            </filter>
          </defs>
        </svg>
      )}

      <SmartLink
        title={title}
        href={href}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{
          '--glass-filter': filterData ? `url(#${filterId})` : 'none'
        }}
        className='liquid-glass group relative flex h-full w-full items-center justify-center overflow-hidden px-6'
      >
        <span className='liquid-glass-rim' />
        <span className='liquid-glass-highlight' />
        <span className='relative z-10 text-sm font-medium tracking-wide text-white md:text-base'>
          {children}
        </span>
      </SmartLink>
    </div>
  )
}

export default LiquidGlassLink