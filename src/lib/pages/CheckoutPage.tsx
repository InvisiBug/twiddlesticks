import { useMemo } from "react";
import { Link } from "react-router-dom";
import { getStripePaymentLink, getThemedProducts, getCartItems, getTotalItems, getTotalPrice, formatMoney, DEFAULT_COLOUR_OPTION } from "@/lib/helpers";
import { ButtonLink, Card, Field, PageShell } from "@/lib/components";
import { useContext } from "@/lib/context";

export const CheckoutPage = () => {
  const { theme, cart, products } = useContext();

  const themedProducts = useMemo(() => getThemedProducts(theme, products), [theme, products]);

  const cartItems = useMemo(() => getCartItems(cart, themedProducts), [cart, themedProducts]);

  const totalItems = useMemo(() => getTotalItems(cart), [cart]);
  const totalPrice = useMemo(() => getTotalPrice(cart, themedProducts), [cart, themedProducts]);

  const stripePaymentLink = getStripePaymentLink(import.meta.env.VITE_STRIPE_PAYMENT_LINK);

  const stripeReady = stripePaymentLink.startsWith("https://buy.stripe.com/");

  return (
    <PageShell maxWidth="6xl">
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <Card className="p-6">
          <h1 className="text-2xl font-semibold tracking-tight">Checkout</h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Shipping details before payment</p>

          <form className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field label="Full name" placeholder="Jane Seller" containerClassName="sm:col-span-1" />
            <Field label="Email" type="email" placeholder="jane@example.com" containerClassName="sm:col-span-1" />
            <Field label="Address" placeholder="123 Main St" containerClassName="sm:col-span-2" />
            <Field label="City" placeholder="Portland" containerClassName="sm:col-span-1" />
            <Field label="ZIP" placeholder="97201" containerClassName="sm:col-span-1" />
          </form>

          <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-200">Payment processor: Stripe Checkout</div>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <ButtonLink
              href={stripeReady ? stripePaymentLink : undefined}
              target="_blank"
              rel="noreferrer"
              variant={stripeReady ? "primary" : "outline"}
              className={`px-4 py-3 ${stripeReady ? "" : "cursor-not-allowed bg-slate-400 text-white hover:bg-slate-400 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-700"}`}
              aria-disabled={!stripeReady}
              onClick={(event) => {
                if (!stripeReady || totalItems === 0) event.preventDefault();
              }}
            >
              Pay with Stripe
            </ButtonLink>
            <Link to="/" className="rounded-lg border border-slate-300 px-4 py-3 text-center text-sm font-semibold text-slate-800 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-800">
              Continue shopping
            </Link>
          </div>

          {!stripeReady ? <p className="mt-3 text-sm text-rose-700 dark:text-rose-300">Add VITE_STRIPE_PAYMENT_LINK in your .env file with your Stripe Payment Link URL.</p> : null}
          {totalItems === 0 ? <p className="mt-2 text-sm text-rose-700 dark:text-rose-300">Your bag is empty. Add at least one product before paying.</p> : null}
        </Card>

        <Card className="h-fit p-5">
          <h2 className="text-lg font-semibold tracking-tight">Order Summary</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{totalItems} item(s)</p>

          {cartItems.length === 0 ? (
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">No items in your bag yet.</p>
          ) : (
            <div className="mt-4 space-y-2">
              {cartItems.map((item) => (
                <Card key={item.key} className="rounded-lg px-3 py-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>
                      {item.product.name} ({item.selectedCore}
                      {item.selectedColour !== DEFAULT_COLOUR_OPTION ? `, ${item.selectedColour}` : ""}) x{item.quantity}
                    </span>
                    <span>{formatMoney(item.product.price * item.quantity)}</span>
                  </div>
                </Card>
              ))}
            </div>
          )}

          <div className="mt-4 border-t border-slate-200 pt-3 text-base font-semibold dark:border-slate-700">
            <div className="flex items-center justify-between">
              <span>Total</span>
              <span>{formatMoney(totalPrice)}</span>
            </div>
          </div>
        </Card>
      </div>
    </PageShell>
  );
};
export default CheckoutPage;
