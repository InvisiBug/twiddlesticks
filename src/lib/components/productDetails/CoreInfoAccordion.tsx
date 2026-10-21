import { useMemo, useState } from "react";
import { Card } from "@/lib/components";
import type { Product } from "@/types";
import { cores, coreText } from "@/data/storefront";

const CoreInfoAccordion = ({ product }: CoreInfoAccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const coreNotes = useMemo(() => {
    const normalizedName = product.name.toLowerCase();

    if (normalizedName.includes("spiral")) {
      return ["Spiral cores are tuned for longer glide and slower roll-off.", "The slimmer core profile reduces drag and keeps motion smooth.", "Best for flow sessions where continuous movement matters most."];
    }

    if (normalizedName.includes("circle")) {
      return ["Circle cores are slightly heavier for a more planted feel.", "Weight distribution is balanced for predictable catches.", "Great for users who prefer stability over float."];
    }

    if (normalizedName.includes("led")) {
      return ["LED builds use a protected inner channel to house battery lighting.", "The core shell prioritizes impact resistance around the light chamber.", "Brightness and runtime vary with battery quality and usage pattern."];
    }

    return ["This design uses a balanced core for everyday control.", "Material and diameter choices target consistency over long sessions.", "If you want help picking a core type, compare the detail cards side by side."];
  }, [product.name]);

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
          {/* <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
            {coreNotes.map((note) => (
              <li key={note} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-500 dark:bg-slate-400" aria-hidden="true" />
                <span>{note}</span>
              </li>
            ))}
          </ul> */}
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
