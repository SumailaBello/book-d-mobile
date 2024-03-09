import React, { useEffect, useState } from 'react';
import { StyleSheet, StatusBar, Platform, DeviceEventEmitter  } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
// import Feather from 'react-native-vector-icons/Feather';
// import CONSTANTS from '../utils/constants';
import LoggedOutStack from '../Navigation/LoggedOutStack';
import LoggedInStack from '../Navigation/LoggedInStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { SplashScreen } from '../screens/Splash/Splash';
import { useSelector, useDispatch } from 'react-redux';
import {toggleLoggedIn, toggleReady}  from '../store/appSettings';
import {toggleAlert}  from '../store/modalSlice';
import {saveUser}  from '../store/userSlice';
import { RootState } from '../store/store';
import { View } from 'react-native-animatable';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { AlertConfig } from '../utils/types';
import { setToken } from '../utils/api';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';
// import SideMenu from '../components/SideMenu/SideMenu';

const BottomTabs = createBottomTabNavigator();
// enableScreens(false);
interface Props {
    store?: any,
}

const MainApp: React.FC<Props> = props => {
    console.log(props);
    // const [isAppReady, setReady]: any = useState(false);
    // const [isLoggedIn, setLoggedIn]: any = useState(false);
    const {isLoggedIn, isAppReady} = useSelector((state: RootState) => state.appSetting);
    const dispatch = useDispatch();
    

    useEffect(() => {
        const prepare = async ()=> {
          try {
            // Keep the splash screen visible while we fetch resources
            // const res : any = await SecureStore.getItemAsync('user');
            const token : any = await SecureStore.getItemAsync('token');
            // const res : any = await AsyncStorage.getItem('user');
            // const token : any = await AsyncStorage.getItem('token');
            console.log(token);
            if (token) {
                setToken(token);
                dispatch(toggleLoggedIn()); //true if user exists
            }
            else {
                // setTimeout(() => {
                //     dispatch(toggleReady());
                // }, 300);
            }
          } catch (e) {
            console.log(e);
          } finally {
            setTimeout(async ()=> {
                // await SplashScreen.hideAsync();
                if(!isAppReady) {
                    dispatch(toggleReady());
                    registerForPushNotificationsAsync();
                }
            }, 300) 
          }
        }
        prepare();
    }, []);

    //PUSH NOTIFICATION
    // register push notification
    const  registerForPushNotificationsAsync = async () => {
        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#0E2E66',
            });
        }
        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                const alertObj: AlertConfig = {
                    message: "Failed to get push token for push notification!",
                    mode: "danger",
                    title: "Error",
                }
                dispatch(toggleAlert(alertObj));
                // alert('Failed to get push token for push notification!');
                return;
            }
            // const token = (await Notifications.getExpoPushTokenAsync()).data;
            Notifications.getExpoPushTokenAsync({projectId: Constants.expoConfig?.extra?.eas.projectId}).then(token=> {
                console.log(token);
                // this.setNotificationToken(token.data);
                // this.setNotificationEvent();
            }).catch(err=> {
                console.log(err);
            })
                
            //   this.setState({ expoPushToken: token });
            } 
            else {
                const alertObj: AlertConfig = {
                    message: "Must use physical device for Push Notifications",
                    mode: "danger",
                    title: "Error",
                }
                dispatch(toggleAlert(alertObj));
        }
    };

    return (
        <>
            {isAppReady ? (
                <>
                    {isLoggedIn ? (
                        <NavigationContainer>
                            <LoggedInStack />
                        </NavigationContainer>
                        ) : ( 
                            <NavigationContainer>
                                <LoggedOutStack />
                            </NavigationContainer>
                    )}
                </>
            ) : (
                null
            )}
        </>
    );
}

const styles = StyleSheet.create({
    defaultHeader: {
        backgroundColor: 'transparent',
    },
    backBtn: {
        backgroundColor: 'transparent', 
        padding: 2, 
        marginLeft: 20, 
        width: 30, 
        height: 30, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
})

export default MainApp;