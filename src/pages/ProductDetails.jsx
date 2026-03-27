import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchProductById } from '../services/api.js'
import { useCart } from '../hooks/useCart.js'

export default function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { addToCart } = useCart()

  useEffect(() => {
    let isMounted = true
    async function load() {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchProductById(id)
        if (isMounted) {
          setProduct(data)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Something went wrong')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }
    load()
    return () => {
      isMounted = false
    }
  }, [id])

  if (loading) {
    return (
      <main className="page">
        <p>Loading product...</p>
      </main>
    )
  }

  if (error) {
    return (
      <main className="page">
        <p className="error-text">{error}</p>
      </main>
    )
  }

  if (!product) {
    return (
      <main className="page">
        <p>Product not found.</p>
      </main>
    )
  }

  return (
    <main className="page">
      <section className="section product-details">
        <div className="details-image-wrapper">
          <img src={product.image} alt={product.title} className="details-image" />
        </div>
        <div className="details-content">
          <h1>{product.title}</h1>
          <p className="details-category">{product.category}</p>
          <p className="details-price">${product.price.toFixed(2)}</p>
          <p className="details-description">{product.description}</p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </section>
    </main>
  )
}

