"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

// Example blog data
const blogs = [
  {
    id: 1,
    title: "How to Become a Verified Fleet Agent in Portugal",
    excerpt: "Learn step by step how to register, get verified, and start earning as a delivery agent.",
    category: "Tips",
    image: "/blog1.jpg",
  },
  {
    id: 2,
    title: "Top 5 Fleet Management Tools You Should Use",
    excerpt: "Manage your delivery boys efficiently with these top tools used by pros.",
    category: "Fleet Management",
    image: "/blog2.jpg",
  },
  {
    id: 3,
    title: "Success Stories: Agents Making €2000+ Per Month",
    excerpt: "Get inspired by our verified agents achieving impressive earnings.",
    category: "Success",
    image: "/blog3.jpg",
  },
  {
    id: 4,
    title: "Understanding Portuguese Delivery Regulations",
    excerpt: "Avoid fines and legal issues by following these essential rules.",
    category: "Tips",
    image: "/blog4.jpg",
  },
  {
    id: 5,
    title: "How to Monitor Your Delivery Boys Effectively",
    excerpt: "Track performance and ensure timely deliveries with these techniques.",
    category: "Fleet Management",
    image: "/blog5.jpg",
  },
  {
    id: 6,
    title: "Weekly Payouts Explained for Agents",
    excerpt: "Everything you need to know about how and when you get paid.",
    category: "Tips",
    image: "/blog6.jpg",
  },
  {
    id: 7,
    title: "Building Your Fleet Reputation Fast",
    excerpt: "Increase trust and ratings among customers and delivery boys.",
    category: "Success",
    image: "/blog7.jpg",
  },
  {
    id: 8,
    title: "Advanced Fleet Management Strategies",
    excerpt: "Optimize routes, manage schedules, and boost profits.",
    category: "Fleet Management",
    image: "/blog8.jpg",
  },
];

// Animation variants
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, type: "spring", stiffness: 120 },
  }),
};

export default function BlogPage() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Tips", "Fleet Management", "Success"];

  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter((b) => b.category === selectedCategory);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-linear-to-tr from-[#FFE0F4] to-[#FFF5F8] py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#DC3173]">
            {t("blog_header")}
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto">
            {t("blog_desc")}
          </p>
        </div>

        {/* Hero animated blob */}
        <div className="absolute -bottom-16 left-1/4 w-80 h-80 rounded-full bg-[#DC3173]/10 blur-3xl animate-blob"></div>
        <div className="absolute -top-16 right-1/4 w-96 h-96 rounded-full bg-[#DC3173]/20 blur-3xl animate-blob animation-delay-2000"></div>
      </section>

      {/* Filter Tags */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mt-12">
        <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full font-semibold transition-all ${selectedCategory === cat
                  ? "bg-[#DC3173] text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-[#DC3173]/10 hover:text-[#DC3173]"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog, i) => (
            <motion.div
              key={blog.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              className="relative rounded-2xl overflow-hidden bg-white shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="relative h-56 sm:h-64 w-full">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-80"></div>
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold uppercase text-[#DC3173]">{blog.category}</span>
                <h2 className="mt-2 text-xl font-bold text-gray-900 group-hover:text-[#DC3173] transition-colors">
                  {blog.title}
                </h2>
                <p className="mt-2 text-gray-700 text-sm line-clamp-3">{blog.excerpt}</p>
                <Link
                  href={`/blog/${blog.id}`}
                  className="inline-flex items-center gap-2 mt-4 text-[#DC3173] font-semibold hover:gap-3 transition-all"
                >
                  Read More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <style jsx>{`
        .animate-blob {
          animation: blob 8s ease-in-out infinite;
        }
        @keyframes blob {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-18px) scale(1.05);
          }
        }
      `}</style>
    </main>
  );
}
