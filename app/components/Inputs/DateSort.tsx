import { View, Pressable, StyleSheet, StatusBar } from 'react-native'
import React, { FC, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import scale from '../../utils/scale';
import { BoldText, SemiBoldText } from '../Typography/Typography';
import AltSelect from './AltSelect';
import CONSTANTS from '../../utils/constants';
import BackIcon from '../../../assets/icons/arrow-left.svg';
import ArrowRight from '../../../assets/icons/arrow-right.svg';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import IconButton from '../Buttons/IconButton';
import DatePicker from './DatePicker';
import Button from '../Buttons/Button';

interface SortVal {
    title: string,
    subtitle: string,
    startValue: string,
    endValue: string,
}

interface Props {
    sortVal: SortVal,
    onComplete: (item: SortVal)=> void
}

const DateSort: FC<Props> = ({sortVal, onComplete}) => {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    const {dateSortList, DEVICE_HEIGHT} = CONSTANTS;
    const [customStart, setCustomStart] = useState("");
    const [customEnd, setCustomEnd] = useState("");

    const handleComplete = (item: SortVal)=> {
        onComplete(item);
    }

    let rangeRef = useRef<ActionSheetRef>(null);
    const toggleRangeSheet = ()=> {
        console.log(rangeRef)
        !rangeRef.current?.isOpen() ? rangeRef.current?.show() : rangeRef.current?.hide();
    }

    return (
        <>
            <View>
                <AltSelect
                    title={"Sort by Date"} 
                    value={customStart ? customStart + "to" + customEnd : sortVal.title} 
                    color="transparent" 
                    style={{borderColor: theme.faintWhite, borderWidth: scale(2), marginTop: scale(20), marginBottom: scale(10)}}
                    textColor={theme.light}
                    buttonTitle="Sort By Date"
                    listTitleKey="title"
                    list={dateSortList}
                    highlightedValue={sortVal.title}
                    onSelectItem={handleComplete}
                    customButton={
                        <Pressable style={[{backgroundColor: theme.neutral[100]}, styles.item]} onPress={toggleRangeSheet}>
                            <SemiBoldText title={"Custom Range"} color={theme.neutral[300]} size={14} />
                            <ArrowRight />
                        </Pressable>
                    }
                />
            </View>

            <ActionSheet ref={rangeRef}
                openAnimationConfig={{bounciness: 0}}
                containerStyle={{
                    borderRadius: 0, 
                    marginTop: scale(StatusBar.currentHeight ? -(StatusBar.currentHeight + 10) : -35 ),
                    minHeight: StatusBar.currentHeight ? StatusBar.currentHeight + DEVICE_HEIGHT : DEVICE_HEIGHT + 35
                    // marginBottom: scale(StatusBar.currentHeight ? -(StatusBar.currentHeight + 100) : -35 ),
                }}
                keyboardHandlerEnabled={false}
                drawUnderStatusBar
                closeOnPressBack
                statusBarTranslucent={true}
                onClose={()=> {
                    setCustomStart("");
                    setCustomEnd("");
                }}
            >
                <View style = {{height: DEVICE_HEIGHT, backgroundColor: theme.light}}>
                    <View style={{backgroundColor: theme.primary.main, paddingHorizontal: scale(10), paddingTop: scale(StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 35), paddingBottom: scale(10), justifyContent: "flex-end"}}>
                        <View style={{flexDirection: "row"}}>
                            <View style={{flex: 4, alignItems: "flex-start"}}>
                                <IconButton onPress={toggleRangeSheet} icon={<BackIcon height={24} width={24} />} />
                            </View>
                            <View style={{paddingVertical: scale(5), flex: 8, alignItems: "flex-start"}}>
                                <BoldText size={16} title={"Custom Range"} color={theme.light} />
                            </View>
                        </View>
                    </View>
                    <View style={{paddingHorizontal: scale(10)}}>
                        <View style={{marginTop: scale(20)}}>
                            <DatePicker placeholder="From" 
                                onConfirm={date => {
                                    console.log(date.toISOString());
                                    const dateString = date.toISOString().split("T")[0];
                                    console.log(dateString);
                                    setCustomStart(dateString);
                                }} 
                                value={customStart ? customStart : null}
                            />
                        </View>
                        <View>
                            <DatePicker placeholder="To" 
                                onConfirm={date => {
                                    console.log(date.toISOString());
                                    const dateString = date.toISOString().split("T")[0];
                                    console.log(dateString);
                                    setCustomEnd(dateString);

                                }} 
                                value={customEnd ? customEnd : null}
                            />
                        </View>
                    </View>
                    <View style={{paddingHorizontal: scale(10), marginTop: "auto"}}>
                        <Button title="Sort By Date" 
                            onPress = {()=> {
                                const newSortVal: SortVal = {
                                    title: "",
                                    subtitle: "",
                                    startValue: customStart,
                                    endValue: customEnd,
                                }
                                handleComplete(newSortVal);
                                toggleRangeSheet();
                            }}
                        />
                    </View>
                </View>
            </ActionSheet>
        </>
    )
}

const styles = StyleSheet.create({
    selectController: {
        borderRadius: scale(10),
        padding: scale(15),
        borderWidth: scale(2),
        flexDirection: "row",
    },
    item: {
        paddingVertical: scale(10),
        paddingHorizontal: scale(15),
        borderRadius: scale(8),
        height: scale(54),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: scale(5)
    },
})

export default DateSort