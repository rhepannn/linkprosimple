"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  Package,
  Check,
  SlidersHorizontal
} from "lucide-react";
import { useCartStore } from "@/lib/store/useCartStore";
import { createClient } from "@/lib/supabase/client";
import { getProducts } from "@/app/actions/products";

interface Product {
  id: string;
  name: string;
  price: number;
  isActive: boolean;
  image: string | null;
  stock: number;
  category: {
    name: string;
  };
}

export default function ProductGrid({ onSelect }: { onSelect?: () => void }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");
  const { addItem, items } = useCartStore();

  const supabase = createClient();

  useEffect(() => {
    fetchProducts();

    const channel = supabase
      .channel("products-grid")
      .on("postgres_changes", { event: "*", schema: "public", table: "products" }, () => fetchProducts())
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  async function fetchProducts() {
    setLoading(true);
    try {
      const res = await getProducts(false);
      if (res.success && res.data) {
        const transformed: Product[] = res.data.map((p: any) => ({
          ...p,
          isActive: true,
          stock: p.stock || 0,
          category: { name: p.category }
        }));
        setProducts(transformed);
      } else {
        const { data: rawData, error } = await supabase
          .from("products")
          .select(`id, name, price, isActive, image, stock, category:categories(name)`)
          .eq("isActive", true);
        if (!error) {
          const transformed: Product[] = (rawData as any[] || []).map((p) => ({
            ...p,
            category: Array.isArray(p.category) ? p.category[0] : (p.category || { name: "Umum" })
          }));
          setProducts(transformed);
        }
      }
    } catch (err) {
      console.error("Error fetch products:", err);
    } finally {
      setLoading(false);
    }
  }

  const categories = ["Semua", ...Array.from(new Set(products.map((p) => p.category?.name).filter(Boolean)))];
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "Semua" || p.category?.name === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-5">
      {/* ── Controls Bar ── */}
      <div className="flex flex-col md:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1 group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#C88A58] transition-colors"
            size={16}
          />
          <input
            type="text"
            placeholder="Cari paket studio..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-[#3B2211]/8 rounded-xl text-sm text-[#3B2211] placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C88A58]/20 focus:border-[#C88A58]/30 transition-all shadow-sm"
          />
        </div>
      </div>

      {/* ── Product Grid ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        <AnimatePresence mode="popLayout">
          {loading ? (
            Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[4/5] bg-white animate-pulse rounded-2xl border border-[#3B2211]/5 shadow-sm"
              />
            ))
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
              const inCart = items.find((item) => item.id === product.id);
              const cartItem = items.find((item) => item.id === product.id);

              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -3 }}
                  onClick={() => {
                    addItem({ id: product.id, name: product.name, price: product.price, qty: 1 });
                    if (onSelect) onSelect();
                  }}
                  className={`group bg-white rounded-2xl border shadow-sm hover:shadow-lg transition-all cursor-pointer overflow-hidden relative ${
                    inCart
                      ? "border-[#C88A58]/30 shadow-[#C88A58]/10"
                      : "border-[#3B2211]/5 hover:border-[#3B2211]/15"
                  }`}
                >
                  {/* In-Cart Badge */}
                  {inCart && (
                    <div className="absolute top-3 right-3 z-10">
                      <div className="w-7 h-7 bg-[#C88A58] text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white text-[9px] font-black">
                        {cartItem?.qty}
                      </div>
                    </div>
                  )}

                  {/* Image Area */}
                  <div className="aspect-square bg-[#F8F6F4] flex items-center justify-center relative overflow-hidden">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <Package size={36} className="text-[#3B2211]/10 group-hover:text-[#C88A58]/20 transition-colors" strokeWidth={1.5} />
                    )}
                    <div className="absolute inset-0 bg-[#3B2211]/0 group-hover:bg-[#3B2211]/3 transition-colors" />
                  </div>

                  {/* Info Area */}
                  <div className="p-4 space-y-2">
                    <div className="flex flex-col gap-0.5">
                      <h3 className="text-[12px] font-bold text-[#3B2211] leading-tight truncate group-hover:text-[#C88A58] transition-colors">
                        {product.name}
                      </h3>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <p className="text-sm font-black text-[#3B2211]">
                        Rp {product.price.toLocaleString("id-ID")}
                      </p>
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all shadow-sm ${
                          inCart
                            ? "bg-[#C88A58] text-white shadow-[#C88A58]/20"
                            : "bg-[#F8F6F4] text-[#3B2211]/30 group-hover:bg-[#3B2211] group-hover:text-white"
                        }`}
                      >
                        {inCart ? <Check size={14} strokeWidth={3} /> : <Plus size={14} />}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-full py-24 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 rounded-2xl bg-white border border-[#3B2211]/5 flex items-center justify-center text-[#3B2211]/10 shadow-sm">
                <Search size={32} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm font-black text-[#3B2211] uppercase tracking-widest">Produk Tidak Ditemukan</p>
                <p className="text-[11px] text-gray-400 font-medium mt-1">Coba kata kunci yang berbeda</p>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
