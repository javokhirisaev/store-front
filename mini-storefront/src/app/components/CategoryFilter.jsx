'use client';

export default function CategoryFilter({ categories, value, onChange }) {
return (
<label className="text-sm">
Category:
<select
className="ml-2 border rounded-md px-2 py-1"
value={value}
onChange={e => onChange(e.target.value)}
>
{categories.map(cat => <option key={cat}>{cat}</option>)}
</select>
</label>
);
}