// ============================================================
//  SES Trading & Industries — central content file
//  Edit text / links / lists here and the whole site updates.
// ============================================================

export const company = {
  name: 'SES Trading & Industries',
  shortName: 'SES',
  tagline: 'Designed with Precision. Built for Protection.',
  intro:
    'Integrated engineering solutions for Fire Fighting, Fire Alarm, MEP, Water Networks, Testing, Commissioning and Maintenance across the MENA region.',
  address: '56/5 Forsan City, Qatameya, Cairo, Egypt',
  phone: '+20 100 302 9064',
  phoneHref: 'tel:+201003029064',
  email: 'sales@sescoeg.com',
  website: 'www.sescoeg.com',
  websiteHref: 'https://www.sescoeg.com',
  hours: 'Sun – Thu: 9:00 AM – 5:00 PM',
  hoursNote: 'We are closed on Fridays and Saturdays.',
  mapEmbed:
    'https://www.google.com/maps?q=29.9866736,31.3372648&z=16&output=embed',
  social: {
    facebook: '#',
    linkedin: '#',
    youtube: '#',
  },
}

// ---- Navigation ----
export const productCategories = [
  {
    slug: 'fire-fighting',
    name: 'Fire Fighting Systems',
    icon: 'flame',
    short:
      'Complete range of fire fighting equipment and systems for commercial, industrial and residential applications.',
    intro:
      'Complete fire protection solutions for sprinkler, hydrant, hose, pump, suppression and portable fire fighting applications.',
    items: [
      { name: 'Sprinkler Systems', icon: 'sprinkler' },
      { name: 'Fire Pumps', icon: 'pump' },
      { name: 'Hydrants & Hose Reels', icon: 'hydrant' },
      { name: 'Fire Extinguishers', icon: 'extinguisher' },
      { name: 'Foam & Special Systems', icon: 'spray' },
    ],
  },
  {
    slug: 'fire-alarm',
    name: 'Fire Alarm Systems',
    icon: 'bell',
    short:
      'Reliable fire detection, alarm and notification systems to protect lives and property.',
    intro:
      'Reliable fire detection, control, and notification products for life safety and building protection.',
    items: [
      { name: 'Control Panels', icon: 'panel' },
      { name: 'Detectors', icon: 'detector' },
      { name: 'Notification Devices', icon: 'speaker' },
      { name: 'Modules & Accessories', icon: 'module' },
      { name: 'Cables & Batteries', icon: 'battery' },
    ],
  },
  {
    slug: 'water-network',
    name: 'Water Network Products',
    icon: 'droplets',
    short:
      'High quality water network products for distribution, control, drainage and sewage applications.',
    intro:
      'High-quality valves, pipes, fittings, couplings, drainage products and accessories for water distribution, sewage, drainage and utility infrastructure.',
    items: [
      { name: 'Valves', icon: 'valve' },
      { name: 'Pipes & Fittings', icon: 'pipe' },
      { name: 'Couplings & Adapters', icon: 'coupling' },
      { name: 'Clamps', icon: 'clamp' },
      { name: 'Pumps & Accessories', icon: 'pump' },
    ],
  },
]

// ---- Services (used in header dropdown, home strip, services page) ----
export const services = [
  {
    slug: 'fire-fighting-installation',
    name: 'Fire Fighting Installation',
    icon: 'flame',
    desc: 'Supply, installation and commissioning of fire fighting systems.',
  },
  {
    slug: 'fire-alarm-systems',
    name: 'Fire Alarm Systems',
    icon: 'bell',
    desc: 'Design, supply, installation and programming of fire alarm systems.',
  },
  {
    slug: 'mep-contracting',
    name: 'MEP Contracting',
    icon: 'wrench',
    desc: 'Mechanical, electrical and plumbing solutions for industrial and residential projects.',
  },
  {
    slug: 'plumbing-systems',
    name: 'Plumbing Systems',
    icon: 'droplet',
    desc: 'Complete plumbing solutions for commercial, industrial and residential buildings.',
  },
  {
    slug: 'pump-installation',
    name: 'Pump Installation',
    icon: 'pump',
    desc: 'Professional installation of pumps and booster systems.',
  },
  {
    slug: 'testing-commissioning',
    name: 'Testing & Commissioning',
    icon: 'clipboard-check',
    desc: 'Testing, balancing and commissioning for system reliability and compliance.',
  },
  {
    slug: 'maintenance',
    name: 'Preventive & Corrective Maintenance',
    icon: 'tools',
    desc: 'Regular maintenance and rapid support to ensure system uptime.',
  },
]

