import React from 'react';
import { StyleSheet, StatusBar  } from 'react-native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Onboarding from '../screens/Auth/Onboarding/Onboarding';
import CONSTANTS from '../utils/constants';
// import { StatusBar } from 'expo-status-bar';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import scale from '../utils/scale';
import Login from '../screens/Auth/Login/Login';
import Register from '../screens/Auth/Register/Register';
import IconButton from '../components/Buttons/IconButton';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import ForgotPassword from '../screens/Auth/ForgotPassword/ForgotPassword';

const Stack = createStackNavigator();
const LoggedOutStack = () => {
    const {IS_ANDROID, IS_IOS} = CONSTANTS;
    const Transition = IS_ANDROID ? TransitionPresets.FadeFromBottomAndroid : IS_IOS ? TransitionPresets.SlideFromRightIOS : null
    const {theme} = useSelector((state: RootState) => state.appSetting);
    IS_ANDROID ? StatusBar.setBackgroundColor('transparent', true) : null;
    IS_ANDROID ? StatusBar.setTranslucent(true) : null;
    IS_ANDROID ? StatusBar.setBarStyle('light-content') : null;
    return (
        <>
            <Stack.Navigator initialRouteName = "Onboarding" screenOptions={({ navigation }) => ({
                ...Transition,
                headerStyle: {
                    backgroundColor: theme.primary.main,
                    height: scale(80),
                },
                // presentation: 'transparentModal', 
                contentStyle: { 
                    backgroundColor: 'white',
                },
                headerLeft: ()=> <IconButton onPress={navigation.goBack} icon={<MaterialCommunityIcons name="arrow-left" height={scale(24)} width={scale(24)} />} />,
                headerShadowVisible: false,
                headerStatusBarHeight: 0,
                headerLeftContainerStyle: {
                    justifyContent: "flex-end",
                    // paddingLeft: scale(10)
                },
                headerTitleAlign: "center",
                headerTintColor: theme.light,
                headerTitleStyle: {
                    fontFamily: 'Matter-Bold',
                    fontSize: scale(16),
                },
                headerTitleContainerStyle: {
                    justifyContent: "flex-end",
                    padding: scale(10)
                },
            })}>
                {/* available screens for logged out users */}
                <Stack.Screen name="Onboarding" component={Onboarding as React.FC} options={{
                    header: ()=> (null),
                }} />
                <Stack.Screen name="Login" component={Login as React.FC} options={{
                    headerTitle: "Login",
                }} />
                <Stack.Screen name="Register" component={Register as React.FC} options={{
                    headerTitle: "Register",
                }} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword as React.FC} options={{
                    headerTitle: "Forgot Password?",
                }} />
            </Stack.Navigator>
        </>
    )
}

export default LoggedOutStack
