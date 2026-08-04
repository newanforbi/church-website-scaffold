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
    <section className="relative overflow-hidden bg-brand-950">
      <div className="absolute inset-0 bg-page-hero-gradient" aria-hidden="true" />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />
      <div className="container-page relative py-16 sm:py-20">
        {eyebrow && (
          <p className="section-eyebrow-light animate-fade-up">{eyebrow}</p>
        )}
        <h1 className="mt-3 max-w-3xl animate-fade-up-delay font-serif text-4xl font-medium tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        <div className="divider-dawn mt-5 animate-draw-line" aria-hidden="true" />
        {description && (
          <p className="mt-5 max-w-2xl animate-fade-up-delay-2 text-base leading-7 text-brand-100">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
