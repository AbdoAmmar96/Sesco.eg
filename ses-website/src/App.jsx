import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import Products from './pages/Products'
import CategoryDetail from './pages/CategoryDetail'
import GroupCatalog from './pages/GroupCatalog'
import ProductDetail from './pages/ProductDetail'
import Projects from './pages/Projects'
import Downloads from './pages/Downloads'
import Contact from './pages/Contact'
import Legal from './pages/Legal'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<CategoryDetail />} />
        {/* Full catalogue view for one group (static "group" segment ranks above :product). */}
        <Route path="/products/:slug/group/:groupSlug" element={<GroupCatalog />} />
        <Route path="/products/:slug/:product" element={<ProductDetail />} />
        {/* Home "Featured Solutions" (no category) get their own detail page. */}
        <Route path="/featured/:product" element={<ProductDetail />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/downloads" element={<Downloads />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Legal />} />
        <Route path="/terms" element={<Legal />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
