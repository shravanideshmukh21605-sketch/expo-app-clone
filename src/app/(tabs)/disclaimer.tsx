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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function DisclaimerScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header - Consistent with your other menu pages */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#1A1D1F" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Disclaimer</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General Disclaimer</Text>
          <Text style={styles.contentText}>
            The information provided on this platform is for educational purposes only. Pure Frame Labs Pvt Ltd is not a SEBI registered Research Analyst nor is it a SEBI registered investment advisor. We do not recommend any stocks.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Investment Risks</Text>
          <Text style={styles.contentText}>
            Investments in unlisted shares and mutual funds are subject to market risks. We strongly advise investors not to approach Unlisted Shares with a trading mindset or the expectation of short-term exits. These investments are best suited for those with a long-term horizon as they typically have limited liquidity.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Accuracy</Text>
          <Text style={styles.contentText}>
            Pricing of Unlisted Shares is determined on the basis of demand and supply from various brokers. Pure Frame Labs Pvt Ltd sources price data from multiple sources and updates it on the platform so you can track market value, but we do not guarantee the real-time accuracy of these prices.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>KYC and Documentation</Text>
          <Text style={styles.contentText}>
            Pure Frame Labs Pvt Ltd shall not be responsible in the event any discrepancy is found in the information provided by the user. Mismatches in PAN or bank details shall lead to the rejection for opening of the account.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security Notice</Text>
          <Text style={styles.contentText}>
            While we strive to use commercially acceptable means to protect your personal information, including AES-256 encryption, we cannot guarantee its absolute security.
          </Text>
        </View>

        {/* Professional Footer from your images */}
        <View style={styles.encryptionFooter}>
          <Ionicons name="shield-checkmark" size={20} color="#8892A3" />
          <Text style={styles.encryptionText}>
            All data stored is encrypted by DEKs, which use AES-256
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 
  },
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
  section: { marginTop: 25 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1D1F',
    marginBottom: 10,
  },
  contentText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#444',
  },
  encryptionFooter: {
    marginTop: 40,
    padding: 20,
    backgroundColor: '#F8F9FB',
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  encryptionText: {
    fontSize: 12,
    color: '#8892A3',
    marginLeft: 10,
    textAlign: 'center',
  },
});