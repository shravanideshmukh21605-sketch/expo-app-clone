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

export default function PrivacyPolicy() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#1A1D1F" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.section}>
          <Text style={styles.contentText}>
            We at Pure Frame Labs Pvt Ltd, promise to protect your personal data from unauthorised access, misuse, and disclosure using the right security measures based on the type of data and how we are processing the same.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What information we collect and why</Text>
          <Text style={styles.contentText}>
            We collect two types of information from our registered users and visitors. The first is information that we gather through aggregated tracking information derived about our users through the website.
          </Text>
          <Text style={styles.contentText}>
            The second is information that registered users provide through optional, voluntary submissions such as:
          </Text>
          <View style={styles.listContainer}>
            <Text style={styles.listItem}>1. Name and Contact Information, including email address, third party account credentials etc.</Text>
            <Text style={styles.listItem}>2. Personal Information, including date of birth and Permanent Account Number (PAN) and other information required in accordance with the KYC norms and regulatory requirements.</Text>
            <Text style={styles.listItem}>3. Demographic Information such as gender and income.</Text>
            <Text style={styles.listItem}>4. Other information that can help us improve our services.</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>We require this information</Text>
          <View style={styles.listContainer}>
            <Text style={styles.listItem}>1. To perform compliance checks and internal record keeping.</Text>
            <Text style={styles.listItem}>2. To use the information to improve our products and services.</Text>
            <Text style={styles.listItem}>3. To periodically send emails to your registered email address about new products, special offers, or other information which we think you may find interesting.</Text>
            <Text style={styles.listItem}>4. You are free to unsubscribe your email address at any time.</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Website usage</Text>
          <Text style={styles.contentText}>
            1. When you visit our website we use "cookies" or other similar web tools to enhance the user experience. These tools enable us to maintain your web session while you browse the site as well as helping us provide you with a better, more personalized experience.
          </Text>
          <Text style={styles.contentText}>
            2. Pure Frame Labs Pvt Ltd automatically receives and records information on our server logs from your browser including your IP address, Pure Frame Labs Pvt Ltd cookie information and the pages you request.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What information do we disclose</Text>
          <Text style={styles.contentText}>
            We will not disclose the non-public personal information we collect about our registered users to anyone except:
          </Text>
          <View style={styles.listContainer}>
            <Text style={styles.listItem}>• To perform accounting or compliance with industry standards (e.g. professional licensing bodies, etc.).</Text>
            <Text style={styles.listItem}>• Our Information, account numbers, and balances, or as otherwise required by government agencies and other third parties by law.</Text>
            <Text style={styles.listItem}>• Authorized third party service providers, entities or third parties with whom we have tie-ups or service providers that help us with various products and services offered on our platform.</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Retention and Deletion</Text>
          <Text style={styles.contentText}>
            Retention of information collected: The information collected from you will be retained during the (i) validity of your Account and for the purpose of submission of such information, (ii) As consented by you while creating your user Account (iii) As required by any regulatory norms.
          </Text>
        </View>

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
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1D1F',
    marginBottom: 12,
  },
  contentText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#444',
    marginBottom: 10,
  },
  listContainer: { paddingLeft: 5 },
  listItem: {
    fontSize: 14,
    lineHeight: 22,
    color: '#444',
    marginBottom: 12,
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