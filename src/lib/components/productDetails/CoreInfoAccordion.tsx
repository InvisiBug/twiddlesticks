import { useState } from "react";
import { Card } from "@/lib/components";
import type { Product } from "@/types";
import { cores, coreText } from "@/data/storefront";

const CoreInfoAccordion = ({ product }: CoreInfoAccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const text = coreText;

  const imageSrc = cores;

  return (
    <Card className="p-5">
      <button type="button" onClick={() => setIsOpen((current) => !current)} className="flex w-full items-center justify-between text-left" aria-expanded={isOpen} aria-controls={`core-info-${product.id}`}>
        <h2 className="text-base font-semibold">A note about the cores</h2>
        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{isOpen ? "Hide" : "Show"}</span>
      </button>

      {isOpen ? (
        <div id={`core-info-${product.id}`} className="mt-4 space-y-4">
          <p className="whitespace-pre-line text-sm text-slate-700 dark:text-slate-300">{text}</p>

          {imageSrc ? <img src={imageSrc} alt={`${product.name} core view`} className="h-44 w-full rounded-xl object-cover" /> : null}
        </div>
      ) : null}
    </Card>
  );
};

export default CoreInfoAccordion;

type CoreInfoAccordionProps = {
  product: Product;
};
