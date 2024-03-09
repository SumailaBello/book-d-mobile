import React, { FC, useEffect, useState } from 'react'
import { View, Pressable, Image, StyleSheet, ActivityIndicator } from 'react-native'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import scale from '../../utils/scale';
import { RegularText } from '../Typography/Typography';
import UploadIcon from '../../../assets/icons/upload-image.svg';
import EditIcon from '../../../assets/icons/edit.svg';
import DeleteIcon from '../../../assets/icons/delete.svg';
import * as ImagePicker from 'expo-image-picker';

interface Props {
    /** on select */
    onSelect: (img: any)=> void;
    title?: string;
    isLoading?: boolean;
    imgSrc?: string | null;
    /** disable delete button */
    disableDelete?: boolean;
    uploadSuccess?: boolean;
}

const ImageSelect: FC<Props> = ({onSelect, title, isLoading, imgSrc, disableDelete, uploadSuccess}) => {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    const [image, setImage] = useState<any>(null);

    useEffect(() => {
      if(uploadSuccess === false) {
        setImage(null);
        // alert(uploadSuccess)
      }
    }, [uploadSuccess])
    

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
          base64: true,
        });
    
        // console.log(result);
    
        if (!result.canceled) {
        //   onSelect("data:image/png;base64," + result.assets[0].base64);
        //   onSelect(result.assets[0].uri as string);
            onSelect(result.assets[0]);
            setImage("data:image/png;base64," + result.assets[0].base64);
        }
    };
    return (
        <View style={{marginVertical: scale(20)}}>
            <View style={[styles.uploadField, {backgroundColor: theme.neutral[100], paddingVertical: scale(10)}]}>
                {image || imgSrc ? (
                    <View style={{flexDirection: "row"}}>
                        <View style={{flex: 9}}>
                            <RegularText title={title ?? "Upload Image"} size={12} color={theme.neutral.main} />
                            <View style={{marginTop: scale(5)}}>
                                <Image source={{uri: imgSrc ?? image}} style={{height: scale(67), width: scale(67), resizeMode: "stretch", borderRadius: scale(5)}} />
                            </View>
                        </View>
                        {isLoading ? (
                            <ActivityIndicator color={theme.neutral.main} />
                        ) : (
                            <View style={{flex: 3, justifyContent: disableDelete ? 'flex-end' : "space-between", flexDirection: "row", alignItems: "center"}}>
                                <Pressable onPress={pickImage}>
                                    <EditIcon height={scale(21)} width={scale(21)} />
                                </Pressable>
                                {disableDelete ? (
                                    null
                                ) : (
                                    <Pressable onPress={()=> setImage(null)}>
                                        <DeleteIcon height={scale(21)} width={scale(21)} />
                                    </Pressable>
                                )}
                            </View>
                        )}
                    </View>
                ) : (
                    <View style={{flexDirection: "row"}}>
                        <View style={{flex: 10}}>
                            <RegularText title={title ?? "Upload Image"} size={14} color={theme.neutral.main} />
                            <View>
                                <RegularText title={`Image must be a JPG or PNG file \nand a maximum of 20mb`} size={12} lines={7} color={theme.neutral.main} />
                                {uploadSuccess === false && <RegularText title={`Upload failed!`} size={11} lines={7} color={theme.danger.main} /> }
                                
                            </View>
                        </View>
                        <View style={{flex: 2, justifyContent: "center", alignItems: "flex-end"}}>
                            <Pressable onPress={pickImage}>
                                <UploadIcon height={scale(21)} width={scale(21)} />
                            </Pressable>
                        </View>
                    </View>
                )}
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    uploadField: {
        borderRadius: scale(8),
        height: scale(110),
        paddingHorizontal: scale(15),
        justifyContent: "center"
    }
})

export default ImageSelect
