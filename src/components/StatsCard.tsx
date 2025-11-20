interface StatsCardProps {
  title: string
  value: string | number
  description: string
  accent?: 'green' | 'amber' | 'blue'
}

const accents = {
  green: 'text-emerald-500 bg-emerald-50',
  amber: 'text-amber-500 bg-amber-50',
  blue: 'text-brand-500 bg-brand-50',
}

export const StatsCard = ({
  title,
  value,
  description,
  accent = 'blue',
}: StatsCardProps) => (
  <div className="glass-card p-6">
    <p className="text-sm font-medium text-slate-500">{title}</p>
    <p className="mt-2 text-3xl font-semibold text-slate-900">{value}</p>
    <p className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs ${accents[accent]}`}>
      {description}
    </p>
  </div>
)

