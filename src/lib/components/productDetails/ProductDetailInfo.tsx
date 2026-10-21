import { useEffect, useMemo, useState } from "react";
import { useProductById } from "@/lib/helpers/product";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { AddToBagButton, Badge, Card, InstagramOrderBanner } from "@/lib/components";
import { formatMoney, getDefaultCoreOption } from "@/lib/helpers";
import { useContext } from "@/lib/context";
import CoreInfoAccordion from "./CoreInfoAccordion";

const ProductDetailInfo = () => {
  const { productId } = useParams();
  const { onlineOrdersEnabled, products } = useContext();

  const product = useProductById(products, productId);
  const [selectedCore, setSelectedCore] = useState<string>("");

  useEffect(() => {
    if (!product) {
      return;
    }

    setSelectedCore(getDefaultCoreOption(product));
  }, [product]);

  const availableColors = useMemo(() => {
    if (!product?.availableColours?.length) {
      return [];
    }

    return [
      ...new Set(
        product.availableColours
          .flatMap((color) => color.split(","))
          .map((color) => color.trim())
          .filter(Boolean),
      ),
    ].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
  }, [product]);

  if (!product) {
    return null;
  }

  return (
    <section className="space-y-5">
      <Badge className="bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900">{product.tag}</Badge>
      <h1 className="text-4xl font-semibold tracking-tight">{product.name}</h1>
      <p className="text-3xl font-semibold text-slate-900 dark:text-slate-100">{formatMoney(product.price)}</p>
      <p className="leading-relaxed text-slate-700 dark:text-slate-300">{product.longDescription}</p>

      <div className="grid gap-5 md:grid-cols-2">
        <Card className="p-5">
          <h2 className="text-base font-semibold">Product details</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
            {product.details.map((detail) => (
              <li key={detail} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-500 dark:bg-slate-400" aria-hidden="true" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </Card>

        {availableColors?.length > 0 ? (
          <Card className="p-5">
            <h2 className="text-base font-semibold">Available colours</h2>
            <div className="mt-3 flex flex-col gap-2">
              {availableColors.map((color) => (
                <span key={color} className="inline-flex self-start rounded-full border border-slate-300 px-3 py-1 text-sm font-medium text-slate-700 dark:border-slate-600 dark:text-slate-200">
                  {color}
                </span>
              ))}
            </div>
          </Card>
        ) : null}
      </div>

      <CoreInfoAccordion product={product} />

      <Card className="p-5 border-red-500! dark:border-red-400!">
        <h2 className="text-base font-semibold text-orange-200">Disclaimer</h2>
        <p>
          Something something disclaimer text goes here.
          <br />
          Something about postage
        </p>
      </Card>

      {onlineOrdersEnabled ? (
        <div className="space-y-3">
          {product.coreOptions?.length ? (
            <details className="rounded-xl border border-slate-300 p-4 dark:border-slate-600">
              <summary className="cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-200">Select core ({selectedCore || getDefaultCoreOption(product)})</summary>

              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {product.coreOptions.map((coreOption) => {
                  const isSelected = selectedCore === coreOption.label;

                  return (
                    <button
                      key={coreOption.label}
                      type="button"
                      onClick={() => setSelectedCore(coreOption.label)}
                      aria-pressed={isSelected}
                      className={`overflow-hidden rounded-xl border text-left transition ${
                        isSelected ? "border-emerald-500 ring-2 ring-emerald-200 dark:border-emerald-400 dark:ring-emerald-900" : "border-slate-300 hover:border-slate-400 dark:border-slate-600 dark:hover:border-slate-500"
                      }`}
                    >
                      <img src={coreOption.image ?? product.images[0]} alt={coreOption.label} className="h-24 w-full object-cover" />
                      <span className="block px-3 py-2 text-xs font-semibold text-slate-800 dark:text-slate-100">{coreOption.label}</span>
                    </button>
                  );
                })}
              </div>
            </details>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row">
            <AddToBagButton productId={product.id} selectedCore={selectedCore || getDefaultCoreOption(product)} className="sm:min-w-40" />
            <Link to="/checkout" className="rounded-lg border border-slate-300 px-4 py-3 text-center text-sm font-semibold text-slate-800 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-800 sm:min-w-40">
              Go to checkout
            </Link>
          </div>
        </div>
      ) : (
        <InstagramOrderBanner />
      )}
    </section>
  );
};

export default ProductDetailInfo;
