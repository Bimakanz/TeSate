import { MaterialIcons } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useState } from 'react'
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useCart } from '../../context/CartContext'

export default function DetailBarang() {
    const router = useRouter()
    const params = useLocalSearchParams<{
        id: string
        title: string
        description: string
        price: string
        thumbnail: string
        category: string
        rating: string
        stock: string
    }>()

    const { addItem } = useCart()
    const [qty, setQty] = useState(1)
    const [toastMsg, setToastMsg] = useState<string | null>(null)

    // Field-level fallback & error handling
    const title      = params.title?.trim()       || 'Nama produk tidak ditemukan'
    const description = params.description?.trim() || 'Deskripsi produk tidak tersedia'
    const category    = params.category?.trim()    || 'Kategori tidak diketahui'
    const thumbnail   = params.thumbnail?.trim()   || null

    const rawPrice    = parseFloat(params.price ?? '')
    const priceValid  = !isNaN(rawPrice) && rawPrice > 0
    const price       = priceValid ? rawPrice : 0
    const formattedPrice = priceValid ? `$${price.toFixed(2)}` : 'Harga tidak tersedia'
    const totalPrice     = priceValid ? `$${(price * qty).toFixed(2)}` : 'Harga tidak tersedia'

    const rawRating   = parseFloat(params.rating ?? '')
    const ratingText  = !isNaN(rawRating) ? rawRating.toFixed(1) : 'N/A'

    const rawStock    = parseInt(params.stock ?? '')
    const stockValid  = !isNaN(rawStock) && rawStock > 0
    const maxQty      = stockValid ? rawStock : 99

    const handleDecrease = () => {
        if (qty > 1) setQty(qty - 1)
    }

    const handleIncrease = () => {
        if (qty < maxQty) setQty(qty + 1)
    }

    const handleAddToCart = () => {
        if (!priceValid) {
            Alert.alert('Ups!', 'Harga tidak valid.')
            return
        }
        
        addItem({
            id: params.id,
            title,
            description,
            price,
            thumbnail: thumbnail ?? '',
            category,
        }, qty)

        setToastMsg(`${title} ditambah ke keranjang.`)
        setTimeout(() => setToastMsg(null), 2500)
    }

    const handleOrder = () => {
        if (!priceValid) {
            Alert.alert('Ups!', 'Harga produk ini tidak valid, tidak bisa melanjutkan pesanan.')
            return
        }
        router.push({
            pathname: '/Customer/Pesanankm' as any,
            params: {
                title: title,
                price: price.toString(),
                qty: qty.toString(),
                thumbnail: thumbnail ?? '',
            },
        })
    }

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            {/* Floating Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
                    <MaterialIcons name="arrow-back" size={24} color="#1a1a1a" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconBtn}>
                    <MaterialIcons name="search" size={24} color="#1a1a1a" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 20 }}>
                {/* Hero Image */}
                <View style={styles.imageContainer}>
                    {thumbnail ? (
                        <Image
                            source={{ uri: thumbnail }}
                            style={styles.image}
                            resizeMode="contain"
                        />
                    ) : (
                        <View style={styles.imagePlaceholder}>
                            <MaterialIcons name="broken-image" size={48} color="#ccc" />
                            <Text style={styles.imagePlaceholderText}>Gambar tidak tersedia</Text>
                        </View>
                    )}
                </View>

                {/* Content Card */}
                <View style={styles.card}>
                    {/* Title */}
                    <Text style={[
                        styles.title,
                        !params.title?.trim() && styles.fieldError
                    ]}>
                        {title}
                    </Text>

                    {/* Meta */}
                    <View style={styles.metaRow}>
                        <MaterialIcons name="restaurant" size={16} color="#888" />
                        <Text style={styles.metaText}>
                            {ratingText} rating · {category}
                        </Text>
                    </View>

                    {/* Description */}
                    <Text style={[
                        styles.description,
                        !params.description?.trim() && styles.fieldError
                    ]}>
                        {description}
                    </Text>
                </View>
            </ScrollView>

            {/* Toast Notification */}
            {toastMsg && (
                <View style={styles.toastContainer}>
                    <Text style={styles.toastText}>{toastMsg}</Text>
                </View>
            )}

            {/* Bottom Bar */}
            <View style={styles.bottomBar}>
                {/* Row 1: Price + Quantity Selector */}
                <View style={styles.priceQtyRow}>
                    {/* Price Badge */}
                    <View style={[styles.priceBadge, !priceValid && styles.priceBadgeError]}>
                        <Text style={styles.priceBadgeText} numberOfLines={1}>{formattedPrice}</Text>
                    </View>

                    {/* Quantity Selector */}
                    <View style={styles.qtySelector}>
                        <TouchableOpacity
                            style={[styles.qtyBtn, qty <= 1 && styles.qtyBtnDisabled]}
                            onPress={handleDecrease}
                            activeOpacity={0.8}
                        >
                            <MaterialIcons name="remove" size={18} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.qtyText}>{qty}</Text>
                        <TouchableOpacity
                            style={styles.qtyBtn}
                            onPress={handleIncrease}
                            activeOpacity={0.8}
                        >
                            <MaterialIcons name="add" size={18} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.actionRow}>
                    <TouchableOpacity
                        style={[styles.actionBtn, styles.cartBtn]}
                        onPress={handleAddToCart}
                        activeOpacity={0.85}
                    >
                        <Text style={styles.actionBtnText}>Add to Cart</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.actionBtn, styles.orderBtn]}
                        onPress={handleOrder}
                        activeOpacity={0.85}
                    >
                        <Text style={styles.actionBtnText}>Pesan Sekarang!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },

    /* Header */
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    iconBtn: {
        width: 38,
        height: 38,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    /* Hero Image */
    imageContainer: {
        width: '100%',
        height: 260,
        backgroundColor: '#fafafa',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    image: {
        width: '85%',
        height: '100%',
    },

    /* Content Card */
    card: {
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 12,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 8,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 16,
    },
    metaText: {
        fontSize: 13,
        color: '#888',
        textTransform: 'capitalize',
    },
    description: {
        fontSize: 14,
        color: '#555',
        lineHeight: 22,
    },
    fieldError: {
        color: '#e57373',
        fontStyle: 'italic',
    },
    imagePlaceholder: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    imagePlaceholderText: {
        fontSize: 13,
        color: '#bbb',
    },
    priceBadgeError: {
        backgroundColor: '#e57373',
    },

    /* Toast */
    toastContainer: {
        position: 'absolute',
        bottom: 120, // Di atas bottom bar
        alignSelf: 'center',
        backgroundColor: '#e8f5e9',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#5CBB5C',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        zIndex: 10,
    },
    toastText: {
        color: '#2e7d32', // Teks warna hijau
        fontWeight: 'bold',
        fontSize: 14,
    },

    /* Bottom Bar */
    bottomBar: {
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        backgroundColor: '#fff',
        gap: 12,
    },

    /* Row 1: Price + Qty */
    priceQtyRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    priceBadge: {
        backgroundColor: '#5CBB5C',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    priceBadgeText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
    },
    qtySelector: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    qtyBtn: {
        backgroundColor: '#5CBB5C',
        width: 34,
        height: 34,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    qtyBtnDisabled: {
        backgroundColor: '#a5d6a7',
    },
    qtyText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a1a1a',
        minWidth: 24,
        textAlign: 'center',
    },

    /* Row 2: Action Buttons */
    actionRow: {
        flexDirection: 'row',
        gap: 10,
    },
    actionBtn: {
        flex: 1,
        borderRadius: 10,
        paddingVertical: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cartBtn: {
        backgroundColor: '#1a1a1a',
    },
    orderBtn: {
        backgroundColor: '#1a1a1a',
    },
    actionBtnText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    },
})
