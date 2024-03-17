import { View, Text, ImageBackground, Pressable } from 'react-native'
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
import { ForgotPasswordQuery, useForgotPassword } from '../../../utils/Hooks/AuthHooks';
import { toggleLoggedIn } from '../../../store/appSettings';
import { toggleAlert } from '../../../store/modalSlice';
import { updateUserState } from '../../../store/userSlice';
import { errorHandler, validateEmail } from '../../../utils/utils';
import ForgotPasswordTitle from './ForgotPasswordTitle';

const ForgotPassword: FC<Screen> = ({navigation}) => {
    //GLOBAL STATE
    const {theme} = useSelector((state: RootState) => state.appSetting);
    const dispatch = useDispatch();

    //LOCAL STATE
    const [email, setEmail] = useState<string>('');

    const query = useForgotPassword();
    // handles login button click
    const proceed = async ()=> {
        const body: ForgotPasswordQuery = {
            email: email,
        }
        try {
            const res = await query.mutateAsync(body);
            console.log(res);
            dispatch(updateUserState(res.data.data));
            navigation.navigate('ConfirmOtp', {user: res.data.user, mode: 'recover'});
            // dispatch(toggleLoggedIn());
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
                <ForgotPasswordTitle />
                <View style={{flex: 4, paddingHorizontal: scale(20)}}>
                    <View style={{alignItems: 'center', marginBottom: scale(20)}}>
                        <MaterialCommunityIcons name='calendar-blank-multiple' color={theme.primary.main} size={scale(50)} />
                    </View>
                    <Input label='Email' 
                        value={email} 
                        onChangeText={setEmail} 
                        error={!email ? false : validateEmail(email) ? false : true} 
                        errorMessage="Email is invalid" keyboardType="email-address"
                    />
                </View>
                <ImageBackground source={require('../../../../assets/img/ellipse.png')} 
                    style={{flex: 4, justifyContent: 'center', padding: scale(20)}} 
                    imageStyle={{resizeMode: 'stretch'}}>
                    <Button title='Proceed' 
                        onPress={proceed}
                        loading={query.isLoading}
                        disabled={query.isLoading || !email || !validateEmail(email)}
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

export default ForgotPassword