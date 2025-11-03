'use client';

export default function PriceFilter({ value, onChange }) {
return (
<label className="text-sm">
Max Price:
<input
type="number"
className="ml-2 border rounded-md px-2 py-1 w-24"
placeholder="Any"
value={value}
onChange={e => onChange(e.target.value)}
/>
</label>
);
}