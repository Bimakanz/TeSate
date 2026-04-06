import React from 'react'
import { Image, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ButtonPrimary from '@/components/ButtonPrimary'
import { router } from 'expo-router'

export default function Pesen() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1 }}>
                <Image source={require('@/assets/images/sateh1.png')} width={350} height={250} style={{ alignSelf: 'center', marginTop: 80, width: 350, height: 250, resizeMode: 'contain' }} />
                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 35, textAlign: 'center', paddingBottom: 10, marginBottom: 10 }}>Pet Cepet,{'\n'}Sen Pesen !</Text>
                <Text style={{ color: 'black', fontWeight: 'normal', fontSize: 15, textAlign: 'center', paddingBottom: 10, marginBottom: 10 }}>Pengantaran ke rumah, dan {'\n'} reservasi online untuk sate Cak Awih</Text>
                <ButtonPrimary title="Pesen Sekarang!" color="#5CBB5C" onPress={() => router.push("/(tabs)")} />
                <Text style={{ color: 'black', fontWeight: 'normal', fontSize: 15, textAlign: 'center', paddingBottom: 10, marginBottom: 10 }}>Sudah punya akun? <Text onPress={() => router.push("/Start/Login")} style={{ color: '#5CBB5C', fontWeight: 'normal', textDecorationLine: 'underline' }}>Masuk</Text></Text>
            </View>

        </SafeAreaView>
    )
}