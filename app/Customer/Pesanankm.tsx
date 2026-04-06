import { MaterialIcons } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

// ── PNG base64 diekstrak langsung dari SVG (SVG-nya embed PNG, bukan vector) ──
const DOLLAR_BAG_URI =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEM0lEQVR4nO1YW8hVRRTepqWFdPWSqF19iAgKVMg0H6IXfehCQfmQESkGWirhBdFCMgIRLH7BxLcUi0iIigqCEhEFiySiUjTLpD+P/f575lszO285sWr/Mv9i731m77PPOUIuGDhw5lvr+9aeWbNmoqhmAzADwCYABwD0puNbAD0ApkeXqiml7iSiXUTkigaAr3hu14gS0ZFmJFsYRzohYGcbBexsuwAArwQsk8+MMbOMMTenYzaAzwNwr3ZCwKMFBC4AWFGAXcFzCvCPtV1AHMe3icCxc25IWT+MIaLY98W+28O6SeAkSW6tIRGqSiIqGRHt9oNrrR+pYSnubg/b7OA9Yu2uabUYAOhpD9vs4PNE9j5otRwDmBd1yqy1U4WAw60eiNbaqVGnzDl3NYDzdR1gAM47566JOmlE9GONJ/BPHSXvnLuSO8wav8AB9tkp8kMBvNuOPsi1W0QB+T6t9QOhfqy1UwCc6KgI59wVRPR+RtBDSqk7sjDc2xDRFmPMffI/xhDRoYzl9B7Hql0AEa3PCPYdgFEFmNfTeY9n/Q9gFPvISMobtZI3xjyTEYSr0JgiXDMBbEQ0lquQSAx3rHOiOkwpNYn+Mz/AH0mSTGxy0H1IRCbF/AJgtXNueNb8JEluYZ8iQchbmsHmnBtGRHsF+dNa62l5GK31cwD+zimXX+aJ0FpPY98Cs4cLR2UBRLQkg8SCvPnGmHEAEm8u//5T4Jfn4QEsyBD+UiXySqkbieiUCP5pUc9ORIv8dWyMuZczDmC/X7Xy8M65IXwdlSVaKXVDaQEA3hSOYmvt+CaYjZ6AXk/YQt9XESFr7QR5YQKwoRT5OI6vB2CFk5UBot/yMCcH6jkfcgC+GBgBiVglkkf9/f3XVV77ABqNRmNkAG5Qporo5aiCNRqNkZwA4evFMgIO+mCt9bIS+0aJer5Va31TWREAlgsBP5R5IpRlM5gAET0N4JzcPwBeKHNpBzAawBnfTxzHt4cA54vgn4QG9Xw8COD7jBL8Tpm6DlGRADwfAtohAi+OKhgTNcbMzeg6F4b6IKKlQsD2ENA+AZoRtWDp4Xbc8/dbKBbATCF+b4iAoz6I3zZDgqVN2RZv3FNQncaGiqfBuJ9DiAw0YP+OvN4lqzUWwp/1fD5V5SXPOTdCCDAhRAYdYOwkMBi3Ab972I89AZu9JXQuNClOCGBuIQKOVVlCOZeePSxEvEhfFFZ2CQH4tSkIwDeCxENRoPX19V0rD0ExFIC7Qv0R0cNCwNchoLdF0LWhAVP8GADb/EMo/QIfAbi7pK/XBJfNTUEAnhSqj1d5KeCXNn7vSTftxAr4q8SeYi5PBHWifJ1r5SvIMyWkEQzIPoI7UiJaV7COuzXWRiXvA/KS3bUBoJc5RWXMWjtZngldIv+X1vr+qIrxpgFwtovkzwZt3Mt22f7H9g+PGVjiahYOcwAAAABJRU5ErkJggg=='

