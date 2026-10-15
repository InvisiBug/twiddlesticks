type ShopHeroProps = {
  heroImage: string
}

export function ShopHero({ heroImage }: ShopHeroProps) {
  return (
    <header className="relative overflow-hidden rounded-3xl border border-orange-100 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900/80 sm:p-10">
      <div className="absolute -right-14 -top-12 h-48 w-48 rounded-full bg-amber-200/70 blur-2xl dark:bg-amber-500/25" aria-hidden="true" />
      <div className="absolute -bottom-16 right-20 h-56 w-56 rounded-full bg-rose-200/70 blur-3xl dark:bg-cyan-500/20" aria-hidden="true" />

      <div className="grid items-center gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="inline-flex rounded-full bg-slate-900 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white dark:bg-slate-100 dark:text-slate-900">
            Fall Collection
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Handmade pieces that feel personal, not mass-produced.
          </h1>
          <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
            Explore products and continue to checkout when your bag is ready.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <img src={heroImage} alt="Willow Market booth placeholder" className="h-full w-full object-cover" />
        </div>
      </div>
    </header>
  )
}
