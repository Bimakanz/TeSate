import { MaterialIcons } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

// ── Helper ─────────────────────────────────────────────────────
const APP_FEE      = 2.0
const DELIVERY_FEE = 5.0

const fmt = (n: number) => `$${n.toFixed(2)}`

// ── Component ──────────────────────────────────────────────────
export default function Tunggu() {
    const router = useRouter()
    const params = useLocalSearchParams<{
        title: string
        qty: string
        price: string
        method: string
    }>()

    const productName = params.title?.trim() || 'Produk tidak diketahui'
    const rawPrice    = parseFloat(params.price ?? '0')
    const qty         = parseInt(params.qty ?? '1')
    const priceValid  = !isNaN(rawPrice) && rawPrice > 0
    const itemTotal   = priceValid ? rawPrice * qty : 0
    const grandTotal  = itemTotal + APP_FEE + DELIVERY_FEE

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['top']}>

            {/* ── Header ── */}
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 16,
                paddingVertical: 10,
            }}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={{ width: 38, height: 38, justifyContent: 'center', alignItems: 'center' }}>
                    <MaterialIcons name="arrow-back" size={24} color="#1a1a1a" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ width: 38, height: 38, justifyContent: 'center', alignItems: 'center' }}>
                    <MaterialIcons name="search" size={24} color="#1a1a1a" />
                </TouchableOpacity>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
            >
                {/* ── Illustration ── */}
                <View style={{ alignItems: 'center', marginVertical: 20 }}>
                    <Image
                        source={require('../../assets/images/Pesanan.png')}
                        style={{ width: 200, height: 220 }}
                        resizeMode="contain"
                    />
                </View>

                {/* ── Status Text ── */}
                <Text style={{
                    fontSize: 28,
                    fontWeight: 'bold',
                    color: '#1a1a1a',
                    textAlign: 'center',
                    marginBottom: 6,
                }}>
                    Tunggu Iho...
                </Text>

                <Text style={{
                    fontSize: 24,
                    textAlign: 'center',
                    marginBottom: 8,
                }}>
                    Pesanan Kamu lagi diproses
                </Text>

                <Text style={{
                    fontSize: 13,
                    color: '#888',
                    textAlign: 'center',
                    marginBottom: 32,
                }}>
                    Tunggu aja depan rumah nanti juga sampe kok
                </Text>

                {/* ── Order Summary ── */}
                <Text style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    color: '#1a1a1a',
                    marginBottom: 16,
                }}>
                    Pesanan Kamu
                </Text>

                {/* Item row */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                    <Text style={{ fontSize: 14, color: '#333', flex: 1, marginRight: 12 }} numberOfLines={1}>
                        {qty}x {productName}
                    </Text>
                    <Text style={{ fontSize: 14, color: '#333', fontWeight: '500' }}>
                        {priceValid ? fmt(itemTotal) : '—'}
                    </Text>
                </View>

                {/* Biaya Aplikasi */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                    <Text style={{ fontSize: 14, color: '#333' }}>Biaya Aplikasi</Text>
                    <Text style={{ fontSize: 14, color: '#333', fontWeight: '500' }}>{fmt(APP_FEE)}</Text>
                </View>

                {/* Biaya Antar */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                    <Text style={{ fontSize: 14, color: '#333' }}>Biaya Pesan Antar</Text>
                    <Text style={{ fontSize: 14, color: '#333', fontWeight: '500' }}>{fmt(DELIVERY_FEE)}</Text>
                </View>

                {/* Divider */}
                <View style={{ height: 1, backgroundColor: '#e0e0e0', marginVertical: 12 }} />

                {/* Total */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#1a1a1a' }}>Total Biaya</Text>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#1a1a1a' }}>{fmt(grandTotal)}</Text>
                </View>
            </ScrollView>

            {/* ── Footer: Kembali ke Beranda ── */}
            <View style={{
                paddingHorizontal: 20,
                paddingVertical: 14,
                borderTopWidth: 1,
                borderTopColor: '#f0f0f0',
                backgroundColor: '#fff',
            }}>
                <TouchableOpacity
                    onPress={() => router.replace('/(tabs)' as any)}
                    activeOpacity={0.85}
                    style={{
                        backgroundColor: '#1a1a1a',
                        borderRadius: 12,
                        paddingVertical: 15,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                    }}
                >
                    <MaterialIcons name="home" size={20} color="#fff" />
                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
                        Kembali ke Beranda
                    </Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}
