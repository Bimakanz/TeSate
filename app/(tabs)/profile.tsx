import ButtonPrimary from '@/components/ButtonPrimary'
import TextInput from '@/components/TextInput'
import { MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useState } from 'react'
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Profile() {

    // Data user — nanti bisa disambung ke state management / API
    const [name, setName] = useState('Mang Saswi')
    const [email, setEmail] = useState('mangsaswi@gmail.com')
    const [phone, setPhone] = useState('081234567890')
    const [address, setAddress] = useState('Jl Bambu Apus 3, Jakarta Timur')

    const [isEditing, setIsEditing] = useState(false)

    const handleSave = () => {
        if (!name.trim()) {
            Alert.alert('Ups!', 'Nama tidak boleh kosong ya.')
            return
        }
        setIsEditing(false)
        Alert.alert('Yeay!', 'Profil kamu berhasil disimpan 🎉')
    }


    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Profil Kamu</Text>
                    <TouchableOpacity onPress={() => router.replace('/Login')} style={styles.logoutBtn}>
                        <MaterialIcons name="logout" size={22} color="#e53935" />
                    </TouchableOpacity>
                </View>

                {/* Avatar */}
                <View style={styles.avatarSection}>
                    <View style={styles.avatarCircle}>
                        <Text style={styles.avatarInitial}>
                            {name.trim().charAt(0).toUpperCase()}
                        </Text>
                    </View>
                    <Text style={styles.avatarName}>{name}</Text>
                    <Text style={styles.avatarEmail}>{email}</Text>

                    <TouchableOpacity
                        style={styles.editToggleBtn}
                        onPress={() => setIsEditing(!isEditing)}
                    >
                        <MaterialIcons
                            name={isEditing ? 'close' : 'edit'}
                            size={16}
                            color="#5CBB5C"
                        />
                        <Text style={styles.editToggleText}>
                            {isEditing ? 'Batal Edit' : 'Edit Profil'}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Divider */}
                <View style={styles.divider} />

                {/* Section Label */}
                <Text style={styles.sectionLabel}>Data Diri</Text>

                {/* Form Fields */}
                <TextInput
                    placeholder="Nama Lengkap"
                    value={name}
                    onChangeText={setName}
                    editable={isEditing}
                    keyboardType="default"
                    style={!isEditing ? styles.readOnly : undefined}
                />

                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    editable={isEditing}
                    keyboardType="email-address"
                    style={!isEditing ? styles.readOnly : undefined}
                />

                <TextInput
                    placeholder="No. Handphone"
                    value={phone}
                    onChangeText={setPhone}
                    editable={isEditing}
                    keyboardType="phone-pad"
                    style={!isEditing ? styles.readOnly : undefined}
                />

                {/* Divider */}
                <View style={styles.divider} />

                {/* Alamat Section */}
                <Text style={styles.sectionLabel}>Alamat Pengiriman</Text>

                <TextInput
                    placeholder="Alamat Lengkap"
                    value={address}
                    onChangeText={setAddress}
                    editable={isEditing}
                    keyboardType="default"
                    multiline
                    style={[styles.addressInput, !isEditing ? styles.readOnly : undefined]}
                />

                {/* Save Button — only visible when editing */}
                {isEditing && (
                    <ButtonPrimary
                        title="Simpan Perubahan"
                        color="#5CBB5C"
                        onPress={handleSave}
                    />
                )}

                {/* Bottom Spacer */}
                <View style={{ height: 30 }} />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    scrollContent: {
        paddingBottom: 30,
    },

    // ── Header ──
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 8,
        backgroundColor: 'white',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    logoutBtn: {
        padding: 6,
    },

    // ── Avatar ──
    avatarSection: {
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 28,
        paddingHorizontal: 24,
    },
    avatarCircle: {
        width: 88,
        height: 88,
        borderRadius: 44,
        backgroundColor: '#5CBB5C',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 14,
        shadowColor: '#5CBB5C',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 8,
        elevation: 8,
    },
    avatarInitial: {
        fontSize: 36,
        fontWeight: 'bold',
        color: 'white',
    },
    avatarName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 4,
    },
    avatarEmail: {
        fontSize: 14,
        color: '#888',
        marginBottom: 14,
    },
    editToggleBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 18,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: '#5CBB5C',
        backgroundColor: 'white',
    },
    editToggleText: {
        color: '#5CBB5C',
        fontSize: 13,
        fontWeight: '600',
    },

    // ── Section ──
    divider: {
        height: 8,
        backgroundColor: '#f0f0f0',
        marginVertical: 4,
    },
    sectionLabel: {
        fontSize: 13,
        fontWeight: '700',
        color: '#888',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
        paddingHorizontal: 39,
        marginTop: 16,
        marginBottom: 4,
    },

    // ── Input ──
    readOnly: {
        backgroundColor: '#f5f5f5',
        color: '#999',
        borderColor: '#eee',
    },
    addressInput: {
        minHeight: 80,
        textAlignVertical: 'top',
    },
    logoutButtonBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        marginHorizontal: 24,
        marginTop: 24,
        paddingVertical: 14,
        borderRadius: 14,
        backgroundColor: '#e53935',
    },
    logoutButtonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '700',
    },
})
