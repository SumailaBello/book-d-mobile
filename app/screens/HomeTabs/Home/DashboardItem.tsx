import { StyleSheet, ViewStyle, Pressable, GestureResponderEvent } from 'react-native'
import React, { FC, ReactNode } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import scale from '../../../utils/scale';
import { MediumText } from '../../../components/Typography/Typography';

interface Props {
    /** icon of the item */
    icon: ReactNode;
    /** title text displayed on the item  */
    title: string;
    /** background color of item */
    color?: string;
    /** any other custom styling */
    style?: ViewStyle;
    /** press handler */
    onPress?: (evt: GestureResponderEvent)=> void;
}

const DashboardItem: FC<Props> = ({icon, title, color, style, onPress}) => {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    
    return (
        <Pressable style={[styles.dashboardItem, {backgroundColor: color, ...style}]}
            onPress={onPress}
        >
            {icon}
            <MediumText title={title} color={theme.light} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    dashboardItem: {
        flex: 1,
        borderRadius: scale(10),
        alignItems: 'center',
        justifyContent: 'center',
        padding: scale(10)
        // height: scale(80),
    }
})

export default DashboardItem