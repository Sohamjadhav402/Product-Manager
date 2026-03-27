import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart.js'
import { useCartTotal } from '../hooks/useCartTotal.js'

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart()
  const total = useCartTotal()

  const handleQuantityChange = (id, value) => {
    const parsed = Number(value)
    if (Number.isNaN(parsed)) return
    updateQuantity(id, parsed)
  }

  const isEmpty = cartItems.length === 0

  return (
    <main className="page">
      <section className="section">
        <div className="section-header">
          <h1>Your Cart</h1>
        </div>

        {isEmpty && (
          <div className="empty-cart">
            <p>Your cart is empty.</p>
            <Link to="/products" className="btn btn-primary">
              Browse products
            </Link>
          </div>
        )}

        {!isEmpty && (
          <div className="cart-layout">
            <div className="cart-items">
              {cartItems.map((item) => (
                <article key={item.id} className="cart-item">
                  <div className="cart-item-main">
                    <img src={item.image} alt={item.title} className="cart-item-image" />
                    <div className="cart-item-info">
                      <h2 className="cart-item-title">{item.title}</h2>
                      <p className="cart-item-price">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="cart-item-actions">
                    <label className="quantity-label">
                      Qty:
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      />
                    </label>
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>
            <aside className="cart-summary">
              <h2>Order Summary</h2>
              <p className="summary-row">
                <span>Items ({cartItems.length})</span>
                <span>${total.toFixed(2)}</span>
              </p>
              <p className="summary-row total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </p>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={clearCart}
              >
                Clear Cart
              </button>
              <Link to="/checkout" className="btn btn-primary btn-full">
                Proceed to Checkout
              </Link>
            </aside>
          </div>
        )}
      </section>
    </main>
  )
}

