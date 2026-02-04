import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Isse top header bhi hat jayega
        animation: 'fade',  // Screens ke beech smooth transition ke liye
      }}
    >
      {/* Index screen (Unlisted Shares list) */}
      <Stack.Screen name="index" />
      
      {/* Details screen */}
      <Stack.Screen name="details" />
      
      {/* Agar shares naam ki koi aur file hai */}
      <Stack.Screen name="shares" />
    </Stack>
  );
}