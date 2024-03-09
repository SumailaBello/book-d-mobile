import React, { Component, useRef, Ref, useState } from 'react';
import { View, StyleSheet, KeyboardType, TextInput, Pressable } from 'react-native';
// import {colors} from '../../Styles/Styles';
import scale from '../../utils/scale';
import { RegularText, BoldText} from '../Typography/Typography';
import CONSTANTS from '../../utils/constants';
import { StyleProps } from 'react-native-reanimated';
import * as Animatable from 'react-native-animatable';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface Props {
    /** label string */
    label?: string,
    /** style object to customise input parent item. This will override default styling for error, valid and required states */
    style? : Object,
    /**react component to be used as icon */
    icon?: React.ReactNode,
    /**icon position whether left or right */
    // iconPosition?: string,
    /**optional style for icon parent component like margin and backgroundColor */
    iconStyle?: Object,
    /**whether input is editable or not */
    disabled?: boolean,
    /**applies default styling for error state */
    error?: boolean,
    /**custom error message */
    errorMessage?: string,
    /**applies default behaviour to highlight required input */
    required?: boolean,
    /**applies default styling for valid state */
    valid?: boolean,
    defaultValue?: any,
    onChangeText?: (value: string)=> void,
    onChange?: (value: any)=> void,
    keyboardType?: KeyboardType,
    secure?: boolean,
    /**parent style object */
    parentStyle?: StyleProps,
    value?: any;
    numberOfLines?: number,
    multiline?: boolean;
    placeholder?: string,
    /** alternate label component for input field */
    altLabel?: React.ReactNode,
    maxLength?: number,
}

/**default margin style style */
const defaultMargin: number = 2;
// const {theme} = CONSTANTS;

const TextArea: React.FC<Props> = (props) => {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    const [value, setValue] : any = useState(props.value || props.defaultValue);
    const inputRef: Ref<any> = useRef();
    const labelRef: Ref<any> = useRef();
    const [focused, setFocused] = useState(false);
    const [currentLabelPosition, setCurrentLabelPosition] = useState('bottom');
    const toggleFocus = (value: boolean)=> {
        setFocused(value);
    }

    const handleFocus = ()=> {
        toggleFocus(true);
    }
    const handleBlur = ()=> {
        toggleFocus(false);
    }

    // track change of value locally
    const handleChange = (value: any)=> {
        setValue(value);
        props?.onChangeText ? props.onChangeText(value) : null;
        props.onChange ? props.onChange(value) : null;
    }

    React.useEffect(()=> {
        if(focused) {
            // labelRef.current.animate({ 0: { scale: 1, translateY: 0 }, 1: { scale: 0.9, translateY: scale(-28) } })
            if (!value) {
                translateTop();
            }
        }
        else {
            // labelRef.current.animate({ 0: { scale: 0.9, translateY: scale(-28)}, 1: { scale: 1, translateY: scale(0) } })
            if(!value) {
                translateBottom();
            }
            else if(value) {
                translateTop();
            }
        }
    }, [focused])

    /** translate the label to the top of the input */
    const translateTop = ()=> {
        if(currentLabelPosition !== 'top') {
            labelRef?.current?.transition({ translateY: 0 },{translateY: scale(-20) }, 300);
            setCurrentLabelPosition('top');
        }
    }

    /** translate the label inside the input */
    const translateBottom = ()=> {
        // if(currentLabelPosition !== 'bottom') {
            labelRef?.current?.transition({ translateY: scale(-20)}, {translateY: scale(0)}, 300);
            setCurrentLabelPosition('bottom');
        // }
    }

    return (
        <>
            {/* optional alternate label for added functionality */}
            {props.altLabel ? (
                <View style = {{alignItems: 'flex-end', marginBottom: 10}}>
                    {props.altLabel}
                </View>
            ) : (null)}
            <Pressable onPress = {()=> inputRef.current.focus()} style={[styles.defaultItemStyle, {borderColor: props.error ? theme.danger.main : focused ? theme.primary.main : theme.neutral[100], backgroundColor: theme.neutral[100]}]}>
            {props.label ? (
            // animated label for material design effect
                <Animatable.View useNativeDriver ref={labelRef} 
                style={{position: 'absolute', top: scale(20), left: scale(12), paddingHorizontal: 10, backgroundColor: theme.neutral[100]}}>
                    <RegularText title={props.label} color={focused ? theme.primary.main : "#808080"} size={14} />
                </Animatable.View>
                ) : (null)}
                {props.icon ? (
                    <View style={styles.iconStyle}>
                        {props.icon}
                    </View>
                ) : (null)}
                <TextInput 
                    ref={inputRef}
                    maxLength={props.maxLength}
                    onFocus={handleFocus} 
                    onBlur={handleBlur} style={{color: theme.neutral[700], height: '100%', paddingLeft: scale(10), marginBottom: scale(-50)}} editable = {!props.disabled} defaultValue ={props.defaultValue} onChangeText={handleChange} onChange={props.onChange} keyboardType={props.keyboardType} secureTextEntry = {props.secure} value={props.value} multiline placeholder = {props.placeholder} />
            </Pressable>
            {props.error ? (
                <View style={{position: 'absolute', bottom: scale(0),}}>
                    <RegularText size={12} title={ props.errorMessage ??  props.label + " is invalid"} color={theme.danger.main} />
                </View>
            ) : null}
        </>
    );
}

const styles = StyleSheet.create({
    defaultItemStyle: {
        paddingHorizontal: 15,
        borderRadius: 10,
        paddingVertical: scale(15),
        // backgroundColor: 'transparent',
        borderWidth: 1.5,
        marginBottom: 20,
        height: scale(110),
        // flexDirection: 'row'
        // borderColor: theme.light.medium,
    },
    errorItemStyle: {
        paddingHorizontal: 15,
        borderRadius: 10,
        paddingVertical: scale(5),
        borderWidth: 1,
        // borderColor: theme.light.danger.main,
        // backgroundColor: theme.light.medium,
        // borderWidth: 2,
    },
    focusItemStyle: {
        paddingHorizontal: 15,
        borderRadius: 10,
        paddingVertical: scale(5),
        borderWidth: 1,
        // borderColor: theme.light.primary.main,
        // backgroundColor: theme.light.secondary,
        // borderWidth: 2,
    },
    defaultLabelStyle: {
        // color: theme.light.neutral.main,
        marginLeft: 6,
        // marginTop: -12,
    },
    iconStyle: {
        position: "absolute",
        left: '90%',
        // top: scale(15),
        zIndex: 1000,
        height: scale(50),
        padding: 10,
        justifyContent: 'center'
    },
});

export default TextArea;
