export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="border-b border-brand-900/10 bg-brand-950">
      <div className="container-page py-16 sm:py-20">
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-wide text-gold-400">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-2 font-serif text-4xl font-semibold text-white sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base leading-7 text-brand-200">{description}</p>
        )}
      </div>
    </section>
  );
}
