import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useUser } from "./UserContext";

export default function AuthScreen() {
  const router = useRouter();
  const { setUser } = useUser();
  const [isLogin, setIsLogin] = useState(true);

  // Form States
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState(""); // Added password state
  const [showPassword, setShowPassword] = useState(false); // Added toggle state

  const handleAuth = () => {
    // Basic validation
    if (!email || !password || (!isLogin && !fullName)) {
      alert("Please fill in all required fields");
      return;
    }

    // Logic to create initials from Name
    const nameParts = fullName.split(" ");
    const initials =
      nameParts.length > 1
        ? (nameParts[0][0] + nameParts[1][0]).toUpperCase()
        : (fullName[0] || "U").toUpperCase();

    // POPULATE GLOBAL CONTEXT
    setUser({
      fullName: isLogin ? "Gayatri Rode" : fullName, // Default for login demo
      email: email,
      pan: "--",
      mobile: isLogin ? "+91 8767287564" : mobile,
      initials: isLogin ? "GR" : initials,
    });

    router.replace("/"); // Go to Home
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backBtn}
          >
            <Ionicons name="arrow-back" size={24} color="#1A1D1F" />
          </TouchableOpacity>

          <View style={styles.headerSection}>
            <Text style={styles.title}>
              {isLogin ? "Welcome Back" : "Create Account"}
            </Text>
            <Text style={styles.subtitle}>
              {isLogin
                ? "Login to manage your investments"
                : "Join InCred Money and start investing"}
            </Text>
          </View>

          <View style={styles.form}>
            {!isLogin && (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your name"
                  value={fullName}
                  onChangeText={setFullName}
                />
              </View>
            )}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="email@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/* PASSWORD SECTION ADDED HERE */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Enter your password"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={20}
                    color="#8892A3"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {!isLogin && (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Mobile Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="+91 0000000000"
                  keyboardType="phone-pad"
                  value={mobile}
                  onChangeText={setMobile}
                />
              </View>
            )}

            <TouchableOpacity style={styles.mainBtn} onPress={handleAuth}>
              <Text style={styles.mainBtnText}>
                {isLogin ? "Login" : "Sign Up"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.switchBtn}
              onPress={() => setIsLogin(!isLogin)}
            >
              <Text style={styles.switchText}>
                {isLogin
                  ? "Don't have an account? Sign Up"
                  : "Already have an account? Login"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContent: { padding: 24, flexGrow: 1 },
  backBtn: { marginBottom: 20 },
  headerSection: { marginBottom: 40 },
  title: { fontSize: 28, fontWeight: "bold", color: "#1A1D1F" },
  subtitle: { fontSize: 16, color: "#8892A3", marginTop: 8 },
  form: { flex: 1 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: "600", color: "#1A1D1F", marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#EEF0F2",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: "#F8F9FB",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EEF0F2",
    borderRadius: 12,
    backgroundColor: "#F8F9FB",
    paddingRight: 15,
  },
  passwordInput: {
    flex: 1,
    padding: 16,
    fontSize: 16,
  },
  mainBtn: {
    backgroundColor: "#D32F2F",
    borderRadius: 12,
    padding: 18,
    alignItems: "center",
    marginTop: 20,
  },
  mainBtnText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  switchBtn: { marginTop: 20, alignItems: "center" },
  switchText: { color: "#232F3E", fontWeight: "600" },
});
