import { Image } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function splash() {
    const router = useRouter();
    const fadeAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const timer = setTimeout(() => {
            // Start fade out animation
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start(() => {

                router.replace("/Pesen");
            });
        }, 4500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <LinearGradient
            colors={['#FFFFFF', '#FFFFFF', '#FFFFFF']}
            locations={[0, 0.5, 1]}
            style={{
                width: "100%",
                height: "100%",
                flex: 1,
            }}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <Animated.View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 15,
                        opacity: fadeAnim,
                    }}
                >
                    <Image source={require('@/assets/images/sateh1.png')} style={{ width: 400, height: 400, resizeMode: 'contain' }} />
                </Animated.View>
            </SafeAreaView>
        </LinearGradient>
    );
}