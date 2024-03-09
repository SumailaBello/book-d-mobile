import React, { Component, useEffect } from 'react';
import { View, Modal, StyleSheet, Dimensions, Pressable, StatusBar } from 'react-native';
import { Button } from '../Buttons/Button';
import {RegularText, BoldText} from '../Typography/Typography';
// import CONSTANTS from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { toggleConfirmation } from '../../store/modalSlice';
import scale from '../../utils/scale';
import { AlertConfig, ConfirmationAlertConfig } from '../../utils/types';
import { confirmationFunction } from '../../utils/utils';

interface Props {
    navigation?: any;
    store?: any;
}
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const ConfirmationModal: React.FC<Props> = (props: Props) => {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    const {confirmationVisible, confirmationAlert} = useSelector((state: RootState) => state.modalSlice);
    const dispatch = useDispatch();
    const resetObj: ConfirmationAlertConfig = {
        title: "",
        message: "",
        // callBack: null,
    }

    // useEffect(() => {
    //   alert(confirmationVisible)
    // }, [confirmationVisible])
    

    const proceed = ()=> {
        // confirmationAlert.callBack ? eval(confirmationAlert.callBack) : null;
        // console.log(confirmationAlert.callBack)
        confirmationFunction ? confirmationFunction() : null;
        setTimeout(() => {
            dispatch(toggleConfirmation(resetObj));
        }, 200);
    }

    const close = ()=> {
        dispatch(toggleConfirmation(resetObj));
    }

    return (
        // <View style={styles.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={confirmationVisible}
                onRequestClose={() => {
                    // toggleConfirmation(resetObj)
                }}
                hardwareAccelerated = {true}
                statusBarTranslucent
            >
                <View style={[styles.centeredView]}>
                    <View style={styles.modalView}>
                        <BoldText size={16} title={confirmationAlert.title || 'Confirmation'} color={theme.neutral[300]} />
                        <View style={{marginTop: scale(10)}}>
                            <RegularText size={16} 
                                title={confirmationAlert.message || 'Do you want to proceed?'} 
                                color={theme.neutral.main} 
                                textAlign='center'
                            />
                        </View>
                        <View style={{flexDirection: 'row', marginTop: scale(20), width: "100%"}}>
                            <View style={{flex: 1, marginRight: scale(5)}}>
                                <Button title="No" 
                                    color={theme.neutral[100]} 
                                    // style = {[ {width: '50%', marginRight: 5}]}
                                    onPress = {close} 
                                    textColor={theme.neutral.main}
                                />
                            </View>
                            <View style={{flex: 1, marginLeft: scale(5)}}>
                                <Button 
                                    title="Proceed" 
                                    color={confirmationAlert.mode === "danger" ? theme.danger.main : theme.primary.main} 
                                    rippleColor={theme.light} 
                                    // style = {[{width: '50%', marginLeft: 5}]} 
                                    onPress = {proceed} 
                                    textColor={theme.light} 
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        // </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        // flex: 1,
        justifyContent: "center",
        alignItems: "center",
        //   marginTop: 22,
        height: screenHeight + scale(30),
        width: screenWidth,
        padding: scale(10),
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    modalView: {
        // margin: 10,
        backgroundColor: "white",
        borderRadius: 20,
        paddingHorizontal: scale(10),
        paddingVertical: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '100%'
    },
  });

export default ConfirmationModal
