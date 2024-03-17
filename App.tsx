import { View, useColorScheme, LogBox } from 'react-native';
LogBox.ignoreLogs([
  'AxiosError'
]);
import MainApp from './app/MainApp/MainApp';
import { store } from './app/store/store';
import { Provider } from 'react-redux';
import CustomLoader from './app/components/CustomLoader/CustomLoader';
import AlertModal from './app/components/Modals/AlertModal';
import { useFonts } from 'expo-font';
import CONSTANTS from './app/utils/constants';
// import scale from './app/utils/scale';
import ConfirmationModal from './app/components/Modals/ConfirmationModal';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const {IS_IOS} = CONSTANTS;
  let [fontsLoaded] = useFonts({
    'CircularStd-Light': require('./assets/fonts/CircularStd-Light.otf'),
    'CircularStd-Book': require('./assets/fonts/CircularStd-Book.otf'),
    'CircularStd-Medium': require('./assets/fonts/CircularStd-Medium.otf'),
    'CircularStd-Bold': require('./assets/fonts/CircularStd-Bold.otf'),
    'CircularStd-Black': require('./assets/fonts/CircularStd-Black.otf'),
  });

  // Create a client
  const queryClient = new QueryClient();

  return (
    <View style={{flex: 1}}>
      {fontsLoaded ? (
        <Provider store={store}>
          {/* // Provide the client to your App */}
          <QueryClientProvider client={queryClient}>
            <MainApp />
          </QueryClientProvider>
          <CustomLoader />
          <AlertModal />
          <ConfirmationModal />
        </Provider>
      ) : (null)}
    </View>
  );
}
