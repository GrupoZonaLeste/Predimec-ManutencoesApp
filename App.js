import { AuthProvider } from './src/contexts/AuthContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Routes from './src/navigation/Routes';

export default function App(){
  return(
    <SafeAreaProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </SafeAreaProvider>
  )
}
