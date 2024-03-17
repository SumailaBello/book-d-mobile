import { View, Text } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { Calendar, DateData } from 'react-native-calendars'
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { formatDate } from '../../../utils/utils';

interface Props {
    /** date long press */
    onLongPress?: (date: DateData)=> void;
}

const CalendarCard: FC<Props> = ({onLongPress}) => {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    const {user} = useSelector((state: RootState) => state.userSlice);
    console.log('CALENDAR CARD USER', user);

    const [marked, setMarked] = useState<any>(null);
    useEffect(() => {
        const formattedDates: any = []
       // dynamicArray fetching from database
        user.availability.map((res: any, key: any) => {
            formattedDates.push(res)
        })
        const obj = formattedDates.reduce((c: any, v: any) => Object.assign(c, { [v]: { marked: true, dotColor: theme.danger.main, } }), {});
        setMarked(obj)
    }, [user])

    const handleDatePress = (date: DateData) => {
        console.log(new Date(date.dateString));
    }

    return (
        <Calendar 
            theme={{
                dotColor: theme.primary.main,
                arrowColor: theme.primary.main,
                todayTextColor: theme.light,
                textMonthFontFamily: 'CircularStd-Bold',
                todayBackgroundColor: theme.primary.main,
                dayTextColor: theme.primary.main
                // textDayFontFamily: 'CircularStd-Bold',
            }}
            onDayPress={handleDatePress}
            markedDates= {marked}
            onDayLongPress={onLongPress}
        />
    )
}

export default CalendarCard