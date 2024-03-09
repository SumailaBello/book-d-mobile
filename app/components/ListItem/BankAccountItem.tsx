import { View, Text, Pressable, Image, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import Checkbox from '../Checkbox/Checkbox'
import { RegularText } from '../Typography/Typography'
import { NavigationProp } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import scale from '../../utils/scale';
import { bankAccountType } from '../../utils/types';
import EditIcon from '../../../assets/icons/edit.svg';
import DeleteIcon from '../../../assets/icons/delete.svg';
import BankIcon from '../../../assets/icons/settings/bank.svg';
// import BankGreyIcon from '../../../assets/icons/bank-grey.svg';

interface Props {
    /**callback when an item on list is clicked */
    onSelectItem?: (obj: any)=> any;
    accountItem: bankAccountType,
    navigation?: NavigationProp<any, any>,
    selected?: boolean,
    selectMode?: boolean, /** toggle select check box and display edit/delete button if set to false */
    onEditPress?: ()=> void,
    onDeletePress?: ()=> void
}

const BankAccountItem: FC<Props> = ({onSelectItem, accountItem, selected, selectMode=true, onDeletePress, onEditPress, navigation}) => {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    return (
        <Pressable 
            style={[styles.item, {backgroundColor: selected ? theme.primary[100] : theme.neutral[100]}]} 
            onPress={()=>onSelectItem ? onSelectItem(accountItem) : null}>
            <View style={{flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                <View style={{flex: 9}}>
                    <RegularText title='Bank' size={12} color={theme.neutral.main} />
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        { accountItem.image ? (
                                <Image source={{uri: accountItem.image ?? ""}} style={styles.logo} />
                            ) : <BankIcon style={styles.logo} height={scale(16)} width={scale(16)} /> }
                        <RegularText title={accountItem.bankName} color={theme.neutral[300]} size={14} />
                    </View>
                </View>
                <View style={{flex: 3}}>
                    {selectMode ? (
                        <View style={{alignItems: 'flex-end'}}>
                            <Checkbox 
                                checked = {selected}
                                mode="light" 
                            />
                        </View>
                    ) : (
                        <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: scale(5)}}>
                            <Pressable onPress={onEditPress}>
                                <EditIcon />
                            </Pressable>
                            <Pressable onPress={onDeletePress}>
                                <DeleteIcon />
                            </Pressable>
                        </View>
                    )}
                </View>
            </View>
            <View style={{flex: 1}}>
                <View style={{flexDirection: "row"}}>
                    <View style={{flex: 1}}>
                        <RegularText title='Account Name' color={theme.neutral.main} size={12} />
                        <RegularText title={accountItem.accountName} color={theme.neutral[300]} size={14} />
                    </View>
                    <View style={{flex: 1, alignItems: "flex-start"}}>
                        <RegularText title='Account Number' color={theme.neutral.main} size={12} />
                        <RegularText title={accountItem.accountNo} color={theme.neutral[300]} size={14} />
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    datePicker: {
        backgroundColor: 'white',
        alignItems: 'center'
    },
    listStyle : {
        padding: 10,
        borderBottomWidth: 1,
        // borderBottomColor: theme.light.main,
    },
    gridStyle: {
        padding: 10,
        borderBottomWidth: 1,
        // borderBottomColor: theme.light[400],
        width: '20%',
    },
    item: {
        padding: scale(10),
        borderRadius: scale(10),
        height: scale(130),
        marginTop: scale(15),
    },
    logo: {
        height: scale(16),
        width: scale(16),
        marginRight: scale(5),
    },
})

export default BankAccountItem