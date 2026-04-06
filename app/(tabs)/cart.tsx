import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

// @ts-ignore
import KosongSvg from '@/assets/images/Kosong.svg'

export default function Cart() {
    const router = useRouter()

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
