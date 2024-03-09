import React from 'react';
import { View, Pressable, StyleSheet, Image } from 'react-native';
// import { colors } from '../../Styles/Styles'
import scale from '../../utils/scale';
import { RegularText, MediumText, SemiBoldText } from '../Typography/Typography';
import CONSTANTS from '../../utils/constants';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Checkbox from '../Checkbox/Checkbox';
import ArrowRight from '../../../assets/icons/arrow-right.svg';
import EditIcon from '../../../assets/icons/edit.svg';
import DeleteIcon from '../../../assets/icons/delete.svg';

interface ListProps {
    /** title string */
    title: string,
    subtitle?: string,
    /** style object */
    // style?: Object,
    /** function executed on press */
    onPress?: ()=> void,
    imageSrc?: string,
    disabled?: boolean,
    /** color of button text to override default color */
    textColor?: string,
    /**lines subtitle shoul take */
    subtitleLines?: number,
    /** custom color of the item background */
    backgroundColor?: string,
    /** handler for edit button press */
    onEditPress?: ()=> void,
    /** handler for delete button press */
    onDeletePress?: ()=> void,
}
// const {theme} = CONSTANTS;
const CustomerItem: React.FC<ListProps> = (props) => {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    return (
        <Pressable 
            style={[styles.listItem, {
            backgroundColor: theme.neutral[100],
            opacity: props.disabled ? 0.5 : 1
            }]} 
            onPress={props.disabled ? undefined : props.onPress}>
            <View style={styles.content}>
                <View style={{flex: 2, justifyContent: "center", alignItems: "center"}}>
                    {props.imageSrc ? (
                        <Image source = {{uri: props.imageSrc as string}} style={styles.img} />
                    ) : (
                        <Image source={require('../../../assets/img/placeholder.png')} style={styles.img} />
                    )}
                </View>
                <View style={{flex: 7, paddingLeft: scale(5)}}>
                    <SemiBoldText title={props.title} color={props.textColor ?? theme.neutral[300]} size={14} />
                    {props.subtitle ? (
                        <RegularText size={12} title={props.subtitle} color={theme.neutral.main} lines={props.subtitleLines ?? 1} />
                    ) : (null)}
                </View>
                <View style={{flex: 3, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: scale(5)}}>
                    <Pressable onPress={props.onEditPress}>
                        <EditIcon />
                    </Pressable>
                    <Pressable onPress={props.onDeletePress}>
                        <DeleteIcon />
                    </Pressable>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    listItem: {
        padding: scale(15),
        borderRadius: scale(8),
        minHeight: scale(54),
        marginVertical: scale(10),
        justifyContent: "center",

    },
    content: {
        flex: 1,
        flexDirection: 'row',
        // paddingLeft: scale(15),
        alignItems: 'center'
    },
    img: {
        height: scale(30),
        width: scale(30),
        borderRadius: scale(15),
        borderWidth: scale(1),
    }
})

export default CustomerItem
