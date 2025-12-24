"use client";

import Link from "next/link";

export default function CTASectionUnique() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-tr from-[#FFE0F4] via-[#FFF0F8] to-[#FFF5FA] py-28">
      {/* Floating animated shapes */}
      <div className="absolute top-0 left-1/4 w-36 h-36 rounded-full bg-[#DC3173]/20 blur-3xl animate-floatSlow"></div>
      <div className="absolute top-1/2 right-1/4 w-48 h-48 rounded-full bg-[#DC3173]/10 blur-3xl animate-floatSlow delay-1500"></div>
      <div className="absolute bottom-0 left-1/3 w-28 h-28 rounded-full bg-[#DC3173]/30 blur-2xl animate-floatSlow delay-3000"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-black">
          Ready to Join the Network?
        </h2>
        <p className="mt-4 text-gray-700 sm:text-lg md:text-xl max-w-2xl mx-auto">
          Become a verified delivery boy agent and start managing your network with flexible hours, weekly payouts, and full support.
        </p>

        <div className="mt-10 flex justify-center gap-4 flex-wrap">
          <Link
            href="/become-agent"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#DC3173] text-white text-lg font-semibold shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Sign Up Now
          </Link>

          <Link
            href="/learn-more"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-[#DC3173] text-[#DC3173] text-lg font-semibold hover:bg-[#DC3173]/10 transition-all duration-300"
          >
            Learn More
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-16px); }
        }
        .animate-floatSlow {
          animation: floatSlow 8s ease-in-out infinite;
        }
        .delay-1500 {
          animation-delay: 1.5s;
        }
        .delay-3000 {
          animation-delay: 3s;
        }
      `}</style>
    </section>
  );
}
