import React, { FC, ReactNode } from 'react';
import { Pressable, StatusBar, StyleSheet, View } from 'react-native';
import { BottomTabBarButtonProps, BottomTabHeaderProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home/Home';
import CalendarScreen from './Calendar/CalendarScreen';
import More from './More/More';
import type { RootState } from '../../store/store';
import { useSelector, useDispatch } from 'react-redux';
import scale, { fontScale } from '../../utils/scale';
import { Screen } from '../../utils/types';
import CONSTANTS from '../../utils/constants';
import { BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import TabIcon from './TabIcon';

const Tab = createBottomTabNavigator();

const HomeTabs = (tabProps: BottomTabScreenProps<any>) => {
    console.log(tabProps);
    const {theme} = useSelector((state: RootState) => state.appSetting);
    const {IS_ANDROID, IS_IOS} = CONSTANTS
    // IS_ANDROID ? StatusBar.setBackgroundColor('white', true) : null;
    // IS_ANDROID ? StatusBar.setTranslucent(true) : null;
    const [tabState, setTabState] = React.useState({});

    return (
        <Tab.Navigator initialRouteName = "Home" screenOptions = {({ route, navigation }: any) => {
            console.log(route)
            console.log('navstate', navigation.getState())
            const navState = navigation.getState();
            return ({
            tabBarStyle: {
                minHeight: '8%',
                // backgroundColor: '#fdfefe',
                // backgroundColor: '#fbfefd',
                backgroundColor: '#f8f8f8',
                // backgroundColor: theme.background,
                // backgroundColor: theme.primary[100],
                elevation: 0,
                borderTopStartRadius: scale(10),
                borderTopEndRadius: scale(10),
                shadowColor: '#fdfefe',
                borderTopWidth: 0,
                // borderColor: 'black'
            },
            tabBarShowLabel: false,
            headerStatusBarHeight: 0,
            headerTitleStyle: {
                fontFamily: 'CircularStd-Bold',
                fontSize: fontScale(18),
                color: theme.light[100]
            },
            tabBarIcon: ({ focused, color, size }: any) => {
                // let iconName: any;
                let IconComponent: ReactNode;
                size = focused ? fontScale(30) : fontScale(30);
                // let iconColor;
                // console.log(focused);
                // console.log(route);
                if (route.name === 'Home') {
                    color = focused ? theme.light : theme.primary.main;
                    IconComponent = <TabIcon focused={focused} title='Home' iconName="home-variant-outline" color={color} size={size} />
                } 
                else if (route.name === 'Calendar') {
                    color = focused ? theme.light : theme.primary.main;
                    IconComponent = <TabIcon focused={focused} title='Calendar' iconName="calendar-blank-outline" color={color} size={size} />
                }
                else if (route.name === 'More') {
                    color = focused ? theme.light : theme.primary.main;
                    IconComponent = <TabIcon focused={focused} title='More' iconName="view-grid-outline" color={color} size={size} />
                }
                return IconComponent;
            },
        })}}
        >
            <Tab.Screen name="Home" component={Home as FC} 
                options = {{
                    headerLeftContainerStyle: {
                        paddingHorizontal: 20
                    },
                    header: ()=> null,
                    headerStatusBarHeight: 0,

                }} 
            />
            <Tab.Screen name="Calendar" component={CalendarScreen as FC} options = {({navigation})=> ({
                headerTitle: 'Calendar',
                headerTitleAlign: 'center',
                headerShadowVisible: false,
                headerStyle: {
                    backgroundColor: theme.light,
                    height: scale(50),
                },
                headerTitleContainerStyle: {
                    justifyContent: IS_IOS ? 'flex-end' : 'center',
                    paddingTop: IS_IOS ? StatusBar.currentHeight : undefined
                }
            })}   
                // listeners={({ navigation, route }) => ({
                //     tabPress: (e) => {
                //     // Prevent default action
                //     e.preventDefault();
                //     // Do something with the `navigation` object
                //     navigation.navigate('Transfer');
                //     },
                // })}
              />
            <Tab.Screen name="More" component={More as FC} options = {({navigation})=> ({
                // headerTitle: '',
                // headerTitleAlign: 'center',
                // headerShadowVisible: false,
                // headerStyle: {
                //     backgroundColor: theme.primary.main,
                //     height: scale(80),
                // },
                headerTitle: 'More',
                headerTitleAlign: 'center',
                headerShadowVisible: false,
                headerStyle: {
                    backgroundColor: theme.light,
                    height: scale(50),
                },
                headerTitleContainerStyle: {
                    justifyContent: IS_IOS ? 'flex-end' : 'center',
                    paddingTop: IS_IOS ? StatusBar.currentHeight : undefined
                }
            })}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    headerStyle: {
        paddingTop: StatusBar.currentHeight, 
        paddingHorizontal: scale(10), 
        paddingBottom: scale(10),
    }
})

export default HomeTabs;