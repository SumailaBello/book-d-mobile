import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Image, StyleSheet, Button, StatusBar, Pressable } from 'react-native'
import ActionSheet from 'react-native-actions-sheet'
import { Camera, FlashMode } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import Ionicons from '@expo/vector-icons/Ionicons';
import scale from '../../utils/scale';
import IconButton from '../Buttons/IconButton';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { RegularText, SemiBoldText } from '../Typography/Typography';
import CONSTANTS from '../../utils/constants';
import CloseIcon from '../../../assets/icons/close.svg';

interface Props {
    onSave?: (image: any)=> void;
    /** action sheet ref to used to open action sheet on parent component */
    setRef?: (ref: any)=> void;
    /** close actionsheet */
    close?: ()=> void;
    subtitle?: string;
    /** require face detection */
    detectFace: boolean;
}

const CameraModal: React.FC<Props> = ({onSave, setRef, close, subtitle, detectFace}) => {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    const [isLoading, toggleLoading] = useState(false);
    const [hasPermission, setHasPermission]: any = useState(null);
    const [type, setType] = useState(0);
    const [flash, toggleFlash] = useState(FlashMode.auto);
    const [face, setFace]: any = useState(null);
    // const [image, saveImage]: any = useState(null);
    const {DEVICE_HEIGHT} = CONSTANTS;

    let cameraRef: any = useRef();
    useEffect(() => {
        // console.log(type);
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
          })();
        //   console.log(cameraRef)
    }, [])

    const toggleFlashLight = ()=> {
        if(flash === FlashMode.auto) {
            toggleFlash(FlashMode.on);
        }
        else if(flash === FlashMode.on) {
            toggleFlash(FlashMode.off);
        }
        else if(flash === FlashMode.off) {
            toggleFlash(FlashMode.auto);
        }
    }

    // const [file, setFile]: any = useState(null);
    const takePicture = ()=> {
        cameraRef.takePictureAsync({
            base64: true,
            quality: 0.2,
        }).then( async (imageData: any) => {
            // console.log(imageData);
            const uri = `data:image/png;base64,${imageData.base64}`
            // const uri = imageData.uri
            // saveImage(uri);
            onSave ? onSave(imageData) : null
        }).catch((err: any)=> {
            console.log(err);
        })
    }

    const handleFacesDetected = (event: any)=> {
        // alert("hi")
        setFace(event.faces[0])
    }

    return (
        <ActionSheet ref={ref => setRef ? setRef(ref) : null} openAnimationConfig={{bounciness: 0}}
            containerStyle={{
                // height: '100%', 
                backgroundColor: "black",
                borderRadius: 0, 
                marginTop: scale(StatusBar.currentHeight ? -(StatusBar.currentHeight + 10) : -35 ),
                minHeight: StatusBar.currentHeight ? StatusBar.currentHeight + DEVICE_HEIGHT : DEVICE_HEIGHT + 35,
                paddingTop: StatusBar.currentHeight
            }} 
            // onClose={()=>saveImage(null)}
            headerAlwaysVisible={false}
            >
            <View style={{flex: 3, paddingHorizontal: scale(10)}}>
                <View style={{height: scale(80), justifyContent: "center"}}>
                    <CloseIcon onPress={close} />
                </View>
            </View>
            {detectFace ? (
                <View style={{flex: 4.5, borderWidth: 2, borderColor: face ? theme.light : undefined}}>
                    {hasPermission ? (
                        <Camera style={styles.camera} type={type} flashMode={flash} 
                            ref={(ref)=> cameraRef = ref} 
                            onCameraReady = {()=> console.log(cameraRef)}
                            onFacesDetected={handleFacesDetected}
                            faceDetectorSettings={{
                                mode: FaceDetector.FaceDetectorMode.accurate,
                                detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
                                runClassifications: FaceDetector.FaceDetectorClassifications.none,
                                minDetectionInterval: 100,
                                tracking: true,
                            }}
                        >
                        </Camera>
                    ) : (
                        null
                    )}
                </View>
            ) : (
                <View style={{flex: 4.5, borderWidth: 2, borderColor: theme.light}}>
                    {hasPermission ? (
                        <Camera style={styles.camera} type={type} flashMode={flash} 
                            ref={(ref)=> cameraRef = ref} 
                            onCameraReady = {()=> console.log(cameraRef)}
                        >
                        </Camera>
                    ) : (
                        null
                    )}
                </View>
            )}
            <View style={{flex: 4.5, padding: scale(10), justifyContent: "flex-end"}}>
                <View style={{marginBottom: scale(50), alignItems: "center"}}>
                    <RegularText title={subtitle as string} color={theme.light} size={14} />
                </View>
                <View style={styles.cameraButtonContainer}>
                    <View style={{flex: 4, justifyContent: 'center', alignItems: "center"}}>
                        {/* <IconButton icon = {<Ionicons name={flash === FlashMode.auto ? "flash" : flash === FlashMode.on ? "flash" : "flash-off"} color={theme.light} size={24} />} style={{marginBottom: scale(10)}} onPress={toggleFlashLight} /> */}
                        <Ionicons name={flash === FlashMode.auto ? "flash" : flash === FlashMode.on ? "flash" : "flash-off"} 
                            color={theme.light} size={24} 
                            onPress={toggleFlashLight}
                        />
                        {flash === FlashMode.auto ? (
                            <View style={{width: '100%'}}>
                                <RegularText title="auto" textAlign="center" color={theme.light} size={12} />
                            </View>
                        ) : (null)}
                    </View>
                    {detectFace ? (
                        <View style={{flex: 4, justifyContent: 'flex-end', alignItems: "center", }}>
                            <Pressable style={[styles.btn, {opacity: face ? 1 : 0.5}]} 
                                onPress={takePicture}
                                disabled={face ? false : true}
                            >
                                <View style={styles.btnInner} />
                            </Pressable>
                            {/* <IconButton icon = {<Ionicons name="ellipse" color={theme.light} size={scale(50)} />} onPress = {takePicture} /> */}
                        </View>
                    ) : (
                        <View style={{flex: 4, justifyContent: 'flex-end', alignItems: "center", }}>
                            <Pressable style={styles.btn} 
                                onPress={takePicture}
                            >
                                <View style={styles.btnInner} />
                            </Pressable>
                            {/* <IconButton icon = {<Ionicons name="ellipse" color={theme.light} size={scale(50)} />} onPress = {takePicture} /> */}
                        </View>
                    )}
                    <View style={{flex: 4, justifyContent: 'flex-end'}}>
                        <IconButton icon = {<Ionicons name="camera-reverse-outline" color={theme.light} size={30} />} onPress={() => { setType( type === 0 ? 1 : 0 )}} style={{marginBottom: scale(10)}} />
                    </View>
                </View>
            </View>
        </ActionSheet>
    )
}

const styles = StyleSheet.create({
    logo: {
        resizeMode: 'contain',
        width: '70%',
        alignSelf: 'center',
        height: 50
    },
    camera: {
        flex: 1,
        // borderRadius: scale(10)
    },
    cameraButtonContainer: {
        flexDirection: 'row',
    },
    container: {
        // flex: 1,
        padding: 20,
        backgroundColor: "black",
    },
    btn: {
        height: scale(60),
        width: scale(60),
        borderRadius: scale(30),
        borderWidth: scale(2),
        borderColor: "white",
        alignItems: "center",
        justifyContent: "center"
    },
    btnInner: {
        height: scale(50),
        width: scale(50),
        borderRadius: scale(25),
        backgroundColor: "white"
    }
})

export default CameraModal
