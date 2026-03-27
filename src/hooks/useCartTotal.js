import { useMemo } from 'react'
import { useCart } from './useCart.js'

export function useCartTotal() {
  const { cartItems } = useCart()

  const total = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }, [cartItems])

  return total
}

