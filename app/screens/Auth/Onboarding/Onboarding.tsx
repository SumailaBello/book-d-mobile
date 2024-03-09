import { View, Text } from 'react-native'
import React from 'react'
import Container from '../../../components/Container/Container';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import scale from '../../../utils/scale';
import { MediumText } from '../../../components/Typography/Typography';

const Onboarding = () => {
    const {theme, biometricEnabled} = useSelector((state: RootState) => state.appSetting);
    
    return (
        <Container style={{backgroundColor: theme.background}}>
            <View style={{flex: 8, alignItems: 'center'}}>
                <MaterialCommunityIcons name='calendar-blank-multiple' size={scale(150)} />
            </View>
            <View style={{flex: 4}}>
                <MediumText title='medium' />
            </View>
        </Container>
    )
}

export default Onboarding