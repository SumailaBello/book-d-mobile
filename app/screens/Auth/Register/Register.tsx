import { View, Text, ImageBackground, Pressable, StyleSheet } from 'react-native'
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
import RegisterTitle from './RegisterTitle';
import { RegisterQuery, useRegister } from '../../../utils/Hooks/AuthHooks';
import { errorHandler, validateEmail, validatePassword } from '../../../utils/utils';
import { toggleAlert } from '../../../store/modalSlice';

const Register: FC<Screen> = ({navigation}) => {
    //GLOBAL STATE
    const {theme, biometricEnabled} = useSelector((state: RootState) => state.appSetting);
    const dispatch = useDispatch();

    //LOCAL STATE
    const [firstName, setFirstName] = useState<any>('');
    const [lastName, setLastName] = useState<any>('');
    const [email, setEmail] = useState<string>('');
    const [business, setBusiness] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [jobTitle, setJobTitle] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    // set password visibility
    const [secure, setSecure] = useState<boolean>(true);
    const [confirmSecure, setConfirmSecure] = useState<boolean>(true);

    const registerQuery = useRegister();

    const handleRegister = async ()=> {
        const body: RegisterQuery = {
            name: firstName + ' ' + lastName,
            businessName: business,
            address: address,
            jobTitle: jobTitle,
            email: email,
            password: password,
        }
        try {
            const res = await registerQuery.mutateAsync(body);
            console.log('Register', res);
            navigation.navigate('ConfirmOtp', {user: res.data.user, mode: 'register'});
        } 
        catch (err) {
            // console.log(err);
            const errAlert: AlertConfig = errorHandler(err);
            dispatch(toggleAlert(errAlert));
        }
    }
    
    return (
        <Container style={{backgroundColor: theme.background,}}>
            <ScrollView contentContainerStyle={{minHeight: CONSTANTS.DEVICE_HEIGHT}}>
                <RegisterTitle />
                <View style={{flex: 4, paddingHorizontal: scale(20)}}>
                    <View style={{alignItems: 'center', marginVertical: scale(10)}}>
                        <MaterialCommunityIcons name='calendar-blank-multiple' color={theme.primary.main} size={scale(30)} />
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1, marginRight: scale(2)}}>
                            <Input label='First Name' value={firstName} onChangeText={setFirstName} />
                        </View>
                        <View style={{flex: 1, marginLeft: scale(2)}}>
                            <Input label='Last Name' value={lastName} onChangeText={setLastName} />
                        </View>
                    </View>
                    <Input label='Business Name' value={business} onChangeText={setBusiness} />
                    <Input label='Job Title' value={jobTitle} onChangeText={setJobTitle} />
                    <Input label='Address' value={address} onChangeText={setAddress} />
                    <Input label='Email' 
                        value={email} 
                        onChangeText={setEmail} 
                        error={!email ? false : validateEmail(email) ? false : true} 
                        errorMessage="Email is invalid" keyboardType="email-address"
                    />
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
                <ImageBackground source={require('../../../../assets/img/ellipse.png')} style={styles.footer} 
                    imageStyle={{resizeMode: 'stretch'}}>
                    <Button title='Register' 
                        loading={registerQuery.isLoading}
                        disabled={registerQuery.isLoading || !email || !password || !validateEmail(email) || !validatePassword(password).valid || password !== confirmPassword}
                        onPress={handleRegister}
                    />
                    <View style={{alignItems: 'center', marginTop: scale(10)}}>
                        <BlockText>
                            <RegularText title="Already have an account? " />
                            <SemiBoldText title='Login' onPress={()=> navigation.navigate('Login')} />
                        </BlockText>
                    </View>
                </ImageBackground>
            </ScrollView>
        </Container>
    )
}

const styles = StyleSheet.create({
    footer: {
        flex: 4, 
        justifyContent: 'center', 
        padding: scale(20),
    }
})

export default Register