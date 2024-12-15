import React from 'react';
import { useEffect, useState } from 'react';
import { fetchUsers } from "../../src/api/users"




export default function Products() {
  const [Products, SetProduct] = useState([]);
  const [Loader, SetLoader] = useState(true);
  const [Error, SetError] = useState(false);


  const fetproduct = async () => {
    try {
      const data = await fetchUsers(); // Ensure this function works
      SetProduct(data);
    } catch (err) {
      SetError(err.message || "An error occurred.");
    } finally {
      SetLoader(false);
    }
  };

  useEffect(() => { fetproduct() }, []);

  if (Loader) { return (<h1>Loader....</h1>) };
  if (Error) { return (<h1>Error: {Error}</h1>) };
  if (!Products) { return (<h1>No  Product Fount .....</h1>) }

  return (
    <>
      <div>
        <div className="p-6">
          {Products.length > 0 ? (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {Products.map((product) => (
                <div
                  key={product.uuid}
                  className="p-5 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <h2 className="text-lg font-bold text-gray-800 mb-3">
                    {product.name}
                  </h2>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>
                      <span className="font-medium text-gray-700">Role:</span> {product.role}
                    </li>
                    <li>
                      <span className="font-medium text-gray-700">Email:</span> {product.email}
                    </li>
                    <li>
                      <span className="font-medium text-gray-700">Address:</span> {product.address}
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No products available.</p>
          )}
        </div>

      </div>
    </>
  )
}
