import ButtonPrimary from '@/components/ButtonPrimary'
import TextInput from '@/components/TextInput'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')

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

        if (confirmPassword !== password) {
            setConfirmPasswordError('Konfirmasi password tidak sama dengan password')
            valid = false
        } else {
            setConfirmPasswordError('')
        }

        return valid
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView>
                <View style={{ flex: 1 }}>
                    <Image source={require('@/assets/images/sateh1.png')} style={{ width: 250, height: 125, alignSelf: 'center', marginTop: 80, resizeMode: 'contain' }} />
                    <View style={{ paddingBottom: 5, marginBottom: 5, bottom: 20 }}>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 30, textAlign: 'center' }}>Daptar dulu</Text>
                        <Text style={{ color: 'black', fontWeight: 'normal', fontSize: 15, textAlign: 'center', paddingBottom: 10, marginBottom: 10 }}>Daftarin akun kamu disini, isi yang {'\n'} lengkap ya data yang aku minta, {'\n'} jangan sampe ngga!</Text>
                    </View>
                    <View style={{ bottom: 20 }}>
                        {/* Nama lengkap — tidak ada validasi */}
                        <TextInput
                            placeholder="Nama Lengkap"
                            keyboardType="default"
                            value={name}
                            onChangeText={setName}
                        />

                        {/* Email — harus ada @ */}
                        <TextInput
                            placeholder="Email"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={(t) => { setEmail(t); setEmailError('') }}
                            error={emailError}
                        />

                        {/* Password — minimal 8 karakter */}
                        <TextInput
                            placeholder="Password"
                            secureTextEntry
                            value={password}
                            onChangeText={(t) => { setPassword(t); setPasswordError('') }}
                            error={passwordError}
                        />

                        {/* Konfirmasi password — harus sama dengan password */}
                        <TextInput
                            placeholder="Konfirmasi Password"
                            secureTextEntry
                            value={confirmPassword}
                            onChangeText={(t) => { setConfirmPassword(t); setConfirmPasswordError('') }}
                            error={confirmPasswordError}
                        />

                        <ButtonPrimary
                            title="Daptar"
                            color="#5CBB5C"
                            onPress={() => { if (validate()) router.push('/Start/Login') }}
                        />
                    </View>
                    <View style={{ bottom: 20, paddingHorizontal: 39 }}>
                        <Text style={{ color: 'black', fontWeight: 'normal', fontSize: 15, textAlign: 'center', paddingBottom: 10, marginBottom: 10 }}>Sudah punya akun? <Text onPress={() => router.push("/Start/Login")} style={{ color: '#5CBB5C', fontWeight: 'normal', textDecorationLine: 'underline' }}>Masuk</Text></Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}