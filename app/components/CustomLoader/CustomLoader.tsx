import React, { Ref, useEffect, useRef } from 'react';
import { StyleSheet, Modal, View, Dimensions, StatusBar, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import scale from '../../utils/scale';
import { BoldText, MediumText, RegularText } from '../Typography/Typography';

const ScreenHeight = Dimensions.get("screen").height;
const StatusBarHeight = StatusBar.currentHeight || 50;
interface Props {
    store?: any,
}

export const CustomLoader: React.FC<Props> = ()=> {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    const {isLoading, loaderConfig} = useSelector((state: RootState) => state.modalSlice);
    
    const wiggle: any = {
        0: {
          rotate: '0deg',
        },
        0.25: {
            rotate: '-25deg'
        },
        0.5: {
            rotate: '0deg'
        },
        0.75: {
            rotate: '25deg'
        },
        1: {
            rotate: '0deg',
        },
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isLoading}
            onRequestClose={() => {
                // this.props.store.setModalVisible(false);
                // props.store.resetModal()
            }}
            hardwareAccelerated = {true}
            
        >
            {/* <StatusBar backgroundColor='rgba(0, 0, 0, 0.3)' barStyle="dark-content" /> */}
            <View style={{flex: 1, justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.9)', alignItems: 'center'}}>
                <View style={[styles.spinnerContainer, {backgroundColor: theme.light}]} >
                    <Animatable.View animation={wiggle} duration={2000} iterationCount={"infinite"}
                        style={{flexDirection: "row"}}>
                        <View style={styles.indicator} />
                        <View style={styles.indicator} />
                        <View style={styles.indicator} />
                    </Animatable.View>
                </View>
                <View style={{marginTop: scale(10)}}>
                    <BoldText title={loaderConfig.loaderTitle ?? "Please wait..."} color={theme.neutral[900]} size={16} />
                </View>
                <View style={{marginTop: scale(10)}}>
                    <RegularText title={loaderConfig.loaderSubtitle} size={14} color={theme.neutral[700]} />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    spinnerContainer: {
        height: scale(100),
        width: scale(100),
        borderRadius: scale(50),
        justifyContent: "center",
        alignItems: "center",
        elevation: 10,
    },
    indicator: {
        height: scale(10),
        width: scale(10),
        borderRadius: scale(5),
        backgroundColor: "#0C53D5",
        marginLeft: scale(5),

    }
});

export default CustomLoader;
