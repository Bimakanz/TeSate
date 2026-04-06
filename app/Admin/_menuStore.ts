// ── Shared in-memory store untuk sinkronisasi Atmin ↔ Menu ──────
// Module-level variable bertahan selama sesi app (tidak ter-reset saat navigasi)

export type MenuCategory = 'Makanan' | 'Minuman' | 'Snack'

export interface MenuItem {
    id: number
    name: string
    description: string
    price: string
    stock: string
    cookTime: string
    category: MenuCategory
}

let _store: MenuItem[] = []

export const getMenuStore = (): MenuItem[] => _store
export const setMenuStore = (list: MenuItem[]): void => { _store = [...list] }
