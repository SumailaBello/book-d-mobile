import { View, ImageBackground, Pressable, ActivityIndicator } from 'react-native'
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
import { toggleLoggedIn } from '../../../store/appSettings';
import { errorHandler, maskingString, successHandler } from '../../../utils/utils';
import { ConfirmOtpQuery, ResendOtpQuery, useConfirmOtp, useResendOtp } from '../../../utils/Hooks/AuthHooks';
import { toggleAlert } from '../../../store/modalSlice';
import OtpInput from '../../../components/Inputs/OtpInput';
import { saveUser, updateUserState } from '../../../store/userSlice';
import TimerCountdown from './TimerCountdown';

const ConfirmOtp: FC<Screen> = ({navigation, route}) => {
    //GLOBAL STATE
    const {theme} = useSelector((state: RootState) => state.appSetting);
    const dispatch = useDispatch();
    const user = route?.params?.user;
    const mode: 'register' | 'recover' = route?.params?.mode;
    console.log('USER', user);

    //LOCAL STATE
    // const [email, setEmail] = useState<string>('');
    const [otp, setOtp] = useState<string>('');
    // set password visibility
    const [secure, setSecure] = useState<boolean>(true);
    const [enabled, setEnabled] = useState(false);

    const confirmQuery = useConfirmOtp();

    // handles login button click
    const confirmOtp = async ()=> {
        const body: ConfirmOtpQuery = {
            email: user.email,
            otp: otp,
        }
        try {
            const res = await confirmQuery.mutateAsync(body);
            console.log(res);
            // alert(mode)
            if(mode === 'register') {
                dispatch(saveUser(res.data.data));
                dispatch(toggleLoggedIn());
            }
            else if (mode === 'recover') {
                navigation.navigate('ResetPassword', {otp: otp, user: res.data.data.user});
            }

        } 
        catch (err) {
            console.log(err);
            const errAlert: AlertConfig = errorHandler(err);
            dispatch(toggleAlert(errAlert));
        }
    }

    const resendQuery = useResendOtp();
    const resend = async ()=> {
        const body: ResendOtpQuery = {
            email: user.email,
        }
        try {
            const res = await resendQuery.mutateAsync(body);
            const alertObj = successHandler(res);
            dispatch(toggleAlert(alertObj));
            // setRestart(true);
        } 
        catch (err) {
            const errAlert: AlertConfig = errorHandler(err);
            dispatch(toggleAlert(errAlert));
        }
    }
    
    return (
        <Container style={{backgroundColor: theme.background,}}>
            <ScrollView style={{minHeight: CONSTANTS.DEVICE_HEIGHT}} contentContainerStyle={{minHeight: CONSTANTS.DEVICE_HEIGHT}}>
                <View style={{flex: 4, paddingHorizontal: scale(20)}}>
                    <BoldText title={'Confirm Account'} size={28} />
                    <RegularText title={`Enter OTP sent to to ${maskingString(user.email, 2, user.email.length - 3)}`} color={theme.neutral.main} />
                </View>
                <View style={{flex: 4, paddingHorizontal: scale(20), justifyContent: 'flex-start'}}>
                    {/* <View style={{justifyContent: '' }}> */}
                        <OtpInput justify="space-evenly" length={4} value={otp} onChangeText={setOtp} keyboardType='number-pad' />
                    {/* </View> */}
                    <View style={{flexDirection: 'row', marginTop: scale(20), justifyContent: 'center'}}>
                        {/* <BlockText> */}
                            <RegularText title="Didn't receive code?" color={theme.neutral.main} />
                            <Pressable onPress={resend} disabled={!enabled || resendQuery.isLoading} style={{borderBottomWidth: enabled ? 2 : 0, borderBottomColor: enabled ? theme.primary.main : theme.neutral.main, marginLeft: 5}}>
                                <RegularText title=" Resend " color={enabled ? theme.primary.main : theme.neutral.main} />
                            </Pressable>
                            {resendQuery.isLoading ? (
                                <ActivityIndicator color={theme.primary.main} />
                            ) : (
                                !resendQuery.isError && 
                                <TimerCountdown setEnabled={setEnabled} duration={30} />
                            )}
                        {/* </BlockText> */}
                    </View>
                </View>
                <ImageBackground source={require('../../../../assets/img/ellipse.png')} 
                    style={{flex: 4, justifyContent: 'center', padding: scale(20)}} 
                    imageStyle={{resizeMode: 'stretch'}}>
                    <Button title='Proceed' 
                        loading={confirmQuery.isLoading}
                        disabled={confirmQuery.isLoading || !otp || otp.length !== 4}
                        onPress={confirmOtp}
                    />
                </ImageBackground>
            </ScrollView>
        </Container>
    )
}

export default ConfirmOtp