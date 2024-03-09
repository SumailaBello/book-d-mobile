import { View, StatusBar, Pressable, StyleSheet } from 'react-native'
import React, { FC, useRef, useState } from 'react'
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet'
import scale from '../../utils/scale'
import IconButton from '../Buttons/IconButton'
import DatePicker from '../Inputs/DatePicker'
import { BoldText, SemiBoldText } from '../Typography/Typography'
import CONSTANTS from '../../utils/constants'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import BackIcon from '../../../assets/icons/arrow-left.svg';
import ArrowRight from '../../../assets/icons/arrow-right.svg';
import Button from '../Buttons/Button'

interface Props {
    onComplete?: (res: Object)=> void;
}

const RangeSheet: FC<Props> = ({onComplete}) => {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    const {DEVICE_HEIGHT} = CONSTANTS;
    let rangeRef = useRef<ActionSheetRef>(null);

    const [from, setFrom] = useState<any>();

    const [to, setTo] = useState<any>();

    const toggleRangeSheet = ()=> {
        console.log(rangeRef);
        !rangeRef.current?.isOpen() ? rangeRef.current?.show() : rangeRef.current?.hide();
    }

    const handleComplete = ()=> {
        toggleRangeSheet();
        onComplete ? onComplete({fromDate: from, toDate: to}) : null;
    }

    return (
        <>
            <Pressable style={[{backgroundColor: theme.neutral[100]}, styles.item]} onPress={toggleRangeSheet}>
                <SemiBoldText title={"Custom Range"} color={theme.neutral[300]} size={14} />
                <ArrowRight />
            </Pressable>
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
                                onConfirm={(date)=> setFrom(date)}
                            />
                        </View>
                        <View>
                            <DatePicker placeholder="To" 
                                onConfirm={(date)=> setTo(date)}
                            />
                        </View>
                    </View>
                    <View style={{paddingHorizontal: scale(10), marginTop: "auto"}}>
                        <Button title="Sort By Date" 
                            onPress={handleComplete}
                        />
                    </View>
                </View>
            </ActionSheet>
        </>
    )
}

const styles = StyleSheet.create({
    item: {
        paddingVertical: scale(10),
        paddingHorizontal: scale(15),
        borderRadius: scale(8),
        height: scale(54),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: scale(5),
        // borderWidth: scale(2),
    },
})

export default RangeSheet