import { MaterialIcons } from '@expo/vector-icons'
import { useFocusEffect, useRouter } from 'expo-router'
import React, { useCallback, useState } from 'react'
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ButtonPrimary from '../../components/ButtonPrimary'
import TextInput from '../../components/TextInput'
import { MenuCategory, MenuItem, getMenuStore, setMenuStore } from './_menuStore'

// ── Helpers ────────────────────────────────────────────────────
const formatRupiah = (value: string): string => {
    const digits = value.replace(/\D/g, '')
    if (!digits) return ''
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

const CATEGORIES: MenuCategory[] = ['Makanan', 'Minuman', 'Snack']

// ── Component ──────────────────────────────────────────────────
export default function Atmin() {
    const router = useRouter()

    // ── State ──────────────────────────────────────────────────
    const [activeCategory, setActiveCategory] = useState<MenuCategory>('Makanan')
    const [name, setName]               = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice]             = useState('')
    const [stock, setStock]             = useState('')
    const [cookTime, setCookTime]       = useState('')
    const [menuList, setMenuList]       = useState<MenuItem[]>(() => getMenuStore())
    const [nameError, setNameError]     = useState('')
    const [priceError, setPriceError]   = useState('')

    // ── Sync dari store saat layar kembali focus (balik dari Menu) ──
    useFocusEffect(
        useCallback(() => {
            setMenuList(getMenuStore())
        }, [])
    )

    // ── Handlers ───────────────────────────────────────────────
    const handleTambah = () => {
        let hasError = false
        if (!name.trim()) {
            setNameError('Nama menu tidak boleh kosong')
            hasError = true
        } else { setNameError('') }
        if (!price.trim()) {
            setPriceError('Harga tidak boleh kosong')
            hasError = true
        } else { setPriceError('') }

        if (!hasError) {
            const newItem: MenuItem = {
                id: Date.now(),
                name: name.trim(),
                description: description.trim(),
                price: price.trim(),
                stock: stock.trim() || '0',
                cookTime: cookTime.trim() || '-',
                category: activeCategory,
            }
            const updatedList = [...menuList, newItem]
            setMenuList(updatedList)
            setMenuStore(updatedList)   // ← sync ke store
            setName('')
            setDescription('')
            setPrice('')
            setStock('')
            setCookTime('')

            router.push({
                pathname: '/Admin/Menu' as any,
                params: {
                    menuData: JSON.stringify(updatedList),
                    activeCategory,
                },
            })
        }
    }

    const handleLiatPesenan = () => {
        router.push({
            pathname: '/Admin/Menu' as any,
            params: {
                menuData: JSON.stringify(menuList),
                activeCategory,
            },
        })
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['top']}>

            {/* ── Header ── */}
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 20,
                paddingVertical: 14,
            }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#1a1a1a' }}>
                    Sore, Cak Awih
                </Text>
                <TouchableOpacity onPress={() => router.back()}>
                    <MaterialIcons name="logout" size={24} color="#888" />
                </TouchableOpacity>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
                keyboardShouldPersistTaps="handled"
            >
                {/* ── Category Tabs ── */}
                <View style={{
                    flexDirection: 'row',
                    gap: 10,
                    marginBottom: 24,
                    paddingHorizontal: 20,
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
                                <Text style={{
                                    color: isActive ? '#fff' : '#5CBB5C',
                                    fontWeight: '600',
                                    fontSize: 14,
                                }}>
                                    {cat}
                                </Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>

                {/* ── Form ── */}
                <TextInput
                    value={name}
                    onChangeText={(t) => { setName(t); setNameError('') }}
                    placeholder={`Masukan nama ${activeCategory.toLowerCase()}`}
                    error={nameError}
                />

                <TextInput
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Masukan deskripsi makanan"
                    multiline
                />

                <TextInput
                    value={price}
                    onChangeText={(t) => { setPrice(formatRupiah(t)); setPriceError('') }}
                    placeholder="Masukan Harga"
                    keyboardType="numeric"
                    error={priceError}
                />

                <TextInput
                    value={stock}
                    onChangeText={setStock}
                    placeholder="Masukan Stock"
                    keyboardType="numeric"
                />

                <TextInput
                    value={cookTime}
                    onChangeText={setCookTime}
                    placeholder="Masukan waktu masak (mins)"
                    keyboardType="numeric"
                />

                <ButtonPrimary
                    title="Masukin Menu!"
                    color="#5CBB5C"
                    onPress={handleTambah}
                />

                <ButtonPrimary
                    title="Liat Pesenan"
                    color="#1a1a1a"
                    onPress={handleLiatPesenan}
                />

            </ScrollView>

        </SafeAreaView>
    )
}
