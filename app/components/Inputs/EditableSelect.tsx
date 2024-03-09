import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, FlatList, Pressable, Image, StatusBar, Modal, ImageBackground} from 'react-native';
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
import AltItem from '../ListItem/AltItem';
import { TextInputProps } from 'react-native';

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
    /**key to display list item subtitle */
    listSubtitleKey?: string;
    /** display a search bar to enable search through list of items */
    search?: boolean;
    /**whether to display content horizontally */
    grid?: boolean;
    /** optimize sheet presentation */
    optimize?: boolean;
    /** loading state */
    loading?: boolean;
    /** call back to set new value on texxt edit */
    onChangeText?: (value: string)=> void;
}

const {DEVICE_HEIGHT} = CONSTANTS;
const SelectSheet = (props: Props)=> {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    const [list, setList]: any = useState([]);
    const [searchMode, toggleSearchMode]: any = useState(false);
    const Ref = useRef<ActionSheetRef>(null);
    const inputRef = useRef<TextInputProps>(null);

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

    const handleSelect = (value: any,)=> {
        complete(value);
    }

    // complete selection
    const complete = (val: any)=> {
        props.onSelectItem ? props.onSelectItem(val) : null;
        toggleSheet();
    }

    const renderItem = (obj: any)=> {
        // console.log(obj);
        const item = obj.item;
        const index = obj.index;
        const itemTitle = props.listTitleKey ? item[props.listTitleKey] : item;
        const subtitle = props.listSubtitleKey ? item[props.listSubtitleKey] : '';
        // const itemSubtitle = props.listSubtitleKey ? item.subtitleKey : "";
        const initials = itemTitle.charAt(0) + (itemTitle.split(" ")[1] ? itemTitle.split(" ")[1]?.charAt(0) : "");
        return (
            <View style={{marginTop: scale(5)}}>
                <Pressable style={[styles.item, {borderBottomColor: theme.neutral[200]}]}
                    onPress={()=> handleSelect(item)}>
                    <View style={[styles.avatarIcon, {backgroundColor: theme.neutral[200]}]}>
                        <RegularText title={initials} transform="uppercase" color={theme.primary.main} size={16} />
                    </View>
                    <View style={{justifyContent: "space-between"}}>
                        <RegularText title={itemTitle} size={16} color={theme.neutral[800]} />
                        <RegularText title={subtitle} size={12} color={theme.neutral[500]} />
                    </View>
                </Pressable>
            </View>
        )
    }

    return (
        <>
            <Input label={props.title} value={props.value} 
                onChangeText={props.onChangeText} 
                icon={<DropDown height={scale(20)} width={scale(20)} onPress={toggleSheet} />} />
            <ActionSheet ref={Ref}
                drawUnderStatusBar
                closeOnPressBack
                statusBarTranslucent={true}
                // gestureEnabled
                onOpen = {toggleContentDisplay}
                openAnimationConfig={{bounciness: 0}}
                containerStyle={{
                    borderRadius: 0,
                    minHeight: StatusBar.currentHeight ? StatusBar.currentHeight + DEVICE_HEIGHT : DEVICE_HEIGHT + 35
                    // marginBottom: scale(StatusBar.currentHeight ? -(StatusBar.currentHeight + 100) : -35 ),
                }}
                keyboardHandlerEnabled={false}
            >
            {/* <Modal visible animationType="slide"> */}
                <View style = {{height: props.fullHeight ? DEVICE_HEIGHT : 'auto', backgroundColor: theme.light}}>
                    <View style={{backgroundColor: theme.light, paddingVertical: scale(20), paddingHorizontal: scale(10), flexDirection: "row"}}>
                        <View style={{backgroundColor: theme.neutral[100], height: scale(40), flexDirection: "row", paddingLeft: scale(10),
                            alignItems: "center", borderRadius: scale(10), flex: 8}}>
                            <SearchNeutralIcon height={24} width={24} style={{flex: 2, alignSelf: "center", marginRight: scale(5)}} />
                            <TextInput onChangeText = {search}
                            placeholder="Search Contact" 
                            style={{flex: 10}} 
                            placeholderTextColor={theme.neutral.main} />
                        </View>
                        <Pressable style={{flex: 2, alignItems: "center", justifyContent: "center"}} onPress={toggleSheet}>
                            <RegularText title='Cancel' color={theme.primary.main} size={14} />
                        </Pressable>
                    </View>
                    <View style={{paddingHorizontal: 10, marginBottom: scale(100)}}>
                        <FlatList 
                            contentContainerStyle={{overflow: 'scroll', paddingBottom: scale(150)}}
                            data={list}
                            renderItem={renderItem}
                            // keyExtractor={(item: any) => item.id}
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
                {/* <View style={{position: "absolute", bottom: scale(20), width: "100%", paddingHorizontal: scale(10)}}>
                    <Button title="Ok" onPress={complete} 
                    // disabled={!selectedIndex} 
                    />
                </View> */}
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
    },
    item: {
        borderBottomWidth: scale(1), 
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: scale(10)
    },
    avatarIcon: {
        height: scale(40), 
        width: scale(40), 
        borderRadius: scale(20), 
        justifyContent: "center", 
        alignItems: "center",
        marginRight: scale(10)
    }
})

export default SelectSheet;
