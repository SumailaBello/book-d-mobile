import React, { Component, useRef, Ref, useState, useEffect } from 'react';
import { View, StyleSheet, KeyboardType, TextInput, Pressable, NativeEventEmitter, Keyboard, ViewStyle, FlexStyle, } from 'react-native';
// import {colors} from '../../Styles/Styles';
import scale from '../../utils/scale';
// import { BoldText, RegularText } from '../Typography/Typography';
import CONSTANTS from '../../utils/constants';
import * as Animatable from 'react-native-animatable';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
// import { Theme } from '../../utils/types';

interface Props {
    /**optional style for icon parent component like margin and backgroundColor */
    iconStyle?: Object,
    /**whether input is editable or not */
    disabled?: boolean,
    /**applies default styling for valid state */
    valid?: boolean,
    onChangeText?: (value: string)=> void,
    keyboardType?: KeyboardType,
    secure?: boolean,
    /** alternate label component for input field */
    altLabel?: React.ReactNode,
    theme?: any,
    /** fixed value of input */
    value?: any,
    length: 4 | 6,
    onFocus?: (focus: boolean) => void,
    justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | undefined
    /** whether to disable focus of internal input field when highlighted */
    // disableInternalFocus?: boolean;
}

// const {theme} = CONSTANTS;

const OtpInput: React.FC<Props> = (props) => {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    const [allValue, setAllValue] = useState('');
    const inputRef1: Ref<any> = useRef();
    const inputRef2: Ref<any> = useRef();
    const inputRef3: Ref<any> = useRef();
    const inputRef4: Ref<any> = useRef();
    const inputRef5: Ref<any> = useRef();
    const inputRef6: Ref<any> = useRef();
    const [inputRefs, setInputRefs]: any = useState([inputRef1, inputRef2, inputRef3, inputRef4, inputRef5, inputRef6])
    const [currentRef, setCurrentRef]: any = useState(); //currently focused input box
    const [currentIndex, setCurrentIndex]: any = useState(); //currently focused input box index
    const [focused, setFocused] = React.useState(false);
    // const eventEmitter = new NativeEventEmitter();

    useEffect(() => {
        if(props.length === 4) {
            const newInputRefs = [inputRef1, inputRef2, inputRef3, inputRef4];
            setInputRefs(newInputRefs);
        }
        if(props.length === 6) {
            const newInputRefs = [inputRef1, inputRef2, inputRef3, inputRef4, inputRef5, inputRef6];
            setInputRefs(newInputRefs);
        }
    }, [])

    const toggleFocus = (value: boolean)=> {
        setFocused(value);
    }

    const handleFocus = ()=> {
        toggleFocus(true);
        props.onFocus ? props.onFocus(true) : null;
        // console.log(inputRef1.current)
    }
    const handleBlur = ()=> {
        toggleFocus(false);
        setCurrentRef(null);
    }

    // track change of value locally
    // const handleChange = (value: any)=> {
    //     setAllValue(value);
    //     props?.onChangeText ? props.onChangeText(value) : null;
    // }

    React.useEffect(()=> {
        props.onChangeText ? props.onChangeText(allValue) : null;
    }, [allValue])

    // emits blur event once system keyboard is not in use

    return (
        <View style={{flexDirection: 'row', justifyContent: props.justify ?? "space-between", width: '100%', alignContent: 'space-between'}}>
            {inputRefs.map((ref: any, index: number)=> (
                <Pressable key={index} onPress = {()=> ref.current.focus()} 
                style={[styles.defaultItemStyle, 
                    {borderColor: ref?.current?.isFocused() ? theme.success.main : theme.neutral[100], 
                    backgroundColor: theme.neutral[300],
                    borderWidth: 1,
                    marginRight: props.justify === "flex-start" ? scale(10) : undefined
                }]}>
                    <TextInput ref={ref} maxLength={1} onBlur={handleBlur} style={styles.input} editable = {!props.disabled}  keyboardType={props.keyboardType} secureTextEntry = {props.secure} value={props.value[index]}
                        onChangeText={(text: string)=> { //only runs on system keyboard
                            if(text) {
                                // const value = text.length > 0 ? text[1] : text[0] ;
                                let newVal = allValue;
                                newVal += text;
                                setAllValue(newVal);
                            }
                            else {
                                let newVal = allValue;
                                newVal = newVal.slice(0, -1);
                                setAllValue(newVal);
                            }
                        }}
                        onFocus={()=> {
                            handleFocus();
                            // props.disableInternalFocus ? null : ref.current.focus();
                            ref.current.focus();
                            setCurrentRef(ref);
                            setCurrentIndex(index);
                            // const length = allValue?.length;
                        }} 
                        onKeyPress={e=>{
                            e.persist();
                            if(e.nativeEvent.key === 'Backspace') {
                                // let newVal = allValue;
                                if(!allValue[index]) {
                                    inputRefs[index - 1]?.current.focus();
                                }
                            }
                            else {
                                inputRefs[index + 1]?.current.focus();
                            }
                        }
                        }
                    />
                </Pressable>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    defaultItemStyle: {
        paddingHorizontal: 5,
        borderRadius: scale(8),
        paddingVertical: scale(5),
        // backgroundColor: 'transparent',
        marginBottom: 20,
        height: scale(40),
        width: scale(40),
        alignItems: 'center',
        // marginRight: scale(15),
        // alignSelf: "center"
        // borderColor: theme.light.medium,
    },
    input: {
        height: '100%',
        fontSize: scale(20),
        alignSelf: 'center',
        color: 'black',
        textAlign: "center",
    }
});

export default OtpInput;
