import { Trash2, Upload } from 'lucide-react'
import { parseAndNormalizeSvg, slugifyName } from '../utils/svgUtils'

function IconRow({ icon, isSelected, onSelect, onDelete }) {
  const IconComponent = icon.component

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex items-center justify-between rounded-md border px-2 py-2 text-left text-sm transition ${
        isSelected
          ? 'border-blue-500 bg-blue-50 text-blue-700'
          : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300'
      }`}
    >
      <div className="flex min-w-0 items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded bg-slate-50">
          {icon.type === 'custom' ? (
            <svg viewBox={icon.viewBox} width="16" height="16" aria-hidden="true">
              <g dangerouslySetInnerHTML={{ __html: icon.content }} />
            </svg>
          ) : (
            <IconComponent size={14} />
          )}
        </span>
        <span className="truncate capitalize">{icon.name}</span>
      </div>

      {icon.type === 'custom' && (
        <span
          onClick={(event) => {
            event.stopPropagation()
            onDelete(icon.id)
          }}
          className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-red-600"
          aria-label={`Delete ${icon.name}`}
        >
          <Trash2 size={14} />
        </span>
      )}
    </button>
  )
}

function IconSection({ title, icons, selectedIconId, onSelectIcon, onDeleteIcon }) {
  return (
    <div>
      <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</h3>
      <div className="grid grid-cols-1 gap-2">
        {icons.map((icon) => (
          <IconRow
            key={icon.id}
            icon={icon}
            isSelected={selectedIconId === icon.id}
            onSelect={() => onSelectIcon(icon.id)}
            onDelete={onDeleteIcon}
          />
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
      event.target.value = ''
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      try {
        const { viewBox, content } = parseAndNormalizeSvg(String(reader.result ?? ''))
        const baseName = slugifyName(file.name) || `custom-${Date.now()}`

        const customIcon = {
          id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          name: baseName,
          type: 'custom',
          viewBox,
          content,
        }

        onCustomIconsChange((prev) => [customIcon, ...prev])
        onSelectIcon(customIcon.id)
      } catch {
        // Ignore malformed SVG files.
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
