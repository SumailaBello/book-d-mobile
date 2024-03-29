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
import ConfirmOtp from '../screens/Auth/ConfirmOtp/ConfirmOtp';
import ResetPassword from '../screens/Auth/ForgotPassword/ResetPassword';

const Stack = createStackNavigator();
const LoggedOutStack = () => {
    const {IS_ANDROID, IS_IOS} = CONSTANTS;
    const Transition = TransitionPresets.SlideFromRightIOS
    const {theme} = useSelector((state: RootState) => state.appSetting);
    IS_ANDROID ? StatusBar.setTranslucent(false) : null

    return (
        <>
            <Stack.Navigator initialRouteName = "Onboarding" screenOptions={({ navigation }) => ({
                ...Transition,
                headerStyle: {
                    backgroundColor: theme.light,
                    // height: scale(50)
                    // paddingTop: scale(10)
                },
                // presentation: 'transparentModal', 
                contentStyle: { 
                    backgroundColor: 'white',
                },
                headerLeft: ()=> <IconButton style={{paddingBottom: scale(5)}} onPress={navigation.goBack} icon={<MaterialCommunityIcons name="chevron-left" size={scale(24)} />} />,
                headerShadowVisible: false,
                headerStatusBarHeight: 0,
                headerLeftContainerStyle: {
                    justifyContent: "flex-end",
                    // paddingLeft: scale(10)
                },
                headerTitleAlign: "center",
                headerTintColor: theme.light,
                headerTitleStyle: {
                    fontFamily: 'CircularStd-Bold',
                    fontSize: scale(16),
                },
                headerTitleContainerStyle: {
                    justifyContent: "flex-end",
                    padding: scale(10)
                },
            })}>
                {/* available screens for logged out users */}
                <Stack.Screen name="Onboarding" component={Onboarding as React.FC} options={{
                    // header: ()=> (null),
                    headerLeft: ()=> null,
                    headerLeftContainerStyle: {
                        borderBottomWidth: 0
                    }
                }} />
                <Stack.Screen name="Login" component={Login as React.FC} options={{
                    headerTitle: "Login",
                    // headerLeft: ()=> null,
                }} />
                <Stack.Screen name="Register" component={Register as React.FC} options={{
                    headerTitle: "Register",
                }} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword as React.FC} options={{
                    headerTitle: "Forgot Password",
                }} />
                <Stack.Screen name="ResetPassword" component={ResetPassword as React.FC} options={{
                    headerTitle: "Reset Password",
                }} />
                <Stack.Screen name="ConfirmOtp" component={ConfirmOtp as React.FC} options={{
                    headerTitle: "Confirm Otp",
                }} />
            </Stack.Navigator>
        </>
    )
}

export default LoggedOutStack
