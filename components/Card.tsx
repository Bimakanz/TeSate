import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface CardProps {
    title: string
    description?: string
    price: string
    image: ImageSourcePropType
    onPress?: () => void
    // Mode normal (home page)
    onAddToCart?: () => void
    // Mode admin — kalau ada onEdit/onDelete, cart button diganti
    onEdit?: () => void
    onDelete?: () => void
}

export default function Card({ title, description, price, image, onPress, onAddToCart, onEdit, onDelete }: CardProps) {
    const isAdminMode = !!(onEdit || onDelete)

    const innerContent = (
        <>
            {/* Gambar produk */}
            <Image source={image} style={styles.image} resizeMode="cover" />

            {/* Konten */}
            <View style={styles.content}>
                {/* Title — maks 1 baris */}
                <Text style={styles.title} numberOfLines={1}>{title}</Text>

                {/* Description — fixed height 2 baris */}
                <View style={styles.descContainer}>
                    {description
                        ? <Text style={styles.description} numberOfLines={2}>{description}</Text>
                        : null
                    }
                </View>

                {/* Footer: price + tombol */}
                <View style={styles.footer}>
                    <Text style={styles.price} numberOfLines={1}>{price}</Text>

                    {isAdminMode ? (
                        /* Mode admin: tombol Edit + Delete bebas dari parent TouchableOpacity */
                        <View style={styles.adminBtns}>
                            {onEdit && (
                                <TouchableOpacity style={[styles.iconBtn, styles.editBtn]} onPress={onEdit}>
                                    <MaterialIcons name="edit" size={15} color="white" />
                                </TouchableOpacity>
                            )}
                            {onDelete && (
                                <TouchableOpacity style={[styles.iconBtn, styles.deleteBtn]} onPress={onDelete}>
                                    <MaterialIcons name="delete" size={15} color="white" />
                                </TouchableOpacity>
                            )}
                        </View>
                    ) : (
                        /* Mode normal: tombol cart */
                        <TouchableOpacity style={styles.cartButton} onPress={onAddToCart}>
                            <MaterialIcons name="shopping-cart" size={20} color="white" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </>
    )

    // Mode admin → View biasa (bukan TouchableOpacity)
    // Sehingga tombol delete/edit tidak bentrok dengan onPress milik card
    if (isAdminMode) {
        return <View style={styles.card}>{innerContent}</View>
    }

    // Mode normal → seluruh card bisa ditekan
    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
            {innerContent}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 14,
        overflow: 'hidden',
        flex: 1,
        margin: 6,
        height: 240,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
        elevation: 5,
    },
    image: {
        width: '100%',
        height: 120,
    },
    content: {
        flex: 1,
        padding: 10,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    descContainer: {
        height: 34,
        overflow: 'hidden',
    },
    description: {
        fontSize: 11,
        color: '#777',
        lineHeight: 17,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#1a1a1a',
        flex: 1,
        marginRight: 4,
    },
    cartButton: {
        backgroundColor: '#5CBB5C',
        borderRadius: 8,
        padding: 7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    adminBtns: {
        flexDirection: 'row',
        gap: 5,
    },
    iconBtn: {
        borderRadius: 7,
        padding: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    editBtn: {
        backgroundColor: '#5CBB5C',
    },
    deleteBtn: {
        backgroundColor: '#e53935',
    },
})