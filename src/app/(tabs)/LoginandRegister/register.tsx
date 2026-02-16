import { FontAwesome, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert, SafeAreaView,
  ScrollView,
  Text,
  TextInput, TouchableOpacity,
  View
} from 'react-native';

// Import BASE_URL from your config file
import { BASE_URL } from '../../../constants/config';
import styles from './style';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [userType, setUserType] = useState('User');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  
  const [panNumber, setPanNumber] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('Female');

  const handleRegister = async () => {
    if (!name || !email || !password || !mobile || !panNumber) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    setLoading(true);
    
    // Using BASE_URL from config.js
    const apiUrl = `${BASE_URL}/register`;

    const userData = {
      name, email, mobile, password,
      pan: panNumber,
      dob,
      gender
    };

    try {
      const res = await axios.post(apiUrl, userData);
      
      if (res.data.status === 'ok') {
        Alert.alert('Success', 'Account created!');
        router.replace('/LoginandRegister/login');
      } else {
        Alert.alert("Failed", res.data.data || "User already exists");
      }
    } catch (err) {
      Alert.alert("Connection Error", `Is your server running at ${BASE_URL}?`);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formCard}>
          <Text style={styles.welcomeText}>Join InCred</Text>
          
          <InputField label="Full Name" icon="user-o" placeholder="Enter Name" onChange={setName} />
          <InputField label="PAN Number" icon="card-outline" placeholder="ABCDE1234F" onChange={setPanNumber} isFeather />
          <InputField label="Email" icon="envelope-o" placeholder="email@test.com" onChange={setEmail} />
          <InputField label="Mobile" icon="mobile" placeholder="10 digits" onChange={setMobile} maxLength={10} />
          <InputField label="Password" icon="lock" placeholder="••••••••" onChange={setPassword} secure />

          <TouchableOpacity style={styles.primaryBtn} onPress={handleRegister} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.primaryBtnText}>Verify & Register</Text>}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const InputField = ({ label, icon, placeholder, onChange, secure, maxLength, isFeather }: any) => (
  <View style={styles.inputGroup}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputWrapper}>
      {isFeather ? <Ionicons name={icon} size={18} color="#8892A3" /> : <FontAwesome name={icon} size={18} color="#8892A3" />}
      <TextInput placeholder={placeholder} style={styles.input} onChangeText={onChange} secureTextEntry={secure} maxLength={maxLength} />
    </View>
  </View>
);