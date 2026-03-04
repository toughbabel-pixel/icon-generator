function IconPreview({ iconName, iconSize, svgMarkup }) {
  return (
    <section className="flex items-center justify-center rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="drop-shadow-md" dangerouslySetInnerHTML={{ __html: svgMarkup }} />
        <p className="text-sm text-slate-500">
          Live preview for <span className="font-medium capitalize">{iconName}</span> ({iconSize}px)
        </p>
      </div>
    </section>
  )
}

export default IconPreview
