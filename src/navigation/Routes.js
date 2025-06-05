import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen'
import LoginScreen from '../screens/LoginScreen';
import ConfigScreen from '../screens/ConfigScreen';
import ManutencaoScreen from '../screens/ManutencaoScreen';
import EquipamentoScreen from '../screens/EquipamentoScreen';
import MembrosScreen from '../screens/MembrosScreen';
import ClienteScreen from '../screens/ClienteScreen';
import { AuthContext, AuthProvider } from '../contexts/AuthContext';
import { colors } from '../constants/Colors'
import { useContext, useEffect, useState } from 'react';

const activeColor = colors.white
const inactiveColor = "#212121"

const MyTabs = createBottomTabNavigator();

function MyTabScreen(){
  const { usuario } = useContext(AuthContext)

  return(
    <MyTabs.Navigator 
      screenOptions={{
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
      }}
    >
      <MyTabs.Screen 
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="home"
              size={24}
              color={focused ? activeColor : inactiveColor}
            />
          ),
        }}
      />
      {usuario?.tipo === 'admin' && (
        <MyTabs.Screen
          name="Membros"
          component={MembrosScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <FontAwesome5
                name="users"
                size={24}
                color={focused ? activeColor : inactiveColor}
              />
            ),
          }}
        />
      )}
      <MyTabs.Screen
        name="Config"
        component={ConfigScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="settings-sharp"
              size={24}
              color={focused ? activeColor : inactiveColor}
            />
          ),
        }}
      />
    </MyTabs.Navigator>
  )
}

const ClienteStack = createNativeStackNavigator();

function ClienteStackScreen() {
  return(
    <ClienteStack.Navigator screenOptions={{ headerShown: false}}>
      <ClienteStack.Screen name="Cliente" component={ClienteScreen} />
      <ClienteStack.Screen name="VerManutencao" component={ManutencaoScreen} />
      <ClienteStack.Screen name="VerEquipamento" component={EquipamentoScreen} />
    </ClienteStack.Navigator>
  )
}

// Stack que vai juntar todas as outras
const RootStack = createNativeStackNavigator();

export default function Routes(){
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { usuario } = useContext(AuthContext)

  useEffect(() => {
    if(usuario){
      setIsLoggedIn(true)
    }else{
      setIsLoggedIn(false)
    }
  }, [usuario])

  return(
    <>
      <StatusBar backgroundColor={colors.white} style='dark' />
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{ headerShown: false}}>
          {isLoggedIn ? (
            <>
              <RootStack.Screen name="HomeTabs" component={MyTabScreen} />
              <RootStack.Screen name="ClienteStack" component={ClienteStackScreen} />
            </>
          ) : (
            <RootStack.Screen name="Login" component={LoginScreen} />
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    </>
  )
}