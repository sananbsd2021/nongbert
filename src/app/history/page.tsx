"use client";

import { useState, useEffect } from "react";

export default function SchoolHistory() {
  const [histories, setHistories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistories = async () => {
      try {
        const res = await fetch("/api/history");
        const data = await res.json();
        if (data.success) {
          setHistories(data.data);
        } else {
          setError(data.message || "Failed to fetch data.");
        }
      } catch (err) {
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistories();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">ประวัติโรงเรียน</h1>
      <div className="space-y-4">
        {histories.map((history) => (
          <div key={history._id} className="p-4 border rounded shadow">
            <h2 className="text-2xl font-bold mb-2">{history.title}</h2>
            <p>{history.description}</p>
            <p className="text-sm text-gray-500">Added on: {new Date(history.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
