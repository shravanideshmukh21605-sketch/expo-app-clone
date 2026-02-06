import { useRouter } from 'expo-router'; // 1. Router import karein
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ShareCardProps {
  name: string;
  type: string;
  price: string;
  minUnits: string;
  marketCap: string;
  logo: string;
  peRatio?: string;
}

export default function ShareCard({ name, type, price, minUnits, marketCap, logo, peRatio }: ShareCardProps) {
  const router = useRouter(); // 2. Router hook initialize karein

  // 3. Navigation function
  const handlePress = () => {
    router.push({
      pathname: '/details',
      params: { 
        name: name,
        price: price 
      }
    });
  };

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.logoPlaceholder}>
          <Text style={{ fontWeight: 'bold' }}>{logo}</Text>
        </View>
        <View style={{ marginLeft: 12, flex: 1 }}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.type}>{type}</Text>
        </View>
      </View>

      <View style={styles.grid}>
        <View>
          <Text style={styles.label}>{peRatio ? "Price Range" : "Price Per Share"}</Text>
          <Text style={styles.value}>{price}</Text>
        </View>
        <View>
          <Text style={styles.label}>Min. Units</Text>
          <Text style={styles.value}>{minUnits}</Text>
        </View>
      </View>

      <View style={styles.grid}>
        <View>
          <Text style={styles.label}>Market Cap</Text>
          <Text style={styles.value}>{marketCap}</Text>
        </View>
        {peRatio && (
          <View>
            <Text style={styles.label}>PE(x)</Text>
            <Text style={styles.value}>{peRatio}</Text>
          </View>
        )}
      </View>

      {/* 4. OnPress event add karein */}
      <TouchableOpacity style={styles.btn} onPress={handlePress}>
        <Text style={styles.btnText}>View details</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { 
    backgroundColor: '#fff', 
    padding: 20, 
    borderRadius: 15, 
    marginBottom: 15, 
    elevation: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 2, 
    borderWidth: 1, 
    borderColor: '#efefef' 
  },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  logoPlaceholder: { 
    width: 45, 
    height: 45, 
    backgroundColor: '#f0f0f0', 
    borderRadius: 8, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  name: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  type: { fontSize: 12, color: '#888' },
  grid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  label: { fontSize: 12, color: '#999' },
  value: { fontSize: 15, fontWeight: 'bold', marginTop: 4 },
  btn: { 
    backgroundColor: '#d32f2f', 
    padding: 12, 
    borderRadius: 25, 
    alignItems: 'center' 
  },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 }
});