// Short service strip shown on the home page
export const homeServices = [
  {
    name: 'MEP Contracting',
    icon: 'building',
    desc: 'End-to-end MEP solutions with quality & compliance.',
  },
  {
    name: 'Testing & Commissioning',
    icon: 'clipboard-check',
    desc: 'Ensure system performance and regulatory compliance.',
  },
  {
    name: 'Maintenance Services',
    icon: 'tools',
    desc: 'Preventive & corrective maintenance by experts.',
  },
  {
    name: 'Pump Installation',
    icon: 'pump',
    desc: 'Professional installation of pumps & equipment.',
  },
  {
    name: 'Plumbing Systems',
    icon: 'droplet',
    desc: 'Reliable plumbing solutions for every project.',
  },
]

// ---- Service detail content (one entry per service slug) ----
// Drives the /services/:slug "Read More" pages. Written from general
// engineering practice; edit freely or move into the CMS later.
export const serviceDetails = {
  'fire-fighting-installation': {
    tagline: 'Water-based & special-hazard fire protection, end to end.',
    intro:
      'We design, supply, install and commission complete fire fighting systems for buildings of every scale. From hydraulic calculations and pump room layout to final flushing and acceptance testing, our team delivers code-compliant protection built to perform on the day it matters most.',
    scope: [
      'Automatic sprinkler systems (wet, dry & pre-action)',
      'Fire hydrant & hose reel networks',
      'Fire pump rooms (diesel, electric & jockey pumps)',
      'FM-200, CO₂ & foam suppression systems',
      'Piping, valves, gauges & accessories',
      'Hydraulic design & flushing/pressure testing',
    ],
    applications: ['Residential compounds', 'Commercial towers', 'Industrial facilities', 'Warehouses & logistics', 'Hospitals', 'Shopping malls'],
    benefits: [
      { icon: 'shield-check', title: 'Code-Compliant', desc: 'Designed to NFPA & local civil-defence requirements.' },
      { icon: 'award', title: 'Certified Equipment', desc: 'UL/FM-listed pumps, valves and components.' },
      { icon: 'clipboard-check', title: 'Full Testing', desc: 'Flushing, pressure testing and documented acceptance.' },
    ],
  },
  'fire-alarm-systems': {
    tagline: 'Early detection that protects lives and property.',
    intro:
      'Our fire alarm solutions cover conventional and addressable systems — from device layout and panel programming to cause-and-effect matrices and integration with HVAC, lifts and suppression. We make sure every zone is detected, every alert is heard, and every signal is reliable.',
    scope: [
      'Conventional & addressable control panels',
      'Smoke, heat, beam & gas detectors',
      'Manual call points, sounders & strobes',
      'Panel programming & cause-and-effect logic',
      'Integration with HVAC, lifts & suppression',
      'Battery backup & power supply sizing',
    ],
    applications: ['Offices & towers', 'Hospitals & clinics', 'Hotels', 'Schools & universities', 'Factories', 'Data centres'],
    benefits: [
      { icon: 'bell', title: 'EN54 Certified', desc: 'Detectors and panels meeting EN54 standards.' },
      { icon: 'settings', title: 'Smart Integration', desc: 'Coordinated with all building life-safety systems.' },
      { icon: 'headset', title: 'Programmed & Tested', desc: 'Commissioned with full cause-and-effect testing.' },
    ],
  },
  'mep-contracting': {
    tagline: 'Mechanical, electrical & plumbing — coordinated under one roof.',
    intro:
      'We deliver integrated MEP packages that keep buildings running efficiently. By coordinating mechanical, electrical and plumbing trades from design through installation, we cut clashes, save time on site, and hand over systems that are clean, balanced and ready to operate.',
    scope: [
      'HVAC systems & ductwork',
      'Electrical power & lighting installations',
      'Low-current & control systems',
      'Plumbing & sanitary works',
      'Shop drawings & MEP coordination',
      'Testing, balancing & handover',
    ],
    applications: ['Residential projects', 'Commercial buildings', 'Industrial plants', 'Hospitality', 'Healthcare', 'Retail'],
    benefits: [
      { icon: 'settings', title: 'Single Point of Contact', desc: 'All MEP trades managed by one team.' },
      { icon: 'clock', title: 'Faster Delivery', desc: 'Coordinated trades reduce on-site delays.' },
      { icon: 'award', title: 'Quality Workmanship', desc: 'Installed to international standards.' },
    ],
  },
  'plumbing-systems': {
    tagline: 'Clean, reliable water supply & sanitary systems.',
    intro:
      'From potable water distribution to sanitary drainage and hot-water systems, we install plumbing networks that are efficient, hygienic and built to last. Every line is pressure-tested and every fixture set to deliver dependable performance.',
    scope: [
      'Potable (cold & hot) water distribution',
      'Sanitary & soil drainage systems',
      'Booster sets & water tanks',
      'Water heaters & circulation pumps',
      'Fixtures, fittings & insulation',
      'Pressure testing & sterilisation',
    ],
    applications: ['Residential buildings', 'Hotels', 'Hospitals', 'Schools', 'Commercial complexes', 'Industrial facilities'],
    benefits: [
      { icon: 'droplet', title: 'Hygienic Design', desc: 'Materials and layouts that keep water clean.' },
      { icon: 'shield-check', title: 'Leak-Tested', desc: 'Every line pressure-tested before handover.' },
      { icon: 'tools', title: 'Durable Materials', desc: 'Long-life pipes, fittings and insulation.' },
    ],
  },
  'drainage-sewage': {
    tagline: 'Effective drainage & sewage network solutions.',
    intro:
      'We design and install drainage, sewage and rainwater networks that move water away safely and reliably. With correct gradients, durable materials and proper inspection access, our systems prevent blockages and protect your infrastructure for the long term.',
    scope: [
      'Foul & soil drainage networks',
      'Storm & rainwater drainage',
      'Manholes & inspection chambers',
      'Gully traps, gratings & channels',
      'Sewage lifting & pumping stations',
      'CCTV survey & flow testing',
    ],
    applications: ['Compounds & communities', 'Roads & infrastructure', 'Industrial sites', 'Commercial developments', 'Car parks', 'Public facilities'],
    benefits: [
      { icon: 'pipe', title: 'Correct Gradients', desc: 'Engineered falls for reliable self-cleaning flow.' },
      { icon: 'shield-check', title: 'Durable Networks', desc: 'Materials rated for long underground service.' },
      { icon: 'clipboard-check', title: 'Tested & Surveyed', desc: 'Flow tests and CCTV verification on completion.' },
    ],
  },
  'pump-installation': {
    tagline: 'Pumps & booster systems installed for peak performance.',
    intro:
      'We supply and install fire, water and booster pump systems sized precisely for your demand. From base mounting and alignment to electrical connection and performance testing, we make sure your pumps deliver the right pressure and flow, every time.',
    scope: [
      'Fire pumps (diesel, electric & jockey)',
      'Water booster & pressure systems',
      'Transfer & sump pumps',
      'Variable speed drive (VSD) controls',
      'Pump room piping & valves',
      'Alignment, commissioning & flow testing',
    ],
    applications: ['High-rise buildings', 'Compounds', 'Industrial plants', 'Pump stations', 'Irrigation networks', 'Water treatment'],
    benefits: [
      { icon: 'pump', title: 'Correctly Sized', desc: 'Pumps selected to match real system demand.' },
      { icon: 'gauge', title: 'Performance Tested', desc: 'Verified flow and pressure at commissioning.' },
      { icon: 'settings', title: 'Smart Controls', desc: 'VSD and controllers for efficiency & protection.' },
    ],
  },
  'testing-commissioning': {
    tagline: 'Proving every system performs as designed.',
    intro:
      'Testing & commissioning is where design meets reality. We verify, balance and certify mechanical, fire and water systems against their design intent — delivering documented proof that everything works safely, efficiently and in full compliance before handover.',
    scope: [
      'System performance & functional testing',
      'Air & water balancing (TAB)',
      'Fire system cause-and-effect testing',
      'Pump flow & pressure verification',
      'Snagging & defect close-out',
      'Commissioning reports & as-built records',
    ],
    applications: ['New buildings', 'Retrofit projects', 'Industrial facilities', 'Hospitals', 'Data centres', 'Hotels'],
    benefits: [
      { icon: 'clipboard-check', title: 'Documented Proof', desc: 'Full reports and certificates for every system.' },
      { icon: 'gauge', title: 'Balanced & Tuned', desc: 'Systems optimised for performance and efficiency.' },
      { icon: 'shield-check', title: 'Compliance Assured', desc: 'Verified against design and authority requirements.' },
    ],
  },
  'maintenance': {
    tagline: 'Keeping your systems safe and running, 24/7.',
    intro:
      'Our preventive and corrective maintenance programmes keep fire, water and MEP systems ready and reliable. With scheduled inspections, rapid response and genuine spare parts, we maximise uptime, extend equipment life and keep you compliant year-round.',
    scope: [
      'Preventive maintenance schedules (PPM)',
      'Corrective & emergency repairs',
      'Annual maintenance contracts (AMC)',
      'Fire system inspection & testing',
      'Pump & MEP servicing',
      'Genuine spare parts & 24/7 support',
    ],
    applications: ['Facility management', 'Compounds', 'Commercial buildings', 'Industrial plants', 'Hospitals', 'Hotels'],
    benefits: [
      { icon: 'tools', title: 'Maximised Uptime', desc: 'Scheduled care that prevents failures before they happen.' },
      { icon: 'clock', title: 'Rapid Response', desc: '24/7 support for emergencies and breakdowns.' },
      { icon: 'shield-check', title: 'Stay Compliant', desc: 'Keep life-safety systems inspection-ready.' },
    ],
  },
}

