"use client";

import { ArrowRight, Info } from "lucide-react";
import Link from "next/link";

export default function AgentHeroBackground() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Decorative gradient blobs */}
      <div className="absolute inset-0 -z-10">
        <div
          aria-hidden
          className="absolute top-[-10%] left-[-10%] w-72 h-72 rounded-full bg-[#DC3173] opacity-10 blur-3xl animate-blob"
        />
        <div
          aria-hidden
          className="absolute bottom-[-10%] right-[-10%] w-96 h-96 rounded-full bg-[#DC3173] opacity-8 blur-3xl animate-blob animation-delay-2000"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-10">
          {/* Left: Text content */}
          <div className="md:col-span-7 lg:col-span-6">
            <div className="max-w-xl">
              <p className="inline-flex items-center gap-2 text-sm font-medium uppercase text-[#DC3173] tracking-wider mb-4">
                <span className="rounded-full bg-[#DC3173]/10 px-3 py-1 text-[#DC3173]">
                  Partner
                </span>
                <span className="text-gray-500">Trusted</span>
              </p>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-black">
                Join Our{" "}
                <span className="text-[#DC3173]">Delivery Network</span> in
                Portugal
              </h1>

              <p className="mt-6 text-lg text-gray-700">
                Become a verified delivery boy agent and start working today.
                Access a reliable platform, steady earnings, and tools to manage
                your deliveries efficiently.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3">
                <Link
                  href="/become-agent"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#DC3173] text-white font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#DC3173]/30"
                >
                  Register Now
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/learn-more"
                  className="inline-flex items-center gap-2 justify-center px-5 py-3 rounded-full border border-gray-300 text-gray-800 bg-white hover:bg-gray-100 transition-colors duration-200"
                >
                  <Info className="w-4 h-4 text-gray-600" />
                  Learn More
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#DC3173]/20 flex items-center justify-center font-bold text-[#DC3173] text-lg">
                    ★
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">4.8/5</div>
                    <div className="text-md">Agent satisfaction</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#DC3173]/20 flex items-center justify-center font-bold text-[#DC3173] text-lg">
                    ✓
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      Verified partners
                    </div>
                    <div className="text-md">Background checked</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Decorative illustration block */}
          <div className="md:col-span-5 lg:col-span-6 flex items-center justify-center">
            <div className="w-full max-w-lg p-8 rounded-3xl bg-white shadow-2xl border border-gray-200 hover:shadow-11xl transition-shadow duration-300">
              {/* Animated Illustration */}
              <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-gradient-to-tr from-[#FFC0D9] via-[#FFE6F0] to-[#FFD1E8] flex items-center justify-center">
                <svg viewBox="0 0 240 140" fill="none" className="w-72 h-48">
                  {/* Base rectangle */}
                  <rect
                    x="0"
                    y="30"
                    width="240"
                    height="80"
                    rx="18"
                    fill="#fff"
                  />

                  <g transform="translate(12,36)" className="animate-float">
                    <rect
                      x="0"
                      y="4"
                      width="120"
                      height="45"
                      rx="8"
                      fill="#fbb4c7"
                    />{" "}
                    {/* left card */}
                    <rect
                      x="125"
                      y="4"
                      width="120"
                      height="45"
                      rx="8"
                      fill="#e6e6e6"
                    />{" "}
                    {/* right card, slightly gray for contrast */}
                    <circle cx="32" cy="65" r="14" fill="#e6e6e6" />{" "}
                    {/* left wheel */}
                    <circle cx="218" cy="65" r="14" fill="#fbb4c7" />{" "}
                    {/* right wheel */}
                  </g>

                  {/* Decorative arcs */}
                  <path
                    d="M28 30 C40 10, 80 10, 100 30"
                    stroke="#DC3173"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="animate-pulseStroke"
                  />
                  <path
                    d="M130 30 C150 10, 190 10, 212 30"
                    stroke="#ff8fb6"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="animate-pulseStroke delay-2000"
                  />
                </svg>
              </div>

              {/* Hero Text & CTA */}
              <div className="mt-6 text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black">
                  Start Earning Fast
                </h2>
                <p className="mt-2 text-gray-700 text-xs sm:text-sm md:text-base">
                  Flexible hours • weekly payouts • Support in Portugal
                </p>

                <div className="mt-6">
                  <Link
                    href="/signup"
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#DC3173] text-white font-bold text-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200"
                  >
                    Register Now
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>

              <style jsx>{`
                @keyframes float {
                  0%,
                  100% {
                    transform: translateY(0px);
                  }
                  50% {
                    transform: translateY(-8px);
                  }
                }
                .animate-float {
                  animation: float 2s ease-in-out infinite;
                }
                @keyframes pulseStroke {
                  0%,
                  100% {
                    stroke-opacity: 1;
                  }
                  50% {
                    stroke-opacity: 0.6;
                  }
                }
                .animate-pulseStroke {
                  animation: pulseStroke 1s ease-in-out infinite;
                }
                .delay-2000 {
                  animation-delay: 1s;
                }
              `}</style>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
