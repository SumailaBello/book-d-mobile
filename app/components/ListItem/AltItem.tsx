import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
// import { colors } from '../../Styles/Styles'
import scale from '../../utils/scale';
import { RegularText, MediumText, SemiBoldText } from '../Typography/Typography';
import CONSTANTS from '../../utils/constants';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Checkbox from '../Checkbox/Checkbox';
import ArrowRight from '../../../assets/icons/arrow-right.svg';

interface ListProps {
    /** title string */
    title: string,
    subtitle?: string,
    /** style object */
    // style?: Object,
    /** function executed on press */
    onPress?: ()=> void,
    icon?: React.ReactNode,
    /**icon position whether left or right */
    // iconPosition?: string,
    /**optional style for icon parent component like margin and backgroundColor */
    iconStyle?: Object,
    disabled?: boolean,
    /**style of button text */
    textStyle?: Object,
    rippleColor?: string,
    /** color of button text to override default color */
    textColor?: string,
    /**vertical padding value to control button height */
    verticalPadding?: number,
    /**control horizontal padding value */
    horizontalPadding?: number,
    loading?: boolean,
    loaderColor?: string,
    /** color of border */
    borderColor?: string,
    /** whether checkbox is checked or not */
    checked?: boolean,
    /** custom height value */
    height?: number,
    /**lines subtitle shoul take */
    subtitleLines?: number,
    /** transform text */
    textTransform?: 'capitalize' | 'uppercase' | 'lowercase' | 'none',
    clickable?: boolean,
}
// const {theme} = CONSTANTS;
const AltItem: React.FC<ListProps> = (props) => {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    return (
        <Pressable 
            style={[styles.listItem, {
            borderBottomColor: props.borderColor ?? theme.light[400], 
            backgroundColor: props.checked ? theme.primary[100] : theme.neutral[100],
            height: props.height ?? undefined,
            opacity: props.disabled ? 0.5 : 1
            }]} 
            onPress={props.disabled ? undefined : props.onPress} android_ripple={{color: props.rippleColor ?? theme.light[400]}}>
            <View style={styles.content}>
                {props.icon ? (
                    <View style={{flex: 2, justifyContent: "center", alignItems: "center"}}>
                        {props.icon}
                    </View>
                ) : (null)}
                <View style={{flex: props.icon ? 9 : 11, paddingLeft: scale(5)}}>
                    <SemiBoldText transform={props.textTransform} title={props.title} color={props.textColor ?? theme.neutral[300]} size={14} />
                    {props.subtitle ? (
                        <RegularText size={12} title={props.subtitle} color={theme.neutral.main} lines={props.subtitleLines ?? 1} />
                    ) : (null)}
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <ArrowRight />
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    listItem: {
        paddingHorizontal: scale(10),
        borderRadius: scale(8),
        minHeight: scale(54),
        marginVertical: scale(5),
        justifyContent: "center",

    },
    content: {
        flex: 1,
        flexDirection: 'row',
        // paddingLeft: scale(15),
        alignItems: 'center'
    }
})

export default AltItem
