"use client";
import React, { useState } from "react";
import ResultVisualizer from "./ResultVisualizer";

const ResultsTable = ({ results, setResults }) => {
  const [selectedIds, setSelectedIds] = useState([]);

  const handleDelete = (id) => {
    setResults(results.filter((r) => r.id !== id));
    setSelectedIds(selectedIds.filter((sid) => sid !== id));
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const selectedResults = results.filter((r) => selectedIds.includes(r.id));

  return (
    <div className="mt-8 w-full">
      <h2 className="text-xl font-semibold mb-4 text-center">Saved Results</h2>

      {results.length === 0 ? (
        <p className="text-center text-gray-500">No results yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-800">
                <th className="p-2 border">Select</th>
                <th className="p-2 border">Alloy</th>
                <th className="p-2 border">Ms (kg)</th>
                <th className="p-2 border">C (kg)</th>
                <th className="p-2 border">vf (m/s)</th>
                <th className="p-2 border">Fragment Size (d/t)</th>
                <th className="p-2 border">Efficiency (C/Ms)</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={r.id} className="text-center">
                  <td className="border p-2">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(r.id)}
                      onChange={() => toggleSelect(r.id)}
                    />
                  </td>
                  <td className="border p-2">{r.alloy}</td>
                  <td className="border p-2">{r.Ms}</td>
                  <td className="border p-2">{r.C}</td>
                  <td className="border p-2">{r.vf}</td>
                  <td className="border p-2">{r.fragmentSize}</td>
                  <td className="border p-2 font-semibold text-green-600">
                    {r.efficiency}
                  </td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleDelete(r.id)}
                      className="text-red-600 hover:text-red-800 font-semibold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedResults.length >= 1 && (
        <div className="mt-6">
          <ResultVisualizer results={selectedResults} />
        </div>
      )}
    </div>
  );
};

export default ResultsTable;
