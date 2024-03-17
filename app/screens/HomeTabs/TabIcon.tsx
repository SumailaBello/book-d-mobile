import { View, Text, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import { TabIconType } from '../../utils/types';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import scale from '../../utils/scale';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { RegularText } from '../../components/Typography/Typography';

const TabIcon: FC<TabIconType> = ({focused, title, iconName, color, size}) => {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    
    return (
        <View style={[styles.container, 
            {paddingHorizontal: focused ? scale(7) : undefined, 
                paddingVertical: focused ? scale(3) : undefined, 
                backgroundColor: focused ? theme.primary.main : undefined,
            }]}>
            <MaterialCommunityIcons size={size} name={iconName} color={color} />
            {focused ? (
                <View style={{marginLeft: scale(3)}}>
                    <RegularText title={title} size={12} color={theme.light} />
                </View>
            ) : (
                null
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center', 
        borderRadius: scale(5),
        flexDirection: 'row',
    }
})

export default TabIcon