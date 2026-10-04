"use client";

import { useCart } from "@/components/cart/CartProvider";
import { useEffect } from "react";

// Rendered on the success page so a paid cart doesn't come back.
export default function ClearCart() {
  const { clear } = useCart();
  useEffect(() => clear(), [clear]);
  return null;
}
