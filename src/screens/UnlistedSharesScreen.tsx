import { PhoneCall } from 'lucide-react-native';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ShareCard from '../components/ShareCard';

const UnlistedSharesScreen = () => {
  // State to manage which tab is selected
  const [activeTab, setActiveTab] = useState('Live');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Unlisted Shares</Text>
        <TouchableOpacity style={styles.expertBtn}>
          <PhoneCall size={16} color="black" />
          <Text style={styles.expertText}>Ask an expert</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs - Make sure each tab has a unique key and onPress */}
      <View style={styles.tabContainer}>
        {['Live', 'Upcoming', 'Historical'].map((tab) => (
          <TouchableOpacity 
            key={tab}
            activeOpacity={0.7}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)} // This updates the state
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Render "Live" Cards */}
        {activeTab === 'Live' && (
          <View>
            <ShareCard 
              logo="MSE"
              name="Metropolitan Stock Exchange of India Ltd"
              type="Exchange"
              price="₹6.35"
              minUnits="400"
              marketCap="₹6,985.14 Cr"
            />
            <ShareCard 
              logo="NSE"
              name="National Stock Exchange Ltd (NSE)"
              type="Exchange"
              price="₹2,095 - ₹2,125"
              minUnits="2"
              marketCap="₹5,25,937.50 Cr"
              peRatio="43.16"
            />
          </View>
        )}

        {/* Render "Upcoming" Cards (Based on your img3.jpeg) */}
        {activeTab === 'Upcoming' && (
          <View>
            <ShareCard 
              logo="Nayara"
              name="Nayara Energy Ltd"
              type="Energy"
              price="₹1,300"
              minUnits="20"
              marketCap="₹1,93,772.95 Cr"
              peRatio="31.86"
            />
            <ShareCard 
              logo="Boat"
              name="Imagine Marketing Ltd (Boat)"
              type="Electronics"
              price="₹1,250"
              minUnits="4"
              marketCap="₹12,012.04 Cr"
              peRatio="119.50"
            />
          </View>
        )}

        {/* Render "Historical" Empty State */}
        {activeTab === 'Historical' && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No historical shares found.</Text>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fcfcfc' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
    paddingTop: 15,
    paddingBottom: 10,
    alignItems: 'center' 
  },
  headerTitle: { fontSize: 22, fontWeight: '600' },
  expertBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#f0f0f0', 
    paddingHorizontal: 12, 
    paddingVertical: 8, 
    borderRadius: 20 
  },
  expertText: { marginLeft: 6, fontSize: 13, fontWeight: '500' },
  
  tabContainer: { 
    flexDirection: 'row', 
    borderBottomWidth: 1, 
    borderBottomColor: '#eee',
    marginTop: 10
  },
  tab: { 
    flex: 1, 
    paddingVertical: 15, 
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent'
  },
  activeTab: { 
    borderBottomColor: '#d32f2f' // Red underline for active tab
  },
  tabText: { color: '#888', fontSize: 15, fontWeight: '500' },
  activeTabText: { color: '#d32f2f', fontWeight: 'bold' },
  
  content: { padding: 15 },
  emptyContainer: { alignItems: 'center', marginTop: 100 },
  emptyText: { color: '#999', fontSize: 16 }
});

export default UnlistedSharesScreen;