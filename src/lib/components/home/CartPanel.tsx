import { Link } from "react-router-dom";
import { Button, Card, InstagramOrderBanner } from "@/lib/components";
import { useContext } from "@/lib/context";
import { useMemo } from "react";
import { getCartItems, getTotalItems, formatMoney, removeItemFromCart, addItemToCart, getTotalPrice } from "@/lib/helpers";

const CartPanel = () => {
  const { onlineOrdersEnabled, cart, setCart, products } = useContext();

  const cartItems = useMemo(() => getCartItems(cart, products), [cart, products]);

  const totalItems = getTotalItems(cart);
  const totalPrice = useMemo(() => getTotalPrice(cart, products), [cart, products]);

  const handleRemoveFromCart = (id: number, selectedCore: string) => {
    setCart(removeItemFromCart(cart, id, selectedCore));
  };

  const handleAddToCart = (id: number, selectedCore: string) => {
    setCart(addItemToCart(cart, id, selectedCore));
  };

  return (
    <Card className="h-fit p-5 lg:sticky lg:top-6">
      <h2 className="text-xl mb-5 font-semibold tracking-tight">Your Cart</h2>
      {!onlineOrdersEnabled ? (
        <>
          {/* <p className="mt-3 mb-3 rounded-xl border border-dashed border-slate-300 px-4 py-5 text-sm text-slate-600 dark:border-slate-600 dark:text-slate-300">Online orders coming soon.</p> */}
          <InstagramOrderBanner />
        </>
      ) : (
        <>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{totalItems} item(s) selected</p>

          {cartItems.length === 0 ? (
            <p className="mt-6 rounded-xl border border-dashed border-slate-300 px-4 py-5 text-sm text-slate-600 dark:border-slate-600 dark:text-slate-300">Your bag is empty. Add an item to start checkout.</p>
          ) : (
            <div className="mt-5 space-y-3">
              {cartItems.map((item) => (
                <Card key={item.key} className="rounded-xl p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Core: {item.selectedCore}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{formatMoney(item.product.price)} each</p>
                    </div>

                    <div className="flex gap-2 items-center ">
                      <Button onClick={() => handleRemoveFromCart(item.productId, item.selectedCore)} variant="outline" className="h-7 w-7 rounded-md p-0 text-sm leading-none flex items-center justify-center">
                        -
                      </Button>

                      <span className="w-5 text-center text-sm font-medium">{item.quantity}</span>

                      <Button onClick={() => handleAddToCart(item.productId, item.selectedCore)} variant="outline" className="h-7 w-7 rounded-md p-0 text-sm leading-none flex items-center justify-center">
                        +
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          <div className="mt-5 border-t border-slate-200 pt-4 dark:border-slate-700">
            <div className="mb-4 flex items-center justify-between text-base font-semibold">
              <span>Total</span>
              <span>{formatMoney(totalPrice)}</span>
            </div>

            <Link to="/checkout" className="block w-full rounded-lg bg-emerald-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400">
              Continue to checkout
            </Link>
          </div>
        </>
      )}
    </Card>
  );
};
export default CartPanel;
