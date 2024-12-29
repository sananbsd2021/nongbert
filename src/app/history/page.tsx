'use client'
import React, { useState, useEffect } from 'react';

interface History {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
}

async function fetchHistories(): Promise<History[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
  const res = await fetch(`${baseUrl}/api/history`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch histories');
  }

  const data = await res.json();
  return data.data;
}

export default function HistoriesListPage() {
  const [historiesList, setHistoriesList] = useState<History[]>([]);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getHistories = async () => {
      try {
        const histories = await fetchHistories();
        setHistoriesList(histories);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      // } finally {
      //   setLoading(false);
      }
    };

    getHistories();
  }, []);

  // if (loading) {
  //   return (
  //     <div className="container mx-auto p-4">
  //       <h1
  //         className="rounded text-xl font-bold mb-6 bg-blue-600 p-2 mx-auto flex justify-center text-white"
  //         role="status"
  //       >
  //         Loading...
  //       </h1>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="container mx-auto p-4">
  //       <h1
  //         className="rounded text-xl font-bold mb-6 bg-red-600 p-2 mx-auto flex justify-center text-white"
  //         role="alert"
  //       >
  //         {error}
  //       </h1>
  //     </div>
  //   );
  // }

  // if (historiesList.length === 0) {
  //   return (
  //     <div className="container mx-auto p-4">
  //       <h1
  //         className="rounded text-xl font-bold mb-6 bg-yellow-600 p-2 mx-auto flex justify-center text-white"
  //         role="alert"
  //       >
  //         No histories available
  //       </h1>
  //     </div>
  //   );
  // }

  return (
    <div className="mx-auto p-4">
      <h1
        className="rounded text-xl font-bold mb-6 bg-blue-600 p-2 mx-auto flex justify-center text-white"
        aria-label="School Histories"
      >
        ประวัติโรงเรียน
      </h1>
      <div className="grid gap-6">
        {historiesList.map((history) => (
          <div
            key={history._id}
            className="bg-gray-100 hover:bg-gray-200 border border-gray-300 shadow-md rounded-lg p-6"
          >
            {/* <h2 className="text-3xl font-bold mt-4 text-center">{history.title}</h2> */}
            <p className="text-gray-600 mb-4">{history.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
