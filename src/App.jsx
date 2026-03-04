import { useMemo, useState } from 'react'
import {
  Bell,
  ChartColumn,
  Download,
  Lock,
  Settings,
  User,
  Home,
  Mail,
  Search,
  Heart,
  Star,
  Camera,
  Folder,
  Shield,
  Calendar,
  Cloud,
  MessageSquare,
  Bookmark,
  Trash,
  RefreshCw,
} from 'lucide-react'
import IconLibrary from './components/IconLibrary'
import IconPreview from './components/IconPreview'
import ControlsPanel from './components/ControlsPanel'

const ICONS = [
  { name: 'user', component: User },
  { name: 'settings', component: Settings },
  { name: 'download', component: Download },
  { name: 'dashboard', component: ChartColumn },
  { name: 'bell', component: Bell },
  { name: 'lock', component: Lock },
  { name: 'home', component: Home },
  { name: 'mail', component: Mail },
  { name: 'search', component: Search },
  { name: 'heart', component: Heart },
  { name: 'star', component: Star },
  { name: 'camera', component: Camera },
  { name: 'folder', component: Folder },
  { name: 'shield', component: Shield },
  { name: 'calendar', component: Calendar },
  { name: 'cloud', component: Cloud },
  { name: 'message', component: MessageSquare },
  { name: 'bookmark', component: Bookmark },
  { name: 'trash', component: Trash },
  { name: 'refresh', component: RefreshCw },
]

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedIconName, setSelectedIconName] = useState('user')
  const [iconColor, setIconColor] = useState('#ffffff')
  const [backgroundColor, setBackgroundColor] = useState('#2563eb')
  const [backgroundShape, setBackgroundShape] = useState('circle')
  const [strokeWidth, setStrokeWidth] = useState(2)
  const [iconSize, setIconSize] = useState(192)

  const filteredIcons = useMemo(
    () => ICONS.filter((icon) => icon.name.toLowerCase().includes(searchTerm.toLowerCase())),
    [searchTerm],
  )

  const selectedIcon = useMemo(
    () => ICONS.find((icon) => icon.name === selectedIconName) ?? ICONS[0],
    [selectedIconName],
  )

  return (
    <main className="min-h-screen bg-slate-100 p-4 lg:p-6">
      <h1 className="mb-4 text-center text-2xl font-bold text-slate-900 lg:mb-6">Simple Icon Generator</h1>
      <section className="grid min-h-[calc(100vh-6rem)] grid-cols-1 gap-4 lg:grid-cols-[280px_1fr_320px]">
        <IconLibrary
          icons={filteredIcons}
          selectedIconName={selectedIcon.name}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onSelectIcon={setSelectedIconName}
        />
        <IconPreview
          iconName={selectedIcon.name}
          IconComponent={selectedIcon.component}
          iconColor={iconColor}
          backgroundColor={backgroundColor}
          backgroundShape={backgroundShape}
          strokeWidth={strokeWidth}
          iconSize={iconSize}
        />
        <ControlsPanel
          iconColor={iconColor}
          backgroundColor={backgroundColor}
          backgroundShape={backgroundShape}
          strokeWidth={strokeWidth}
          iconSize={iconSize}
          onIconColorChange={setIconColor}
          onBackgroundColorChange={setBackgroundColor}
          onBackgroundShapeChange={setBackgroundShape}
          onStrokeWidthChange={setStrokeWidth}
          onIconSizeChange={setIconSize}
          selectedIcon={selectedIcon}
        />
      </section>
    </main>
  )
}

export default App
