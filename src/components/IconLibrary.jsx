import { Trash2, Upload } from 'lucide-react'
import { parseAndNormalizeSvg, slugifyName } from '../utils/svgUtils'

function IconSection({ title, icons, selectedIconId, onSelectIcon, onDeleteIcon }) {
  return (
    <div>
      <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</h3>
      <div className="grid grid-cols-1 gap-2">
        {icons.map((icon) => (
          <button
            type="button"
            key={icon.id}
            onClick={() => onSelectIcon(icon.id)}
            className={`flex items-center justify-between rounded-md border px-2 py-2 text-left text-sm transition ${
              selectedIconId === icon.id
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300'
            }`}
          >
            <span className="capitalize">{icon.name}</span>
            {icon.type === 'custom' && (
              <span
                onClick={(event) => {
                  event.stopPropagation()
                  onDeleteIcon(icon.id)
                }}
                className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-red-600"
              >
                <Trash2 size={14} />
              </span>
            )}
          </button>
        ))}
      </div>
      {icons.length === 0 && <p className="text-xs text-slate-400">No icons found.</p>}
    </div>
  )
}

function IconLibrary({
  defaultIcons,
  customIcons,
  selectedIconId,
  searchTerm,
  onSearchChange,
  onSelectIcon,
  onCustomIconsChange,
}) {
  const handleUpload = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.name.toLowerCase().endsWith('.svg')) {
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      try {
        const { viewBox, content } = parseAndNormalizeSvg(String(reader.result))
        const iconName = slugifyName(file.name)
        const customIcon = {
          id: `custom-${Date.now()}`,
          name: iconName || `custom-${Date.now()}`,
          type: 'custom',
          viewBox,
          content,
        }

        onCustomIconsChange((prev) => [customIcon, ...prev])
        onSelectIcon(customIcon.id)
      } catch {
        // ignored
      }
    }

    reader.readAsText(file)
    event.target.value = ''
  }

  const handleDelete = (id) => {
    onCustomIconsChange((prev) => prev.filter((icon) => icon.id !== id))
    if (selectedIconId === id) {
      onSelectIcon('user')
    }
  }

  return (
    <aside className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-lg font-semibold text-slate-900">Icon Library</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search icons..."
        className="mb-3 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
      />

      <label className="mb-4 flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-blue-300 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100">
        <Upload size={16} /> Upload SVG
        <input type="file" accept=".svg,image/svg+xml" onChange={handleUpload} className="hidden" />
      </label>

      <div className="space-y-4 overflow-y-auto pr-1">
        <IconSection
          title="Default Icons"
          icons={defaultIcons}
          selectedIconId={selectedIconId}
          onSelectIcon={onSelectIcon}
          onDeleteIcon={handleDelete}
        />
        <IconSection
          title="Custom Icons"
          icons={customIcons}
          selectedIconId={selectedIconId}
          onSelectIcon={onSelectIcon}
          onDeleteIcon={handleDelete}
        />
      </div>
    </aside>
  )
}

export default IconLibrary
