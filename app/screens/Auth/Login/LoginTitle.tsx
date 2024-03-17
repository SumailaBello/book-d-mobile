import { View, Text } from 'react-native';
import React from 'react';
import { BoldText, RegularText } from '../../../components/Typography/Typography';
import scale from '../../../utils/scale';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

const LoginTitle = () => {
    const {theme, biometricEnabled} = useSelector((state: RootState) => state.appSetting);
    
    return (
        <View style={{flex: 4, paddingHorizontal: scale(20)}}>
            <BoldText title='Welcome Back' size={28} />
            <RegularText title='Login to continue' color={theme.neutral.main} />
        </View>
    )
}

export default LoginTitle