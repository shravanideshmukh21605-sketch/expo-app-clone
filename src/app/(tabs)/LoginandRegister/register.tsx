import React, { useState } from 'react';
import {
  View, Text, Image, TextInput, TouchableOpacity,
  ScrollView, Alert, SafeAreaView, ActivityIndicator, StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, FontAwesome, Feather } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';
import axios from 'axios';
import { useUser } from '../Usercontext';
import styles from './style';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // Existing States
  const [userType, setUserType] = useState('User');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [secretText, setSecretText] = useState('');

  // NEW KYC CREDENTIALS (From your images)
  const [panNumber, setPanNumber] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('Female');
  const [income, setIncome] = useState('');

  const validateInput = () => {
    const emailRegex = /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
    if (name.length < 2) return "Name must be at least 2 characters.";
    if (!emailRegex.test(email)) return "Enter a valid email.";
    if (mobile.length !== 10) return "Mobile must be 10 digits.";
    if (!panNumber || panNumber.length !== 10) return "Enter a valid 10-digit PAN.";
    if (userType === 'Admin' && secretText !== 'Text1243') return "Invalid Admin Code.";
    return null;
  };

  const handleRegister = async () => {
    const error = validateInput();
    if (error) {
      Alert.alert("Validation Error", error);
      return;
    }

    setLoading(true);
    const userData = {
      name, email, mobile, password, userType,
      pan: panNumber,
      dob,
      gender,
      income
    };

    try {
      const res = await axios.post('http://192.168.1.30:5001/register', userData);
      if (res.data.status === 'ok') {
        Alert.alert('Success', 'Account created! Proceed to Login.');
        router.replace('/LoginandRegister/login');
      } else {
        Alert.alert("Registration Failed", res.data.data || "Error occurred.");
      }
    } catch (err) {
      Alert.alert("Connection Error", "Check your Mac's backend server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="always">
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color="#1A1D1F" /></TouchableOpacity>
          <Text style={styles.headerTitle}>Step 1 of 6</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.formCard}>
          <Text style={styles.welcomeText}>Join InCred</Text>
          
          <InputField label="Full Name (As on PAN)" icon="user-o" placeholder="Gayatri Rode" onChange={setName} />
          
          {/* PAN & DOB FIELDS (Matches Image 2 & 4) */}
          <InputField label="PAN Number" icon="card-outline" placeholder="ABCDE1234F" onChange={setPanNumber} isFeather />
          <InputField label="Date of Birth" icon="calendar-outline" placeholder="DD/MM/YYYY" onChange={setDob} isFeather />

          <InputField label="Email ID" icon="envelope-o" placeholder="name@example.com" onChange={setEmail} />
          <InputField label="Mobile Number" icon="mobile" placeholder="9876543210" onChange={setMobile} maxLength={10} />
          
          {/* GENDER SELECTION (Matches Image 8) */}
          <Text style={[styles.label, {marginTop: 10}]}>GENDER</Text>
          <View style={styles.radioButton_div}>
            {['Female', 'Male', 'Others'].map((g) => (
              <View key={g} style={styles.radioButton_inner_div}>
                <RadioButton value={g} status={gender === g ? 'checked' : 'unchecked'} onPress={() => setGender(g)} color="#D32F2F" />
                <Text style={styles.radioButton_text}>{g}</Text>
              </View>
            ))}
          </View>

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
      <TextInput placeholder={placeholder} style={styles.input} onChangeText={onChange} secureTextEntry={secure} maxLength={maxLength} placeholderTextColor="#8892A3" />
    </View>
  </View>
);