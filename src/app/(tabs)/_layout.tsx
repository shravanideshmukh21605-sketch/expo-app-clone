import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { KYCProvider } from "./KYCContext";
import { UserProvider } from "./Usercontext";

export default function TabLayout() {
  return (
    <UserProvider>
      <KYCProvider> 
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#D32F2F",
          tabBarInactiveTintColor: "#8E8E93",
          headerShown: false,
          tabBarShowLabel: true,
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "600",
            marginBottom: 5,
          },
          tabBarStyle: {
            height: Platform.OS === "ios" ? 90 : 70,
            backgroundColor: "#ffffff",
            borderTopWidth: 1,
            borderTopColor: "#F0F0F0",
            elevation: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.05,
            shadowRadius: 10,
          },
        }}
      >
        {/* --- 1. VISIBLE TABS (Only these 5 show icons) --- */}
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? "home" : "home-outline"} size={24} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="shares"
          options={{
            title: "Unlisted",
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons name={focused ? "chart-box" : "chart-box-outline"} size={24} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="mutualfund"
          options={{
            title: "Mutual Fund",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? "leaf" : "leaf-outline"} size={24} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="portfolio"
          options={{
            title: "Portfolio",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? "briefcase" : "briefcase-outline"} size={24} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="more"
          options={{
            title: "More",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? "grid" : "grid-outline"} size={24} color={color} />
            ),
          }}
        />

        {/* --- 2. HIDDEN SCREENS (href: null hides them from the bottom bar) --- */}
        {/* CHECK THIS LIST: Make sure each name only appears ONCE here and is NOT above */}
        <Tabs.Screen name="profile" options={{ href: null }} />
        <Tabs.Screen name="auth" options={{ href: null }} />
        <Tabs.Screen name="refer" options={{ href: null }} />
        <Tabs.Screen name="reports" options={{ href: null }} />
        <Tabs.Screen name="blogs" options={{ href: null }} /> 
        <Tabs.Screen name="faqs" options={{ href: null }} />
        <Tabs.Screen name="privacy" options={{ href: null }} />
        <Tabs.Screen name="terms" options={{ href: null }} />
        <Tabs.Screen name="disclaimer" options={{ href: null }} />
        <Tabs.Screen name="about" options={{ href: null }} />
        <Tabs.Screen name="contact" options={{ href: null }} />
        <Tabs.Screen name="fd" options={{ href: null }} />
        <Tabs.Screen name="bond" options={{ href: null }} />
        <Tabs.Screen name="details" options={{ href: null }} />
        <Tabs.Screen name="index_share" options={{ href: null }} />
        <Tabs.Screen name="Usercontext" options={{ href: null }} />
        <Tabs.Screen name="digitalsilver" options={{ href: null }} />
        <Tabs.Screen name="digitalgold" options={{ href: null }} />
        <Tabs.Screen name="fixeddeposit" options={{ href: null }} />
        <Tabs.Screen name="gold" options={{ href: null }} />
        <Tabs.Screen name="LoginandRegister/login" options={{ href: null }} />
        <Tabs.Screen name="LoginandRegister/register" options={{ href: null }} />
        <Tabs.Screen name="LoginandRegister/style" options={{ href: null }} />
      </Tabs>
      </KYCProvider>
    </UserProvider>
  );
}