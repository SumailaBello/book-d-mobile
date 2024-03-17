import { View, Text } from 'react-native';
import React, { FC } from 'react';
import { BoldText, RegularText } from '../../../components/Typography/Typography';
import scale from '../../../utils/scale';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

interface Props {
    userName: string
}

const ResetPasswordTitle: FC<Props> = ({userName}) => {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    
    return (
        <View style={{flex: 4, paddingHorizontal: scale(20)}}>
            <BoldText title='Reset Password' size={28} />
            <RegularText title={`${userName}`} color={theme.neutral.main} />
        </View>
    )
}

export default ResetPasswordTitle