import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
// import { colors } from '../../Styles/Styles'
import scale from '../../utils/scale';
import { RegularText, MediumText, SemiBoldText } from '../Typography/Typography';
import CONSTANTS from '../../utils/constants';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Checkbox from '../Checkbox/Checkbox';

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
    iconPosition?: string,
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
    /** disable check/select action */
    disableCheck?: boolean
}
// const {theme} = CONSTANTS;
const ListItem: React.FC<ListProps> = (props) => {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    return (
        <Pressable 
            disabled={props.disabled}
            style={[styles.listItem, {
            borderBottomColor: props.borderColor ?? theme.light[400], 
            backgroundColor: props.checked ? theme.primary[100] : theme.neutral[100],
            opacity: props.disabled ? 0.5 : 1
            }]} 
            onPress={ props.disabled || props.disableCheck ? null : props.onPress} android_ripple={{color: props.rippleColor ?? theme.light[400]}}>
            <View style={styles.content}>
                {props.icon? (
                    <View style={{flex: 2}}>
                        {props.icon}
                    </View>
                ) : null}
                <View style={{flex: 10}}>
                    <SemiBoldText title={props.title} color={props.textColor ?? theme.neutral[300]} size={14} />
                    {props.subtitle ? (
                        <RegularText size={12} title={props.subtitle} color={theme.neutral.main} />
                    ) : (null)}
                </View>
                <View style={{flex: 2, alignItems: 'center'}}>
                    {!props.disableCheck ? (
                        <Checkbox checked={props.checked} mode="light" 
                        onPress={(e)=> {
                            e?.preventDefault();
                            // e?.stopPropagation();
                            props.disabled || props.disableCheck ? null : props.onPress ? props.onPress() : null;
                        }} />
                    ) : null}
                </View>
                {/* {props.icon ? (
                    <View style={{flex: 2, alignItems: 'flex-end'}}>
                        {props.icon}
                    </View>
                ) : (null)} */}
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    listItem: {
        paddingVertical: scale(10),
        borderRadius: scale(8),
        height: scale(50)
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: scale(15),
        alignItems: 'center'
    }
})

export default ListItem
