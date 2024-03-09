import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, FlatList, Pressable, Image, StatusBar, Modal} from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { RegularText, MediumText, BoldText} from '../Typography/Typography';
// import globalStyles, {colors, screenHeight} from '../../Styles/Styles';
import { Button } from '../Buttons/Button';
// import { observer, inject } from "mobx-react";
import Input from '../Inputs/TextInput';
// import Ionicons from '@expo/vector-icons/Ionicons';
// import { FlatList } from 'react-native-gesture-handler';
import CONSTANTS from '../../utils/constants';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import scale from '../../utils/scale';
import DropDown from '../../../assets/icons/drop-down.svg';
import IconButton from '../Buttons/IconButton';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import SearchIcon from '../../../assets/icons/search-light.svg';
import SearchNeutralIcon from '../../../assets/icons/search-neutral.svg';
import BackIcon from '../../../assets/icons/arrow-left.svg';
import CloseIcon from '../../../assets/icons/close-danger.svg';
import { TextInput } from 'react-native-gesture-handler';
import ListItem from '../ListItem/ListItem';
import Checkbox from '../Checkbox/Checkbox';
import BankGreyIcon from '../../../assets/icons/bank-grey.svg';
import BankIcon  from '../../../assets/icons/settings/bank.svg';
import AltItem from '../ListItem/AltItem';
import { StackNavigationProp } from '@react-navigation/stack';
import { NavigationProp } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { bankAccountType } from '../../utils/types';
// import BankIcon from '../../../../../assets/icons/settings/bank.svg';

interface Props {
    /**list of items */
    list?: Array<any>;
    /**title of popup */
    title: string,
    /**label of popup */
    label?: string,
    /**callback when an item on list is clicked */
    onSelectItem?: (obj: any)=> any;
    /** value to display on select item */
    value?: string,
    /** full height of popup no matter length of content*/
    fullHeight?: boolean;
    /**key to display list item name */
    listTitleKey?: string;
    /** display a search bar to enable search through list of items */
    search?: boolean;
    /** optimize sheet presentation */
    optimize?: boolean;
    /** whether content is still loading */
    loading?: boolean;
    navigation?: NavigationProp<any, any>
}

