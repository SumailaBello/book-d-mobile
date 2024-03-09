import React, { useRef } from 'react';
import { View, Modal, StyleSheet, Dimensions, Pressable, StatusBar } from 'react-native';
import { Button } from '../Buttons/Button';
// import { IconButton } from '../Buttons/IconButton';
// import globalStyles, {colors} from '../../Styles/Styles';
// import {observer, inject} from 'mobx-react';
import {RegularText, SemiBoldText} from '../Typography/Typography';
// import CONSTANTS from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {toggleAlert}  from '../../store/modalSlice';
import scale from '../../utils/scale';
import * as Animatable from 'react-native-animatable';
import IconButton from '../Buttons/IconButton';
// import CloseIcon from '../../../assets/icons/close.svg';

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const AlertModal = () => {
  const {theme} = useSelector((state: RootState) => state.appSetting);
  const {alertVisible, alert} = useSelector((state: RootState) => state.modalSlice);
  const dispatch = useDispatch();
  let viewRef: any = useRef();

  /** close modal */
  const closeModal = async ()=> {
    // console.log(viewRef)
    await viewRef.slideOutUp();
    dispatch(toggleAlert({title: '', message: ''}));
  }

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={alertVisible}
      onRequestClose={() => {
          // this.props.store.setModalVisible(false);
          // props.store.resetModal()
      }}
      hardwareAccelerated = {true}
      statusBarTranslucent
    >
      <Pressable style={styles.topView} onPress={closeModal}>
        <Animatable.View ref={ref => viewRef = ref} duration={300} animation={"slideInDown"} style={[styles.modalView, 
          {backgroundColor: alert.mode === "success" ? theme.primary[300] : alert.mode === "danger" ? theme.danger.main : theme.neutral.main}]}>
          <SemiBoldText title={alert.title ?? ""} color={theme.light} size={14} />
          <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: scale(5)}}>
            <View style={{flex: 10}}>
              <RegularText title={alert.message || ''} color={theme.light} size={12} lines={3} />
            </View>
            <View style={{flex: 2}}>
              {/* <IconButton 
                icon={<CloseIcon />}
                onPress={closeModal}
              /> */}
            </View>
          </View>
        </Animatable.View>
      </Pressable>
    </Modal>
  )
}

const styles = StyleSheet.create({
    topView: {
      justifyContent: "flex-start",
      height: "100%",
      width: screenWidth,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    modalView: {
      paddingHorizontal: scale(10),
      paddingTop: scale(50),
      paddingBottom: scale(10),
      alignItems: "flex-start",
      // shadowColor: "#000",
      // shadowOffset: {
      //     width: 0,
      //     height: 2
      // },
      // shadowOpacity: 0.25,
      // shadowRadius: 4,
      elevation: 5,
      width: '100%'
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });

export default AlertModal;
