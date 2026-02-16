import { FontAwesome, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

// Import BASE_URL from your config file
import { BASE_URL } from '../../../constants/config';
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
    // Basic validation
    if (!email || !password) {
      return Alert.alert("Required", "Please fill in all fields.");
    }

    setLoading(true);
    try {
      // Using BASE_URL from config.js
      const apiUrl = `${BASE_URL}/login-user`; 
      
      const res = await axios.post(apiUrl, { 
        email: email.trim().toLowerCase(), 
        password: password 
      });
      
      console.log("Login Response:", res.data); 

      if (res.data.status === 'ok') {
        // 2. SUCCESS: Sync with Global Context
        // Passing user data from response to login function
        await login(res.data.user, res.data.token);
        
        Alert.alert("Success", "Login Successful!");
        
        // 3. NAVIGATION: Moving to the main tabs
        router.replace('/(tabs)'); 
      } else {
        // Backend sends error message in 'data' field
        Alert.alert("Authentication Failed", res.data.data || "Invalid credentials.");
      }
    } catch (error) {
      console.log("Login Error Details:", error);
      Alert.alert(
        "Connection Error", 
        `Cannot reach the server at ${BASE_URL}. Please check your network.`
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
                placeholderTextColor="#8892A3"
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
                placeholderTextColor="#8892A3"
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

        {/* Professional Footer */}
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