const CARD_URI =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB4klEQVR4nO2YsUoDQRCGD0G0UQsLsbBVfAFbfQJt8iAWgrVNfAfBRlOICLZ2QrCz1pj4CIlH9v+PdGZk8Cxy3Hm7cuceZH8YLuR22fl2Z3ZnL4qCgoKCgoIymkwmWyTvSIKkeDaQvDfG7EQOzn80wHHJWKy+lQKkMy8NtVsbgCaEjRSYsQGY6RR5Fl39CQAVi3O/Aqw5MQF8kuwmSXICYJ/khogsi8iS/iZ5AOCU5BOAqfOS1ez4pTFm2zacAOw2BeBtPB7vRXXoH2b+YTQardbivKpu5zW2o4xEZBFAC0CHZI9kwm/19D99p20izwD9OI7XsuMBOCI5sOg/0LbOAFFNEpEFkueOKzgl2da+3gFcneestb0CaCiksykFM/1M8jhJks2ilTDGHHoB0GQsiPmY5Fn24vJbTuQmdt0AuqMUzOrjT5vhcLhiAaB9Wj4AOgUOvaR5oc8LS4DrfwfQ7dQiSS9sAPRE9wHACgHoAwAVAhgfAG8VAvSalMTiCgDgqjHbKP8G0GrSQSaOAH0vB5lNKcESgLJSovIPWwBucsZp11XM3VcNkELs55TT7ZKVcC+ntZhKC6uqId6NMes54x3aXmgKw6bgC/WtHhQVQ3Qtr5Q/etV6x+lKGRQUFBQ0V/oCNe43b57hoyIAAAAASUVORK5CYII='

const QRIS_URI =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAwElEQVR4nO2YQQoDIQxFPV6H3v8CbS9gkv0Ud0VoM0HtjPgeuMr4zSdMIqYEAHBJcs53EXmp6v5ricjTzLZ6f/1db32XstET/zjkETXQqu9yVPxbgtG4BvXXM5CC8bP1EwYcqMByP7HOZkBmH2Rmth05pIib2S1qoFUfABx6t8mecZezE1QM6OQV6M10CddgYLkK5MHvQsMNyeDr9N/ngDoLA1ebxKP1XDBQQQWi0IWUQbY3daXR70LT304BAFLhDVgmzp4PiAenAAAAAElFTkSuQmCC'

// ── Types ──────────────────────────────────────────────────────
type PaymentId = 'cash' | 'ovo' | 'qris'

const PAYMENT_METHODS: {
    id: PaymentId
    label: string
    bg: string
    imgUri: string
}[] = [
    { id: 'cash', label: 'Bayar Cash aja', bg: '#1a1a1a', imgUri: DOLLAR_BAG_URI },
    { id: 'ovo',  label: 'Pake Ovo',       bg: '#7B2FBE', imgUri: CARD_URI       },
    { id: 'qris', label: 'Pake Qris',      bg: '#C0392B', imgUri: QRIS_URI       },
]

const APP_FEE      = 2.0
const DELIVERY_FEE = 5.0
const ESTIMATE     = '30–35 mins'

