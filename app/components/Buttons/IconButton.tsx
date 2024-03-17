import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface buttonProps {
    // title?: string,
    /** style object */
    style?: Object,
    /** function executed on press */
    onPress?: ()=> void,
    icon: React.ReactNode,
    /**optional style for icon parent component like margin and backgroundColor */
    iconParentStyle?: Object,
    disabled?: boolean,
    rippleColor?: string,
    /**whether to render circular indicator badge */
    badge?: boolean,
    /**badge background color */
    badgeColor?: string,
    /**background color of icon button */
    backgroundColor?: string,
}

const defaultMargin: number = 2;
// const {theme} = CONSTANTS;
export const IconButton: React.FC<buttonProps> = (props: buttonProps) =>  {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    return (
        <Pressable android_ripple={{color: props.rippleColor ?? theme.light[300]}} onPress={props.onPress} style={[props.style ? props.style : styles.defaultBtnStyle, styles.btn, {backgroundColor: props.backgroundColor ? props.backgroundColor : 'transparent', opacity: props.disabled ? 0.5 : 1}]} disabled={props.disabled}>
            <View style={props.iconParentStyle ? props.iconParentStyle : styles.defaultIconParentStyle}>
                {props.icon}
                {props.badge ? (
                    <View style = {[styles.badge, {backgroundColor: props.badgeColor ?? theme.danger.main}]} />
                ) : (null)}
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    defaultBtnStyle: {
        width: 'auto',
    },
    btn: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        margin: defaultMargin,
        borderRadius: 10
    },
    defaultIconParentStyle: {
        backgroundColor: 'transparent'
    },
    badge: {
        height: 10,
        width: 10,
        borderRadius: 5,
        position: 'absolute',
        left: '65%',
        top: -5
    }
});

export default IconButton;
