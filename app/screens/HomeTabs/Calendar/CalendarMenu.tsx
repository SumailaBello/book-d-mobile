import { View, Text, Alert, Modal, StyleSheet, Pressable } from 'react-native'
import React, { FC } from 'react'
import ListItem from '../../../components/ListItem/ListItem';
import scale from '../../../utils/scale';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { MediumText } from '../../../components/Typography/Typography';
import { ToggleAvailabilityQuery, useToggleAvailability } from '../../../utils/Hooks/UserHooks';
import { DateData } from 'react-native-calendars';
import { toggleAlert, toggleLoading } from '../../../store/modalSlice';
import { AlertConfig, LoaderConfig } from '../../../utils/types';
import { errorHandler } from '../../../utils/utils';
import { updateUserState } from '../../../store/userSlice';
import { useQueryClient } from 'react-query';

interface Props {
    isVisible: boolean;
    setVisible: (visible: boolean)=> void;
    selectedDate?: DateData;
}

const CalendarMenu: FC<Props> = ({isVisible, setVisible, selectedDate}) => {
    //GLOBAL STATE
    const {theme} = useSelector((state: RootState) => state.appSetting);
    const {user} = useSelector((state: RootState) => state.userSlice);
    console.log('USER', user)
    const dispatch = useDispatch();
    // console.log('DATE', new Date(selectedDate?.timestamp as number * 1000))
    

    //HOOKS
    const {mutateAsync, isLoading, data} = useToggleAvailability();
    const queryClient = useQueryClient();
    
    const toggleAvailability = async (mode: 'add' | 'remove')=> {
        setVisible(false);
        const config: LoaderConfig = {
            loaderTitle: 'Pease wait',
            loaderSubtitle: 'Process will be completed in a jiffy',
        }
        dispatch(toggleLoading(config));
        const body: ToggleAvailabilityQuery = {
            uuid: user.uuid,
            date: selectedDate?.dateString as string,
            mode: mode,
        }
        try {
            const res = await mutateAsync(body);
            console.log('AVAILABILITY', res);
            queryClient.invalidateQueries({queryKey: 'getUser'})
            dispatch(updateUserState(res.data.data));
            dispatch(toggleLoading());
            const alertObj: AlertConfig = {
                title: 'Done',
                message: mode === 'add' ? 'Added availability' : 'Removed availability',
                mode: 'success',
            }
            dispatch(toggleAlert(alertObj));
        } 
        catch (err) {
            console.log('ERR', err)
            dispatch(toggleLoading());
            const errAlert: AlertConfig = errorHandler(err);
            dispatch(toggleAlert(errAlert));
        }
    }

    /** close modal */
    const closeModal = async ()=> {
        // console.log(viewRef)
        setVisible(false);
    }
    
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={() => {
                setVisible(!isVisible);
            }}
            statusBarTranslucent
        >
            <Pressable style={styles.topView} onPress={closeModal}>
                <View style={[styles.modalView, {backgroundColor: theme.light}]}>
                    <View style={{marginVertical: scale(20)}}>
                        <MediumText title='Menu' />
                    </View>
                    <ListItem title='Mark as available' clickable onPress={()=> toggleAvailability('add')} />
                    <ListItem title='Mark as unavailable' clickable onPress={()=> toggleAvailability('remove')} />
                </View>
            </Pressable>
        </Modal>
    )
}

const styles = StyleSheet.create({
    topView: {
        justifyContent: "flex-end",
        height: "100%",
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    modalView: {
    //   margin: 20,
    //   backgroundColor: 'white',
      borderTopLeftRadius: scale(20),
      borderTopRightRadius: scale(20),
      paddingHorizontal: scale(20),
      paddingBottom: scale(20),
    //   alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      
    },
  });

export default CalendarMenu