// ---- Stats ----
export const aboutStats = [
  { value: '10+', label: 'Years of Experience', icon: 'users' },
  { value: '100+', label: 'Projects Completed', icon: 'building' },
  { value: '60+', label: 'Skilled Engineers', icon: 'hardhat' },
  { value: 'Across', label: 'MENA', icon: 'mappin' },
]

export const projectStats = [
  { value: '150+', label: 'Projects Completed', icon: 'building' },
  { value: '25+', label: 'Cities Served', icon: 'mappin' },
  { value: '100+', label: 'Trusted Partners', icon: 'handshake' },
  { value: '24/7', label: 'Support & Maintenance', icon: 'clock' },
]

// ---- About page content ----
export const whatWeDo = [
  {
    name: 'Fire Fighting Systems',
    icon: 'hydrant',
    desc: 'Hydrant, Sprinkler, Pump Stations, Special Hazards',
  },
  {
    name: 'Fire Alarm Systems',
    icon: 'bell',
    desc: 'Conventional & Addressable Systems, Detection & Notification',
  },
  {
    name: 'MEP Contracting',
    icon: 'settings',
    desc: 'HVAC, Electrical, Plumbing & General MEP Works',
  },
  {
    name: 'Water Networks',
    icon: 'droplets',
    desc: 'Potable Water, Tanks, Booster Systems & Distribution Networks',
  },
  {
    name: 'Testing & Commissioning',
    icon: 'clipboard-check',
    desc: 'System Testing, Commissioning & Performance Validation',
  },
  {
    name: 'Maintenance Services',
    icon: 'tools',
    desc: 'Preventive & Corrective Maintenance, AMC & 24/7 Support',
  },
]

