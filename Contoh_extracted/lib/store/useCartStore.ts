import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  image?: string;
  sku: string;
}

interface CartState {
  items: CartItem[];
  addItem: (product: any) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  referralCode: string | null;
  discount: number;
  discountType: "PERCENTAGE" | "FIXED";
  setReferral: (code: string | null, discount: number, type?: "PERCENTAGE" | "FIXED") => void;
  
  // New Booking Fields
  customerName: string;
  customerPhone: string;
  bookingDate: string;
  bookingTime: string;
  setCustomerInfo: (info: Partial<{ customerName: string; customerPhone: string; bookingDate: string; bookingTime: string }>) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      referralCode: null,
      discount: 0,
      discountType: "PERCENTAGE",
      customerName: "",
      customerPhone: "",
      bookingDate: "",
      bookingTime: "",
      setCustomerInfo: (info) => set((state) => ({ ...state, ...info })),
      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id);
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id ? { ...item, qty: item.qty + 1 } : item
              ),
            };
          }
          return { items: [...state.items, { ...product, qty: 1 }] };
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        })),
      updateQty: (productId, qty) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId ? { ...item, qty: Math.max(0, qty) } : item
          ).filter(item => item.qty > 0),
        })),
      clearCart: () => set({ 
        items: [], 
        referralCode: null, 
        discount: 0, 
        discountType: "PERCENTAGE",
        customerName: "",
        customerPhone: "",
        bookingDate: "",
        bookingTime: ""
      }),
      setReferral: (code, discount, type = "PERCENTAGE") => set({ referralCode: code, discount, discountType: type }),
    }),
    {
      name: "pos-cart-storage",
    }
  )
);