// ── Component ──────────────────────────────────────────────────
export default function Pesanankm() {
    const router   = useRouter()
    const params   = useLocalSearchParams<{
        title: string
        price: string
        qty: string
        thumbnail: string
    }>()

    const [selected, setSelected] = useState<PaymentId>('cash')

    const productName = params.title?.trim() || 'Produk tidak diketahui'
    const rawPrice    = parseFloat(params.price ?? '0')
    const qty         = parseInt(params.qty ?? '1')
    const priceValid  = !isNaN(rawPrice) && rawPrice > 0
    const itemTotal   = priceValid ? rawPrice * qty : 0
    const grandTotal  = itemTotal + APP_FEE + DELIVERY_FEE

    const fmt = (n: number) => `$${n.toFixed(2)}`

    const handleBayar = () => {
        if (!priceValid || itemTotal <= 0) {
            Alert.alert('Ups!', 'Total pesanan tidak valid. Kembali dan pilih produk yang benar ya.')
            return
        }
        if (!productName || productName === 'Produk tidak diketahui') {
            Alert.alert('Ups!', 'Nama produk tidak ditemukan. Coba ulangi dari halaman produk.')
            return
        }
        const method = PAYMENT_METHODS.find((m) => m.id === selected)
        router.push({
            pathname: '/Customer/Tunggu' as any,
            params: {
                title: productName,
                qty: qty.toString(),
                price: rawPrice.toString(),
                method: method?.label ?? 'Cash',
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
                paddingHorizontal: 16,
                paddingVertical: 10,
            }}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={{
                        width: 38, height: 38, borderRadius: 10,
                        justifyContent: 'center', alignItems: 'center',
                    }}>
                    <MaterialIcons name="arrow-back" size={24} color="#1a1a1a" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        width: 38, height: 38, borderRadius: 10,
                        justifyContent: 'center', alignItems: 'center',
                    }}>
                    <MaterialIcons name="search" size={24} color="#1a1a1a" />
                </TouchableOpacity>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30 }}
            >
                {/* ── Page Title ── */}
                <Text style={{
                    fontSize: 26,
                    fontWeight: 'bold',
                    color: '#1a1a1a',
                    marginTop: 8,
                    marginBottom: 20,
                }}>
                    Pesanan Kamu
                </Text>

                {/* ── Order Summary ── */}
                {/* Item row */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                    <Text style={{ fontSize: 14, color: '#333', flex: 1, marginRight: 12 }} numberOfLines={1}>
                        {qty}x {productName}
                    </Text>
                    <Text style={{ fontSize: 14, color: '#333', fontWeight: '500' }}>
                        {priceValid ? fmt(itemTotal) : '—'}
                    </Text>
                </View>

                {/* Biaya Aplikasi row */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                    <Text style={{ fontSize: 14, color: '#333' }}>Biaya Aplikasi</Text>
                    <Text style={{ fontSize: 14, color: '#333', fontWeight: '500' }}>{fmt(APP_FEE)}</Text>
                </View>

                {/* Biaya Pesan Antar row */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                    <Text style={{ fontSize: 14, color: '#333' }}>Biaya Pesan Antar</Text>
                    <Text style={{ fontSize: 14, color: '#333', fontWeight: '500' }}>{fmt(DELIVERY_FEE)}</Text>
                </View>

                {/* Divider */}
                <View style={{ height: 1, backgroundColor: '#e0e0e0', marginVertical: 12 }} />

                {/* Total Biaya row */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#1a1a1a' }}>Total Biaya</Text>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#1a1a1a' }}>{fmt(grandTotal)}</Text>
                </View>

                {/* Estimasi row */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 }}>
                    <Text style={{ fontSize: 12, color: '#888' }}>Estimasi Waktu Antar</Text>
                    <Text style={{ fontSize: 12, color: '#888' }}>{ESTIMATE}</Text>
                </View>

                {/* ── Payment Methods ── */}
                <View style={{ gap: 12 }}>
                    {PAYMENT_METHODS.map(({ id, label, bg, imgUri }) => {
                        const isSelected = selected === id
                        return (
                            <TouchableOpacity
                                key={id}
                                activeOpacity={0.85}
                                onPress={() => setSelected(id)}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    backgroundColor: bg,
                                    borderRadius: 12,
                                    paddingVertical: 16,
                                    paddingHorizontal: 16,
                                }}
                            >
                                {/* PNG Icon */}
                                <View style={{
                                    width: 36, height: 36,
                                    justifyContent: 'center', alignItems: 'center',
                                    marginRight: 12,
                                }}>
                                    <Image
                                        source={{ uri: imgUri }}
                                        style={{ width: 28, height: 28 }}
                                        resizeMode="contain"
                                    />
                                </View>

                                {/* Label */}
                                <Text style={{
                                    flex: 1,
                                    fontSize: 16,
                                    fontWeight: '600',
                                    color: '#fff',
                                    textAlign: 'center',
                                    marginRight: 12,
                                }}>
                                    {label}
                                </Text>

                                {/* Radio button */}
                                <View style={{
                                    width: 22, height: 22,
                                    borderRadius: 11,
                                    borderWidth: 2,
                                    borderColor: isSelected ? '#fff' : 'rgba(255,255,255,0.6)',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    {isSelected && (
                                        <View style={{
                                            width: 11, height: 11,
                                            borderRadius: 6,
                                            backgroundColor: '#fff',
                                        }} />
                                    )}
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </ScrollView>

            {/* ── Bayar Button ── */}
            <View style={{
                paddingHorizontal: 20,
                paddingVertical: 14,
                borderTopWidth: 1,
                borderTopColor: '#f0f0f0',
                backgroundColor: '#fff',
            }}>
                <TouchableOpacity
                    onPress={handleBayar}
                    activeOpacity={0.85}
                    style={{
                        backgroundColor: '#5CBB5C',
                        borderRadius: 12,
                        paddingVertical: 15,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
                        Bayar Sekarang · {fmt(grandTotal)}
                    </Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}
