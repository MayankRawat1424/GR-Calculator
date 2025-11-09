"use client";
import React, { useState } from "react";
import ResultsTable from "./ResultTable";

const Calculator = () => {
  const constants = { Mc: 3.4 };
  const alloys = {
    "45KH": { Ms: 19.6, density: 7190, C: 3.4 },
    "40CrMnSiMoV": { Ms: 17.64, density: 7190, C: 3.74 },
  };

  const [results, setResults] = useState([]);

  const handleCalculate = (alloy, t_nm, d_nm) => {
    const t = parseFloat(t_nm);
    const d = parseFloat(d_nm);
    const { Ms, C } = alloys[alloy];

    // 1️⃣ Gurney velocity (m/s)
    const vf = 2830 * Math.pow(Ms / constants.Mc + 0.5, -0.5);

    // 2️⃣ Fragment size ratio
    const fragmentSize = d / t;

    // 3️⃣ Efficiency = C / Ms
    const efficiency = C / Ms;

    const result = {
      id: Date.now(),
      alloy,
      Ms,
      C,
      vf: vf.toFixed(3),
      fragmentSize: fragmentSize.toFixed(3),
      efficiency: efficiency.toFixed(3),
      t,
      d,
    };

    setResults((prev) => [...prev, result]);
  };

  return (
    <div className="flex flex-col items-center my-10 font-mono w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] mx-auto transition-all">
      <div className="bg-white shadow-lg p-4 sm:p-6 md:p-8 rounded-lg w-full">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-6 text-center">
          Gurney Velocity & Fragment Efficiency Calculator
        </h1>

        {/* Calculator Form */}
        <CalculatorForm onCalculate={handleCalculate} alloys={alloys} />

        {/* Results Table */}
        <ResultsTable results={results} setResults={setResults} />
      </div>
    </div>
  );
};

const CalculatorForm = ({ onCalculate, alloys }) => {
  const [alloy, setAlloy] = useState("");
  const [t_nm, setTnm] = useState("");
  const [d_nm, setDnm] = useState("");

  const handleSubmit = () => {
    if (!alloy || !t_nm || !d_nm) {
      alert("Please fill all fields.");
      return;
    }
    onCalculate(alloy, t_nm, d_nm);
    setAlloy("");
    setTnm("");
    setDnm("");
  };

  return (
    <>
      <div className="mb-4">
        <label className="block mb-2 font-semibold text-sm sm:text-base">
          Select Alloy
        </label>
        <select
          value={alloy}
          onChange={(e) => setAlloy(e.target.value)}
          className="w-full p-2 sm:p-3 border rounded mb-2 focus:ring focus:ring-blue-200"
        >
          <option value="">-- Choose Alloy --</option>
          {Object.keys(alloys).map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold text-sm sm:text-base">
          Internal Diameter (d, nm)
        </label>
        <input
          type="number"
          value={d_nm}
          onChange={(e) => setDnm(e.target.value)}
          className="w-full p-2 sm:p-3 border rounded mb-2 focus:ring focus:ring-blue-200"
          placeholder="e.g., 50000"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-semibold text-sm sm:text-base">
          Wall Thickness (t, nm)
        </label>
        <input
          type="number"
          value={t_nm}
          onChange={(e) => setTnm(e.target.value)}
          className="w-full p-2 sm:p-3 border rounded focus:ring focus:ring-blue-200"
          placeholder="e.g., 1000"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 sm:py-3 rounded hover:bg-blue-700 transition text-sm sm:text-base"
      >
        Add Result
      </button>
    </>
  );
};

export default Calculator;
