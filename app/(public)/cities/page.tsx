"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface City {
  name: string;
  x: number;
  y: number;
  region: string;
}

const cities: City[] = [
  { name: "Lisbon", x: 45, y: 80, region: "South" },
  { name: "Porto", x: 45, y: 20, region: "North" },
  { name: "Coimbra", x: 42, y: 45, region: "Central" },
  { name: "Funchal", x: 80, y: 90, region: "Islands" },
  { name: "Faro", x: 55, y: 95, region: "South" },
  { name: "Braga", x: 43, y: 12, region: "North" },
  { name: "Aveiro", x: 45, y: 35, region: "Central" },
  { name: "Évora", x: 50, y: 70, region: "South" },
  { name: "Setúbal", x: 47, y: 85, region: "South" },
  { name: "Madeira", x: 85, y: 95, region: "Islands" },
];

const regionColors: Record<string, string> = {
  South: "#10B981",
  North: "#FBBF24",
  Central: "#3B82F6",
  Islands: "#8B5CF6",
  Lisbon: "#DC3173",
};

export default function PortugalFleetMap() {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  return (
    <section className="relative bg-gray-900 text-white py-20 px-6 lg:px-20 overflow-hidden">
      {/* Background gradient blobs */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-[#DC3173]/20 blur-3xl top-[-10%] left-[-10%]"
        animate={{ y: [0, 20, 0], x: [0, 20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-[#3B82F6]/20 blur-3xl bottom-[-20%] right-[-15%]"
        animate={{ y: [0, -20, 0], x: [0, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-center z-10 relative">
        Our Fleet/Agent Network Across Portugal
      </h2>

      <div className="relative w-full max-w-7xl mx-auto aspect-[2/1] bg-gray-800 rounded-3xl overflow-hidden z-10">
        <motion.svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          {/* Map base */}
          <motion.path
            d="M10,10 L90,10 L90,90 L10,90 Z"
            fill="#1F2937"
            stroke="#374151"
            strokeWidth={0.5}
          />
          {/* Lines */}
          {cities.map((city, idx) =>
            city.name !== "Lisbon" ? (
              <motion.line
                key={city.name}
                x1={45}
                y1={80}
                x2={city.x}
                y2={city.y}
                stroke={regionColors[city.region]}
                strokeWidth={0.3}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: idx * 0.2 }}
              />
            ) : null
          )}
          {/* Moving dots along lines */}
          {cities.map((city, idx) =>
            city.name !== "Lisbon" ? (
              <motion.circle
                key={"dot-" + city.name}
                r={0.8}
                fill={regionColors[city.region]}
                animate={{
                  cx: [45, city.x],
                  cy: [80, city.y],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 3 + idx * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ) : null
          )}
          {/* City markers */}
          {cities.map((city) => (
            <motion.circle
              key={city.name}
              cx={city.x}
              cy={city.y}
              r={hoveredCity === city.name ? 2.5 : 2}
              fill={regionColors[city.name === "Lisbon" ? "Lisbon" : city.region]}
              className="cursor-pointer"
              whileHover={{ scale: 2 }}
              onMouseEnter={() => setHoveredCity(city.name)}
              onMouseLeave={() => setHoveredCity(null)}
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </motion.svg>

        {/* Tooltip */}
        {hoveredCity && (
          <motion.div
            className="absolute bg-gray-800/95 text-white px-3 py-2 rounded-lg shadow-xl text-sm pointer-events-none"
            style={{
              left: `${cities.find((c) => c.name === hoveredCity)!.x}%`,
              top: `${cities.find((c) => c.name === hoveredCity)!.y}%`,
              transform: "translate(-50%, -120%)",
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            {hoveredCity}
          </motion.div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm md:text-base z-10 relative">
        {Object.entries(regionColors).map(([region, color]) => (
          <div key={region} className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full inline-block" style={{ backgroundColor: color }} />
            {region}
          </div>
        ))}
      </div>
    </section>
  );
}
