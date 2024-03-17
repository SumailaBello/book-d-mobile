import { View, Text, ScrollView, Image, StyleSheet, StatusBar } from 'react-native';
import React, { FC } from 'react';
import Container from '../../../components/Container/Container';
import { Screen } from '../../../utils/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import scale from '../../../utils/scale';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import HomeCard from './HomeCard';
import Header from './Header';
import DashboardItem from './DashboardItem';
import { useGetUser } from '../../../utils/Hooks/UserHooks';
import { updateUserState } from '../../../store/userSlice';
// import DashboardItem from './DashboardItem';

const Home: FC<Screen> = ({navigation, route}) => {
    //GLOBAL STATE
    const {theme} = useSelector((state: RootState) => state.appSetting);
    const {user} = useSelector((state: RootState) => state.userSlice);
    const dispatch = useDispatch();
    console.log(user);
    // dispatch(updateUserState({user: res.data.data}))
    const getUserQuery = useGetUser(user.uuid);
    console.log('HOME', getUserQuery)
    getUserQuery.isSuccess ? dispatch(updateUserState(getUserQuery.data.data.user)) : null
    const nav = (route: string)=> {
        navigation.navigate(route);
    }
    
    return (
        <Container style={{backgroundColor: theme.background, padding: scale(20)}}>
            <StatusBar barStyle={'dark-content'} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header navigation={navigation} />
                <HomeCard />
                <View style={{marginTop: scale(20)}}>
                    <View style={{flexDirection: 'row', height: scale(200), }}>
                        <DashboardItem color={theme.primary[200]} 
                            onPress={()=> nav('Sales')}
                            title='Recent Sales' 
                            icon={<MaterialCommunityIcons name="credit-card-outline" size={scale(40)} color={theme.light} />} 
                            style={{marginRight: scale(5)}}
                        />
                        <DashboardItem color={theme.primary.main} 
                            onPress={()=> nav('Calendar')}
                            title='Appointments' 
                            icon={<MaterialCommunityIcons name='calendar' color={theme.light} size={scale(40)} />}
                            style={{marginLeft: scale(5)}} 
                        />
                    </View>
                    <View style={{flexDirection: 'row', height: scale(200), marginTop: scale(10)}}>
                        <DashboardItem color={theme.secondary.main}
                            onPress={()=> nav('Messages')} 
                            title='Messages' 
                            icon={<MaterialCommunityIcons name="message-text-outline" color={theme.light} size={scale(40)} />}
                            style={{marginRight: scale(5)}} 
                        />
                        <DashboardItem color={theme.warning.main} 
                            onPress={()=> nav('Team')}
                            title='Team Members' 
                            icon={<MaterialCommunityIcons name='account-group-outline' color={theme.light} size={scale(40)} />}
                            style={{marginLeft: scale(5)}} 
                        />
                    </View>
                </View>
            </ScrollView>
        </Container>
    )
}

const styles = StyleSheet.create({

})

export default Home