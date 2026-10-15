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


function App() {
  const [cart, setCart] = useState<Cart>(getInitialCart)

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
  }, [cart])

  const addToCart = (id: number) => {
    setCart((prev) => addItemToCart(prev, id))
  }

  const removeFromCart = (id: number) => {
    setCart((prev) => removeItemFromCart(prev, id))
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
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          }
        />
        <Route
          path="/checkout"
          element={<CheckoutPage cart={cart} products={products} stripePaymentLink={stripePaymentLink} />}
        />
        <Route
          path="/products/:productId"
          element={<ProductDetailPage cart={cart} products={products} addToCart={addToCart} />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
