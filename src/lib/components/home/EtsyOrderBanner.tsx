import { useContext } from "@/lib/context";

const EtsyOrderBanner = () => {
  const { etsyOrderUrl } = useContext();

  return (
    <a
      href={etsyOrderUrl}
      target="_blank"
      rel="noreferrer"
      className="mb-5 flex items-start gap-3 rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm font-medium text-sky-900 transition hover:bg-sky-100 dark:border-sky-900/60 dark:bg-sky-950/40 dark:text-sky-200 dark:hover:bg-sky-900/40"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 fill-current">
        <path d="M3 4.5A1.5 1.5 0 0 1 4.5 3h15A1.5 1.5 0 0 1 21 4.5v3a1.5 1.5 0 0 1-1.5 1.5H18v9h1.5a1.5 1.5 0 1 1 0 3h-15a1.5 1.5 0 1 1 0-3H6v-9H4.5A1.5 1.5 0 0 1 3 7.5v-3Zm3 3h12V6H6v1.5Zm3 10.5h6v-9H9v9Z" />
      </svg>
      <span>
        Order via Etsy. <br />
        Browse the products, then click here to open the shop and place an order.
      </span>
    </a>
  );
};

export default EtsyOrderBanner;
