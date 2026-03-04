function IconLibrary({ icons, selectedIconName, searchTerm, onSearchChange, onSelectIcon }) {
  return (
    <aside className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-lg font-semibold text-slate-900">Icon Library</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search icons..."
        className="mb-4 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
      />
      <div className="grid max-h-[65vh] grid-cols-2 gap-2 overflow-y-auto pr-1">
        {icons.map((icon) => {
          const IconComponent = icon.component
          const isSelected = selectedIconName === icon.name

          return (
            <button
              type="button"
              key={icon.name}
              onClick={() => onSelectIcon(icon.name)}
              className={`flex items-center gap-2 rounded-md border px-2 py-2 text-left text-sm transition ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50/50'
              }`}
            >
              <IconComponent size={16} strokeWidth={2} />
              <span className="capitalize">{icon.name}</span>
            </button>
          )
        })}
        {icons.length === 0 && <p className="col-span-2 text-sm text-slate-500">No icons match your search.</p>}
      </div>
    </aside>
  )
}

export default IconLibrary
