import React, { FC, useEffect, useState } from 'react';
import { View, Text, Modal, Pressable, StyleSheet, Appearance } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import scale from '../../utils/scale';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { RegularText } from '../Typography/Typography';
import CalendarIcon from '../../../assets/icons/calendar.svg';

interface Props {
    onConfirm?: (date: Date)=> void;
    /** value to display on date picker */
    value?: any;
    /** placeholder */
    placeholder?: string;
    /** label of field */
    label?: string;
}

const DatePicker: FC<Props> = ({onConfirm, value, placeholder="dd/mm/yyyy", label}) => {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const colorScheme = Appearance.getColorScheme();

    // fixing blank picker in dark mode on ios
    const [isDark, setIsDark] = useState(colorScheme === 'dark');

    useEffect(() => {
        setIsDark(colorScheme === 'dark');
    }, [colorScheme]);

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleConfirm = (date: Date) => {
        onConfirm ? onConfirm(date) : null;
        hideDatePicker();
    };
    return (
        <>
            <Pressable style={[styles.defaultItemStyle, {backgroundColor: theme.neutral[100]}]} onPress={showDatePicker}>
                {label ? (
                    <View style={{position: "absolute", top: scale(3), left: scale(15)}}>
                        {value ? (
                            <RegularText title={label ?? ''} size={12} color={theme.neutral.main} />
                        ) : (
                            <RegularText title='' size={12} color={theme.neutral.main} />
                        )}
                    </View>
                ) : null}
                <View style={{marginTop: label ? scale(5) : undefined}}>
                    <RegularText title={value ?? placeholder} size={14} color={value ? theme.neutral.main : theme.neutral.main} />
                </View>
                <CalendarIcon style={{marginLeft: "auto"}} />
                {/* <MaterialCommunityIcons name="calendar-blank-outline" size={30} color={theme.neutral[600]} style={{marginLeft: "auto"}} /> */}
            </Pressable>
            <DateTimePickerModal 
                accentColor={theme.primary.main}
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                isDarkModeEnabled={isDark}
                themeVariant={isDark ? 'dark' : 'light'}
            />
        </>
    )
}

const styles = StyleSheet.create({
    defaultItemStyle: {
        paddingHorizontal: scale(17),
        borderRadius: 10,
        paddingVertical: scale(5),
        // borderWidth: 1.5,
        marginBottom: 10,
        height: scale(50),
        flexDirection: 'row',
        alignItems: "center"
    },

})

export default DatePicker
