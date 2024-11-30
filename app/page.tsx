"use client"
import { useState } from "react";

export default function Home() {
  const [address, setAddress] = useState("");
  const [transactions, setTransactions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTransactions = async () => {
    setLoading(true);
    setError("");
    setTransactions(null);

    try {
      const response = await fetch("https://transaction-backend-j89w.onrender.com/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch transactions.");
      }

      const data = await response.json();
      setTransactions(data);
    } catch (err) {
      setError((err as Error).message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          💳 Blockchain Transactions Viewer
        </h1>
        <p className="text-gray-600 text-center mt-2">
          Enter an Ethereum address to retrieve transaction details.
        </p>

        <div className="mt-6 flex gap-4">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter Ethereum Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <button
            onClick={fetchTransactions}
            disabled={loading}
            className={`px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
              }`}
          >
            {loading ? "Fetching..." : "Submit"}
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-center mt-4">{error}</p>
        )}

        {transactions && (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              📝 Transaction Details:
            </h2>
            <pre className="text-sm bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
              {JSON.stringify(transactions, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
