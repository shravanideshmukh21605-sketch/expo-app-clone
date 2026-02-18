import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { useKYC } from "./KYCContext";

export default function Profile() {
  const router = useRouter();
  const { updateKYC } = useKYC();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [pan, setPan] = useState("");
  const [mobile, setMobile] = useState("");

  const handleStartKYC = () => {
    updateKYC({
      fullName: fullName,
      panNumber: pan,
    });

    router.push("/kyc"); // navigate only when button clicked
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Complete Your Profile</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="PAN Number"
        value={pan}
        onChangeText={setPan}
        autoCapitalize="characters"
      />

      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        value={mobile}
        onChangeText={setMobile}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleStartKYC}>
        <Text style={styles.buttonText}>Start KYC</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#e51818",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