export const missionVisionValues = [
  {
    title: 'Our Mission',
    icon: 'target',
    desc: 'To deliver innovative and reliable engineering solutions that protect lives, assets and the environment.',
  },
  {
    title: 'Our Vision',
    icon: 'eye',
    desc: "To be Egypt's most trusted engineering partner for integrated MEP, fire protection and water solutions.",
  },
  {
    title: 'Our Values',
    icon: 'gem',
    desc: 'Safety, Quality, Integrity, Commitment and Continuous Improvement.',
  },
]

export const capabilities = [
  { name: 'Mechanical Installation Works', icon: 'settings' },
  { name: 'Fire Fighting Network Installation', icon: 'hydrant' },
  { name: 'Fire Alarm Systems', icon: 'bell' },
  { name: 'Plumbing Systems', icon: 'droplet' },
  { name: 'Drainage & Sewage Networks', icon: 'pipe' },
  { name: 'Pump Installation', icon: 'pump' },
  { name: 'Testing & Commissioning', icon: 'clipboard-check' },
  { name: 'Preventive & Corrective Maintenance', icon: 'tools' },
]

export const whyChoose = [
  {
    title: 'Safety First',
    icon: 'shield-check',
    desc: 'We prioritize safety in every project and operation.',
  },
  {
    title: 'Quality Assured',
    icon: 'award',
    desc: 'International standards and best practices in everything we do.',
  },
  {
    title: 'Experienced Team',
    icon: 'users',
    desc: 'Skilled engineers and technicians with proven industry expertise.',
  },
  {
    title: 'On-Time Delivery',
    icon: 'clock',
    desc: 'Strong planning and execution to meet deadlines.',
  },
  {
    title: 'End-to-End Service',
    icon: 'settings',
    desc: "From design to maintenance, we've got you covered.",
  },
  {
    title: 'After Sales Support',
    icon: 'headset',
    desc: 'Reliable support whenever you need us.',
  },
]

