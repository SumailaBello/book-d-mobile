import { View, Text } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { RegularText } from '../../../components/Typography/Typography'

interface Props {
    setEnabled: (value: boolean)=> void;
    duration: number;
}

const TimerCountdown: FC<Props> = ({setEnabled, duration}) => {

    const [timer, setTimer] = useState(duration);

    let interval: any;

    const startInterval = ()=> {
        // setTimer(30);
        interval = setInterval(() => {
            if(timer > 0) {
                let newTimer = timer;
                newTimer = newTimer - 1;
                setTimer(newTimer);
                // setTimer(newTimer);
            }
            if(timer === 0) {
                setEnabled(true);
                clearTimeout(interval);
            }
        }, 1000);
    }

    useEffect(() => {
        startInterval();
        return ()=> {
            clearInterval(interval);
        }
    }, [timer])

    return (
        <View>
            <RegularText title={ '00:' + ( timer < 10 ? '0' + String(timer) : String(timer)) } />
        </View>
    )
}

export default TimerCountdown