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
import { toggleLoggedIn } from '../../../store/appSettings';
import { errorHandler, validateEmail, validatePassword } from '../../../utils/utils';
import { LoginQuery, useLogin } from '../../../utils/Hooks/AuthHooks';
import { toggleAlert } from '../../../store/modalSlice';
import LoginTitle from './LoginTitle';
import { saveUser, updateUserState } from '../../../store/userSlice';

const Login: FC<Screen> = ({navigation}) => {
    //GLOBAL STATE
    const {theme} = useSelector((state: RootState) => state.appSetting);
    const dispatch = useDispatch();

    //LOCAL STATE
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    // set password visibility
    const [secure, setSecure] = useState<boolean>(true);

    const loginQuery = useLogin();

    // handles login button click
    const handleLogin = async ()=> {
        const body: LoginQuery = {
            email: email,
            password: password,
        }
        try {
            const res = await loginQuery.mutateAsync(body);
            console.log(res);
            dispatch(saveUser(res.data.data));
            dispatch(toggleLoggedIn());
        } 
        catch (err) {
            // console.log(err);
            const errAlert: AlertConfig = errorHandler(err);
            dispatch(toggleAlert(errAlert));
        }
    }
    
    return (
        <Container style={{backgroundColor: theme.background,}}>
            <ScrollView style={{minHeight: CONSTANTS.DEVICE_HEIGHT}} contentContainerStyle={{minHeight: CONSTANTS.DEVICE_HEIGHT, paddingBottom: scale(10)}}>
                <LoginTitle />
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
                    <Input label="Password" secure multiline={false} onChangeText={setPassword}
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
                    <Pressable style={{marginBottom: scale(20)}}>
                        <SemiBoldText title='Forgotten Password?' onPress={()=> navigation.navigate('ForgotPassword')} />
                    </Pressable>
                </View>
                <ImageBackground source={require('../../../../assets/img/ellipse.png')} 
                    style={{flex: 4, justifyContent: 'center', padding: scale(20)}} 
                    imageStyle={{resizeMode: 'stretch'}}>
                    <Button title='Login' 
                        loading={loginQuery.isLoading}
                        disabled={loginQuery.isLoading || !email || !password || !validateEmail(email) || !validatePassword(password).valid}
                        onPress={handleLogin}
                    />
                    <View style={{alignItems: 'center', marginTop: scale(10)}}>
                        <BlockText>
                            <RegularText title="Don't have an account? " />
                            <SemiBoldText title='Register' onPress={()=> navigation.navigate('Register')} />
                        </BlockText>
                    </View>
                </ImageBackground>
            </ScrollView>
        </Container>
    )
}

export default Login