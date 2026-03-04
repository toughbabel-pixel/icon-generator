import ExportButtons from './ExportButtons'

function ControlsPanel({
  iconColor,
  backgroundColor,
  backgroundShape,
  strokeWidth,
  iconSize,
  onIconColorChange,
  onBackgroundColorChange,
  onBackgroundShapeChange,
  onStrokeWidthChange,
  onIconSizeChange,
  selectedIcon,
}) {
  return (
    <aside className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-900">Customization</h2>
      <div className="space-y-4">
        <label className="block text-sm font-medium text-slate-700">
          Icon color
          <input
            type="color"
            value={iconColor}
            onChange={(event) => onIconColorChange(event.target.value)}
            className="mt-1 h-10 w-full cursor-pointer rounded-md border border-slate-200"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Background color
          <input
            type="color"
            value={backgroundColor}
            onChange={(event) => onBackgroundColorChange(event.target.value)}
            className="mt-1 h-10 w-full cursor-pointer rounded-md border border-slate-200"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Background shape
          <select
            value={backgroundShape}
            onChange={(event) => onBackgroundShapeChange(event.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          >
            <option value="circle">Circle</option>
            <option value="rounded">Rounded square</option>
            <option value="square">Square</option>
            <option value="blob">Blob shape</option>
          </select>
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Stroke width: {strokeWidth.toFixed(1)}
          <input
            type="range"
            min="1"
            max="5"
            step="0.5"
            value={strokeWidth}
            onChange={(event) => onStrokeWidthChange(Number(event.target.value))}
            className="mt-2 w-full"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Icon size: {iconSize}px
          <input
            type="range"
            min="16"
            max="512"
            step="8"
            value={iconSize}
            onChange={(event) => onIconSizeChange(Number(event.target.value))}
            className="mt-2 w-full"
          />
        </label>
      </div>

      <div className="mt-6 border-t border-slate-200 pt-4">
        <h3 className="mb-3 text-sm font-semibold text-slate-800">Export {selectedIcon.name}</h3>
        <ExportButtons iconName={selectedIcon.name} iconSize={iconSize} />
      </div>
    </aside>
  )
}

export default ControlsPanel
