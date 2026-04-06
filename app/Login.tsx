import ButtonPrimary from '@/components/ButtonPrimary'
import TextInput from '@/components/TextInput'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(false)
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const validate = () => {
        let valid = true
        if (!email.includes('@')) {
            setEmailError('Email harus mengandung karakter @')
            valid = false
        } else {
            setEmailError('')
        }
        if (password.length < 8) {
            setPasswordError('Password minimal 8 karakter')
            valid = false
        } else {
            setPasswordError('')
        }
        return valid
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1 }}>
                <Image source={require('@/assets/images/sateh1.png')} style={{ width: 250, height: 125, alignSelf: 'center', marginTop: 80, resizeMode: 'contain' }} />
                <View style={{ paddingBottom: 5, marginBottom: 5, bottom: 20 }}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 30, textAlign: 'center', }}>Login dulu kali ah</Text>
                    <Text style={{ color: 'black', fontWeight: 'normal', fontSize: 15, textAlign: 'center', paddingBottom: 10, marginBottom: 10 }}>Masuk pake akun kamu yang udah {'\n'} didaftarin ya!</Text>
                </View>
                <View style={{ bottom: 20 }}>
                    <TextInput
                        placeholder="Email"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={(t) => { setEmail(t); setEmailError('') }}
                        error={emailError}
                    />
                    <TextInput
                        placeholder="Password"
                        keyboardType="default"
                        secureTextEntry
                        value={password}
                        onChangeText={(t) => { setPassword(t); setPasswordError('') }}
                        error={passwordError}
                    />

                    {/* Ingatin akunku + Lupa password? */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 39, bottom:5 }}>
                        <TouchableOpacity
                            style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}
                            onPress={() => setRemember(!remember)}
                        >
                            <View style={{
                                width: 18, height: 18, borderRadius: 4,
                                borderWidth: 2, borderColor: '#5CBB5C',
                                backgroundColor: remember ? '#5CBB5C' : 'white',
                                justifyContent: 'center', alignItems: 'center'
                            }}>
                                {remember && <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>✓</Text>}
                            </View>
                            <Text style={{ color: '#555', fontSize: 13 }}>Ingatin akunku</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => Alert.alert('Lupa Password', 'Fitur ini belum tersedia')}>
                            <Text style={{ color: '#5CBB5C', fontSize: 13, fontWeight: '600' }}>Lupa password?</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                    <ButtonPrimary
                        title="Masuk"
                        color="#5CBB5C"
                        onPress={() => { if (validate()) router.push('/(tabs)') }}
                    />
                    <ButtonPrimary
                        title="Masuk Atmin"
                        color="#418A41"
                        onPress={() => {
                            if (!validate()) return
                            if (email === 'atmin@gmail.com' && password === 'atmin12345') {
                                router.push('/Admin/Atmin' as any)
                            } else {
                                Alert.alert(
                                    'Akses Ditolak',
                                    'Email atau password admin salah.\nHubungi pengelola aplikasi.',
                                )
                            }
                        }}
                    />
                    </View>
                </View>
                <View style={{ bottom: 20, paddingHorizontal: 39 }}>
                    <Text style={{ color: 'black', fontWeight: 'normal', fontSize: 15, textAlign: 'center', paddingBottom: 10, marginBottom: 10 }}>Belum punya akun? <Text onPress={() => router.push('/Register')} style={{ color: '#5CBB5C', fontWeight: 'normal', textDecorationLine: 'underline' }}>Daptar heula !</Text></Text>
                </View>
            </View>
        </SafeAreaView>
    )
}