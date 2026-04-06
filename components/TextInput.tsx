import React from 'react'
import { TextInput as RNTextInput, View, Text, TextInputProps, StyleSheet } from 'react-native'

interface InputProps extends TextInputProps {
    label?: string
    error?: string
}

export default function TextInput({ error, style, ...props }: InputProps) {
    return (
        <View style={styles.wrapper}>
            {error && <Text style={styles.errorText}>{error}</Text>}
            <RNTextInput
                style={[styles.input, error ? styles.inputError : null, style]}
                placeholderTextColor="#aaa"
                {...props}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 39,
        paddingVertical: 6,
        width: '100%',
        marginBottom: 10,
        shadowColor: '#000',

    },
    input: {
        padding: 12,
        backgroundColor: 'white',
        borderRadius: 10,
        width: '100%',
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 15,
        color: '#333',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    inputError: {
        borderColor: '#e53935',
    },
    errorText: {
        fontSize: 12,
        color: '#e53935',
        marginBottom: 6,
    },
})