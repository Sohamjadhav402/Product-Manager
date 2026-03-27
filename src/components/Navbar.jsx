import { Link, NavLink } from 'react-router-dom'
import { useCartTotal } from '../hooks/useCartTotal.js'
import { useCart } from '../hooks/useCart.js'
import './Navbar.css'

export function Navbar() {
  const total = useCartTotal()
  const { cartItems } = useCart()

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="logo">
          E-Commerce <span>Explorer</span>
        </Link>
        <nav className="nav-links">
          <NavLink to="/" end className="nav-link">
            Home
          </NavLink>
          <NavLink to="/products" className="nav-link">
            Products
          </NavLink>
          <NavLink to="/cart" className="nav-link nav-cart">
            Cart
            {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
          </NavLink>
        </nav>
        <div className="nav-total">
          <span>Total:</span>
          <strong>${total.toFixed(2)}</strong>
        </div>
      </div>
    </header>
  )
}

