import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../hooks/useCart.js'
import { useCartTotal } from '../hooks/useCartTotal.js'

export default function Checkout() {
  const navigate = useNavigate()
  const { cartItems, clearCart } = useCart()
  const total = useCartTotal()

  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    paymentMethod: 'card',
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.address) {
      setError('Please fill in all required fields.')
      return
    }
    if (cartItems.length === 0) {
      setError('Your cart is empty.')
      return
    }
    setError(null)
    setSubmitting(true)
    setTimeout(() => {
      clearCart()
      setSubmitting(false)
      setSuccess(true)
      setTimeout(() => {
        navigate('/')
      }, 2000)
    }, 1000)
  }

  return (
    <main className="page">
      <section className="section">
        <div className="section-header">
          <h1>Checkout</h1>
        </div>
        {success && (
          <p className="success-text">
            Order placed successfully! Redirecting to home...
          </p>
        )}
        {!success && (
          <div className="checkout-layout">
            <form className="checkout-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">
                  Name<span className="required">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">
                  Email<span className="required">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">
                  Address<span className="required">*</span>
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows="3"
                  value={form.address}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="paymentMethod">Payment Method</label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={form.paymentMethod}
                  onChange={handleChange}
                >
                  <option value="card">Credit Card</option>
                  <option value="paypal">PayPal</option>
                  <option value="cod">Cash on Delivery</option>
                </select>
              </div>
              {error && <p className="error-text">{error}</p>}
              <button
                type="submit"
                className="btn btn-primary btn-full"
                disabled={submitting}
              >
                {submitting ? 'Placing order...' : 'Place order'}
              </button>
            </form>

            <aside className="checkout-summary">
              <h2>Order Summary</h2>
              {cartItems.length === 0 && <p>Your cart is empty.</p>}
              {cartItems.length > 0 && (
                <>
                  <ul className="summary-items">
                    {cartItems.map((item) => (
                      <li key={item.id} className="summary-item">
                        <span>
                          {item.title} x {item.quantity}
                        </span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="summary-row total">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </p>
                </>
              )}
            </aside>
          </div>
        )}
      </section>
    </main>
  )
}

