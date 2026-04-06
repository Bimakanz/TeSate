import { MaterialIcons } from '@expo/vector-icons'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { router } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

type TabItem = {
    name: string
    label: string
    icon: keyof typeof MaterialIcons.glyphMap
}

const TABS: TabItem[] = [
    { name: 'index', label: 'Home', icon: 'home' },
    { name: 'information', label: 'Information', icon: 'info' },
    { name: 'cart', label: '', icon: 'shopping-cart' },        // center cart
    { name: 'notification', label: 'Notification', icon: 'notifications' },
    { name: 'profile', label: 'Profile', icon: 'person' },
]

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    const activeIndex = state.index

    // Map route names to our tab order
    const routeNames = state.routes.map(r => r.name)

    return (
        <View style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            height: 64,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.08,
            shadowRadius: 6,
            elevation: 10,
        }}>
            {TABS.map((tab, i) => {
                const routeIndex = routeNames.indexOf(tab.name)
                const isActive = routeIndex !== -1 && state.index === routeIndex
                const isCart = tab.name === 'cart'

                return (
                    <TouchableOpacity
                        key={tab.name}
                        onPress={() => {
                            if (routeIndex !== -1) {
                                navigation.navigate(tab.name)
                            }
                        }}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {isCart ? (
                            // Floating cart button
                            <View style={{
                                width: 54,
                                height: 54,
                                borderRadius: 27,
                                backgroundColor: '#5CBB5C',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 28,
                                shadowColor: '#5CBB5C',
                                shadowOffset: { width: 0, height: 4 },
                                shadowOpacity: 0.4,
                                shadowRadius: 6,
                                elevation: 8,
                            }}>
                                <MaterialIcons name="shopping-cart" size={24} color="white" />
                            </View>
                        ) : (
                            <>
                                <MaterialIcons
                                    name={tab.icon}
                                    size={24}
                                    color={isActive ? '#5CBB5C' : '#aaa'}
                                />
                                <Text style={{
                                    fontSize: 10,
                                    marginTop: 2,
                                    color: isActive ? '#5CBB5C' : '#aaa',
                                }}>
                                    {tab.label}
                                </Text>
                            </>
                        )}
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}
