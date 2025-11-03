'use client';

export default function ProductCard({ product, onAdd }) {
  const out = product.stock <= 0;

  return (
    <div
      className="rounded-xl border border-gray-300 bg-white p-5 shadow-sm hover:shadow-lg 
                 transition duration-200 ease-in-out hover:-translate-y-0.5"
    >
      
      <div className="flex flex-col mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        <p className="text-sm text-gray-600">{product.category}</p>
      </div>

      
      <div className="mb-3">
        <p className="text-sm text-gray-800">Price: ${product.price}</p>
        <p
          className={`text-sm ${
            out ? "text-red-600 font-medium" : "text-gray-700"
          }`}
        >
          {out ? "Out of stock" : `In stock: ${product.stock}`}
        </p>
      </div>

    
      <button
        onClick={onAdd}
        disabled={out}
        className={`w-full rounded-md px-4 py-2 text-sm font-semibold border transition
          ${
            out
              ? "cursor-not-allowed bg-gray-100 text-gray-500 border-gray-200"
              : "bg-black text-white border-black hover:bg-gray-800"
          }`}
      >
        {out ? "Unavailable" : "Add to Cart"}
      </button>
    </div>
  );
}
