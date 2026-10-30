import { useState } from "react";

const PRODUCTS = [
  { sku: "SO-100", name: "SentinelOps On-call Mug", price: 24 },
  { sku: "SO-200", name: "Self-Heal Hoodie", price: 64 },
  { sku: "SO-300", name: "Canary Cap", price: 34 },
];

export default function App() {
  const [cart, setCart] = useState<number>(0);

  return (
    <div className="min-h-screen">
      <header className="border-b border-navy-800 bg-navy-900 px-6 py-4">
        <h1 className="text-2xl font-bold text-white">
          SentinelOps <span className="text-gradient">Demo Shop</span>
        </h1>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-8">
        <p className="text-gray-400">Greenfield e-commerce demo that runs on the SentinelOps platform.</p>
        <div className="mt-6 grid max-w-4xl gap-4 sm:grid-cols-3">
          {PRODUCTS.map((p) => (
            <div key={p.sku} className="card">
              <h3 className="text-xl font-bold">{p.name}</h3>
              <p className="mt-2 text-sm text-gray-400">${p.price}</p>
              <button type="button" className="btn btn-primary btn-sm mt-4" onClick={() => setCart(cart + 1)}>
                Add to cart
              </button>
            </div>
          ))}
        </div>
        <div className="card mt-6 flex items-center justify-between">
          <p className="text-sm text-gray-300">Cart items: {cart}</p>
          <button type="button" className="btn btn-accent">
            Checkout
          </button>
        </div>
      </main>
    </div>
  );
}
