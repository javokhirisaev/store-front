'use client';

export default function StatusMessage({ loading, error, empty }) {
if (loading) return <p className="text-blue-600">Loading products...</p>;
if (error) return <p className="text-red-600">Error: {error}</p>;
if (empty) return <p className="text-gray-600">No products found.</p>;
return null;
}