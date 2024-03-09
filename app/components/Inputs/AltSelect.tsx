import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable, ViewStyle} from 'react-native';
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
    store?: any;
    /**list of items */
    list?: Array<any>;
    /**title of popup */
    title: string;
    /** title for confirm button */
    buttonTitle?: string;
    /**callback when an item on list is clicked */
    onSelectItem?: (obj: any)=> any;
    /** value to display on select item */
    value?: string | any,
    /** full height of popup no mtter length of content*/
    fullHeight?: boolean;
    /**key to display list item name */
    listTitleKey?: string;
    /**optional object key to display subtitle */
    subTitleKey?: string;
    /**whether to display content horizontally */
    grid?: boolean;
    /** loading indicator */
    // loading?: boolean;
    /** optimize sheet presentation */
    optimize?: boolean;
    /** color of select box */
    color?: string;
    /** text color of select box */
    textColor?: string;
    /** style of select box */
    style?: ViewStyle;
    /** custom button component to render at bottom of list */
    customButton?: React.ReactNode;
    /** custom Controller component to toggle select sheet */
    customController?: React.ReactNode;
    /** sheet title */
    sheetTitle?: string;
    /** color of dropdown icon, light/dark */
    iconColor?: 'light' | 'dark';
    /** disable the select action and the check UI item */
    disableSelect?: boolean;
    /** tracks default value on local list */
    highlightedValue?: string;
}

const {DEVICE_HEIGHT} = CONSTANTS;
const AltSelect = (props: Props)=> {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    const [list, setList]: any = useState([]);
    const [searchMode, toggleSearchMode]: any = useState(false);
    const Ref = useRef<ActionSheetRef>(null);

    useEffect(() => {
        setList(props.list);
        checkDefaultSelection();
    }, [props.list])

    const [showContent, toggleContent] = useState(false);
    const toggleContentDisplay = ()=> {
        setTimeout(() => {
            toggleContent(!showContent);
        }, 100);
    }

    const checkDefaultSelection = ()=> {
        props.list?.forEach((item, index)=> {
            if(props.listTitleKey) {
                const value = item[props.listTitleKey];
                if(value === props.highlightedValue) {
                    setSelectedIndex(index);
                }
            }
            else {
                if(item === props.highlightedValue) {
                    setSelectedIndex(index);
                }
            }
        })
    }

    const toggleSheet = ()=> {
        // console.log(Ref)
        !Ref.current?.isOpen() ? Ref.current?.show() : Ref.current?.hide();  
    }

    const [selectedIndex, setSelectedIndex] = useState<number | null>(null) //track selected item locally
    const handleSelect = (value: any, index: number)=> {
        console.log(index)
        // Ref.current?.hide();
        setSelectedIndex(index);
    }

    // complete selection
    const complete = ()=> {
        const val = list[selectedIndex as number];
        props.onSelectItem ? props.onSelectItem(val) : null;
        toggleSheet();
    }

    // render() {
    return (
        <>
        {!props.customController ? (
            <Pressable {...props.style} style={{flexDirection: "row", height: scale(55), backgroundColor: props.color ?? theme.neutral[100], borderRadius: scale(10), paddingVertical: scale(6), paddingHorizontal: scale(15), alignItems: "center"}} 
            onPress={toggleSheet}>
                {props.value ? (
                    <View>
                        <View style={{flex: 1}}>
                            <RegularText title={props.title ?? ""} color={props.textColor ?? theme.neutral[300]} size={12} />
                        </View>
                        <View style={{flex: 1}}>
                            <RegularText title={props.value ?? ""} color={props.textColor ?? theme.neutral[300]} size={14} />
                        </View>
                    </View>
                ): (
                    <RegularText title={props.title} color={props.textColor ?? theme.neutral[300]} size={14} />  
                )}
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
                onOpen = {toggleContentDisplay}
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
                        {props.optimize ? (
                        <>
                        {showContent ? (
                            <ScrollView nestedScrollEnabled contentContainerStyle={{flexWrap: props.grid ? 'wrap' : 'nowrap', flexDirection: props.grid ? 'row' : 'column', paddingBottom: scale(120), paddingTop: scale(20)}}>
                                {list?.map((item: any, index: number)=> (
                                    <View key={index} style={{marginVertical: scale(5)}}>
                                        <ListItem disabled = {item.disabled} 
                                            title={props.listTitleKey ? item[props.listTitleKey] : item} 
                                            checked={index === selectedIndex ? true : false} 
                                            onPress={()=> handleSelect(item, index)}
                                            subtitle={props.subTitleKey ? item[props.subTitleKey] : item.subtitle ?? ""}
                                            disableCheck={props.disableSelect}
                                        />
                                    </View>
                                ))}
                                {list?.length === 0 ? (
                                    <RegularText size={16} title="No data" />
                                ) : (null)}
                                {props.customButton}
                            </ScrollView> 
                        ) : (<RegularText size={16} title="Please wait..." />)}
                        </>
                        ) : (
                            <ScrollView nestedScrollEnabled contentContainerStyle={{flexWrap: props.grid ? 'wrap' : 'nowrap', flexDirection: props.grid ? 'row' : 'column', paddingBottom: scale(120), paddingTop: scale(20)}}>
                                {list?.map((item: any, index: number)=> (
                                    <View key={index} style={{marginVertical: scale(5)}}>
                                        <ListItem 
                                            disabled = {item.disabled} 
                                            title={props.listTitleKey ? item[props.listTitleKey] : item} 
                                            // checked={ index === selectedIndex ? true : false} 
                                            checked={index === selectedIndex ? true : false} 
                                            onPress={()=> handleSelect(item, index)}
                                            subtitle={props.subTitleKey ? item[props.subTitleKey] : item.subtitle ?? ""}
                                            disableCheck={props.disableSelect}
                                        />
                                    </View>
                                ))}
                                {list?.length === 0 ? (
                                    <RegularText size={16} title="No data" />
                                ) : (null)}
                                {props.customButton}
                            </ScrollView> 
                        )}   
                    </View>
                </View>
                <View style={{position: "absolute", bottom: scale(20), width: "100%", paddingHorizontal: scale(10)}}>
                    <Button title={props.buttonTitle ?? "Ok"} onPress={complete} disabled={!selectedIndex && selectedIndex !== 0} />
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
    }
})

export default AltSelect;
