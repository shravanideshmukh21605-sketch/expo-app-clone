import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform, View } from "react-native";
import { UserProvider } from "./UserContext";

export default function TabLayout() {
  return (
    <UserProvider>
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
        {/* 1. HOME */}
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={24}
                color={color}
              />
            ),
          }}
        />

        {/* 2. UNLISTED SHARES */}
        <Tabs.Screen
          name="shares"
          options={{
            title: "Unlisted",
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons
                name={focused ? "chart-box" : "chart-box-outline"}
                size={24}
                color={color}
              />
            ),
          }}
        />

        {/* 3. GOLD */}
        <Tabs.Screen
          name="gold"
          options={{
            title: "Gold",
            tabBarIcon: ({ color, focused }) => (
              <View
                style={
                  focused
                    ? {
                        backgroundColor: "#D32F2F10",
                        padding: 8,
                        borderRadius: 12,
                        marginTop: -5,
                      }
                    : null
                }
              >
                <Ionicons
                  name={focused ? "leaf" : "leaf-outline"}
                  size={24}
                  color={color}
                />
              </View>
            ),
          }}
        />

        {/* 4. PORTFOLIO */}
        <Tabs.Screen
          name="portfolio"
          options={{
            title: "Portfolio",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "briefcase" : "briefcase-outline"}
                size={24}
                color={color}
              />
            ),
          }}
        />

        {/* 5. MORE */}
        <Tabs.Screen
          name="more"
          options={{
            title: "More",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "grid" : "grid-outline"}
                size={24}
                color={color}
              />
            ),
          }}
        />

        {/* --- HIDDEN SCREENS --- */}
        {/* These screens exist for navigation but won't show in the bottom bar */}
        
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

      </Tabs>
    </UserProvider>
  );
}