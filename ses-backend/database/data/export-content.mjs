// Imports the frontend's siteData.js and writes it as JSON for the DB seeder.
import * as data from '../../../ses-website/src/data/siteData.js'
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))

const out = {
  company: data.company,
  productCategories: data.productCategories,
  services: data.services,
  homeServices: data.homeServices,
  aboutStats: data.aboutStats,
  projectStats: data.projectStats,
  whatWeDo: data.whatWeDo,
  missionVisionValues: data.missionVisionValues,
  capabilities: data.capabilities,
  whyChoose: data.whyChoose,
  brands: data.brands,
  consultants: data.consultants,
  certifications: data.certifications,
  featuredSolutions: data.featuredSolutions,
  fireFighting: data.fireFighting,
  fireAlarm: data.fireAlarm,
  waterNetwork: data.waterNetwork,
  projects: data.projects,
  projectFilters: data.projectFilters,
  downloads: data.downloads,
}

writeFileSync(join(here, 'site-content.json'), JSON.stringify(out, null, 2))
console.log('Wrote site-content.json with keys:', Object.keys(out).join(', '))
