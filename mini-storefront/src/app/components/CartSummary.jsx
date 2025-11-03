'use client';

export default function CartSummary({ products, cart, totals, onDecrement, onReset }) {
const items = Object.entries(cart);

return (
<div className="border rounded-lg bg-white p-4 shadow-sm">
<h2 className="font-semibold mb-2">Cart</h2>
<p className="text-sm text-gray-600 mb-3">Items: {totals.count} | Total: ${totals.total.toFixed(2)}</p>

{items.length === 0 ? (
<p className="text-sm text-gray-500">Cart is empty.</p>
) : (
<ul className="space-y-2 mb-3">
{items.map(([id, qty]) => {
const item = products.find(p => p.id === id);
if (!item) return null;
return (
<li key={id} className="flex justify-between text-sm">
<span>{item.name} × {qty}</span>
<button
onClick={() => onDecrement(id)}
className="border rounded px-2 hover:bg-gray-50"
>
−
</button>
</li>
);
})}
</ul>
)}


<button
onClick={onReset}
disabled={items.length === 0}
className="w-full border rounded-md py-1 text-sm hover:bg-gray-50"
>
Reset Cart
</button>
</div>
);
}