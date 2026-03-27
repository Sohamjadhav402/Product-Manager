import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart.js'
import './ProductCard.css'

export function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-image-wrapper">
        <img src={product.image} alt={product.title} className="product-image" loading="lazy" />
      </Link>
      <div className="product-content">
        <h3 className="product-title" title={product.title}>
          {product.title}
        </h3>
        <p className="product-category">{product.category}</p>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <div className="product-actions">
          <Link to={`/products/${product.id}`} className="btn btn-outline">
            View Details
          </Link>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  )
}

