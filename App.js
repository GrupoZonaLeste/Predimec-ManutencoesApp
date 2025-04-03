import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeScreen from './src/screens/HomeScreen'
import LoginScreen from './src/screens/LoginScreen';
import ConfigScreen from './src/screens/ConfigScreen';
import MembrosScreen from './src/screens/MembrosScreen';
import ClienteScreen from './src/screens/ClienteScreen';
import ManutencaoScreen from './src/screens/ManutencaoScreen';
import { colors } from './src/constants/Colors'

const activeColor = colors.white
const inactiveColor = "#212121"

const MyTabs = createBottomTabNavigator({
  screenOptions:{
    headerShown: false,
    tabBarActiveTintColor: activeColor,
    tabBarInactiveTintColor: inactiveColor,
    tabBarButton: (props) => <TouchableOpacity {...props} android_ripple={{ color: 'transparent' }} />,
    tabBarItemStyle: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    tabBarLabelStyle: {
      fontFamily: 'Inter-Bold',
      fontSize: 14,
    },
    tabBarIconStyle: {
      alignItems: 'center',
      width: 30,
      height: 24,
    },
    tabBarStyle: {
      borderWidth: 0,
      backgroundColor: colors.primary,
      height: 60,
    },
  },
  screens: {  
    Home: {
      screen: HomeScreen,
      options: {
        tabBarIcon: ({ focused }) => (
          <FontAwesome5 
            name="home" 
            size={24} 
            color={focused ? activeColor : inactiveColor} />
        ),
      },
    },
    Membros: {
      screen: MembrosScreen,
      options: {
        tabBarIcon: ({ focused }) => (  
          <FontAwesome5 
            name="users" 
            size={24} 
            color={focused ? activeColor : inactiveColor}
          />
        )
      }
    },
    Config: {
      screen: ConfigScreen,
      options: {
        tabBarIcon: ({ focused }) => (
          <Ionicons 
            name="settings-sharp" 
            size={24} 
            color={focused ? activeColor : inactiveColor} 
          />
        ),
      },
    }
  }
})

const ClienteStack = createNativeStackNavigator({
  screenOptions:{
    headerShown: false
  },
  screens: {
    Cliente: ClienteScreen,
    Manutencao: ManutencaoScreen
  }
})


const RootStack = createNativeStackNavigator({
  initialRouteName: "Login",
  screenOptions:{
    headerShown: false
  },
  screens: {
    Login: LoginScreen,
    ClienteStack: ClienteStack,
    HomeTabs: MyTabs,
  },
});


const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return(
    <>
      <StatusBar backgroundColor='#000' style='light'/>
      <Navigation />
    </>
  )
}