// ---- Brands & consultants ----
// `logo` maps to /public/images/brands|consultants/<logo>.png (text shown if missing)
export const brands = [
  { name: 'Tyco', logo: 'tyco' },
  { name: 'Reliable', logo: 'reliable' },
  { name: 'MECH', logo: 'mech' },
  { name: 'Apollo', logo: 'apollo' },
  { name: 'Simplex', logo: 'simplex' },
  { name: 'CSJ', logo: 'csj' },
  { name: 'ZYfire', logo: 'zyfire' },
  { name: 'SADDAH', logo: 'saddah' },
]

export const consultants = [
  { name: 'Shaker Consultancy Group', logo: 'shaker' },
  { name: 'Consulting Engineering Center', logo: 'consulting-engineering-center' },
  { name: 'Engineering Consultants Group (ECG)', logo: 'ecg' },
  { name: 'Moharram – Bakhoum', logo: 'moharram-bakhoum' },
  { name: 'Hydro Trade', logo: 'hydro-trade' },
  { name: 'Cosmos Engineers & Consultants', logo: 'cosmos' },
  { name: 'OKOPLAN', logo: 'okoplan' },
  { name: 'Sabbour Consulting', logo: 'sabbour' },
]

// ---- Certifications ----
export const certifications = [
  { code: 'ISO', standard: '9001:2015', label: 'Quality Management' },
  { code: 'ISO', standard: '14001:2015', label: 'Environmental Management' },
  { code: 'ISO', standard: '45001:2018', label: 'Occupational Health & Safety' },
]

