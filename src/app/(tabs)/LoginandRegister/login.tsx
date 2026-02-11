import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  SafeAreaView, 
  ActivityIndicator, 
  ScrollView 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import axios from 'axios';

// Ensuring path matches your Usercontext location
import { useUser } from '../Usercontext';
import styles from './style'; 

export default function LoginPage() {
  const router = useRouter();
  const { login } = useUser();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    // Basic validation to prevent empty clicks
    if (!email || !password) {
      return Alert.alert("Required", "Please fill in all fields.");
    }

    setLoading(true);
    try {
      // Connects to your Node.js backend on your Mac M2
      const res = await axios.post('http://192.168.1.30:5001/login-user', { 
        email: email.trim(), 
        password: password 
      });
      
      if (res.data.status === 'ok') {
        // 1. Update Global Context with User Data & Token
        await login(res.data.user, res.data.token);
        
        // 2. Clear stack and navigate to the Home/Profile screen
        // Using replace ensures the user can't "Go Back" to login after success
        router.replace('/(tabs)'); 
      } else {
        Alert.alert("Authentication Failed", res.data.message || "Invalid credentials.");
      }
    } catch (error) {
      // Common error if the Mac IP has changed or server is down
      Alert.alert(
        "Connection Error", 
        "Cannot reach the server. Please check your network and Mac IP address."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer} 
        keyboardShouldPersistTaps="always"
      >
        {/* Top Navigation */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close" size={28} color="#1A1D1F" />
          </TouchableOpacity>
        </View>

        {/* Branding Section */}
        <View style={styles.logoSection}>
          <Text style={styles.welcomeText}>Welcome Back</Text>
          <Text style={styles.subText}>Securely manage your InCred portfolio</Text>
        </View>

        {/* Login Form */}
        <View style={styles.formCard}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>EMAIL ID</Text>
            <View style={styles.inputWrapper}>
              <FontAwesome name="envelope-o" size={18} color="#8892A3" />
              <TextInput 
                placeholder="name@example.com" 
                style={styles.input} 
                onChangeText={setEmail} 
                autoCapitalize="none"
                keyboardType="email-address" 
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>PASSWORD</Text>
            <View style={styles.inputWrapper}>
              <FontAwesome name="lock" size={20} color="#8892A3" />
              <TextInput 
                placeholder="••••••••" 
                secureTextEntry 
                style={styles.input} 
                onChangeText={setPassword} 
              />
            </View>
          </View>

          {/* Proceed Button */}
          <TouchableOpacity 
            style={[styles.primaryBtn, { opacity: loading ? 0.8 : 1 }]} 
            onPress={handleSignIn} 
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.primaryBtnText}>Sign In</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Redirect to Register */}
        <View style={styles.footer}>
          <Text style={{ color: '#8892A3' }}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => router.push('/LoginandRegister/register')}>
            <Text style={{ color: '#D32F2F', fontWeight: 'bold', marginLeft: 5 }}>
              Register Now
            </Text>
          </TouchableOpacity>
        </View>

        {/* Professional Encrypted Footer */}
        <View style={{ marginTop: 40, alignItems: 'center', paddingHorizontal: 40 }}>
           <Ionicons name="shield-checkmark-outline" size={16} color="#8892A3" />
           <Text style={{ fontSize: 10, color: '#8892A3', textAlign: 'center', marginTop: 5 }}>
             All data stored is encrypted by DEKs, which use AES-256
           </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}