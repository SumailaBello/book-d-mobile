import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { Image } from 'react-native-animatable';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import scale from '../../utils/scale';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface Props {
    checked: boolean | undefined;
    mode: 'light' | 'dark';
    // onPress: (evt?: any)=> void;
    onPress?: (evt?: GestureResponderEvent) => void;
    color?: string;
}

const Checkbox: React.FC<Props> = ({checked, mode, onPress, color}) => {
    // const {theme} = CONSTANTS;
    const {theme} = useSelector((state: RootState) => state.appSetting);

    // const handlePress = (event?: any)=> {
    //     console.log(event)
    //     event?.persist();
    //     onPress ? onPress(event) : null;
    // }

    return (
        <TouchableOpacity onPress={onPress} style={[styles.checkbox, {borderColor: mode === 'light' ? color ?? theme.neutral.main : color ?? theme.neutral.main, backgroundColor: checked ? color ?? theme.primary.main : theme.neutral[400]}]}>
            {checked ? (
                <>
                    <MaterialCommunityIcons name="check" color={theme.light} size={20} />
                    
                </>
            ) : null}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    checkbox: {
        // borderWidth: 1.5,
        height: scale(24),
        width: scale(24),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: scale(12),
    },
})

export default Checkbox;
