"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

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

  const [customerName, setCustomerName] =
    useState("");

  const [phone, setPhone] = useState("");

  const [address, setAddress] = useState("");

  const addToCart = (item: any) => {
    const existing = cart.find(
      (cartItem) => cartItem.id === item.id
    );

    if (existing) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...item,
          quantity: 1,
        },
      ]);
    }
  };

  const increaseQuantity = (id: number) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    if (
      !customerName ||
      !phone ||
      !address ||
      cart.length === 0
    ) {
      alert("Please fill all details");
      return;
    }

    const { error } = await supabase
      .from("orders")
      .insert([
        {
          customer_name: customerName,
          phone,
          address,
          items: cart,
          total,
          status: "Pending",
        },
      ]);

    if (error) {
      console.log(error);
      alert("Order failed");
    } else {
      alert("Order placed successfully!");

      setCart([]);
      setCustomerName("");
      setPhone("");
      setAddress("");
    }
  };

  const filteredItems = foodItems.filter((item) =>
    item.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="bg-black text-white p-5 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-orange-400">
          KusumSarovar
        </h1>

        <div>
          Cart Items: {cart.length}
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-orange-500 text-white py-16 text-center">
        <h2 className="text-5xl font-bold">
          Delicious Food Delivered Fast
        </h2>

        <p className="mt-4 text-xl">
          Fresh • Fast • Affordable
        </p>
      </section>
		{/* Owner Section */}
<section className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 mt-10 flex flex-col md:flex-row items-center gap-8">

 <img
  src="/owner.jpg.jpg"
  alt="Owner"
  className="w-64 h-64 object-cover rounded-full border-4 border-orange-500"
/>

  <div>
    <h2 className="text-4xl font-bold text-orange-500">
      Welcome to KusumSarovar
    </h2>

    <p className="mt-4 text-lg text-gray-700 leading-8">
      Serving delicious food with love, tradition,
      and authentic taste.
    </p>

    <p className="mt-4 text-gray-500">
      Family owned • Fresh ingredients • Fast delivery
    </p>
  </div>

</section>
      {/* Search */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <input
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-4 rounded-xl border text-lg"
        />
      </div>

      {/* Food Items */}
      <section className="max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-56 w-full object-cover"
            />

            <div className="p-4">
              <h3 className="text-2xl font-bold">
                {item.name}
              </h3>

              <p className="text-gray-600 mt-2">
                ₹{item.price}
              </p>

              <button
                onClick={() => addToCart(item)}
                className="mt-4 bg-black text-white px-4 py-2 rounded-lg w-full"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Cart */}
      <section className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 mt-10 mb-10">
        <h2 className="text-3xl font-bold mb-6">
          Your Cart
        </h2>

        {cart.length === 0 ? (
          <p>No items added.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b py-4"
              >
                <div>
                  <h3 className="font-semibold text-lg">
                    {item.name}
                  </h3>

                  <p>
                    ₹{item.price} × {item.quantity}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      decreaseQuantity(item.id)
                    }
                    className="bg-red-500 text-white px-3 py-1 rounded-lg"
                  >
                    -
                  </button>

                  <span className="text-xl font-bold">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      increaseQuantity(item.id)
                    }
                    className="bg-green-600 text-white px-3 py-1 rounded-lg"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}

            <h3 className="text-3xl font-bold mt-6">
              Total: ₹{total}
            </h3>

            {/* Customer Form */}
            <div className="mt-8 flex flex-col gap-4">
              <input
                type="text"
                placeholder="Customer Name"
                value={customerName}
                onChange={(e) =>
                  setCustomerName(e.target.value)
                }
                className="border p-4 rounded-lg"
              />

              <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
                className="border p-4 rounded-lg"
              />

              <textarea
                placeholder="Delivery Address"
                value={address}
                onChange={(e) =>
                  setAddress(e.target.value)
                }
                className="border p-4 rounded-lg"
              />

              <button
                onClick={placeOrder}
                className="bg-green-600 text-white py-4 rounded-xl text-xl font-bold"
              >
                Place Order
              </button>
            </div>
          </>
        )}
      </section>

    </main>
  );
}