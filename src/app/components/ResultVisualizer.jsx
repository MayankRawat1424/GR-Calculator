"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const ResultVisualizer = ({ results }) => {
  const [restartKey, setRestartKey] = useState(0);

  if (!results || results.length === 0) return null;

  // Efficiency range
  const efficiencies = results.map((r) => parseFloat(r.efficiency));
  const minEff = Math.min(...efficiencies);
  const maxEff = Math.max(...efficiencies);

  // Velocity range
  const velocities = results.map((r) => parseFloat(r.vf));
  const minVf = Math.min(...velocities);
  const maxVf = Math.max(...velocities);

  const getColor = (eff) => {
    const ratio = (eff - minEff) / (maxEff - minEff || 1);
    const red = Math.round(255 * (1 - ratio));
    const green = Math.round(255 * ratio);
    return `rgb(${red}, ${green}, 100)`;
  };

  const getSize = (eff) => {
    const ratio = (eff - minEff) / (maxEff - minEff || 1);
    return 60 + ratio * 80;
  };

  const handleRestart = () => setRestartKey((prev) => prev + 1);

  return (
    <div className="flex flex-col items-center mt-10 w-full max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Fragmentation Efficiency & Velocity Visualizer
      </h2>

      {/* Vertical Stack */}
      <div
        key={restartKey}
        className="flex flex-col items-center gap-10 p-6 bg-gray-100 rounded-lg shadow-inner w-full"
      >
        {results.map((r, index) => {
          const eff = parseFloat(r.efficiency);
          const vf = parseFloat(r.vf);

          // Animate line faster for higher velocities
          const duration = Math.max(
            1,
            5 - ((vf - minVf) / (maxVf - minVf || 1)) * 3
          );

          return (
            <motion.div
              key={r.id}
              className="flex flex-col items-center justify-center text-center space-y-3 bg-white shadow-md rounded-lg p-6 w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              {/* Efficiency Circle */}
              <motion.div
                className="rounded-full flex items-center justify-center text-white font-semibold shadow-md"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                  width: `${getSize(eff)}px`,
                  height: `${getSize(eff)}px`,
                  backgroundColor: getColor(eff),
                }}
              >
                {eff}
              </motion.div>

              {/* Info */}
              <div>
                <p className="text-sm font-medium text-gray-700">{r.alloy}</p>
                <p className="text-xs text-gray-500">
                  vf: {r.vf} m/s | d/t: {r.fragmentSize}
                </p>
              </div>

              {/* Velocity Line (spans entire card width) */}
              <div className="w-full mt-4">
                <p className="text-xs text-gray-600 mb-1 text-left">
                  Velocity Line
                </p>
                <div className="relative w-full h-2 bg-gray-200 rounded overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 h-2 bg-blue-500 rounded"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration,
                      ease: "easeInOut",
                    }}
                  />
                </div>
                <p className="text-xs text-blue-700 font-semibold mt-2 text-left">
                  {r.vf} m/s
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Restart Button */}
      <button
        onClick={handleRestart}
        className="mt-8 bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition"
      >
        Restart Animation
      </button>

      <p className="mt-3 text-xs text-gray-500 text-center">
        Circle color = Efficiency (Red → Green), size ∝ Efficiency magnitude.
        <br />
        Blue line = Gurney Velocity (vf), full width indicates container span.
      </p>
    </div>
  );
};

export default ResultVisualizer;
