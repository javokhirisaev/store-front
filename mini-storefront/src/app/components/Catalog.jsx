'use client';
import { useEffect, useMemo, useState } from 'react';
import StatusMessage from './StatusMessage';
import CategoryFilter from './CategoryFilter';
import PriceFilter from './PriceFilter';
import ProductList from './ProductList';
import CartSummary from './CartSummary';

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('all');
  const [maxPrice, setMaxPrice] = useState('');
  const [cart, setCart] = useState({});

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error('Failed to load products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProducts(prev =>
        prev.map(p => {
          if (Math.random() < 0.3) {
            const delta = Math.random() < 0.5 ? -1 : 1;
            return { ...p, stock: Math.max(0, p.stock + delta) };
          }
          return p;
        })
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const categories = useMemo(() => {
    const all = ['all'];
    products.forEach(p => {
      if (!all.includes(p.category)) all.push(p.category);
    });
    return all;
  }, [products]);

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchCat = category === 'all' || p.category === category;
      const matchPrice = !maxPrice || p.price <= Number(maxPrice);
      return matchCat && matchPrice;
    });
  }, [products, category, maxPrice]);

  function addToCart(product) {
    if (product.stock === 0) return;
    setCart(prev => ({ ...prev, [product.id]: (prev[product.id] || 0) + 1 }));
    setProducts(prev =>
      prev.map(p =>
        p.id === product.id ? { ...p, stock: p.stock - 1 } : p
      )
    );
  }

  function decrementItem(id) {
    setCart(prev => {
      const qty = prev[id];
      if (!qty) return prev;
      const newCart = { ...prev };
      newCart[id] = qty - 1;
      if (newCart[id] <= 0) delete newCart[id];
      return newCart;
    });
    setProducts(prev =>
      prev.map(p =>
        p.id === id ? { ...p, stock: p.stock + 1 } : p
      )
    );
  }

  function resetCart() {
    setProducts(prev =>
      prev.map(p => ({ ...p, stock: p.stock + (cart[p.id] || 0) }))
    );
    setCart({});
  }

  const totals = useMemo(() => {
    let count = 0,
      total = 0;
    for (const p of products) {
      const qty = cart[p.id] || 0;
      count += qty;
      total += qty * p.price;
    }
    return { count, total };
  }, [cart, products]);

  return (
    <div className="grid md:grid-cols-[1fr_300px] gap-6">
      <div>
        <div className="flex flex-wrap gap-3 mb-4">
          <CategoryFilter
            categories={categories}
            value={category}
            onChange={setCategory}
          />
          <PriceFilter value={maxPrice} onChange={setMaxPrice} />
        </div>

        <StatusMessage
          loading={loading}
          error={error}
          empty={!loading && !error && filtered.length === 0}
        />

        {!loading && !error && filtered.length > 0 && (
          <ProductList products={filtered} onAdd={addToCart} />
        )}
      </div>

      <CartSummary
        products={products}
        cart={cart}
        totals={totals}
        onDecrement={decrementItem}
        onReset={resetCart}
      />
    </div>
  );
}
