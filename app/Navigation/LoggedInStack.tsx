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

const Stack = createStackNavigator();
// const LoggedInStack = (stackProps: StackScreenProps<any>) => {
const LoggedInStack = () => {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    const {IS_ANDROID, IS_IOS} = CONSTANTS;
    // const Transition = IS_ANDROID ? TransitionPresets.FadeFromBottomAndroid : TransitionPresets.SlideFromRightIOS;
    const Transition = TransitionPresets.SlideFromRightIOS;
    IS_ANDROID ? StatusBar.setBackgroundColor(theme.light, true) : null;
    IS_ANDROID ? StatusBar.setBarStyle("light-content") : StatusBar.setBarStyle("dark-content");
    IS_ANDROID ? StatusBar.setTranslucent(false) : null;
    const screenOptions: StackNavigationOptions = {
        headerTitleAlign: 'center',
        headerStatusBarHeight: StatusBar.currentHeight,
    }
    
    return (
        <Stack.Navigator initialRouteName = "HomeTabs" screenOptions={({ navigation }: any) => ({
            // ...TransitionPresets.FadeFromBottomAndroid,
            ...Transition,
            headerTitleAlign: "center",
            headerTitleStyle: {
                fontFamily: "Poppins-SemiBold",
                paddingBottom: IS_IOS ? scale(30) : undefined,
                fontSize: fontScale(18)
                // marginTop: "auto"
            },
            headerStyle: {
                elevation: 0,
                height: IS_IOS ? scale(80) : undefined,
            },
            headerLeftContainerStyle: {
                paddingBottom: scale(10),
                paddingLeft: IS_IOS ? scale(10) : undefined,
            },
            headerLeft: ()=> 
            <View style={{paddingLeft: IS_IOS ? scale(10) : scale(20), paddingTop: IS_IOS ? scale(0) : scale(20)}}>
                <IconButton onPress={()=> navigation.goBack()}
                    icon={<MaterialCommunityIcons name="arrow-left" width={scale(20)} height={scale(20)} />} />
            </View>,
            headerTitleContainerStyle: {paddingTop: scale(20)}
            })}
        >
            {/* available screens for logged in users */}
            <Stack.Screen name="HomeTabs" component={HomeTabs as React.FC} options={{
                header: ()=> null,
            }} />
            {/* <Stack.Screen name="AddMoney" component={AddMoney as React.FC} options={{
                headerTitle: "Add Money",
            }} /> */}
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

