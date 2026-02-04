import { PhoneCall } from 'lucide-react-native';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ShareCard from '../src/components/ShareCard';

export default function UnlistedSharesScreen() {
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

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {['Live', 'Upcoming', 'Historical'].map((tab) => (
          <TouchableOpacity 
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* LIVE TAB - Image 1 */}
        {activeTab === 'Live' && (
          <View>
            <ShareCard 
              logo="MSE"
              name="Metropolitan Stock Exchange of India Ltd"
              type="Exchange"
              price="6.35"
              minUnits="400"
              marketCap="6,985.14 Cr"
            />
            <ShareCard 
              logo="NSE"
              name="National Stock Exchange Ltd (NSE)"
              type="Exchange"
              price="2,095 - 2,125"
              minUnits="2"
              marketCap="5,25,937.50 Cr"
              peRatio="43.16"
            />
          </View>
        )}

        {/* UPCOMING TAB - Image 3 */}
        {activeTab === 'Upcoming' && (
          <View>
            <ShareCard 
              logo="Nayara"
              name="Nayara Energy Ltd"
              type="Energy"
              price="1,300"
              minUnits="20"
              marketCap="1,93,772.95 Cr"
              peRatio="31.86"
            />
            <ShareCard 
              logo="Boat"
              name="Imagine Marketing Ltd (Boat)"
              type="Electronics"
              price="1,250"
              minUnits="4"
              marketCap="12,012.04 Cr"
              peRatio="119.50"
            />
          </View>
        )}

        {/* HISTORICAL TAB - Image 4 */}
        {activeTab === 'Historical' && (
          <View>
            <ShareCard 
              logo="Swiggy"
              name="Swiggy Limited"
              type="Listed • Food Delivery"
              price="313"
              minUnits="25"
              marketCap="66,356.00 Cr"
            />
            <ShareCard 
              logo="HDB"
              name="HDB Financial Services Ltd"
              type="Listed • Financial Services"
              price="696"
              minUnits="1"
              marketCap="55,386.03 Cr"
              peRatio="25.48"
            />
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fcfcfc' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
    paddingTop: 10, 
    paddingBottom: 15,
    alignItems: 'center' 
  },
  headerTitle: { fontSize: 22, fontWeight: 'bold' },
  expertBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#f0f0f0', 
    paddingHorizontal: 12, 
    paddingVertical: 8, 
    borderRadius: 20 
  },
  expertText: { marginLeft: 5, fontSize: 13, fontWeight: '600' },
  tabContainer: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#eee' },
  tab: { flex: 1, paddingVertical: 15, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'transparent' },
  activeTab: { borderBottomColor: '#d32f2f' },
  tabText: { color: '#757575', fontSize: 14 },
  activeTabText: { color: '#d32f2f', fontWeight: 'bold' },
  content: { padding: 15 }
});