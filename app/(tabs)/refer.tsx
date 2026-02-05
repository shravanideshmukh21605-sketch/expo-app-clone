import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ReferScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} /></TouchableOpacity>
        <Text style={styles.headerTitle}>Refer & Rewards</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.content}>
        <Ionicons name="gift-outline" size={100} color="#FF3D00" />
        <Text style={styles.title}>Refer your friends</Text>
        <Text style={styles.desc}>Earn up to ₹10,000 for every successful referral.</Text>
        <TouchableOpacity style={styles.btn}><Text style={styles.btnText}>Share Link</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 30 },
  title: { fontSize: 22, fontWeight: 'bold', marginTop: 20 },
  desc: { textAlign: 'center', color: '#888', marginVertical: 15 },
  btn: { backgroundColor: '#FF3D00', paddingVertical: 15, paddingHorizontal: 40, borderRadius: 30 },
  btnText: { color: '#fff', fontWeight: 'bold' }
});