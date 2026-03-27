import { Link } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts.js'
import { ProductGrid } from '../components/ProductGrid.jsx'

export default function Home() {
  const { filteredProducts, loading, error } = useProducts()

  const featured = filteredProducts.slice(0, 4)

  return (
    <main className="page">
      <section className="hero">
        <div className="hero-content">
          <h1>E-Commerce Product Explorer</h1>
          <p>
            Discover a curated selection of products from a modern, responsive catalog. Search,
            filter, and build your cart in a delightful browsing experience.
          </p>
          <div className="hero-actions">
            <Link to="/products" className="btn btn-primary">
              Browse Products
            </Link>
            <Link to="/cart" className="btn btn-outline">
              View Cart
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Featured Products</h2>
          <Link to="/products" className="link">
            View all
          </Link>
        </div>
        {loading && <p>Loading featured products...</p>}
        {error && <p className="error-text">{error}</p>}
        {!loading && !error && <ProductGrid products={featured} />}
      </section>
    </main>
  )
}

