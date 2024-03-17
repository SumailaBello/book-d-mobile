import { View, StyleSheet } from 'react-native';
import React, { FC, ReactNode } from 'react';
import { MediumText } from '../Typography/Typography';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import scale from '../../utils/scale';

interface Props {
    icon?: ReactNode,
    title?: string,
}

const EmptyBox: FC<Props> = ({icon, title}) => {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    return (
        <View style={styles.container}>
            {icon}
            <View style={{marginTop: scale(10)}} />
            <MediumText 
                title={title ?? ""}
                color={theme.neutral[300]}
                size={14}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
})

export default EmptyBox