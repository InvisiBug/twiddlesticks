import { Card } from '../Card'
import type { Festival } from '../../../types'

type FestivalSectionProps = {
  festivals: Festival[]
}

export function FestivalSection({ festivals }: FestivalSectionProps) {
  return (
    <Card className="mt-6 rounded-3xl border-amber-100 p-5 sm:p-6">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">Meet Us In Person</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight">Festivals and Local Pickup</h2>
        </div>
        <p className="text-sm text-slate-600">Order online, then pick up at any event below.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {festivals.map((festival) => (
          <Card key={festival.name} className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">{festival.date}</p>
            <h3 className="mt-1 text-lg font-semibold tracking-tight">{festival.name}</h3>
            <p className="mt-2 text-sm text-slate-700">{festival.location}</p>
            <p className="text-sm text-slate-700">{festival.hours}</p>
            <p className="mt-3 text-sm text-slate-600">{festival.note}</p>
          </Card>
        ))}
      </div>
    </Card>
  )
}
