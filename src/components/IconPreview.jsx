function BackgroundShape({ shape, color }) {
  if (shape === 'square') {
    return <rect x="10%" y="10%" width="80%" height="80%" fill={color} />
  }

  if (shape === 'rounded') {
    return <rect x="10%" y="10%" width="80%" height="80%" rx="18%" fill={color} />
  }

  if (shape === 'blob') {
    return (
      <path
        d="M84.7,-54.9C95.5,-32.2,81.4,2.8,66.3,34.6C51.2,66.4,35.1,95.1,5.8,98.7C-23.5,102.3,-65.9,80.9,-79.3,47.8C-92.6,14.7,-76.9,-30,-49.2,-54.3C-21.5,-78.7,18.2,-82.7,84.7,-54.9Z"
        transform="translate(100 100) scale(0.85)"
        fill={color}
      />
    )
  }

  return <circle cx="50%" cy="50%" r="40%" fill={color} />
}

function IconPreview({ selectedIcon, settings }) {
  const IconComponent = selectedIcon.component
  const iconFill = settings.iconStyle === 'fill' ? settings.iconColor : 'none'
  const iconStroke = settings.iconStyle === 'stroke' ? settings.iconColor : 'none'

  return (
    <section className="flex items-center justify-center rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col items-center gap-4">
        <svg
          id="icon-generator-svg"
          xmlns="http://www.w3.org/2000/svg"
          width={settings.iconSize}
          height={settings.iconSize}
          viewBox="0 0 200 200"
          className="drop-shadow-md"
          role="img"
          aria-label={`${selectedIcon.name} preview`}
        >
          {!settings.transparentBackground && (
            <BackgroundShape shape={settings.backgroundShape} color={settings.backgroundColor} />
          )}

          <g
            transform="translate(50 50)"
            fill={iconFill}
            stroke={iconStroke}
            strokeWidth={settings.strokeWidth}
            strokeLinecap={settings.strokeLinecap}
            strokeLinejoin={settings.strokeLinejoin}
          >
            {selectedIcon.type === 'custom' ? (
              <svg viewBox={selectedIcon.viewBox} width="100" height="100" x="0" y="0">
                <g dangerouslySetInnerHTML={{ __html: selectedIcon.content }} />
              </svg>
            ) : (
              <IconComponent
                size={100}
                strokeWidth={settings.strokeWidth}
                stroke={iconStroke}
                fill={iconFill}
                strokeLinecap={settings.strokeLinecap}
                strokeLinejoin={settings.strokeLinejoin}
              />
            )}
          </g>
        </svg>

        <p className="text-sm text-slate-500">
          Live preview for <span className="font-medium capitalize">{selectedIcon.name}</span> ({settings.iconSize}px)
        </p>
      </div>
    </section>
  )
}

export default IconPreview
