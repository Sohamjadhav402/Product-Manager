import { ProductCard } from './ProductCard.jsx'
import './ProductGrid.css'

export function ProductGrid({ products }) {
  if (!products || products.length === 0) {
    return <p className="empty-state">No products found.</p>
  }

  return (
    <section className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  )
}

