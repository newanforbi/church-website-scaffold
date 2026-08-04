import Link from "next/link";

export default function NotFound() {
  return (
    <div className="surface-mist flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="section-eyebrow">404</p>
      <h1 className="section-heading mt-3">Page not found</h1>
      <div className="divider-dawn mx-auto mt-5" aria-hidden="true" />
      <p className="mt-5 max-w-md text-base leading-7 text-brand-700">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Back to Home
      </Link>
    </div>
  );
}
