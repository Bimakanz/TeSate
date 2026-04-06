import React, { createContext, useContext, useState } from 'react'

export interface CartItem {
    id: string
    title: string
    description: string
    price: number
    thumbnail: string
    category: string
    qty: number
}

interface CartContextValue {
    items: CartItem[]
    addItem: (product: Omit<CartItem, 'qty'>, qty: number) => void
    removeItem: (id: string) => void
    clearCart: () => void
    totalCount: number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])

    const addItem = (product: Omit<CartItem, 'qty'>, qtyToAdd: number) => {
        setItems((prev) => {
            const existing = prev.find((i) => i.id === product.id)
            if (existing) {
                return prev.map((i) =>
                    i.id === product.id ? { ...i, qty: i.qty + qtyToAdd } : i
                )
            }
            return [...prev, { ...product, qty: qtyToAdd }]
        })
    }

    const removeItem = (id: string) => {
        setItems((prev) => prev.filter((i) => i.id !== id))
    }

    const clearCart = () => setItems([])

    const totalCount = items.reduce((sum, i) => sum + i.qty, 0)

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, clearCart, totalCount }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const ctx = useContext(CartContext)
    if (!ctx) throw new Error('useCart harus dipakai di dalam CartProvider')
    return ctx
}
