import { useParams } from 'react-router-dom'
import ProductCategoryPage from '../components/ProductCategoryPage'
import NotFound from './NotFound'
import { useContent } from '../context/ContentContext'

const EMPTY_DETAIL = { filters: ['All Products'], highlights: [], groups: [], featured: [] }

/**
 * Generic product-category detail page. Works for the seeded categories AND
 * any category created later in the CMS — it looks the slug up in the live
 * content tree instead of relying on a hardcoded route/component.
 */
export default function CategoryDetail() {
  const { slug } = useParams()
  const { productCategories, categoryDetails, loaded } = useContent()

  const category = productCategories.find((c) => c.slug === slug)

  if (!category) {
    // Don't flash 404 while the CMS content is still loading — only show it
    // once we know for sure the category isn't there.
    if (!loaded) {
      return (
        <div className="flex min-h-[60vh] items-center justify-center text-navy-400">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-brand-orange" />
        </div>
      )
    }
    return <NotFound />
  }

  const data = (categoryDetails && categoryDetails[slug]) || EMPTY_DETAIL
  return <ProductCategoryPage category={category} data={data} slug={slug} />
}