// ---- Featured solutions (home) ----
// Drawn from the real category featured products so the Home carousel shows
// actual product photos and links straight to each product's detail page.
export const featuredSolutions = [
  { name: 'Upright sprinkler', icon: 'sprinkler', image: '/images/p-upright-sprinkler.jpg', categorySlug: 'fire-fighting' },
  { name: 'OS&Y Valve Flanged', icon: 'coupling', image: '/images/p-osy-valve-flanged.jpg', categorySlug: 'fire-fighting' },
  { name: 'dry barrel hydrant', icon: 'hydrant', image: '/images/p-dry-barrel-hydrant.jpg', categorySlug: 'fire-fighting' },
  { name: 'FM-200', icon: 'spray', image: '/images/p-fm-200.jpg', categorySlug: 'fire-fighting' },
  { name: 'Fire Alarm System', icon: 'bell', image: '/images/brands/apollo.png', categorySlug: 'fire-alarm' },
  { name: 'Check Valve', icon: 'valve', image: '/images/p-check-valve.jpg', categorySlug: 'water-network' },
  { name: 'Manhole Cover', icon: 'cover', image: '/images/p-manhole-cover.jpg', categorySlug: 'water-network' },
  { name: 'Ductile Iron Fitting', icon: 'coupling', image: '/images/p-ductile-iron-fitting.jpg', categorySlug: 'water-network' },
]

// ---- How we work (process steps, shown on Home) ----
export const processSteps = [
  {
    step: '01',
    title: 'Consultation & Survey',
    icon: 'clipboard-check',
    desc: 'We study your requirements, visit the site and assess the technical scope.',
  },
  {
    step: '02',
    title: 'Design & Engineering',
    icon: 'settings',
    desc: 'Our engineers prepare compliant designs, drawings and material submittals.',
  },
  {
    step: '03',
    title: 'Supply & Installation',
    icon: 'wrench',
    desc: 'We supply certified products and install them to the highest safety standards.',
  },
  {
    step: '04',
    title: 'Testing & Handover',
    icon: 'shield-check',
    desc: 'Full testing, commissioning and documented handover — plus ongoing support.',
  },
]

// ---- Testimonials (placeholder content until real client quotes are supplied) ----
export const testimonials = [
  {
    quote:
      'SES delivered our fire fighting and alarm systems on time and to the highest standard. A reliable engineering partner from design to handover.',
    name: 'Eng. Ahmed Hassan',
    role: 'Project Manager, Cairo Developments',
    icon: 'building',
  },
  {
    quote:
      'Their technical team is professional and responsive. The water network they installed has been running flawlessly with zero downtime.',
    name: 'Eng. Mona Saleh',
    role: 'Facilities Director, Nile Industrial Park',
    icon: 'droplets',
  },
  {
    quote:
      'From quotation to maintenance, the experience was smooth and transparent. We trust SES with all our life-safety projects.',
    name: 'Eng. Karim Fouad',
    role: 'Consultant, Delta Engineering',
    icon: 'hardhat',
  },
]

// ---- Industries we serve (shown on Home) ----
export const industries = [
  { name: 'Residential', icon: 'building' },
  { name: 'Commercial', icon: 'building2' },
  { name: 'Industrial', icon: 'factory' },
  { name: 'Healthcare', icon: 'hospital' },
  { name: 'Infrastructure', icon: 'mappin' },
  { name: 'Hospitality', icon: 'cabinet' },
]

// ====================================================================
//  Detailed product catalogs (one per category page)
// ====================================================================

