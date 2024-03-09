import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Pressable, Vibration, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { BoldText, MediumText } from '../Typography/Typography';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Button } from '../Buttons/Button';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import CONSTANTS from '../../utils/constants';
import scale from '../../utils/scale';
import BackspaceIcon from '../../../assets/icons/backspace-light.svg';

interface keyBoardProps {
    /** triggered on button press */
    onKeyPress: (value: string) => void,
    buttonTitle?: string,
    onComplete?: ()=> void,
    onBackSpace: ()=> void,
    /** event triggered when keyboard becomes visible */
    onPresent?: ()=> void,
    /** disable complete button */
    disableComplete?: boolean,
}

const CustomKeyboard : React.FC<keyBoardProps> = ({onKeyPress, buttonTitle, onBackSpace, onComplete, onPresent, disableComplete}) => {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    const {DEVICE_HEIGHT} = CONSTANTS;
    // const actionSheetRef: any = useRef<ActionSheetRef>(); 

    useEffect(() => {
        // actionSheetRef.current.show();
        onPresent ? onPresent() : null
    }, [])

    return (
        // <ActionSheet animated={false} ref={actionSheetRef} backgroundInteractionEnabled closable={false} onOpen={onPresent} containerStyle={{backgroundColor: theme.primary[600], borderTopEndRadius: 0, borderTopStartRadius: 0}}>
            // <View style={{height: DEVICE_HEIGHT / 2, backgroundColor: theme.primary.main, paddingVertical: scale(20), paddingHorizontal: scale(10)}}>
            <View style={{height: "100%", backgroundColor: theme.primary.main, paddingVertical: scale(20), paddingHorizontal: scale(10)}}>
                <View style={{flexDirection: 'row', width: '100%', flex: 2}}>
                    <TouchableOpacity onPress={()=>{ onKeyPress("1"); Vibration.vibrate(50)}} style={{flex: 4, alignItems: 'center'}}>
                        <View style={{borderRadius: 5}}>
                            <MediumText size={32} title="1" color={theme.light} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{ onKeyPress("2"); Vibration.vibrate(50)}} style={{flex: 4, alignItems: 'center'}}>
                        <View style={{borderRadius: 5}}>
                            <MediumText size={32} title="2" color={theme.light} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{ onKeyPress("3"); Vibration.vibrate(50)}} style={{flex: 4, alignItems: 'center'}}>
                        <View style={{borderRadius: 5}}>
                            <MediumText size={32} title="3" color={theme.light} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', width: '100%', flex: 2}}>
                    <TouchableOpacity onPress={()=>{ onKeyPress("4"); Vibration.vibrate(50)}} style={{flex: 4, alignItems: 'center'}}>
                        <View style={{borderRadius: 5}}>
                            <MediumText size={32} title="4" color={theme.light} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{ onKeyPress("5"); Vibration.vibrate(50)}} style={{flex: 4, alignItems: 'center'}}>
                        <View style={{borderRadius: 5}}>
                            <MediumText size={32} title="5" color={theme.light} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{ onKeyPress("6"); Vibration.vibrate(50)}} style={{flex: 4, alignItems: 'center'}}>
                        <View style={{borderRadius: 5}}>
                            <MediumText size={32} title="6" color={theme.light} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', width: '100%', flex: 2}}>
                    <TouchableOpacity onPress={()=>{ onKeyPress("7"); Vibration.vibrate(50)}} style={{flex: 4, alignItems: 'center'}}>
                        <View style={{borderRadius: 5}}>
                            <MediumText size={32} title="7" color={theme.light} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{ onKeyPress("8"); Vibration.vibrate(50)}} style={{flex: 4, alignItems: 'center'}}>
                        <View style={{borderRadius: 5}}>
                            <MediumText size={32} title="8" color={theme.light} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{ onKeyPress("9"); Vibration.vibrate(50)}} style={{flex: 4, alignItems: 'center'}}>
                        <View style={{borderRadius: 5}}>
                            <MediumText size={32} title="9" color={theme.light} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', width: '100%', flex: 2}}>
                    <TouchableOpacity onPress={()=>{ onKeyPress("."); Vibration.vibrate(50)}} style={{flex: 4, alignItems: 'center'}}>
                        <View>
                            <MediumText size={32} title="." color={theme.light} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{ onKeyPress("0"); Vibration.vibrate(50)}} style={{flex: 4, alignItems: 'center'}}>
                        <View style={{borderRadius: 5}}>
                            <MediumText size={32} title="0" color={theme.light} />
                        </View>
                    </TouchableOpacity>
                    <View style={{flex: 4, alignItems: 'center', paddingTop: scale(10)}}>
                        <Pressable onPress={()=> {onBackSpace(); Vibration.vibrate(50)}}>
                            {/* <Ionicons name="close-outline" color={theme.light} size={50} style={{marginLeft: 10}} /> */}
                            <BackspaceIcon height={scale(32)} width={scale(32)} />
                        </Pressable>
                    </View>
                </View>
                <View>
                    <Button color={theme.light} title={buttonTitle ?? ""} textColor={theme.primary.main} onPress={onComplete} 
                    disabled={disableComplete ?? false} />
                </View>
            </View>
        // </ActionSheet>
    )
}

export default CustomKeyboard
