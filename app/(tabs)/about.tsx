import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Change "Placeholder" to the specific page name (e.g., Privacy Policy)
export default function InfoScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flexDirection: 'row', padding: 20, alignItems: 'center' }}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} /></TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 20 }}>Information Page</Text>
      </View>
      <ScrollView style={{ padding: 20 }}>
        <Text style={{ fontSize: 16, lineHeight: 24, color: '#333' }}>
          Your content for this section goes here...
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}