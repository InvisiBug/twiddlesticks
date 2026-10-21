import { useEffect, useMemo, useState } from "react";

type ShopHeroProps = {
  heroImages: string[];
};

const HERO_ROTATION_MS = 3500;

const Hero = ({ heroImages }: ShopHeroProps) => {
  const images = useMemo(() => heroImages.filter(Boolean), [heroImages]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [images.length]);

  useEffect(() => {
    if (images.length < 2) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % images.length);
    }, HERO_ROTATION_MS);

    return () => window.clearInterval(intervalId);
  }, [images]);

  const activeImage = images[activeImageIndex];

  return (
    <header className="relative overflow-hidden rounded-3xl border border-orange-100 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900/80 sm:p-10">
      <div className="absolute -right-14 -top-12 h-48 w-48 rounded-full bg-amber-200/70 blur-2xl dark:bg-amber-500/25" aria-hidden="true" />
      <div className="absolute -bottom-16 right-20 h-56 w-56 rounded-full bg-rose-200/70 blur-3xl dark:bg-cyan-500/20" aria-hidden="true" />

      <div className="grid items-center gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="inline-flex rounded-full bg-slate-900 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white dark:bg-slate-100 dark:text-slate-900">Twiddle Sticks</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">Handmade stim / fidget toys that keep your hands & brain busy.</h1>
          <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">Explore twiddles and head to the checkout when you're ready.</p>
        </div>

        <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          {activeImage ? <img src={activeImage} alt={`Featured shop preview ${activeImageIndex + 1}`} className="absolute inset-0 h-full w-full object-contain object-center transition duration-700 ease-out" /> : null}

          {images.length > 1 ? (
            <div className="pointer-events-none absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-slate-900/60 px-2 py-1">
              {images.map((_, index) => (
                <span key={index} className={`h-1.5 w-1.5 rounded-full ${index === activeImageIndex ? "bg-white" : "bg-white/40"}`} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Hero;
