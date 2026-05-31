"use client";

import React from "react";
import ProductManagement from "@/components/pos/ProductManagement";
import { motion } from "framer-motion";

export default function CatalogPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-full max-w-[1400px] mx-auto"
    >
      <ProductManagement hideHeader={false} />
    </motion.div>
  );
}
