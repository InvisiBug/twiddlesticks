import { Link } from "react-router-dom";
import { Button } from "../baseComponents/Button";
import { Card } from "../baseComponents/Card";
import { formatMoney } from "@/lib/money";
import type { Cart, Product } from "@/types";

type CartPanelProps = {
  cart: Cart;
  cartItems: Product[];
  totalItems: number;
  totalPrice: number;
  addToCart: (id: number) => void;
  removeFromCart: (id: number) => void;
};

export function CartPanel({ cart, cartItems, totalItems, totalPrice, addToCart, removeFromCart }: CartPanelProps) {
  return (
    <Card className="h-fit p-5 lg:sticky lg:top-6">
      <h2 className="text-xl font-semibold tracking-tight">Your Bag</h2>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{totalItems} item(s) selected</p>

      {cartItems.length === 0 ? (
        <p className="mt-6 rounded-xl border border-dashed border-slate-300 px-4 py-5 text-sm text-slate-600 dark:border-slate-600 dark:text-slate-300">Your bag is empty. Add an item to start checkout.</p>
      ) : (
        <div className="mt-5 space-y-3">
          {cartItems.map((item) => (
            <Card key={item.id} className="rounded-xl p-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{formatMoney(item.price)} each</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button onClick={() => removeFromCart(item.id)} variant="outline" className="h-7 w-7 rounded-md p-0 text-sm">
                    -
                  </Button>
                  <span className="w-5 text-center text-sm font-medium">{cart[item.id]}</span>
                  <Button onClick={() => addToCart(item.id)} variant="outline" className="h-7 w-7 rounded-md p-0 text-sm">
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
    </Card>
  );
}
