import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable, ViewStyle, ActivityIndicator, FlatList} from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { RegularText, BoldText} from '../Typography/Typography';
import { Button } from '../Buttons/Button';
import CONSTANTS from '../../utils/constants';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import scale from '../../utils/scale';
import DropDown from '../../../assets/icons/drop-down-light.svg';
import DropDownDark from '../../../assets/icons/drop-down.svg';
import CloseIcon from '../../../assets/icons/close-danger.svg';
import ListItem from '../ListItem/ListItem';

interface Props {
    /**list of items */
    list?: Array<any>;
    /**title of popup */
    title: string;
    /** title for confirm button */
    buttonTitle?: string;
    /** full height of popup no mtter length of content*/
    fullHeight?: boolean;
    /**key to display list item name */
    listTitleKey?: string;
    /**optional object key to display subtitle */
    subTitleKey?: string;
    /**whether to display content horizontally */
    grid?: boolean;
    /** loading indicator */
    loading?: boolean;
    /** optimize sheet presentation */
    optimize?: boolean;
    /** color of select box */
    color?: string;
    /** text color of select box */
    textColor?: string;
    /** style of select box */
    style?: ViewStyle;
    /** custom Controller component to toggle select sheet */
    customController?: React.ReactNode;
    /** sheet title */
    sheetTitle?: string;
    /** color of dropdown icon, light/dark */
    iconColor?: 'light' | 'dark';
    /** sorts list alphabetically */
    sort?: boolean;
    /** display avatar */
    displayAvatar?: boolean;
}

const {DEVICE_HEIGHT} = CONSTANTS;
const ListSheet = (props: Props)=> {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    const [list, setList]: any = useState([]);
    const [searchMode, toggleSearchMode]: any = useState(false);
    const Ref = useRef<ActionSheetRef>(null);

    useEffect(() => {
        if(props.sort) {
            const newList = props?.list?.sort((item1: any, item2: any)=> {
                if(item1 > item2) return 1
                return -1
            })
            setList(newList);
        }
        else {
            setList(props.list);
        }
    }, [props.list])

    const toggleSheet = ()=> {
        // console.log(Ref)
        !Ref.current?.isOpen() ? Ref.current?.show() : Ref.current?.hide();  
    }

    // complete selection
    const complete = ()=> {
        toggleSheet();
    }

    const renderItem = (obj: any)=> {
        // console.log(obj);
        const item = obj.item;
        const index = obj.index;
        const itemTitle = props.listTitleKey ? item[props.listTitleKey] : item;
        const subtitle = props.subTitleKey ? item[props.subTitleKey] : '';
        // const itemSubtitle = props.listSubtitleKey ? item.subtitleKey : "";
        const initials = itemTitle.charAt(0) + (itemTitle.split(" ")[1] ? itemTitle.split(" ")[1]?.charAt(0) : "");
        return (
            <View style={{marginTop: scale(5)}}>
                <Pressable style={[styles.item, {borderBottomColor: theme.neutral[200]}]}>
                    {props.displayAvatar && (
                        <View style={[styles.avatarIcon, {backgroundColor: theme.neutral[200]}]}>
                            <RegularText title={initials} transform="uppercase" color={theme.primary.main} size={16} />
                        </View>
                    )}
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
        {!props.customController ? (
            <Pressable {...props.style} style={{flexDirection: "row", height: scale(55), backgroundColor: props.color ?? theme.neutral[100], borderRadius: scale(10), paddingVertical: scale(6), paddingHorizontal: scale(15), alignItems: "center"}} 
            onPress={toggleSheet}>
                <RegularText title={props.title} color={props.textColor ?? theme.neutral[300]} size={14} />  
                <View style={{marginLeft: 'auto'}}>
                    {props.iconColor === 'light' ? (
                        <DropDown height={scale(20)} width={scale(20)} />
                    ) : props.iconColor === 'dark' ? (
                        <DropDownDark height={scale(20)} width={scale(20)} />
                    ) : (<DropDown height={scale(20)} width={scale(20)} />)}
                    
                    {/* <Image source={require('../../../assets/icons/drop-down.png')} style={{resizeMode: "contain", width: scale(20), height: scale(20)}} /> */}
                </View>
            </Pressable>
        ) : (
            <Pressable onPress={toggleSheet}>
                {props.customController}
            </Pressable>
        )}
            <ActionSheet ref={Ref}
                drawUnderStatusBar
                closeOnPressBack
                statusBarTranslucent={true}
                // gestureEnabled
                // onOpen = {toggleContentDisplay}
                openAnimationConfig={{bounciness: 0}}
                containerStyle={{
                    borderRadius: 0,
                }}
                keyboardHandlerEnabled={false}
            >
                <View style = {{height: 'auto', backgroundColor: theme.light}}>
                    <View style={{paddingHorizontal: scale(10), paddingTop: scale(20), flexDirection: "row", justifyContent: "center"}}>
                        <View>
                            <BoldText title={props.sheetTitle ?? "Sort by Date"} size={16} color={theme.neutral[300]} />
                        </View>
                        <Pressable style={{position: "absolute", right: scale(10), alignSelf: "flex-end"}} onPress={toggleSheet}>
                            <CloseIcon />
                        </Pressable>
                    </View>
                    <View style={{paddingHorizontal: scale(10)}}>
                        <FlatList 
                            contentContainerStyle={{overflow: 'scroll', paddingBottom: scale(150)}}
                            data={list}
                            renderItem={renderItem}
                            // keyExtractor={(item: any) => item.id}
                            ListEmptyComponent = {()=> (
                                <>
                                    {!props.loading ? (
                                        <View style={{paddingHorizontal: 10, marginTop: '25%', alignItems: "center"}}>
                                            <RegularText size={16} title="No data" color={theme.neutral.main} />
                                        </View>
                                    ) : (
                                        <ActivityIndicator color={theme.neutral.main} style={{flex: 1, marginTop: scale(20)}} size={25} />
                                    )}
                                </>
                            )}
                        />
                    </View>
                    {/* <View style={{position: "absolute", bottom: scale(10), width: "100%", paddingHorizontal: scale(10)}}>
                        <Button title="Ok" onPress={complete} 
                        />
                    </View> */}
                </View>
            </ActionSheet>
        </>
    )
}

const styles = StyleSheet.create({
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

export default ListSheet;
