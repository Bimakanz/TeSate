import { MaterialIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {
    ActivityIndicator,
    FlatList,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Card from '../../components/Card'

const CATEGORIES = ['Semua', 'beauty', 'fragrances', 'furniture', 'groceries']

interface Product {
    id: number
    title: string
    description: string
    price: number
    thumbnail: string
    category: string
    rating: number
    stock: number
}

export default function Home() {
    const router = useRouter()
    const [search, setSearch] = useState('')
    const [activeCategory, setActiveCategory] = useState('Semua')
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetch('https://dummyjson.com/products?limit=30')
            .then((res) => res.json())
            .then((data) => {
                if (data.products) {
                    setProducts(data.products)
                } else {
                    setError('Format data tidak valid')
                }
                setLoading(false)
            })
            .catch((err) => {
                setError('Gagal memuat produk: ' + err.message)
                setLoading(false)
            })
    }, [])

    const filtered = products.filter((p) => {
        const matchSearch = p.title.toLowerCase().includes(search.toLowerCase())
        const matchCategory = activeCategory === 'Semua' || p.category === activeCategory
        return matchSearch && matchCategory
    })

    return (
        <SafeAreaView style={{ backgroundColor: '#f7f7f7', flex: 1 }}>
            {/* Header */}
            <View style={{ backgroundColor: 'white', paddingHorizontal: 20, paddingTop: 12, paddingBottom: 16 }}>
                <Text style={{ color: 'black', fontSize: 13, textAlign: 'center', marginBottom: 4 }}>
                    Bambu Apus, Jakarta Timur
                </Text>
                <Text style={{ color: '#1a1a1a', fontWeight: 'bold', fontSize: 20, marginBottom: 20, marginTop:20 }}>
                    Sore, Mang Saswi
                </Text>

                {/* Search Bar */}
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#f2f2f2',
                    borderRadius: 12,
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                }}>
                    <MaterialIcons name="search" size={20} color="#aaa" />
                    <TextInput
                        style={{ flex: 1, fontSize: 14, color: '#333', paddingHorizontal: 8, paddingVertical: 4 }}
                        placeholder="Cari Kesukaan kamu!"
                        placeholderTextColor="#aaa"
                        value={search}
                        onChangeText={setSearch}
                        returnKeyType="search"
                        keyboardType='default'
                    />
                    {search.length > 0 && (
                        <TouchableOpacity onPress={() => setSearch('')}>
                            <MaterialIcons name="close" size={18} color="#aaa" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* Category Filter Buttons */}
            <View>
                <FlatList
                    data={CATEGORIES}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item}
                    contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
                    renderItem={({ item }) => {
                        const isActive = activeCategory === item
                        return (
                            <TouchableOpacity
                                onPress={() => setActiveCategory(item)}
                                style={{
                                    paddingHorizontal: 18,
                                    paddingVertical: 8,
                                    borderRadius: 8,
                                    backgroundColor: isActive ? '#5CBB5C' : '#fff',
                                    borderWidth: 1.5,
                                    borderColor: '#5CBB5C',
                                    marginRight: 10,
                                }}
                            >
                                <Text style={{
                                    color: isActive ? 'white' : '#5CBB5C',
                                    fontSize: 13,
                                    fontWeight: '500',
                                    textTransform: 'capitalize',
                                }}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>

            {/* Product Grid */}
            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#5CBB5C" />
                    <Text style={{ color: '#aaa', marginTop: 10 }}>Memuat produk...</Text>
                </View>
            ) : error ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <MaterialIcons name="wifi-off" size={48} color="#ccc" />
                    <Text style={{ color: '#aaa', marginTop: 10, textAlign: 'center', paddingHorizontal: 30 }}>{error}</Text>
                    <TouchableOpacity
                        onPress={() => {
                            setLoading(true)
                            setError(null)
                            fetch('https://dummyjson.com/products?limit=30')
                                .then((res) => res.json())
                                .then((data) => {
                                    if (data.products) setProducts(data.products)
                                    else setError('Format data tidak valid')
                                    setLoading(false)
                                })
                                .catch((err) => {
                                    setError('Gagal memuat produk: ' + err.message)
                                    setLoading(false)
                                })
                        }}
                        style={{
                            marginTop: 16,
                            paddingHorizontal: 24,
                            paddingVertical: 10,
                            backgroundColor: '#5CBB5C',
                            borderRadius: 10,
                        }}
                    >
                        <Text style={{ color: 'white', fontWeight: '600', fontSize: 14 }}>Coba Lagi</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <FlatList
                    data={filtered}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1 }}
                    contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 100 }}
                    ListEmptyComponent={
                        <View style={{ alignItems: 'center', marginTop: 60 }}>
                            <MaterialIcons name="search-off" size={48} color="#ccc" />
                            <Text style={{ color: '#aaa', marginTop: 10, fontSize: 14 }}>Produk tidak ditemukan</Text>
                        </View>
                    }
                    renderItem={({ item }) => {
                        const cardTitle = item.title?.trim() || 'Nama produk tidak ditemukan'
                        const cardDesc = item.description?.trim()
                            ? (item.description.length > 60
                                ? item.description.substring(0, 60) + '...'
                                : item.description)
                            : 'Deskripsi tidak tersedia'
                        const cardPrice = item.price > 0
                            ? `$${item.price.toFixed(2)}`
                            : 'Harga tidak tersedia'
                        const cardImage = item.thumbnail?.trim()
                            ? { uri: item.thumbnail }
                            : { uri: 'https://placehold.co/300x200/f5f5f5/aaaaaa?text=No+Image' }

                        return (
                            <Card
                                title={cardTitle}
                                description={cardDesc}
                                price={cardPrice}
                                image={cardImage}
                                onPress={() =>
                                    router.push({
                                        pathname: '/Customer/detailBarang',
                                        params: {
                                            id: item.id.toString(),
                                            title: item.title ?? '',
                                            description: item.description ?? '',
                                            price: item.price?.toString() ?? '',
                                            thumbnail: item.thumbnail ?? '',
                                            category: item.category ?? '',
                                            rating: item.rating?.toString() ?? '',
                                            stock: item.stock?.toString() ?? '',
                                        },
                                    })
                                }
                                onAddToCart={() => {
                                    console.log('Add to cart:', cardTitle)
                                }}
                            />
                        )
                    }}
                />
            )}
        </SafeAreaView>
    )
}