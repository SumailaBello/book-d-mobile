import { View, Text } from 'react-native';
import React from 'react';
import { BoldText, RegularText } from '../../../components/Typography/Typography';
import scale from '../../../utils/scale';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

const RegisterTitle = () => {
    const {theme, biometricEnabled} = useSelector((state: RootState) => state.appSetting);
    
    return (
        <View style={{flex: 4, paddingHorizontal: scale(20)}}>
            <BoldText title='Welcome' size={28} />
            <RegularText title='Create your account to get started' color={theme.neutral.main} />
        </View>
    )
}

export default RegisterTitle