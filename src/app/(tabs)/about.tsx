import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AboutUs() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#1A1D1F" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About Us</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Redefining Investments</Text>
          <Text style={styles.heroSub}>Your gateway to high-potential Unlisted Shares and Mutual Funds.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Mission</Text>
          <Text style={styles.contentText}>
            At Pure Frame Labs Pvt Ltd, we aim to democratize access to investment opportunities that were previously reserved for institutional investors. We provide a transparent, secure, and easy-to-use platform for individual investors to participate in the growth story of India's most promising companies.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why Choose Us?</Text>
          <View style={styles.featureItem}>
            <Ionicons name="shield-checkmark-outline" size={24} color="#D32F2F" />
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Secure & Encrypted</Text>
              <Text style={styles.featureDesc}>All data is encrypted by DEKs using AES-256 standards.</Text>
            </View>
          </View>
          
          <View style={styles.featureItem}>
            <Ionicons name="flash-outline" size={24} color="#D32F2F" />
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Seamless KYC</Text>
              <Text style={styles.featureDesc}>Digital-first 6-step verification process including PAN and DigiLocker integration.</Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Ionicons name="trending-up-outline" size={24} color="#D32F2F" />
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Expert Insights</Text>
              <Text style={styles.featureDesc}>In-depth information and research reports to help you make informed decisions.</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Process</Text>
          <Text style={styles.contentText}>
            We follow a rigorous verification process to ensure every user is compliant with regulatory norms. From PAN verification to linking your demat and bank accounts, we ensure your investment journey is legally sound and operationally efficient.
          </Text>
        </View>

        <View style={styles.encryptionFooter}>
          <Ionicons name="shield-checkmark" size={20} color="#8892A3" />
          <Text style={styles.encryptionText}>
            Built with Love in India. ©2026 Pure Frame Labs Pvt Ltd.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  backBtn: { padding: 5 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#1A1D1F' },
  scrollContent: { paddingBottom: 40, paddingHorizontal: 20 },
  heroSection: {
    paddingVertical: 40,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  heroTitle: { fontSize: 26, fontWeight: '800', color: '#1A1D1F', textAlign: 'center' },
  heroSub: { fontSize: 14, color: '#8892A3', textAlign: 'center', marginTop: 10, lineHeight: 20 },
  section: { marginTop: 30 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1A1D1F', marginBottom: 12 },
  contentText: { fontSize: 14, lineHeight: 22, color: '#444' },
  featureItem: { flexDirection: 'row', marginBottom: 20, alignItems: 'flex-start' },
  featureText: { marginLeft: 15, flex: 1 },
  featureTitle: { fontSize: 16, fontWeight: '600', color: '#1A1D1F' },
  featureDesc: { fontSize: 13, color: '#8892A3', marginTop: 4, lineHeight: 18 },
  encryptionFooter: {
    marginTop: 50,
    padding: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  encryptionText: { fontSize: 12, color: '#8892A3', marginLeft: 10 },
});