export const fireFighting = {
  filters: ['All Fire Fighting Systems', 'Sprinklers', 'Hydrants', 'Pumps', 'Suppression', 'Extinguishers', 'Accessories'],
  groups: [
    {
      n: 1,
      title: 'Water-Based Fire Fighting Systems',
      desc: 'Reliable water-based protection including sprinklers, hydrants, hose systems, valves and piping accessories.',
      cta: 'View All Water-Based Products',
      items: [
        { name: 'Sprinklers', icon: 'sprinkler' },
        { name: 'Fire Hydrants', icon: 'hydrant' },
        { name: 'Hose Cabinets', icon: 'cabinet' },
        { name: 'Hose Reels', icon: 'reel' },
        { name: 'Valves', icon: 'valve' },
        { name: 'Butterfly Valves', icon: 'valve' },
      ],
    },
    {
      n: 2,
      title: 'Fire Pumps & Pump Rooms',
      desc: 'Complete range of fire pumps and pump room packages designed for dependable performance.',
      cta: 'View All Pump Products',
      items: [
        { name: 'Diesel Fire Pumps', icon: 'pump' },
        { name: 'Electric Fire Pumps', icon: 'pump' },
        { name: 'Jockey Pumps', icon: 'pump' },
        { name: 'Pump Controllers', icon: 'panel' },
        { name: 'Pump Skids', icon: 'settings' },
        { name: 'Pump Accessories', icon: 'tools' },
      ],
    },
    {
      n: 3,
      title: 'Fire Suppression Systems',
      desc: 'Advanced suppression solutions for various hazards including clean agent, CO₂, foam and special systems.',
      cta: 'View All Suppression Products',
      items: [
        { name: 'FM-200 Systems', icon: 'extinguisher' },
        { name: 'CO₂ Systems', icon: 'extinguisher' },
        { name: 'Foam Systems', icon: 'spray' },
        { name: 'Kitchen Hood Suppression', icon: 'spray' },
        { name: 'Inert Gas Systems', icon: 'extinguisher' },
        { name: 'Gas Detection Systems', icon: 'detector' },
      ],
    },
    {
      n: 4,
      title: 'Portable Fire Fighting Equipment',
      desc: 'Portable and mobile fire fighting equipment for quick response and effective fire control.',
      cta: 'View All Portable Equipment',
      items: [
        { name: 'Dry Powder Extinguishers', icon: 'extinguisher' },
        { name: 'CO₂ Extinguishers', icon: 'extinguisher' },
        { name: 'Foam Extinguishers', icon: 'extinguisher' },
        { name: 'Trolley Extinguishers', icon: 'extinguisher' },
        { name: 'Fire Blankets', icon: 'shield' },
        { name: 'Fire Buckets', icon: 'bucket' },
      ],
    },
  ],
  featured: [
    { name: 'Upright Sprinkler K5.6 (68°C)', icon: 'sprinkler' },
    { name: 'OS&Y Gate Valve PN16', icon: 'valve' },
    { name: 'Diesel Fire Pump Set', icon: 'pump' },
    { name: 'Fire Hose Cabinet With Hose & Reel', icon: 'cabinet' },
    { name: 'FM-200 Fire Suppression System', icon: 'extinguisher' },
    { name: 'Dry Powder Extinguisher 6kg', icon: 'extinguisher' },
    { name: 'Pressure Gauge 0-16 Bar', icon: 'gauge' },
    { name: 'Fire Alarm Control Panel', icon: 'panel' },
  ],
}

export const fireAlarm = {
  filters: ['All Products'],
  highlights: ['Life Safety First', 'Reliable & Certified', 'Leading Global Brands', 'Easy to Install & Maintain'],
  groups: [
    {
      n: 1,
      title: 'Fire Alarm Brands',
      desc: 'Certified fire detection & alarm systems from the leading global manufacturers we supply and install.',
      cta: 'Request a Quotation',
      items: [
        { name: 'Simplex', icon: 'bell', image: '/images/brands/simplex.png' },
        { name: 'Apollo', icon: 'bell', image: '/images/brands/apollo.png' },
        { name: 'Notifier', icon: 'bell', image: '/images/brands/notifier.png' },
      ],
    },
  ],
  featured: [
    { name: 'Simplex', spec: 'Fire Detection & Alarm Systems', icon: 'bell', image: '/images/brands/simplex.png' },
    { name: 'Apollo', spec: 'Fire Detection & Alarm Systems', icon: 'bell', image: '/images/brands/apollo.png' },
    { name: 'Notifier', spec: 'Fire Detection & Alarm Systems', icon: 'bell', image: '/images/brands/notifier.png' },
  ],
}

