import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, FlatList, Pressable, Image, StatusBar, Modal} from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { RegularText, MediumText, BoldText} from '../Typography/Typography';
// import globalStyles, {colors, screenHeight} from '../../Styles/Styles';
import { Button } from '../Buttons/Button';
// import { observer, inject } from "mobx-react";
import Input from '../Inputs/TextInput';
// import { FlatList } from 'react-native-gesture-handler';
import CONSTANTS from '../../utils/constants';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import scale from '../../utils/scale';
import IconButton from '../Buttons/IconButton';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { TextInput } from 'react-native-gesture-handler';
import ListItem from '../ListItem/ListItem';
import { FlashList } from "@shopify/flash-list";

interface Props {
    store?: any;
    /**list of items */
    list?: Array<any>;
    /**title of popup */
    title: string,
    /**callback when an item on list is clicked */
    onSelectItem?: (obj: any)=> any;
    /** value to display on select item */
    value?: string,
    /** full height of popup no mtter length of content*/
    fullHeight?: boolean;
    /**key to display list item name */
    listTitleKey?: string;
    /** display a search bar to enable search through list of items */
    search?: boolean;
    /**whether to display content horizontally */
    grid?: boolean;
    /** optimize sheet presentation */
    optimize?: boolean;
    /** loading state */
    loading?: boolean;
}

const {DEVICE_HEIGHT} = CONSTANTS;
const SelectSheet = (props: Props)=> {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    const [list, setList]: any = useState([]);
    const [searchMode, toggleSearchMode]: any = useState(false);
    const Ref = useRef<ActionSheetRef>(null);
    const {IS_ANDROID, IS_IOS} = CONSTANTS;

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
        // console.log(obj);
        const item = obj.item;
        const index = obj.index;
        return (
            <View style={{marginTop: scale(10)}}>
                <ListItem title={props.listTitleKey ? item[props.listTitleKey] : item} 
                    // checked={ index === selectedIndex ? true : false} 
                    onPress={()=> handleSelect(item, index)}
                    icon={item.icon || item.image ? 
                        <Image source={item.icon ?? item.image} style={{height: scale(32), width: scale(32)}} /> 
                            : null 
                    }
                />
            </View>
        )
    }

    return (
        <>
            <Pressable style={{flexDirection: "row", height: scale(50), backgroundColor: theme.neutral[100], borderRadius: scale(10), paddingVertical: scale(6), paddingHorizontal: scale(20), alignItems: "center"}} onPress={toggleSheet}>
                {props.value ? (
                    <View>
                        <View>
                            <RegularText title={props.title ?? ""} color={theme.neutral[300]} size={12} />
                        </View>
                        <RegularText title={props.value ?? ""} color={theme.neutral[300]} size={14} />
                    </View>
                ): (
                    <RegularText title={props.title} color={theme.neutral[300]} size={14} />  
                )}
                <View style={{marginLeft: 'auto'}}>
                    {/* <DropDown height={scale(20)} width={scale(20)} /> */}
                    <MaterialCommunityIcons name='chevron-down' size={scale(20)} />
                    {/* <Image source={require('../../../assets/icons/drop-down.png')} style={{resizeMode: "contain", width: scale(20), height: scale(20)}} /> */}
                </View>
            </Pressable>
            <ActionSheet ref={Ref}
                drawUnderStatusBar
                closeOnPressBack
                statusBarTranslucent={true}
                // gestureEnabled
                onOpen = {toggleContentDisplay}
                openAnimationConfig={{bounciness: 0}}
                containerStyle={{
                    borderRadius: 0, 
                    marginTop: scale(StatusBar.currentHeight ? -(StatusBar.currentHeight + 10) : -35 ),
                    minHeight: StatusBar.currentHeight ? StatusBar.currentHeight + DEVICE_HEIGHT : DEVICE_HEIGHT + 35,
                    paddingTop: IS_IOS ? 40 : undefined,
                    // marginBottom: scale(StatusBar.currentHeight ? -(StatusBar.currentHeight + 100) : -35 ),
                }}
                keyboardHandlerEnabled={false}
            >
            {/* <Modal visible animationType="slide"> */}
                <View style = {{height: props.fullHeight ? DEVICE_HEIGHT : 'auto', backgroundColor: theme.light}}>
                    <View style={{backgroundColor: theme.primary.main, paddingHorizontal: searchMode ?  0 : scale(10), paddingTop: scale(StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 35), paddingBottom: searchMode ? 0 : scale(10), justifyContent: "flex-end"}}>
                        {!searchMode ? (
                            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                <IconButton onPress={toggleSheet} icon={<MaterialCommunityIcons size={scale(24)} />} />
                                <View style={{paddingVertical: scale(5)}}>
                                    <BoldText size={16} title={props.title} color={theme.light} />
                                </View>
                                <IconButton onPress={()=>toggleSearchMode(!searchMode)} icon={<MaterialCommunityIcons size={scale(24)} />} />
                            </View>
                        ) : (
                            <View style={{backgroundColor: theme.neutral[100], height: scale(55), flexDirection: "row", paddingLeft: scale(10),
                                alignItems: "center"
                            }}>
                                <MaterialCommunityIcons name="magnify" color={theme.neutral[300]} size={scale(24)} style={{flex: 2, alignSelf: "center", marginRight: scale(5)}} />
                                <TextInput onChangeText = {search}
                                autoFocus 
                                placeholder="Type  to search" 
                                style={{flex: 8}} 
                                placeholderTextColor={theme.neutral.main} />
                                <IconButton onPress={()=>toggleSearchMode(!searchMode)} icon={<MaterialCommunityIcons name='close' height={24} width={24} style={{flex: 2, alignSelf: "center"}} />} />
                            </View>
                        )}
                    </View>
                    <View style={{paddingHorizontal: 10, height: 80/100 * DEVICE_HEIGHT, marginBottom: scale(100)}}>
                        <FlashList 
                            estimatedItemSize={62.5}
                            contentContainerStyle={{paddingBottom: scale(150)}}
                            data={list}
                            renderItem={renderItem}
                            extraData={selectedIndex}
                            // keyExtractor={(item: any) => JSON.stringify(item)}
                            ListEmptyComponent = {()=> (
                                <>
                                    {!props.loading ? (
                                        <View style={{paddingHorizontal: 10, marginTop: '45%', alignItems: "center"}}>
                                            <RegularText size={16} title="No data" color={theme.neutral.main} />
                                        </View>
                                    ) : (
                                        <ActivityIndicator color={theme.neutral.main} style={{flex: 1, marginTop: scale(20)}} size={25} />
                                    )}
                                </>
                            )}
                        />
                    </View>
                </View>
                <View style={{position: "absolute", bottom: scale(20), width: "100%", paddingHorizontal: scale(10)}}>
                    <Button title="Ok" onPress={complete} 
                    // disabled={!selectedIndex} 
                    />
                </View>
            </ActionSheet>
        </>
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
    }
})

export default SelectSheet;
