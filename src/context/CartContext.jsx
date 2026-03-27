import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react'

const CartContext = createContext()

const CART_STORAGE_KEY = 'ecommerce_cart'

const initialState = {
  cartItems: [],
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'INITIALIZE': {
      return {
        ...state,
        cartItems: action.payload || [],
      }
    }
    case 'ADD_TO_CART': {
      const existing = state.cartItems.find((item) => item.id === action.payload.id)
      let updated
      if (existing) {
        updated = state.cartItems.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      } else {
        updated = [...state.cartItems, { ...action.payload, quantity: 1 }]
      }
      return { ...state, cartItems: updated }
    }
    case 'REMOVE_FROM_CART': {
      const updated = state.cartItems.filter((item) => item.id !== action.payload)
      return { ...state, cartItems: updated }
    }
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload
      if (quantity <= 0) {
        const filtered = state.cartItems.filter((item) => item.id !== id)
        return { ...state, cartItems: filtered }
      }
      const updated = state.cartItems.map((item) =>
        item.id === id ? { ...item, quantity } : item,
      )
      return { ...state, cartItems: updated }
    }
    case 'CLEAR_CART': {
      return { ...state, cartItems: [] }
    }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(CART_STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          dispatch({ type: 'INITIALIZE', payload: parsed })
        }
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage', error)
    }
  }, [])

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cartItems))
    } catch (error) {
      console.error('Failed to persist cart to localStorage', error)
    }
  }, [state.cartItems])

  const totalPrice = useMemo(() => {
    return state.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }, [state.cartItems])

  const value = useMemo(
    () => ({
      cartItems: state.cartItems,
      totalPrice,
      addToCart: (product) => dispatch({ type: 'ADD_TO_CART', payload: product }),
      removeFromCart: (id) => dispatch({ type: 'REMOVE_FROM_CART', payload: id }),
      updateQuantity: (id, quantity) =>
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } }),
      clearCart: () => dispatch({ type: 'CLEAR_CART' }),
    }),
    [state.cartItems, totalPrice],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCartContext() {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error('useCartContext must be used within a CartProvider')
  }
  return ctx
}

