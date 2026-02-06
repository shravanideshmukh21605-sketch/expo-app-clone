import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    Linking,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useUser } from "./Usercontext";

export default function ProfileScreen() {
  const router = useRouter();
  const { user, setUser } = useUser(); // Added setUser for Logout logic

  const handleExpertLink = () => {
    Linking.openURL("https://calendly.com/your-zoom-link");
  };

  const handleLogout = () => {
    setUser(null); // Clears the global user state
    router.replace("/"); // Returns to home screen
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.centered}>
        <Ionicons name="lock-closed" size={50} color="#8892A3" />
        <Text style={styles.loginFallbackText}>
          Please log in to view your profile
        </Text>
        <TouchableOpacity
          style={styles.homeBtn}
          onPress={() => router.push("/auth")} // Assuming you have an auth.tsx
        >
          <Text style={styles.homeBtnText}>Login / Sign Up</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER SECTION */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#1A1D1F" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.expertBtn} onPress={handleExpertLink}>
          <Ionicons name="headset" size={16} color="#232F3E" />
          <Text style={styles.expertText}>Ask an expert</Text>
        </TouchableOpacity>

        <View style={styles.profileCircle}>
          <Text style={styles.profileInitials}>{user.initials}</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.kycBanner}>
          <Text style={styles.kycText}>
            Complete your KYC and get upto ₹200 cash back and 0.25% offer
            benefit on your 1st Investment.
          </Text>
        </View>

        <View style={styles.container}>
          {/* PROFILE DATA CARD */}
          <View style={styles.infoCard}>
            <Text style={styles.sectionTitle}>Profile Details</Text>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Full name (as on your PAN card)</Text>
              <Text style={styles.value}>{user.fullName}</Text>
            </View>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Email id</Text>
              <Text style={styles.value}>{user.email}</Text>
            </View>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>PAN Number</Text>
              <Text style={styles.value}>{user.pan}</Text>
            </View>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Mobile number</Text>
              <Text style={styles.value}>{user.mobile}</Text>
            </View>
          </View>

          {/* VERIFICATION CARDS */}
          <VerificationCard
            title="PAN details"
            label="PAN card"
            status="Pan verification pending"
          />
          <VerificationCard
            title="Bank details"
            label="Link your bank account"
            status="Bank verification pending"
          />

          {/* ACTION BUTTONS */}
          <TouchableOpacity
            style={styles.homeBtn}
            onPress={() => router.replace("/")}
          >
            <Ionicons
              name="home"
              size={20}
              color="#fff"
              style={{ marginRight: 10 }}
            />
            <Text style={styles.homeBtnText}>Back to Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.homeBtn,
              {
                backgroundColor: "#fff",
                borderWidth: 1,
                borderColor: "#D32F2F",
                marginTop: 15,
              },
            ]}
            onPress={handleLogout}
          >
            <Ionicons
              name="log-out-outline"
              size={20}
              color="#D32F2F"
              style={{ marginRight: 10 }}
            />
            <Text style={[styles.homeBtnText, { color: "#D32F2F" }]}>
              Sign Out
            </Text>
          </TouchableOpacity>

          <View style={styles.encryptionRow}>
            <Ionicons name="shield-checkmark" size={14} color="#8892A3" />
            <Text style={styles.encryptionText}>
              All data stored is encrypted by DEKs, which use AES-256
            </Text>
          </View>
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const VerificationCard = ({ title, label, status }: any) => (
  <View style={styles.statusSection}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.statusBox}>
      <View style={styles.statusRow}>
        <Ionicons name="time" size={24} color="#D32F2F" />
        <View style={styles.statusTextContainer}>
          <Text style={styles.statusLabel}>{label}</Text>
          <Text style={styles.statusSubText}>{status}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.updateBtn}>
        <Text style={styles.updateText}>Update</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F9FB",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FB",
  },
  loginFallbackText: {
    fontSize: 16,
    color: "#8892A3",
    marginVertical: 20,
    fontWeight: "600",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backBtn: { padding: 5 },
  expertBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0E4E8",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  expertText: {
    marginLeft: 8,
    fontSize: 13,
    fontWeight: "700",
    color: "#232F3E",
  },
  profileCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#232F3E",
    justifyContent: "center",
    alignItems: "center",
  },
  profileInitials: { color: "#fff", fontWeight: "bold", fontSize: 15 },
  kycBanner: {
    backgroundColor: "#FF8C00",
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 12,
  },
  kycText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
  },
  container: { padding: 20 },
  infoCard: {
    borderWidth: 1,
    borderColor: "#EEF0F2",
    borderRadius: 24,
    padding: 24,
    marginBottom: 25,
    backgroundColor: "#fff",
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1A1D1F",
    marginBottom: 15,
  },
  fieldGroup: { marginBottom: 20 },
  label: { fontSize: 11, color: "#8892A3", fontWeight: "700", marginBottom: 6 },
  value: { fontSize: 15, fontWeight: "700", color: "#1A1D1F" },
  statusSection: { marginBottom: 25 },
  statusBox: {
    borderWidth: 1,
    borderColor: "#EEF0F2",
    borderRadius: 20,
    padding: 20,
    backgroundColor: "#fff",
    borderStyle: "dashed",
  },
  statusRow: { flexDirection: "row", alignItems: "center" },
  statusTextContainer: { marginLeft: 15 },
  statusLabel: { fontSize: 15, fontWeight: "700" },
  statusSubText: { fontSize: 12, color: "#8892A3" },
  updateBtn: {
    borderWidth: 1,
    borderColor: "#EEF0F2",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignSelf: "flex-start",
    marginTop: 15,
  },
  updateText: { fontWeight: "bold", fontSize: 14, color: "#232F3E" },
  homeBtn: {
    backgroundColor: "#232F3E",
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  homeBtnText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  encryptionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  encryptionText: { fontSize: 11, color: "#8892A3", marginLeft: 8 },
});