export const waterNetwork = {
  filters: ['All Products', 'Valves', 'Fittings', 'Covers'],
  groups: [
    {
      n: 1,
      title: 'Valves',
      desc: 'Isolation, check, air release and special valves for water distribution and control.',
      cta: 'Request a Quotation',
      items: [
        { name: 'Gate Valve', icon: 'valve' },
        { name: 'Swing Check Valve', icon: 'valve' },
        { name: 'Wafer Check Valve', icon: 'valve' },
        { name: 'Dual Plate Check Valve', icon: 'valve' },
        { name: 'Double-Ball Air Release Valve', icon: 'gauge' },
        { name: 'Float Valve', icon: 'valve' },
        { name: 'Y-Strainer', icon: 'grid' },
        { name: 'Basket Strainer', icon: 'grid' },
      ],
    },
    {
      n: 2,
      title: 'Ductile Iron Fittings',
      desc: 'Ductile iron pipe fittings for water and utility networks.',
      cta: 'Request a Quotation',
      items: [
        { name: 'Ductile Iron Fittings', icon: 'coupling' },
      ],
    },
    {
      n: 3,
      title: 'Manhole Covers',
      desc: 'Ductile iron manhole covers and frames for infrastructure and drainage.',
      cta: 'Request a Quotation',
      items: [
        { name: 'Manhole Covers', icon: 'cover' },
      ],
    },
  ],
  featured: [
    { name: 'Gate Valve', spec: 'DI Flanged', icon: 'valve' },
    { name: 'Swing Check Valve', spec: 'DI Flanged', icon: 'valve' },
    { name: 'Double-Ball Air Release Valve', spec: 'PN16', icon: 'gauge' },
    { name: 'Ductile Iron Fitting', spec: 'Water Network', icon: 'coupling' },
    { name: 'Manhole Cover', spec: 'Ductile Iron', icon: 'cover' },
  ],
}

// ---- Projects ----
export const projects = [
  {
    title: 'Residential Compound',
    category: 'Residential',
    tags: ['Fire Fighting', 'Water Networks'],
    desc: 'Supply, installation and testing of fire fighting systems and water networks.',
    icon: 'building',
  },
  {
    title: 'Commercial Tower',
    category: 'Commercial',
    tags: ['Fire Alarm', 'MEP Contracting'],
    desc: 'Design, supply and installation of fire alarm, MEP systems and plumbing solutions.',
    icon: 'building2',
  },
  {
    title: 'Industrial Facility',
    category: 'Industrial',
    tags: ['Fire Fighting', 'Maintenance'],
    desc: 'Complete fire protection system with annual maintenance and support.',
    icon: 'factory',
  },
  {
    title: 'Hospital Project',
    category: 'Commercial',
    tags: ['Fire Alarm', 'MEP Contracting'],
    desc: 'Integrated fire alarm, life safety and MEP systems for hospital facility.',
    icon: 'hospital',
  },
  {
    title: 'Water Treatment Plant',
    category: 'Infrastructure',
    tags: ['Water Networks', 'Maintenance'],
    desc: 'Design and installation of water networks and pump systems with maintenance.',
    icon: 'droplets',
  },
  {
    title: 'Infrastructure Project',
    category: 'Infrastructure',
    tags: ['Fire Fighting', 'MEP Contracting'],
    desc: 'Fire protection and MEP solutions for large scale infrastructure works.',
    icon: 'factory',
  },
]

export const projectFilters = ['All Projects', 'Residential', 'Commercial', 'Industrial', 'Infrastructure']

// ---- Downloads ----
export const downloads = [
  {
    title: 'Company Profile',
    desc: 'Overview of our company, capabilities and vision.',
    icon: 'file-text',
    type: 'PDF',
  },
  {
    title: 'Fire Fighting Catalog',
    desc: 'Complete product catalog with technical specifications.',
    icon: 'flame',
    type: 'PDF',
  },
  {
    title: 'Fire Alarm Catalog',
    desc: 'Comprehensive range, technical specs & datasheets.',
    icon: 'bell',
    type: 'PDF',
  },
  {
    title: 'Water Network Catalog',
    desc: 'Valves, pipes, fittings and water network products.',
    icon: 'droplets',
    type: 'PDF',
  },
  {
    title: 'Service Profiles',
    desc: 'Detailed profiles of our services and systems.',
    icon: 'wrench',
    type: 'PDF',
  },
  {
    title: 'Certificates',
    desc: 'Quality, compliance and authority certificates.',
    icon: 'award',
    type: 'PDF',
  },
]
