import { useState } from 'react'
import ExportButtons from './ExportButtons'

const tabs = ['General', 'Stroke', 'Background', 'Export']

function ControlsPanel({ settings, onSettingChange, onReset, svgMarkup, selectedIconName }) {
  const [activeTab, setActiveTab] = useState('General')

  return (
    <aside className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-900">Customization</h2>

      <div className="mb-4 grid grid-cols-4 gap-1 rounded-md bg-slate-100 p-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`rounded px-2 py-1 text-xs font-medium ${
              activeTab === tab ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {activeTab === 'General' && (
          <>
            <label className="block text-sm font-medium text-slate-700">
              Icon color
              <input
                type="color"
                value={settings.iconColor}
                onChange={(event) => onSettingChange('iconColor', event.target.value)}
                className="mt-1 h-10 w-full cursor-pointer rounded-md border border-slate-200"
              />
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Icon size: {settings.iconSize}px
              <input
                type="range"
                min="16"
                max="512"
                step="8"
                value={settings.iconSize}
                onChange={(event) => onSettingChange('iconSize', Number(event.target.value))}
                className="mt-2 w-full"
              />
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Icon style
              <select
                value={settings.iconStyle}
                onChange={(event) => onSettingChange('iconStyle', event.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              >
                <option value="stroke">Stroke</option>
                <option value="fill">Fill</option>
              </select>
            </label>
          </>
        )}

        {activeTab === 'Stroke' && (
          <>
            <label className="block text-sm font-medium text-slate-700">
              Stroke width: {settings.strokeWidth.toFixed(1)}
              <input
                type="range"
                min="1"
                max="8"
                step="0.5"
                value={settings.strokeWidth}
                onChange={(event) => onSettingChange('strokeWidth', Number(event.target.value))}
                className="mt-2 w-full"
                disabled={settings.iconStyle === 'fill'}
              />
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Stroke linecap
              <select
                value={settings.strokeLinecap}
                onChange={(event) => onSettingChange('strokeLinecap', event.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                disabled={settings.iconStyle === 'fill'}
              >
                <option value="round">round</option>
                <option value="butt">butt</option>
                <option value="square">square</option>
              </select>
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Stroke linejoin
              <select
                value={settings.strokeLinejoin}
                onChange={(event) => onSettingChange('strokeLinejoin', event.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                disabled={settings.iconStyle === 'fill'}
              >
                <option value="round">round</option>
                <option value="bevel">bevel</option>
                <option value="miter">miter</option>
              </select>
            </label>
          </>
        )}

        {activeTab === 'Background' && (
          <>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <input
                type="checkbox"
                checked={settings.transparentBackground}
                onChange={(event) => onSettingChange('transparentBackground', event.target.checked)}
              />
              Transparent Background
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Background color
              <input
                type="color"
                value={settings.backgroundColor}
                onChange={(event) => onSettingChange('backgroundColor', event.target.value)}
                disabled={settings.transparentBackground}
                className="mt-1 h-10 w-full cursor-pointer rounded-md border border-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
              />
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Background shape
              <select
                value={settings.backgroundShape}
                onChange={(event) => onSettingChange('backgroundShape', event.target.value)}
                disabled={settings.transparentBackground}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
              >
                <option value="circle">Circle</option>
                <option value="rounded">Rounded square</option>
                <option value="square">Square</option>
                <option value="blob">Blob shape</option>
              </select>
            </label>
          </>
        )}

        {activeTab === 'Export' && <ExportButtons iconName={selectedIconName} iconSize={settings.iconSize} svgMarkup={svgMarkup} />}
      </div>

      <button
        type="button"
        onClick={onReset}
        className="mt-4 w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        Reset Customization
      </button>
    </aside>
  )
}

export default ControlsPanel
