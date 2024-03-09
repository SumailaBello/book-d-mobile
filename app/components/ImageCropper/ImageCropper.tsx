import React, { useEffect, useRef, useMemo, useState } from 'react'
import { View, Text, StatusBar, ImageBackground, PanResponder, StyleSheet, Modal, Pressable, Animated } from 'react-native';
// import * as ImageManipulator from 'expo-image-manipulator';
import ActionSheet from 'react-native-actions-sheet';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import scale from '../../utils/scale';
import CONSTANTS from '../../utils/constants';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { RegularText } from '../Typography/Typography';
// import Animatable, {View} from 'react-native-animatable'

interface Props {
    onSave?: (image: any)=> void;
    /** close actionsheet */
    close?: ()=> void;
    subtitle?: string;
    /** image source uri in base64 */
    imageUri: string;
    /** set visibility of cropper */
    isVisible: boolean;
}

const ImageCropper: React.FC<Props> = ({onSave, close, subtitle, imageUri, isVisible}) => {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    const pan = useRef(new Animated.ValueXY()).current;
    const {DEVICE_HEIGHT, DEVICE_WIDTH} = CONSTANTS;

    const [parentHeight, setParentHeight] = useState(0);
    const [childHeight, setChildHeight] = useState(0);

    const cropperDimensions = {
        height: scale(233), 
        originX: 100, 
        originY: DEVICE_HEIGHT / 2, 
        width: DEVICE_WIDTH
    }

    // let ref: any = useRef();

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event([null, {dy: pan.y }], {useNativeDriver: false}),
            onPanResponderRelease: () => {
                pan.extractOffset();
                // Animated.spring(
                //     pan,
                //     { toValue: { x: 0, y: 0 }, useNativeDriver: false }
                // ).start();
            },
            onPanResponderTerminationRequest: ()=> false,
            onMoveShouldSetPanResponderCapture: ()=> true,
            onStartShouldSetPanResponderCapture: ()=> true,
            // onPanResponderTerminate: ()=> true,
            // onShouldBlockNativeResponder: ()=> false
        })
      ).current;

    useEffect(() => {
        console.log(pan);
        console.log(imageUri);
    }, [pan])

    const logValue = ()=> {
        console.log(pan)
    }

    const handleParentLayout = (event: any) => {
        const { height } = event.nativeEvent.layout;
        setParentHeight(height);
        console.log(height)
      };
    
      const handleChildLayout = (event: any) => {
        const { height } = event.nativeEvent.layout;
        setChildHeight(height);
      };
    
    const translateY = pan.y.interpolate({
        inputRange: [-200, parentHeight - 200],
        outputRange: [-200, parentHeight - 200],
        extrapolate: 'clamp',
    });

    return (
        <Modal visible={isVisible} statusBarTranslucent
            onRequestClose={close}
            animationType="slide"
            presentationStyle="fullScreen"
            style={[{
                backgroundColor: "black",
                borderRadius: 0, 
                // marginTop: scale(StatusBar.currentHeight ? -(StatusBar.currentHeight + 10) : -35 ),
                // minHeight: StatusBar.currentHeight ? StatusBar.currentHeight + DEVICE_HEIGHT : DEVICE_HEIGHT + 35,
                paddingTop: StatusBar.currentHeight
            }]} 
            // pointerEvents="none"
        >
            <View style={styles.container} onLayout={handleParentLayout}>
                <Animated.View
                    style={{
                        // transform: [{translateY: pan.y}],
                        transform: [{ translateY }],
                    }} 
                    {...panResponder.panHandlers}
                    onLayout={handleChildLayout}
                >
                    <View style={[{width: DEVICE_WIDTH, borderColor: theme.neutral.main}, styles.box ]} />
                </Animated.View>
                <View style={{flexDirection: "row", justifyContent: "space-between", width: "100%"}}>
                    <Pressable onPress={logValue}>
                        <RegularText title="Cancel" />
                    </Pressable>
                    <Pressable>
                        <RegularText title="Choose" />
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
    //   flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "black",
      height: CONSTANTS.DEVICE_HEIGHT,
      width: CONSTANTS.DEVICE_WIDTH,
    },
    box: {
        height: scale(233),
        borderWidth: scale(1),
        // position: "absolute"
        // borderColor: "white",
        // borderTopColor: "white",
        // borderBottomColor: "white"
    },
    titleText: {
        fontSize: 14,
        lineHeight: 24,
        fontWeight: 'bold',
    },
});

export default ImageCropper
