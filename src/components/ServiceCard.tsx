type ServiceCardProps = {
  title: string;
  subtitle: string;
  items: string[];
  footerLeft: string;
  footerRight: string;
  index: number;
};

export function ServiceCard({
  title,
  subtitle,
  items,
  footerLeft,
  footerRight,
  index,
}: ServiceCardProps) {
  return (
    <div
      className="glass-card p-6 sm:p-8 flex flex-col h-full animate-fade-in-up"
      style={{ animationDelay: `${index * 120}ms` }}
    >
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-bold tracking-wider text-foreground mb-1">
          {title}
        </h3>
        <p className="text-sm text-muted">{subtitle}</p>
      </div>

      {/* Divider */}
      <div className="accent-divider mb-6" />

      {/* Items List */}
      <ul className="flex-1 space-y-3 mb-6">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-3 text-sm text-foreground/80">
            <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="border-t border-border pt-4 flex items-center justify-between gap-4">
        <span className="text-xs font-semibold text-accent tracking-wide">
          {footerLeft}
        </span>
        <span className="text-xs text-muted text-right">{footerRight}</span>
      </div>
    </div>
  );
}
