import { useEffect, useMemo, useState } from 'react'
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
      setCustomIcons(Array.isArray(parsed.customIcons) ? parsed.customIcons : [])
      setSelectedIconId(parsed.selectedIconId ?? 'user')
      setSettings({ ...defaultSettings, ...(parsed.settings ?? {}) })
    } catch {
      setSettings(defaultSettings)
      setCustomIcons([])
      setSelectedIconId('user')
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

  const allIcons = useMemo(() => [...DEFAULT_ICONS, ...customIcons], [customIcons])

  const selectedIcon = useMemo(
    () => allIcons.find((icon) => icon.id === selectedIconId) ?? DEFAULT_ICONS[0],
    [allIcons, selectedIconId],
  )

  const query = searchTerm.trim().toLowerCase()
  const filteredDefaultIcons = useMemo(
    () => DEFAULT_ICONS.filter((icon) => icon.name.toLowerCase().includes(query)),
    [query],
  )

  const filteredCustomIcons = useMemo(
    () => customIcons.filter((icon) => icon.name.toLowerCase().includes(query)),
    [customIcons, query],
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

        <IconPreview selectedIcon={selectedIcon} settings={settings} />

        <ControlsPanel
          settings={settings}
          onSettingChange={updateSetting}
          onReset={() => setSettings(defaultSettings)}
          selectedIconName={selectedIcon.name}
        />
      </section>
    </main>
  )
}

export default App
