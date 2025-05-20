import { AuthProvider } from './src/contexts/AuthContext';
import Routes from './src/navigation/Routes';

export default function App(){
  return(
    <AuthProvider>
      <Routes />
    </AuthProvider>
  )
}
