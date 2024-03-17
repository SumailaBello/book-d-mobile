import { View, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import { RegularText, MediumText } from '../../../components/Typography/Typography';
import scale from '../../../utils/scale';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const HomeCard = () => {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    const {user} = useSelector((state: RootState) => state.userSlice);
    
    return (
        <View>
            <View style={[styles.cards, {backgroundColor: theme.light, borderColor: theme.neutral[200]}]}>
                <View style={{flex: 1, alignItems: 'center', borderRightWidth: scale(1), borderRightColor: theme.neutral[200]}}>
                    <RegularText title='Title' size={14} />
                    <View>
                        <MediumText title={user.jobTitle} size={16} lines={1} />
                    </View>
                </View> 
                <View style={{flex: 1, alignItems: 'center', borderRightWidth: scale(1), borderRightColor: theme.neutral[200]}}>
                    <RegularText title='Rating' size={14} />
                    <View style={{flexDirection: 'row'}}>
                        <MediumText title={user.rating} lines={1} size={16} />
                        <MaterialCommunityIcons name='star' color={theme.warning.main} size={scale(15)} />
                    </View>
                </View> 
                <View style={{flex: 1, alignItems: 'center'}}>
                    <RegularText title='Sales' size={14} />
                    <View>
                        <MediumText title={user.sales} lines={1} size={16} />
                    </View>
                </View> 
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cards: {
        marginTop: scale(30),
        flexDirection: 'row',
        // height: scale(100),
        paddingVertical: scale(20),
        paddingHorizontal: scale(5),
        borderWidth: scale(1),
        borderRadius: scale(10),
    },
})

export default HomeCard as FC