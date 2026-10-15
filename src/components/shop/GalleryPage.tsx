import { Link } from "react-router-dom";
import { Badge, Card, PageShell, ThemeToggle } from "../ui";
import type { GalleryPhoto } from "../../types";

type GalleryPageProps = {
  photos: GalleryPhoto[];
  theme: "light" | "dark";
  toggleTheme: () => void;
};

export function GalleryPage({ photos, theme, toggleTheme }: GalleryPageProps) {
  return (
    <PageShell maxWidth="7xl">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-white/70 bg-white/75 px-5 py-3 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/70">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Em Kay</p>
          <p className="text-lg font-semibold tracking-tight">Build Gallery</p>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
          <Link to="/" className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800">
            Back to shop
          </Link>
        </div>
      </div>

      <header className="mb-6">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">How I Build Each Product</h1>
        <p className="mt-2 max-w-3xl text-slate-600 dark:text-slate-300">A photo timeline from materials to finished twiddles. Add new photos in the galleryPhotos array to keep this page updated.</p>
      </header>

      {photos.length === 0 ? (
        <Card className="p-6">
          <p className="text-sm text-slate-600 dark:text-slate-300">No build photos yet. Add entries to galleryPhotos in storefront data to publish your first update.</p>
        </Card>
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo) => (
            <Card key={photo.id} className="overflow-hidden">
              <div className="relative aspect-4/5 overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img src={photo.src} alt={photo.title} className="absolute inset-0 h-full w-full object-cover object-center transition duration-300 hover:scale-[1.02]" />
              </div>
              <div className="space-y-2 p-4">
                <Badge className="bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900">{photo.stage}</Badge>
                <h2 className="text-lg font-semibold tracking-tight">{photo.title}</h2>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{photo.caption}</p>
              </div>
            </Card>
          ))}
        </section>
      )}
    </PageShell>
  );
}
