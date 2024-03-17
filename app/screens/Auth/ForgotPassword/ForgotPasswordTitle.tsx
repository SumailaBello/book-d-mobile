import { View, Text } from 'react-native';
import React from 'react';
import { BoldText, RegularText } from '../../../components/Typography/Typography';
import scale from '../../../utils/scale';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

const ForgotPasswordTitle = () => {
    const {theme, biometricEnabled} = useSelector((state: RootState) => state.appSetting);
    
    return (
        <View style={{flex: 4, paddingHorizontal: scale(20)}}>
            <BoldText title='Recover Account' size={28} />
            <RegularText title='Enter email to proceed' color={theme.neutral.main} />
        </View>
    )
}

export default ForgotPasswordTitle