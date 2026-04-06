import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export default function ButtonPrimary({ title, color, onPress }: any) {
    return (
        <View style={{ paddingVertical:5, paddingHorizontal:40 }}>
            <TouchableOpacity onPress={onPress} style={{ padding: 16, backgroundColor: color, borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.50, shadowRadius: 3.84, elevation: 5, marginBottom:10 }}>
                <Text style={{ color: 'white', fontWeight: 'normal', fontSize: 16, textAlign: 'center' }}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}   