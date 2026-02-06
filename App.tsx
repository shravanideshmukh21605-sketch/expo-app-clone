import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { BarChart2, Briefcase, Coins, Home, MoreHorizontal } from 'lucide-react-native';

// Screens import (Jo humne pichle step mein banayi thi)
import UnlistedSharesScreen from './src/screens/UnlistedSharesScreen';

// Placeholder screens taaki navigation work kare
const EmptyScreen = () => null;

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Shares"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#d32f2f', // Incred Red color
          tabBarInactiveTintColor: '#757575',
          tabBarStyle: {
            height: 70,
            paddingBottom: 10,
            paddingTop: 10,
            backgroundColor: '#ffffff',
            borderTopWidth: 1,
            borderTopColor: '#e0e0e0',
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
          },
        }}
      >
        <Tab.Screen 
          name="Home" 
          component={EmptyScreen} 
          options={{
            tabBarIcon: ({ color }) => <Home color={color} size={24} />,
          }}
        />
        
        <Tab.Screen 
          name="Shares" 
          component={UnlistedSharesScreen} 
          options={{
            tabBarLabel: 'Shares',
            tabBarIcon: ({ color }) => <BarChart2 color={color} size={24} />,
          }}
        />

        <Tab.Screen 
          name="Gold" 
          component={EmptyScreen} 
          options={{
            tabBarIcon: ({ color }) => <Coins color={color} size={24} />,
          }}
        />

        <Tab.Screen 
          name="Portfolio" 
          component={EmptyScreen} 
          options={{
            tabBarIcon: ({ color }) => <Briefcase color={color} size={24} />,
          }}
        />

        <Tab.Screen 
          name="More" 
          component={EmptyScreen} 
          options={{
            tabBarIcon: ({ color }) => <MoreHorizontal color={color} size={24} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}