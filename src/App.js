import React, { useEffect, useState } from 'react';
import './index.css';


const FruitCard = ({ name, price, title, link, thumbnail }) => (
  <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center text-center">
    {/* <img src={thumbnail} alt={name} className="h-32 w-32 object-cover rounded-xl mb-4" /> */}
    <h2 className="text-xl font-bold capitalize">{name}</h2>
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-lg text-green-600 font-semibold mt-2">{price}</p>
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 text-sm mt-2 hover:underline"
    >
      View on Walmart →
    </a>
  </div>
);

const App = () => {
  const [fruits, setFruits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortKey, setSortKey] = useState('name');

  useEffect(() => {
    fetch('http://localhost:3001/api/prices')
      .then(res => res.json())
      .then(data => {
        setFruits(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch prices:', err);
        setLoading(false);
      });
  }, []);

  const sortedFruits = [...fruits].sort((a, b) => {
    if (sortKey === 'price') {
      const priceA = parseFloat(a.price.replace('$', '')) || Infinity;
      const priceB = parseFloat(b.price.replace('$', '')) || Infinity;
      return priceA - priceB;
    }
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-yellow-100 p-6">
      <div className="bg-red-500 text-white p-4 rounded-xl">Tailwind is working!</div>

      <h1 className="text-4xl font-extrabold text-center mb-8 text-green-700">La Fruta 🍉</h1>
      <div className="bg-red-500 text-white p-4 rounded-xl">Tailwind is working!</div>

      <div className="max-w-4xl mx-auto mb-6 flex justify-end">
        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
          className="border border-gray-300 rounded-md p-2 text-sm"
        >
          <option value="name">Sort by Name (A–Z)</option>
          <option value="price">Sort by Price (Low to High)</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Loading prices...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {sortedFruits.map((fruit) => (
            <FruitCard key={fruit.name} {...fruit} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
