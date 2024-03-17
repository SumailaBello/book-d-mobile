import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native'
import React, { FC } from 'react'
import Container from '../../../components/Container/Container';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import scale from '../../../utils/scale';
import { MediumText } from '../../../components/Typography/Typography';
import Button from '../../../components/Buttons/Button';
import { Screen } from '../../../utils/types';

const Onboarding: FC<Screen> = ({navigation}) => {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    
    return (
        <Container style={{backgroundColor: theme.background}}>
            <View style={{flex: 8, alignItems: 'center'}}>
                <View style={{flex: 3}}>
                    <MaterialCommunityIcons name='calendar-blank-multiple' color={theme.primary.main} size={scale(100)} />
                </View>
                <View style={{flex: 1}}>
                    <Image source={require('../../../../assets/logo.png')} style={styles.logo} />
                </View>
                <View style={{flex: 7}}>
                    <Image source={require('../../../../assets/img/date-picker.png')} style={styles.img} />
                </View>
            </View>
            <ImageBackground source={require('../../../../assets/img/ellipse.png')} 
                style={{flex: 4, justifyContent: 'center', padding: scale(20)}} 
                imageStyle={{resizeMode: 'stretch'}}>
                <Button title='Get Started' 
                    onPress={()=> navigation.navigate('Login')}
                />
            </ImageBackground>
        </Container>
    )
}

const styles = StyleSheet.create({
    logo: {
        height: scale(30),
        resizeMode: 'contain'
    },
    img: {
        flex: 1,
        resizeMode: 'contain',
    }
})

export default Onboarding