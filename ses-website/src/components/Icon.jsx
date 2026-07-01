import {
  Flame,
  Bell,
  Droplet,
  Droplets,
  Wrench,
  Settings,
  Gauge,
  Shield,
  ShieldCheck,
  Award,
  Users,
  Clock,
  Target,
  Eye,
  Gem,
  Headset,
  Building,
  Building2,
  Factory,
  MapPin,
  Handshake,
  HardHat,
  ClipboardCheck,
  FileText,
  Phone,
  Mail,
  Globe,
  Facebook,
  Linkedin,
  Youtube,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  CheckCircle2,
  Cpu,
  CircuitBoard,
  Cable,
  BatteryCharging,
  Volume2,
  Siren,
  ScanLine,
  SprayCan,
  FireExtinguisher,
  Grid3x3,
  Disc,
  Package,
  Container,
  Calculator,
  Box,
} from 'lucide-react'

// Map data icon keys → lucide components (domain-specific aliases included)
const MAP = {
  flame: Flame,
  bell: Bell,
  droplet: Droplet,
  droplets: Droplets,
  wrench: Wrench,
  settings: Settings,
  gauge: Gauge,
  shield: Shield,
  'shield-check': ShieldCheck,
  award: Award,
  users: Users,
  clock: Clock,
  target: Target,
  eye: Eye,
  gem: Gem,
  headset: Headset,
  building: Building,
  building2: Building2,
  factory: Factory,
  hospital: Building2,
  mappin: MapPin,
  handshake: Handshake,
  hardhat: HardHat,
  'clipboard-check': ClipboardCheck,
  'file-text': FileText,
  phone: Phone,
  mail: Mail,
  globe: Globe,
  facebook: Facebook,
  linkedin: Linkedin,
  youtube: Youtube,
  arrow: ArrowRight,
  chevronright: ChevronRight,
  chevronleft: ChevronLeft,
  menu: Menu,
  close: X,
  check: CheckCircle2,
  // Domain-specific (fire / water) — mapped to closest lucide glyph
  panel: CircuitBoard,
  module: Cpu,
  cable: Cable,
  battery: BatteryCharging,
  speaker: Volume2,
  beacon: Siren,
  detector: ScanLine,
  spray: SprayCan,
  extinguisher: FireExtinguisher,
  sprinkler: Disc,
  hydrant: Droplet,
  cabinet: Package,
  reel: Disc,
  valve: Settings,
  pipe: Container,
  coupling: Disc,
  clamp: Grid3x3,
  pump: Settings,
  tank: Container,
  tools: Wrench,
  bucket: Container,
  grid: Grid3x3,
  cover: Disc,
  calculator: Calculator,
  box: Box,
}

export default function Icon({ name, className = 'w-6 h-6', strokeWidth = 2 }) {
  const Cmp = MAP[name] || Box
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden="true" />
}

/* ------------------------------------------------------------------ *
 *  Colour system — give every icon a domain-meaningful colour so the
 *  whole site reads in fire-red / alarm-orange / water-blue accents.
 *  (Full class strings are written as literals so Tailwind keeps them.)
 * ------------------------------------------------------------------ */
const TONES = {
  red: ['flame', 'hydrant', 'extinguisher', 'sprinkler', 'reel', 'cabinet', 'spray', 'bucket', 'file-text', 'mappin'],
  orange: ['bell', 'beacon', 'siren', 'speaker', 'panel', 'target', 'handshake', 'hardhat', 'clipboard-check'],
  cyan: ['detector', 'eye', 'scan'],
  indigo: ['module', 'cable', 'cpu', 'circuit'],
  emerald: ['shield', 'shield-check', 'check', 'battery'],
  amber: ['award', 'gauge'],
  violet: ['gem'],
  navy: ['settings', 'wrench', 'tools', 'building', 'building2', 'hospital', 'factory', 'box', 'grid', 'calculator'],
}
const TEXT = {
  red: 'text-red-600', orange: 'text-brand-orange', cyan: 'text-cyan-600',
  indigo: 'text-indigo-600', emerald: 'text-emerald-600', amber: 'text-amber-500',
  violet: 'text-violet-600', navy: 'text-navy-700', blue: 'text-brand-royal',
}
const BG = {
  red: 'bg-red-50', orange: 'bg-orange-50', cyan: 'bg-cyan-50',
  indigo: 'bg-indigo-50', emerald: 'bg-emerald-50', amber: 'bg-amber-50',
  violet: 'bg-violet-50', navy: 'bg-navy-50', blue: 'bg-blue-50',
}

function tone(name) {
  for (const t in TONES) if (TONES[t].includes(name)) return t
  return 'blue' // water / general default
}
export function iconColor(name) {
  return TEXT[tone(name)]
}
export function iconBg(name) {
  return BG[tone(name)]
}

const BOX = { sm: 'h-11 w-11', md: 'h-14 w-14', lg: 'h-16 w-16' }
const GLYPH = { sm: 'h-5 w-5', md: 'h-7 w-7', lg: 'h-8 w-8' }

/**
 * Colored, rounded icon badge — the standard icon treatment across the site.
 * Pulls a domain colour + matching soft background from the icon name.
 */
export function IconBadge({ name, size = 'md', shape = 'rounded-2xl', className = '' }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center ${shape} ${iconBg(name)} ${BOX[size]} ${className}`}
    >
      <Icon name={name} className={`${GLYPH[size]} ${iconColor(name)}`} strokeWidth={2} />
    </span>
  )
}
