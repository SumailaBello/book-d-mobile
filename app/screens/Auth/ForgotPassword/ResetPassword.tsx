import { View, ImageBackground, Pressable } from 'react-native'
import React, { FC, useState } from 'react'
import Container from '../../../components/Container/Container'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { AlertConfig, Screen } from '../../../utils/types';
import scale from '../../../utils/scale';
import { BlockText, BoldText, RegularText, SemiBoldText } from '../../../components/Typography/Typography';
import { ScrollView } from 'react-native-gesture-handler';
import CONSTANTS from '../../../utils/constants';
import Button from '../../../components/Buttons/Button';
import Input from '../../../components/Inputs/TextInput';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ResetPasswordQuery, useResetPassword } from '../../../utils/Hooks/AuthHooks';
import { toggleAlert } from '../../../store/modalSlice';
import { errorHandler, successHandler, validatePassword } from '../../../utils/utils';
import ResetPasswordTitle from './ResetPasswordTitle';

const ResetPassword: FC<Screen> = ({navigation, route}) => {
    //GLOBAL STATE
    const {theme} = useSelector((state: RootState) => state.appSetting);
    const dispatch = useDispatch();

    //NAV PARAMS FROM PREVIOUS SCREEN
    const otp = route?.params?.otp;
    const user = route?.params?.user;

    //LOCAL STATE
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    // control password visibility
    const [secure, setSecure] = useState<boolean>(true);
    const [confirmSecure, setConfirmSecure] = useState<boolean>(true);

    //HOOKS
    const query = useResetPassword();
    

    // handles login button click
    const proceed = async ()=> {
        const body: ResetPasswordQuery = {
            otp: otp,
            password: password,
        }
        try {
            const res = await query.mutateAsync(body);
            console.log(res);
            const alertObj = successHandler(res);
            dispatch(toggleAlert(alertObj));
            navigation.navigate('Login');
        } 
        catch (err) {
            // console.log(err);
            const errAlert: AlertConfig = errorHandler(err);
            dispatch(toggleAlert(errAlert));
        }
    }
    
    return (
        <Container style={{backgroundColor: theme.background,}}>
            <ScrollView style={{minHeight: CONSTANTS.DEVICE_HEIGHT}} contentContainerStyle={{minHeight: CONSTANTS.DEVICE_HEIGHT}}>
                <ResetPasswordTitle userName={user.name} />
                <View style={{flex: 4, paddingHorizontal: scale(20)}}>
                    <View style={{alignItems: 'center', marginBottom: scale(20)}}>
                        <MaterialCommunityIcons name='calendar-blank-multiple' color={theme.primary.main} size={scale(50)} />
                    </View>
                    <Input label="Password" secure={secure} onChangeText={setPassword}
                        error={!password ? false : validatePassword(password).valid ? false : true} 
                        errorMessage={validatePassword(password).message}
                        icon={
                            <Pressable onPress={()=> setSecure(!secure)}>
                                {secure? (
                                    <MaterialCommunityIcons name='eye' size={scale(18)} color={theme.neutral.main} />
                                ) : (
                                    <MaterialCommunityIcons name='eye-off' size={scale(18)} color={theme.neutral.main} />
                                )}
                            </Pressable>
                        } 
                    />
                    <Input label="Confirm Password" secure
                        onChangeText={setConfirmPassword}
                        error={!confirmPassword ? false : confirmPassword !== password ? true : validatePassword(confirmPassword).valid ? false : true} 
                        errorMessage={validatePassword(confirmPassword).message || 'Passwords do not match'}
                    />
                </View>
                <ImageBackground source={require('../../../../assets/img/ellipse.png')} 
                    style={{flex: 4, justifyContent: 'center', padding: scale(20)}} 
                    imageStyle={{resizeMode: 'stretch'}}>
                    <Button title='Proceed' 
                        onPress={proceed}
                        loading={query.isLoading}
                        disabled={query.isLoading || !password || !validatePassword(password).valid || password !== confirmPassword}
                    />
                    <View style={{alignItems: 'center', marginTop: scale(10)}}>
                        <BlockText>
                            <RegularText title="Remember Password? " />
                            <SemiBoldText title='Login' onPress={()=> navigation.navigate('Login')} />
                        </BlockText>
                    </View>
                </ImageBackground>
            </ScrollView>
        </Container>
    )
}

export default ResetPassword