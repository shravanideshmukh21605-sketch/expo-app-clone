import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, ScrollView, TouchableOpacity, 
  SafeAreaView, Platform, StatusBar, Dimensions 
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

// EXPERIENCED DEVELOPER TIP: Use a data object to toggle between "History" and "Empty"
const USER_DATA = {
  shares: [], // Empty array triggers the "Start Exploring" view
  gold: [],
  fds: [],
};

export default function PortfolioScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Overall');

  const tabs = ['Overall', 'Mutual Funds', 'Shares', 'FDs', 'Gold & Silver', 'Bonds'];

  const renderContent = () => {
    switch (activeTab) {
      case 'Mutual Funds':
        return (
          <EmptyState 
            icon={<Ionicons name="heart-outline" size={60} color="#FF5252" />}
            title="Get a health check on your mutual funds"
            btnText="Sync & analyze"
            onPress={() => console.log("Sync logic")}
          />
        );
      case 'Shares':
        return USER_DATA.shares.length > 0 ? (
          <Text>Show History List Here</Text> 
        ) : (
          <EmptyState 
            icon={<MaterialCommunityIcons name="chart-areaspline" size={60} color="#D32F2F" />}
            title="Buy your first unlisted share!"
            subtitle="Get 0.25% off, plus an amazon voucher worth ₹200"
            btnText="Start exploring"
            onPress={() => router.push('/shares')}
          />
        );
      case 'FDs':
        return (
          <EmptyState 
            promoText="8.25%"
            title="Get incredible FD rates"
            subtitle="No bank account needed!"
            btnText="Start Exploring"
            onPress={() => router.push('/gold')} // Navigate to appropriate investment page
          />
        );
      case 'Gold & Silver':
        return (
          <EmptyState 
            icon={<MaterialCommunityIcons name="gold" size={60} color="#D4AF37" />}
            title="Invest in 24K Digital Gold"
            subtitle="Get started with just ₹10"
            btnText="Start exploring"
            onPress={() => router.push('/gold')}
          />
        );
      case 'Bonds':
        return (
          <View style={styles.biddContainer}>
            <View style={styles.biddHeader}>
               <Text style={styles.incredBrand}>Pure Frame Labs Pvt Ltd</Text>
               <Ionicons name="arrow-forward" size={16} color="#888" />
               <Text style={styles.biddBrand}>BIDD</Text>
            </View>
            <Text style={styles.biddTitle}>Access your bonds portfolio on our platform, Bidd</Text>
            <TouchableOpacity style={styles.mainBtn} onPress={() => console.log("External Link")}>
              <Text style={styles.mainBtnText}>Proceed to Bidd</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return <Text style={styles.placeholderText}>Select a category to view portfolio</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Portfolio</Text>
        <TouchableOpacity style={styles.expertBtn}>
          <Ionicons name="call-outline" size={16} color="#555" />
          <Text style={styles.expertText}>Ask an expert</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabBar}>
        {tabs.map(tab => (
          <TouchableOpacity 
            key={tab} 
            onPress={() => setActiveTab(tab)}
            style={[styles.tabItem, activeTab === tab && styles.activeTab]}
          >
            <Text style={[styles.tabLabel, activeTab === tab && styles.activeTabLabel]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.content}>
        {renderContent()}
      </ScrollView>
    </SafeAreaView>
  );
}

// Reusable Empty State Component
const EmptyState = ({ icon, title, subtitle, btnText, onPress, promoText }: any) => (
  <View style={styles.emptyCard}>
    {promoText && <View style={styles.promoBadge}><Text style={styles.promoValue}>{promoText}</Text></View>}
    {icon && <View style={styles.iconBg}>{icon}</View>}
    <Text style={styles.emptyTitle}>{title}</Text>
    {subtitle && <Text style={styles.emptySubtitle}>{subtitle}</Text>}
    <TouchableOpacity style={styles.mainBtn} onPress={onPress}>
      <Text style={styles.mainBtnText}>{btnText}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  headerTitle: { fontSize: 24, fontWeight: 'bold' },
  expertBtn: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#EEE', borderRadius: 20, padding: 8 },
  expertText: { fontSize: 12, marginLeft: 5 },
  tabBar: { paddingLeft: 20, maxHeight: 50 },
  tabItem: { paddingHorizontal: 15, paddingVertical: 8, marginRight: 10, borderRadius: 20, backgroundColor: '#F5F5F5' },
  activeTab: { backgroundColor: '#D32F2F' },
  tabLabel: { color: '#888', fontWeight: '600' },
  activeTabLabel: { color: '#fff' },
  content: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  emptyCard: { alignItems: 'center', width: '100%' },
  iconBg: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#F9F9F9', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  promoBadge: { width: 120, height: 120, borderWidth: 1, borderColor: '#EEE', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  promoValue: { fontSize: 28, fontWeight: 'bold' },
  emptyTitle: { fontSize: 18, fontWeight: '700', textAlign: 'center', marginBottom: 10 },
  emptySubtitle: { fontSize: 14, color: '#888', textAlign: 'center', marginBottom: 30 },
  mainBtn: { backgroundColor: '#D32F2F', width: '100%', padding: 18, borderRadius: 30, alignItems: 'center' },
  mainBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  biddContainer: { width: '100%', alignItems: 'center' },
  biddHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  incredBrand: { fontWeight: 'bold', color: '#003399' },
  biddBrand: { fontWeight: 'bold', marginLeft: 10 },
  biddTitle: { fontSize: 16, textAlign: 'center', marginBottom: 30, color: '#444' },
  placeholderText: { color: '#AAA' }
});