const {DEVICE_HEIGHT} = CONSTANTS;
const BankAccountSelect = (props: Props)=> {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    const [list, setList]: any = useState([]);
    const [searchMode, toggleSearchMode]: any = useState(false);
    const Ref = useRef<ActionSheetRef>(null);

    useEffect(() => {
        setList(props.list);
    }, [props.list])

    const search = (val: string)=> {
        const key = props.listTitleKey ? props.listTitleKey : null;
        if (val) {
            let subList: any = list;
            subList = subList.filter((item: any) => key ? item[key].toLowerCase().includes(val.toLowerCase()) : item.toLowerCase().includes(val.toLowerCase()))
            setList(subList);
        }
        else {
            setList(props.list)
        }
    
    }

    const [showContent, toggleContent] = useState(false);
    const toggleContentDisplay = ()=> {
        setTimeout(() => {
            toggleContent(!showContent);
        }, 100);
    }

    const toggleSheet = ()=> {
        // console.log(Ref)
        !Ref.current?.isOpen() ? Ref.current?.show() : Ref.current?.hide();  
    }

    const [selectedIndex, setSelectedIndex] = useState<number | null>(null) //track selected item locally
    const handleSelect = (value: any, index: number)=> {
        console.log(value)
        // Ref.current?.hide();
        setSelectedIndex(index);
    }

    // complete selection
    const complete = ()=> {
        const val = list[selectedIndex as number];
        props.onSelectItem ? props.onSelectItem(val) : null;
        toggleSheet();
    }

    const renderItem = (obj: any)=> {
        console.log(obj);
        const item: bankAccountType = obj.item;
        const index = obj.index;
        return (
            <Pressable 
                style={[styles.item, {backgroundColor: index === selectedIndex ? theme.primary[100] : theme.neutral[100]}]} 
                onPress={()=> handleSelect(item, index)}>
                <View style={{flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                    <View>
                        <RegularText title='Bank' size={12} color={theme.neutral.main} />
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <BankIcon height={scale(20)} width={scale(20)} style={{marginRight: scale(5)}} />
                            <RegularText title={item.bankName} color={theme.neutral[300]} size={14} />
                        </View>
                    </View>
                    <View>
                        <Checkbox 
                            checked = {index === selectedIndex}
                            mode="light" 
                        />
                    </View>
                </View>
                <View style={{flex: 1}}>
                    <View style={{flexDirection: "row"}}>
                        <View style={{flex: 1}}>
                            <RegularText title='Account Name' color={theme.neutral.main} size={12} />
                            <RegularText title={item.accountName} color={theme.neutral[300]} size={14} />
                        </View>
                        <View style={{flex: 1, alignItems: "flex-start"}}>
                            <RegularText title='Account Number' color={theme.neutral.main} size={12} />
                            <RegularText title={item.accountNo} color={theme.neutral[300]} size={14} />
                        </View>
                    </View>
                </View>
            </Pressable>
        )
    }

    // render() {
    return (
        <>
            <Pressable 
                style={{
                    flexDirection: "row", 
                    height: scale(100), 
                    backgroundColor: theme.neutral[100], 
                    borderRadius: scale(10), 
                    paddingVertical: scale(6), 
                    paddingHorizontal: scale(15), 
                    alignItems: "center",
                    justifyContent: "space-between",
                }} 
                    onPress={toggleSheet}
            >
                {props.value ? (
                    <View>
                        <View>
                            <RegularText title={props.label ?? ""} color={theme.neutral[300]} size={12} />
                        </View>
                        <RegularText title={props.value ?? ""} color={theme.neutral[300]} size={14} />
                    </View>
                ): (
                    <RegularText title={props.label ?? props.title} color={theme.neutral[300]} size={14} />  
                )}
                <View style={{marginLeft: 'auto'}}>
                    <DropDown height={scale(20)} width={scale(20)} />
                    {/* <Image source={require('../../../assets/icons/drop-down.png')} style={{resizeMode: "contain", width: scale(20), height: scale(20)}} /> */}
                </View>
            </Pressable>
            <ActionSheet ref={Ref}
                // enableGesturesInScrollView
                drawUnderStatusBar
                closeOnPressBack
                statusBarTranslucent={true}
                // gestureEnabled
                onOpen = {toggleContentDisplay}
                openAnimationConfig={{bounciness: 0}}
                containerStyle={{
                    borderRadius: 0, 
                    marginTop: scale(StatusBar.currentHeight ? -(StatusBar.currentHeight + 10) : -35 ),
                    minHeight: StatusBar.currentHeight ? StatusBar.currentHeight + DEVICE_HEIGHT : DEVICE_HEIGHT + 35
                }}
                keyboardHandlerEnabled={false}
            >
            {/* <Modal visible animationType="slide"> */}
                <View style = {{height: props.fullHeight ? DEVICE_HEIGHT : 'auto', backgroundColor: theme.light}}>
                    <View style={{backgroundColor: theme.primary.main, paddingHorizontal: searchMode ?  0 : scale(10), paddingTop: scale(StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 35), paddingBottom: searchMode ? 0 : scale(10), justifyContent: "flex-end"}}>
                        {!searchMode ? (
                            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                <IconButton onPress={toggleSheet} icon={<BackIcon height={24} width={24} />} />
                                <View style={{paddingVertical: scale(5)}}>
                                    <BoldText size={16} title={props.title} color={theme.light} />
                                </View>
                                <IconButton onPress={()=>toggleSearchMode(!searchMode)} icon={<SearchIcon height={24} width={24} />} />
                            </View>
                        ) : (
                            <View style={{backgroundColor: theme.neutral[100], height: scale(55), flexDirection: "row", paddingLeft: scale(10),
                                alignItems: "center"
                            }}>
                                <SearchNeutralIcon height={24} width={24} style={{flex: 2, alignSelf: "center", marginRight: scale(5)}} />
                                <TextInput onChangeText = {search}
                                autoFocus 
                                placeholder="Type  to search" 
                                style={{flex: 8}} 
                                placeholderTextColor={theme.neutral.main} />
                                <IconButton onPress={()=>toggleSearchMode(!searchMode)} icon={<CloseIcon height={24} width={24} style={{flex: 2, alignSelf: "center"}} />} />
                            </View>
                        )}
                    </View>
                    <View style={{paddingHorizontal: 10, height: '100%'}}>
                        <View style={{marginTop: scale(10)}}>
                            <RegularText title='New Bank' color={theme.neutral.main} size={12} />
                            <AltItem 
                                title="Add New Bank Account" 
                                icon={<BankIcon width={scale(24)} height={scale(24)} />}
                                onPress={()=> props?.navigation?.navigate('AddBankAccount')}
                            />
                        </View>
                        <FlashList
                            // nestedScrollEnabled={false}
                            nestedScrollEnabled
                            extraData={selectedIndex}
                            estimatedItemSize={scale(130)}
                            // contentContainerStyle={{overflow: 'scroll', paddingBottom: scale(100)}}
                            data={list}
                            renderItem={renderItem}
                            // keyExtractor={(item: any) => item.id}
                            ListEmptyComponent = {()=> (
                                <>
                                    {!props.loading ? (
                                        <View style={{paddingHorizontal: 10, marginTop: '45%', alignItems: "center"}}>
                                            <BankGreyIcon height={scale(150)} width={scale(150)} />
                                            <RegularText title="No accounts" size={12} color={theme.neutral.main} />
                                        </View>
                                    ) : (
                                        <ActivityIndicator color={theme.neutral.main} style={{flex: 1}} />
                                    )}
                                </>
                            )}
                        />
                    </View>
                </View>
                <View style={{position: "absolute", bottom: scale(20), width: "100%", paddingHorizontal: scale(10)}}>
                    <Button title="Ok" onPress={complete} disabled={selectedIndex === null} />
                </View>
            </ActionSheet>
        </>
    )
    // }
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

export default BankAccountSelect;
