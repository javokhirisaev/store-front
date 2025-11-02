import Catalog from "./components/Catalog";

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Mini-Storefront
        </h1>
        <p className="text-base text-gray-700 mb-8">
          Browse products, filter by category and price, and manage your cart
          easily.
        </p>

        <Catalog />
      </section>
    </main>
  );
}
