import { useEffect, useMemo, useState } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import {
  Bell,
  Bookmark,
  Camera,
  Calendar,
  ChartColumn,
  Cloud,
  Download,
  Folder,
  Heart,
  Home,
  Lock,
  Mail,
  MessageSquare,
  RefreshCw,
  Search,
  Settings,
  Shield,
  Star,
  Trash,
  User,
} from 'lucide-react'
import ControlsPanel from './components/ControlsPanel'
import IconLibrary from './components/IconLibrary'
import IconPreview from './components/IconPreview'

const STORAGE_KEY = 'simple-icon-generator-state'

const DEFAULT_ICONS = [
  { id: 'user', name: 'user', type: 'default', component: User },
  { id: 'settings', name: 'settings', type: 'default', component: Settings },
  { id: 'download', name: 'download', type: 'default', component: Download },
  { id: 'dashboard', name: 'dashboard', type: 'default', component: ChartColumn },
  { id: 'bell', name: 'bell', type: 'default', component: Bell },
  { id: 'lock', name: 'lock', type: 'default', component: Lock },
  { id: 'home', name: 'home', type: 'default', component: Home },
  { id: 'mail', name: 'mail', type: 'default', component: Mail },
  { id: 'search', name: 'search', type: 'default', component: Search },
  { id: 'heart', name: 'heart', type: 'default', component: Heart },
  { id: 'star', name: 'star', type: 'default', component: Star },
  { id: 'camera', name: 'camera', type: 'default', component: Camera },
  { id: 'folder', name: 'folder', type: 'default', component: Folder },
  { id: 'shield', name: 'shield', type: 'default', component: Shield },
  { id: 'calendar', name: 'calendar', type: 'default', component: Calendar },
  { id: 'cloud', name: 'cloud', type: 'default', component: Cloud },
  { id: 'message', name: 'message', type: 'default', component: MessageSquare },
  { id: 'bookmark', name: 'bookmark', type: 'default', component: Bookmark },
  { id: 'trash', name: 'trash', type: 'default', component: Trash },
  { id: 'refresh', name: 'refresh', type: 'default', component: RefreshCw },
]

const defaultSettings = {
  iconColor: '#ffffff',
  backgroundColor: '#2563eb',
  backgroundShape: 'circle',
  transparentBackground: false,
  iconStyle: 'stroke',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  iconSize: 192,
}

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [customIcons, setCustomIcons] = useState([])
  const [selectedIconId, setSelectedIconId] = useState('user')
  const [settings, setSettings] = useState(defaultSettings)

  useEffect(() => {
    const savedState = localStorage.getItem(STORAGE_KEY)
    if (!savedState) return

    try {
      const parsed = JSON.parse(savedState)
      setCustomIcons(parsed.customIcons ?? [])
      setSelectedIconId(parsed.selectedIconId ?? 'user')
      setSettings({ ...defaultSettings, ...(parsed.settings ?? {}) })
    } catch {
      setSettings(defaultSettings)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        customIcons,
        selectedIconId,
        settings,
      }),
    )
  }, [customIcons, selectedIconId, settings])

  const mergedIcons = useMemo(() => [...DEFAULT_ICONS, ...customIcons], [customIcons])

  const filteredDefaultIcons = useMemo(
    () => DEFAULT_ICONS.filter((icon) => icon.name.includes(searchTerm.toLowerCase())),
    [searchTerm],
  )

  const filteredCustomIcons = useMemo(
    () => customIcons.filter((icon) => icon.name.includes(searchTerm.toLowerCase())),
    [customIcons, searchTerm],
  )

  const selectedIcon = useMemo(
    () => mergedIcons.find((icon) => icon.id === selectedIconId) ?? DEFAULT_ICONS[0],
    [mergedIcons, selectedIconId],
  )

  const buildBackground = () => {
    if (settings.transparentBackground) return ''

    if (settings.backgroundShape === 'square') {
      return `<rect x="10%" y="10%" width="80%" height="80%" fill="${settings.backgroundColor}" />`
    }

    if (settings.backgroundShape === 'rounded') {
      return `<rect x="10%" y="10%" width="80%" height="80%" rx="18%" fill="${settings.backgroundColor}" />`
    }

    if (settings.backgroundShape === 'blob') {
      return `<path d="M84.7,-54.9C95.5,-32.2,81.4,2.8,66.3,34.6C51.2,66.4,35.1,95.1,5.8,98.7C-23.5,102.3,-65.9,80.9,-79.3,47.8C-92.6,14.7,-76.9,-30,-49.2,-54.3C-21.5,-78.7,18.2,-82.7,84.7,-54.9Z" transform="translate(100 100) scale(0.85)" fill="${settings.backgroundColor}" />`
    }

    return `<circle cx="50%" cy="50%" r="40%" fill="${settings.backgroundColor}" />`
  }

  const buildIconMarkup = () => {
    if (selectedIcon.type === 'custom') {
      const fill = settings.iconStyle === 'fill' ? settings.iconColor : 'none'
      const stroke = settings.iconStyle === 'stroke' ? settings.iconColor : 'none'

      return `<svg x="50" y="50" width="100" height="100" viewBox="${selectedIcon.viewBox}"><g fill="${fill}" stroke="${stroke}" stroke-width="${settings.strokeWidth}" stroke-linecap="${settings.strokeLinecap}" stroke-linejoin="${settings.strokeLinejoin}">${selectedIcon.content}</g></svg>`
    }

    const IconComponent = selectedIcon.component
    const iconSvg = renderToStaticMarkup(
      <IconComponent
        size={100}
        strokeWidth={settings.strokeWidth}
        stroke={settings.iconStyle === 'stroke' ? settings.iconColor : 'none'}
        fill={settings.iconStyle === 'fill' ? settings.iconColor : 'none'}
        strokeLinecap={settings.strokeLinecap}
        strokeLinejoin={settings.strokeLinejoin}
      />,
    )

    return iconSvg.replace('<svg ', '<svg x="50" y="50" width="100" height="100" ')
  }

  const svgMarkup = useMemo(
    () =>
      `<svg id="icon-generator-svg" xmlns="http://www.w3.org/2000/svg" width="${settings.iconSize}" height="${settings.iconSize}" viewBox="0 0 200 200">${buildBackground()}${buildIconMarkup()}</svg>`,
    [selectedIcon, settings],
  )

  const updateSetting = (key, value) => setSettings((prev) => ({ ...prev, [key]: value }))

  return (
    <main className="min-h-screen bg-slate-100 p-4 lg:p-6">
      <h1 className="mb-4 text-center text-2xl font-bold text-slate-900 lg:mb-6">Simple Icon Generator</h1>
      <section className="grid min-h-[calc(100vh-6rem)] grid-cols-1 gap-4 lg:grid-cols-[300px_1fr_360px]">
        <IconLibrary
          defaultIcons={filteredDefaultIcons}
          customIcons={filteredCustomIcons}
          selectedIconId={selectedIcon.id}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onSelectIcon={setSelectedIconId}
          onCustomIconsChange={setCustomIcons}
        />
        <IconPreview iconName={selectedIcon.name} iconSize={settings.iconSize} svgMarkup={svgMarkup} />
        <ControlsPanel
          settings={settings}
          onSettingChange={updateSetting}
          onReset={() => setSettings(defaultSettings)}
          svgMarkup={svgMarkup}
          selectedIconName={selectedIcon.name}
          transparentBackground={settings.transparentBackground}
        />
      </section>
    </main>
  )
}

export default App
