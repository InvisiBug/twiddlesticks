import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CheckoutPage, ProductDetailPage, ShopPage } from './components/shop'
import { festivals, heroImage, products } from './data/storefront'
import {
  CART_STORAGE_KEY,
  addItemToCart,
  getInitialCart,
  removeItemFromCart,
} from './lib/cart'
import type { Cart } from './types'

const defaultStripeLink = ''
const stripePaymentLink = import.meta.env.VITE_STRIPE_PAYMENT_LINK ?? defaultStripeLink
const THEME_STORAGE_KEY = 'twiddlesticks-theme'

type Theme = 'light' | 'dark'

const getInitialTheme = (): Theme => {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)
  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}


function App() {
  const [cart, setCart] = useState<Cart>(getInitialCart)
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  const addToCart = (id: number) => {
    setCart((prev) => addItemToCart(prev, id))
  }

  const removeFromCart = (id: number) => {
    setCart((prev) => removeItemFromCart(prev, id))
  }

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ShopPage
              cart={cart}
              products={products}
              festivals={festivals}
              heroImage={heroImage}
              theme={theme}
              toggleTheme={toggleTheme}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          }
        />
        <Route
          path="/checkout"
          element={
            <CheckoutPage
              cart={cart}
              products={products}
              stripePaymentLink={stripePaymentLink}
              theme={theme}
              toggleTheme={toggleTheme}
            />
          }
        />
        <Route
          path="/products/:productId"
          element={
            <ProductDetailPage
              cart={cart}
              products={products}
              addToCart={addToCart}
              theme={theme}
              toggleTheme={toggleTheme}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
