interface PlaceholderSectionProps {
  title: string;
  description: string;
}

export default function PlaceholderSection({
  title,
  description,
}: PlaceholderSectionProps) {
  return (
    <section className="mt-6 rounded-3xl border border-border bg-surface-2 p-8 text-center shadow-card sm:p-12">
      <div className="mx-auto max-w-lg">
        <h2 className="text-xl font-extrabold text-text-primary">{title}</h2>
        <p className="mt-3 text-sm leading-6 text-text-secondary">
          {description}
        </p>
      </div>
    </section>
  );
}