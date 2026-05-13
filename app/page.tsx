"use client";

import { useState } from "react";

const foodItems = [
  {
    id: 1,
    name: "Burger",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
  },
  {
    id: 2,
    name: "Pizza",
    price: 250,
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591",
  },
  {
    id: 3,
    name: "Pasta",
    price: 180,
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9",
  },
];

export default function Home() {
  const [cart, setCart] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const addToCart = (item: any) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (index: number) => {
    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const filteredItems = foodItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-5xl font-bold text-center mb-8 text-orange-600">
        KusumSarovar
      </h1>

      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-3 rounded-lg w-full max-w-md"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-56 w-full object-cover"
            />

            <div className="p-4">
              <h2 className="text-2xl font-semibold">
                {item.name}
              </h2>

              <p className="text-lg text-gray-600 mt-2">
                ₹{item.price}
              </p>

              <button
                onClick={() => addToCart(item)}
                className="mt-4 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-4">
          Cart
        </h2>

        {cart.length === 0 ? (
          <p>No items added.</p>
        ) : (
          <>
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b py-3"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p>₹{item.price}</p>
                </div>

                <button
                  onClick={() => removeFromCart(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg"
                >
                  Remove
                </button>
              </div>
            ))}

            <h3 className="text-2xl font-bold mt-4">
              Total: ₹{total}
            </h3>

            <button className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
              Checkout
            </button>
          </>
        )}
      </div>
    </main>
  );
}
