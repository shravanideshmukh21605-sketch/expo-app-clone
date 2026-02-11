import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Platform, StatusBar } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useUser } from './Usercontext';

export default function MoreScreen() {
  const router = useRouter();
  const { user, logout } = useUser();

  const menuItems = [
  { id: 'profile', label: user?.fullName || 'Profile', subLabel: 'Profile', icon: 'account-circle-outline', route: '/profile', type: 'mc' },
  { id: 'milestones', label: 'Milestones', icon: 'star-check-outline', route: '/portfolio', type: 'mc' },
  { id: 'refer', label: 'Refer & Rewards', icon: 'account-group-outline', route: '/refer', type: 'mc' },
  { id: 'reports', label: 'Reports', icon: 'file-document-outline', route: '/reports', type: 'mc' },
  { id: 'blogs', label: 'Blogs', icon: 'notebook-outline', route: '/blogs', type: 'mc' },
  { id: 'faqs', label: 'General FAQs', icon: 'file-outline', route: '/faqs', type: 'mc' },
  { id: 'privacy', label: 'Privacy Policy', icon: 'shield-check-outline', route: '/privacy', type: 'mc' },
  { id: 'terms', label: 'Terms and Conditions', icon: 'file-text-outline', route: '/terms', type: 'mc' },
  { id: 'disclaimer', label: 'Disclaimer', icon: 'alert-circle-outline', route: '/disclaimer', type: 'mc' },
  { id: 'about', label: 'About Us', icon: 'fingerprint', route: '/about', type: 'mc' },
  { id: 'contact', label: 'Contact Us', icon: 'phone-outline', route: '/contact', type: 'mc' },
];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        
        {menuItems.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.menuItem} 
            onPress={() => router.push(item.route as any)}
          >
            <View style={styles.iconCircle}>
              <MaterialCommunityIcons name={item.icon as any} size={24} color="#1A1D1F" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.label}>{item.label}</Text>
              {item.subLabel && <Text style={styles.subLabel}>{item.subLabel}</Text>}
            </View>
            <Ionicons name="chevron-forward" size={20} color="#1A1D1F" />
          </TouchableOpacity>
        ))}

        {/* Logout Button */}
        <TouchableOpacity style={styles.menuItem} onPress={logout}>
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons name="logout" size={24} color="#1A1D1F" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.label}>Logout</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#1A1D1F" />
        </TouchableOpacity>

        <View style={styles.versionContainer}>
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons name="information-outline" size={24} color="#1A1D1F" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.label}>1.98.0</Text>
            <Text style={styles.subLabel}>App Version</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 18, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
  iconCircle: { width: 45, height: 45, borderRadius: 22.5, backgroundColor: '#F8F9FB', justifyContent: 'center', alignItems: 'center' },
  textContainer: { flex: 1, marginLeft: 15 },
  label: { fontSize: 16, fontWeight: '500', color: '#1A1D1F' },
  subLabel: { fontSize: 13, color: '#8892A3', marginTop: 2 },
  versionContainer: { flexDirection: 'row', alignItems: 'center', paddingVertical: 18, paddingHorizontal: 20, opacity: 0.7 }
});