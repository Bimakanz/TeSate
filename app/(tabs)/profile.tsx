import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import FormInput from '@/components/TextInput' 

export default function Akun() {
  return (
    <View style={styles.container}>
      {/* Bagian Atas Yaww: Background Sate */}
      <ImageBackground 
        source={require('../../assets/images/satewal.jpeg')} 
        style={styles.headerBackground}
      >
        <SafeAreaView style={styles.headerNav}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="settings-outline" size={28} color="white" />
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>

      {/* Bagian Bawah: Konten Putih */}
      <View style={styles.contentCard}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          {/* Form Section */}
          <View style={styles.formGroup}>
            <FormInput placeholder="Nama Lengkap" />
            <FormInput placeholder="Email" />
            <FormInput placeholder="Alamat" />
            <FormInput placeholder="Kata Sandi" secureTextEntry={true} />
          </View>

          {/* Menu Links */}
          <View style={styles.menuSection}>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Kebijakan dan Privasi</Text>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Riwayat Order</Text>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.btn, styles.btnEdit]}>
              <Text style={styles.btnText}>Edit Profile</Text>
              <MaterialCommunityIcons name="pencil-outline" size={20} color="white" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.btn, styles.btnKeluar]}
              onPress={() => router.replace('/Login')}
            >
              <Text style={styles.btnText}>Keluar</Text>
              <MaterialCommunityIcons name="logout" size={20} color="white" />
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerBackground: {
    width: '100%',
    height: 200,
  },
  headerNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  contentCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -50, 
    paddingHorizontal: 25,
  },
  scrollContent: {
    paddingTop: 40,
    paddingBottom: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  menuSection: {
    marginVertical: 10,
    marginBottom: 40,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 0, 
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 12,
    width: '48%',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  btnEdit: {
    backgroundColor: '#333333',
  },
  btnKeluar: {
    backgroundColor: '#B80F3B', 
  },
  btnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 8,
  }
})