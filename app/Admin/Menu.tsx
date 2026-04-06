import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {
    FlatList,
    Modal,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ButtonPrimary from '../../components/ButtonPrimary'
import Card from '../../components/Card'
import TextInput from '../../components/TextInput'

// @ts-ignore
import KosongSvg from '@/assets/images/Kosong.svg'

import { MenuCategory, MenuItem, setMenuStore } from './_menuStore'

const PLACEHOLDER_IMAGE = require('@/assets/images/sateh1.png')

const CATEGORIES: MenuCategory[] = ['Makanan', 'Minuman', 'Snack']

// ── Helpers ───────────────────────────────────────────────────
const formatRupiah = (value: string): string => {
    const digits = value.replace(/\D/g, '')
    if (!digits) return ''
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

// ── Component ──────────────────────────────────────────────────
export default function Menu() {
    const router = useRouter()
    const params = useLocalSearchParams<{
        menuData: string
        activeCategory: string
    }>()

    // ── State ──────────────────────────────────────────────────
    const [menuList, setMenuList] = useState<MenuItem[]>(() => {
        try { return JSON.parse(params.menuData ?? '[]') }
        catch { return [] }
    })

    const [activeCategory, setActiveCategory] = useState<MenuCategory>(
        (params.activeCategory as MenuCategory) ?? 'Makanan'
    )

    // ── Sync ke shared store setiap kali menuList berubah ──────
    useEffect(() => {
        setMenuStore(menuList)
    }, [menuList])

    // ── Edit Modal ─────────────────────────────────────────────
    const [editVisible, setEditVisible] = useState(false)
    const [editItem, setEditItem] = useState<MenuItem | null>(null)
    const [editName, setEditName] = useState('')
    const [editDescription, setEditDescription] = useState('')
    const [editPrice, setEditPrice] = useState('')
    const [editNameError, setEditNameError] = useState('')
    const [editPriceError, setEditPriceError] = useState('')

    const filtered = menuList.filter((m) => m.category === activeCategory)

    // ── Handlers ───────────────────────────────────────────────
    const handleDelete = (id: number) => {
        setMenuList((prev) => prev.filter((m) => m.id !== id))
    }

    const handleOpenEdit = (item: MenuItem) => {
        setEditItem(item)
        setEditName(item.name)
        setEditDescription(item.description ?? '')
        setEditPrice(item.price)
        setEditNameError('')
        setEditPriceError('')
        setEditVisible(true)
    }

    const handleSaveEdit = () => {
        let hasError = false
        if (!editName.trim()) { setEditNameError('Nama tidak boleh kosong'); hasError = true }
        else setEditNameError('')
        if (!editPrice.trim()) { setEditPriceError('Harga tidak boleh kosong'); hasError = true }
        else setEditPriceError('')
        if (hasError || !editItem) return

        setMenuList((prev) =>
            prev.map((m) =>
                m.id === editItem.id
                    ? { ...m, name: editName.trim(), description: editDescription.trim(), price: editPrice.trim() }
                    : m
            )
        )
        setEditVisible(false)
    }

    // ── Render ─────────────────────────────────────────────────
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f7f7f7' }} edges={['top']}>

            {/* ── Header ── */}
            <View style={{ paddingHorizontal: 20, paddingVertical: 14, backgroundColor: '#fff' }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#1a1a1a' }}>
                    Sore, Cak Awih
                </Text>
            </View>

            {/* ── Category Tabs ── */}
            <View style={{
                flexDirection: 'row',
                gap: 10,
                paddingHorizontal: 20,
                paddingVertical: 12,
                backgroundColor: '#fff',
                marginBottom: 4,
            }}>
                {CATEGORIES.map((cat) => {
                    const isActive = cat === activeCategory
                    return (
                        <TouchableOpacity
                            key={cat}
                            onPress={() => setActiveCategory(cat)}
                            activeOpacity={0.8}
                            style={{
                                paddingVertical: 8,
                                paddingHorizontal: 20,
                                borderRadius: 20,
                                backgroundColor: isActive ? '#5CBB5C' : 'transparent',
                                borderWidth: isActive ? 0 : 1.5,
                                borderColor: '#5CBB5C',
                            }}
                        >
                            <Text style={{ color: isActive ? '#fff' : '#5CBB5C', fontWeight: '600', fontSize: 14 }}>
                                {cat}
                            </Text>
                        </TouchableOpacity>
                    )
                })}
            </View>

            {/* ── Content ── */}
            {filtered.length === 0 ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 }}>
                    <KosongSvg width={220} height={220} />
                    <Text style={{ marginTop: 16, fontSize: 16, fontWeight: '600', color: '#aaa', textAlign: 'center' }}>
                        Belum ada menu Mang !
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={filtered}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    extraData={menuList}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20, paddingTop: 8 }}
                    renderItem={({ item }) => (
                        <Card
                            title={item.name}
                            description={item.description || `Rp ${item.price}`}
                            price={`Rp ${item.price}`}
                            image={PLACEHOLDER_IMAGE}
                            onPress={() => handleOpenEdit(item)}
                            onEdit={() => handleOpenEdit(item)}
                            onDelete={() => handleDelete(item.id)}
                        />
                    )}
                />
            )}

            {/* ── Back Button ── */}
            <View style={{ paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#f0f0f0', backgroundColor: '#fff' }}>
                <ButtonPrimary title="Back" color="#1a1a1a" onPress={() => router.back()} />
            </View>

            {/* ── Edit Modal (Bottom Sheet) ── */}
            <Modal
                visible={editVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setEditVisible(false)}
            >
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}>
                    <View style={{
                        backgroundColor: '#fff',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        paddingTop: 12,
                        paddingBottom: 36,
                    }}>
                        {/* Handle bar */}
                        <View style={{ width: 40, height: 4, backgroundColor: '#ddd', borderRadius: 2, alignSelf: 'center', marginBottom: 16 }} />

                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1a1a1a', paddingHorizontal: 24, marginBottom: 8 }}>
                            Edit Menu
                        </Text>

                        <TextInput
                            placeholder="Nama Menu"
                            value={editName}
                            onChangeText={(t) => { setEditName(t); setEditNameError('') }}
                            error={editNameError}
                        />
                        <TextInput
                            placeholder="Deskripsi Makanan"
                            value={editDescription}
                            onChangeText={setEditDescription}
                            multiline
                        />
                        <TextInput
                            placeholder="Harga"
                            value={editPrice}
                            onChangeText={(t) => { setEditPrice(formatRupiah(t)); setEditPriceError('') }}
                            keyboardType="numeric"
                            error={editPriceError}
                        />

                        <View style={{ flexDirection: 'row', gap: 10, paddingHorizontal: 24, marginTop: 8 }}>
                            <TouchableOpacity
                                onPress={() => setEditVisible(false)}
                                style={{ flex: 1, paddingVertical: 14, borderRadius: 10, borderWidth: 1.5, borderColor: '#ddd', alignItems: 'center' }}
                            >
                                <Text style={{ color: '#888', fontWeight: '600', fontSize: 15 }}>Batal</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleSaveEdit}
                                style={{ flex: 1, paddingVertical: 14, borderRadius: 10, backgroundColor: '#5CBB5C', alignItems: 'center' }}
                            >
                                <Text style={{ color: '#fff', fontWeight: '700', fontSize: 15 }}>Simpan</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    )
}
