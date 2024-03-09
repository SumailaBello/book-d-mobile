import React, { Component, useRef, Ref, useState, useEffect } from 'react';
import { View, StyleSheet, KeyboardType, TextInput, Pressable } from 'react-native';
// import {colors} from '../../Styles/Styles';
import scale from '../../utils/scale';
// import { BoldText, RegularText } from '../Typography/Typography';
import CONSTANTS from '../../utils/constants';
import { StyleProps } from 'react-native-reanimated';
import * as Animatable from 'react-native-animatable';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
// import { Theme } from '../../utils/types';

interface Props {
    /**optional style for icon parent component like margin and backgroundColor */
    iconStyle?: Object,
    /**whether input is editable or not */
    disabled?: boolean,
    onChangeText?: (value: string)=> void,
    keyboardType?: KeyboardType,
    secure?: boolean,
    /** alternate label component for input field */
    altLabel?: React.ReactNode,
    theme?: any,
    /** fixed value of input */
    value: any,
    /**length of inpi=ut field */
    length: 4 | 6,
    /** to enable visual display of validity */
    isValid?: boolean,
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
    const [inputRefs, setInputRefs]: any = useState([inputRef1, inputRef2, inputRef3, inputRef4])
    // const inputRefs = [inputRef1, inputRef2, inputRef3, inputRef4, inputRef5, inputRef6];
    const [focused, setFocused] = React.useState(false);

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
        // console.log(inputRef1.current)
    }
    const handleBlur = ()=> {
        toggleFocus(false);
    }

    // track change of value locally
    const handleChange = (value: any)=> {
        setAllValue(value);
        props?.onChangeText ? props.onChangeText(value) : null;
    }

    React.useEffect(()=> {
        // console.log(allValue);
        props.onChangeText ? props.onChangeText(allValue) : null;
        // return ()=> {
        //     setAllValue('')
        // }
    }, [allValue])

    return (
        <View style={{flexDirection: 'row', justifyContent: props.length === 4 ? 'flex-start' : 'space-between', width: '100%', alignContent: 'space-between'}}>
            {inputRefs.map((ref: any, index: number)=> (
                <Pressable key={index} onPress = {()=> ref.current.focus()} 
                style={[styles.defaultItemStyle, { backgroundColor: theme.neutral[100],
                    height: props.length === 4 ? scale(50) : scale(40),
                    width: props.length === 4 ? scale(50) : scale(40),
                    marginHorizontal: props.length === 4 ? scale(5) : 0
                }]}>
                    <TextInput ref={ref} maxLength={1} onBlur={handleBlur} textAlign="center" placeholderTextColor={theme.neutral.main} placeholder="-" style={[styles.input, {color: theme.neutral[300]}]} editable = {!props.disabled} returnKeyType="done" keyboardType={props.keyboardType} secureTextEntry = {props.secure} value={props.value[index]} 
                        onChangeText={(text: string)=> {
                            if(text) {
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
                            ref.current.focus();
                            // const length = allValue?.length;
                        }} 
                        onKeyPress={e=>{
                            e.persist();
                            if(e.nativeEvent.key === 'Backspace') {
                                if(!allValue[index]) {
                                    inputRefs[index - 1]?.current.focus();
                                }
                            }
                            else {
                                inputRefs[index + 1]?.current.focus();
                            }
                        }
                        }
                        // returnKeyType='done'
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
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: "center"
    },
    input: {
        height: '100%',
        fontSize: scale(20),
        alignSelf: 'center',
        color: 'black',
        // width: "100%",
        // alignItems: "center",
        // justifyContent: "center"

    }
});

export default OtpInput;
