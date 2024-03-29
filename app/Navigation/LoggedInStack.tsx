import React, { useEffect } from 'react';
import { createStackNavigator, StackNavigationOptions, TransitionPresets } from '@react-navigation/stack';
import HomeTabs from '../screens/HomeTabs/HomeTabs';
import { StackScreenProps } from '@react-navigation/stack';
import { Image, StatusBar, StyleSheet, Platform, View } from 'react-native';
import scale, { fontScale } from '../utils/scale';
import type { RootState } from '../store/store';
import { useSelector, useDispatch } from 'react-redux';
import CONSTANTS from '../utils/constants';
import IconButton from '../components/Buttons/IconButton';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Profile from '../screens/Profile/Profile';
import Notifications from '../screens/Notifications/Notifications';
import Sales from '../screens/Sales/Sales';
import Messages from '../screens/Messages/Messages';
import Team from '../screens/Team/Team';

const Stack = createStackNavigator();
// const LoggedInStack = (stackProps: StackScreenProps<any>) => {
const LoggedInStack = () => {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    const {IS_ANDROID, IS_IOS} = CONSTANTS;
    // const Transition = IS_ANDROID ? TransitionPresets.FadeFromBottomAndroid : TransitionPresets.SlideFromRightIOS;
    const Transition = TransitionPresets.SlideFromRightIOS;
    IS_ANDROID ? StatusBar.setBackgroundColor(theme.light, true) : null;
    IS_ANDROID ? StatusBar.setBarStyle("dark-content") : StatusBar.setBarStyle("dark-content");
    IS_ANDROID ? StatusBar.setTranslucent(false) : null;
    const screenOptions: StackNavigationOptions = {
        headerTitleAlign: 'center',
        headerStatusBarHeight: StatusBar.currentHeight,
    }
    
    return (
        <Stack.Navigator initialRouteName = "HomeTabs" screenOptions={({ navigation }: any) => ({
            // ...TransitionPresets.FadeFromBottomAndroid,
            ...Transition,
            headerLeft: ()=> <IconButton style={{paddingBottom: scale(5)}} onPress={navigation.goBack} icon={<MaterialCommunityIcons name="chevron-left" size={scale(24)} />} />,
            // headerTitleContainerStyle: {paddingTop: scale(20)}
            headerShadowVisible: false,
            headerStatusBarHeight: 0,
            headerLeftContainerStyle: {
                justifyContent: "flex-end",
                // paddingLeft: scale(10)
            },
            headerTitleAlign: "center",
            // headerTintColor: theme.light,
            headerTitleStyle: {
                fontFamily: 'CircularStd-Bold',
                fontSize: scale(16),
            },
            headerTitleContainerStyle: {
                justifyContent: "flex-end",
                padding: scale(10),
                paddingBottom: scale(5)
            },
            })}
        >
            {/* available screens for logged in users */}
            <Stack.Screen name="HomeTabs" component={HomeTabs as React.FC} options={{
                header: ()=> null,
            }} />
            <Stack.Screen name="Profile" component={Profile as React.FC} options={{
                // headerTitle: "Add Money",
            }} />
            <Stack.Screen name="Notifications" component={Notifications as React.FC} options={{
                // headerTitle: "Add Money",
            }} />
            <Stack.Screen name="Sales" component={Sales as React.FC} options={{
                headerTitle: "Recent Sales",
            }} />
            <Stack.Screen name="Messages" component={Messages as React.FC} options={{
                headerTitle: "Messages",
            }} />
            <Stack.Screen name="Team" component={Team as React.FC} options={{
                headerTitle: "Team Members",
            }} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    headerStyle: {
        paddingTop: StatusBar.currentHeight, 
        paddingHorizontal: scale(10), 
        paddingBottom: scale(10),
    }
})

export default LoggedInStack

