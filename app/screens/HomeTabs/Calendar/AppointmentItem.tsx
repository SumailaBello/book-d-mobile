import { View, Pressable, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import { AppointmentItemType } from '../../../utils/types'
import { RegularText } from '../../../components/Typography/Typography';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import scale from '../../../utils/scale';

interface Props {
    item: AppointmentItemType;
    index: number
}

const AppointmentItem: FC<Props> = ({item, index}) => {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    
    return (
        <Pressable 
            style={[ styles.item, {backgroundColor: index === 1 ? theme.secondary[100] : index % 2 === 0 ? theme.primary[100] : theme.warning[100]}]}>
            <RegularText title={item.title} size={12} color={theme.primary.main} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    item: {
        padding: scale(10),
        borderRadius: scale(10),
        marginTop: scale(10),
        minHeight: scale(54),
        justifyContent: 'center',
    }
})

export default AppointmentItem