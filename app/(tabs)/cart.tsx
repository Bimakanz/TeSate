import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

// @ts-ignore
import KosongSvg from '@/assets/images/Kosong.svg'
import { useCart } from '../../context/CartContext'
import Card from '../../components/Card'

const fmt = (n: number) => `$${n.toFixed(2)}`

export default function Cart() {
    const router = useRouter()
    const { items, removeItem } = useCart()

    if (items.length === 0) {
        return (
            <SafeAreaView style={styles.safe}>
                <View style={styles.container}>
                    {/* Ilustrasi */}
                    <KosongSvg width={240} height={240} />

                    {/* Teks utama */}
                    <Text style={styles.title}>Kamu belum pesan loh</Text>

                    {/* Sub teks + tombol */}
                    <TouchableOpacity
                        style={styles.btn}
                        activeOpacity={0.85}
                        onPress={() => router.push('/(tabs)' as any)}
                    >
                        <Text style={styles.btnText}>Yuk pesan dulu</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Pesanan Kamu</Text>
            </View>

            <FlatList
                data={items}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 100 }}
                renderItem={({ item }) => {
                    const cardTitle = `${item.qty}x ${item.title}`
                    const cardDesc = item.description?.trim()
                        ? (item.description.length > 50
                            ? item.description.substring(0, 50) + '...'
                            : item.description)
                        : 'Deskripsi tidak tersedia'
                    const cardPrice = fmt(item.price * item.qty)
                    const cardImage = item.thumbnail?.trim()
                        ? { uri: item.thumbnail }
                        : { uri: 'https://placehold.co/300x200/f5f5f5/aaaaaa?text=No+Image' }

                    return (
                        <Card
                            title={cardTitle}
                            description={cardDesc}
                            price={cardPrice}
                            image={cardImage}
                            onPress={() => {
                                router.push({
                                    pathname: '/Customer/Pesanankm' as any,
                                    params: {
                                        title: item.title,
                                        price: item.price.toString(),
                                        qty: item.qty.toString(),
                                        thumbnail: item.thumbnail,
                                    },
                                })
                            }}
                            onDelete={() => removeItem(item.id)}
                        />
                    )
                }}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
        gap: 8,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 14,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1a1a1a',
        textAlign: 'center',
        marginTop: 8    ,
    },
    btn: {
        marginTop: 8,
        paddingHorizontal: 28,
        paddingVertical: 12,
        backgroundColor: '#5CBB5C',
        borderRadius: 12,
    },
    btnText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
    },
})