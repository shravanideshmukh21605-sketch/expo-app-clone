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

export default function TermsAndConditions() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header - Matching faqs.tsx and privacy.tsx */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#1A1D1F" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms and Conditions</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
          <Text style={styles.contentText}>
            By accessing and using the Pure Frame Labs Pvt Ltd application, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services. We reserve the right to update these terms at any time without prior notice.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. User Account and Security</Text>
          <Text style={styles.contentText}>
            You are responsible for maintaining the confidentiality of your login credentials, including your email ID and password. You agree to notify us immediately of any unauthorized use of your account. Pure Frame Labs Pvt Ltd shall not be responsible for any loss arising from your failure to protect your account.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Intellectual Property</Text>
          <Text style={styles.contentText}>
            You agree that all intellectual property, including but not limited to copyright, trade mark, any personal information, content, photographs, images, experience sharing, feedback, or opinions voluntarily shared by you on the Site are not infringing of any rights of third parties.
          </Text>
          <Text style={styles.contentText}>
            You give us unrestricted, perpetual right of use of your such intellectual property for any purpose whatsoever.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Regulatory Compliance</Text>
          <Text style={styles.contentText}>
            Personal Information, including date of birth and Permanent Account Number (PAN) and other information, is required in accordance with the KYC norms and regulatory requirements.
          </Text>
          <Text style={styles.contentText}>
            We need physical evidence of your personal details like PAN, cancelled cheque etc. to satisfy regulatory requirements while your bank details are required to honour your investment instructions.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Accuracy of Information</Text>
          <Text style={styles.contentText}>
            Pure Frame Labs Pvt Ltd shall not be responsible, in the event, any discrepancy is found, in any of the information provided by the user, such as, mismatch of the information provided, shall lead to the rejection for opening of the account.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Limitations of Service</Text>
          <Text style={styles.contentText}>
            No method of transmission over the internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
          </Text>
        </View>

        {/* Professional Encryption Footer - Matches your KYC screens */}
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
    marginBottom: 10,
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