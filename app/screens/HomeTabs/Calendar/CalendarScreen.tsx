import { View, Vibration, Modal } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import {Agenda, AgendaList, Calendar, CalendarList, DateData, ExpandableCalendar} from 'react-native-calendars';
import Container from '../../../components/Container/Container';
import { AppointmentItemType, Screen } from '../../../utils/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import scale from '../../../utils/scale';
import CalendarCard from './CalendarCard';
import AppointmentList from './AppointmentList';
import { formatAMPM, formatDate } from '../../../utils/utils';
import { useGetAppointment, useGetTeam } from '../../../utils/Hooks/UserHooks';
import SelectSheet from '../../../components/Inputs/SelectSheet';
import IconButton from '../../../components/Buttons/IconButton';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { toggleAlert } from '../../../store/modalSlice';
import CalendarMenu from './CalendarMenu';

const CalendarScreen: FC<Screen> = ({navigation}) => {
  //GLOBAL STATE
  const {theme} = useSelector((state: RootState) => state.appSetting);
  const {user} = useSelector((state: RootState) => state.userSlice);
  const dispatch = useDispatch();

  //HOOKS
  const {isError, isLoading, isSuccess, data, refetch, isRefetching} = useGetAppointment(user._id);
  console.log(data);

  //LOCAL STATE
  const [isVisible, setIsVisible] = useState(false); //set visibility of menu
  const [selectedDate, setSelectedDate] = useState<DateData | undefined>(undefined); //selected date on long press

  useEffect(() => {
    setHeader();
  }, [])

  const setHeader = ()=> {
    navigation.setOptions({
      headerRight: ()=> (
        <IconButton 
          onPress={()=> dispatch(toggleAlert({
            title: 'Information',
            message: 'Long press on a date to set availability',
            mode: 'neutral'
          }))}
          icon={<MaterialCommunityIcons name='information-outline' size={scale(20)} />} />
      )
    })
  }
  

  const list: Array<AppointmentItemType> = [
    {
      title: 'Sample appointment',
      description: 'Lorem Ipsum dolor sit amet',
      date: formatDate(new Date()),
      // time: formatAMPM(new Date),
    },
    {
      title: 'Sample appointment',
      description: 'Lorem Ipsum dolor sit amet',
      date: formatDate(new Date()),
      // time: formatAMPM(new Date),
    },
    {
      title: 'Sample appointment',
      description: 'Lorem Ipsum dolor sit amet',
      date: formatDate(new Date()),
      // time: formatAMPM(new Date),
    },
  ]

  const handleLongPress = (date: DateData) => {
    Vibration.vibrate(40);
    console.log(date);
    setIsVisible(true);
    setSelectedDate(date);
  }

  return (
    <Container style={{padding: scale(20)}}>
      <View style={{borderColor: theme.neutral[200], borderWidth: scale(1)}}>
        <CalendarCard 
          onLongPress={handleLongPress}
        />
      </View>
      <View style={{marginTop: scale(10)}} />
      <AppointmentList list={list} loading={false} />
      <CalendarMenu isVisible={isVisible} setVisible={setIsVisible} selectedDate={selectedDate} />
    </Container>
  )
}

export default CalendarScreen