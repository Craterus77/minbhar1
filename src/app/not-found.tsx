import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center page-padding text-center">
      <p className="section-label mb-6">404</p>
      <h1 className="font-serif text-display-md text-charcoal">Page not found</h1>
      <p className="mt-6 max-w-md font-sans text-sm text-charcoal/60">
        The page you are looking for may have been moved or no longer exists.
      </p>
      <Link href="/" className="btn-minimal mt-12">
        Return home
      </Link>
    </section>
  );
}
