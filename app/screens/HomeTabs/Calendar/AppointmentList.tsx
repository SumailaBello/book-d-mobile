import { View, Text, ActivityIndicator, Pressable, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import { FlashList } from '@shopify/flash-list'
import { RegularText } from '../../../components/Typography/Typography'
import scale from '../../../utils/scale'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { AppointmentItemType } from '../../../utils/types'
import AppointmentItem from './AppointmentItem'

interface Props {
    list: Array<AppointmentItemType>;
    loading: boolean;
}

const AppointmentList: FC<Props> = ({list, loading}) => {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    
    const renderItem = (obj: any)=> {
        const item: AppointmentItemType = obj.item;
        const index = obj.index;
        return (
            <AppointmentItem item={item} index={index} />
        )
    }

    return (
        <FlashList 
            estimatedItemSize={scale(54)}
            contentContainerStyle={{paddingBottom: scale(150)}}
            // style={{marginTop: scale(20)}}
            data={list}
            renderItem={renderItem}
            // extraData={selectedIndex}
            // keyExtractor={(item: any) => JSON.stringify(item)}
            ListEmptyComponent = {()=> (
                <>
                    {!loading ? (
                        <View style={{paddingHorizontal: 10, marginTop: '45%', alignItems: "center"}}>
                            <RegularText size={16} title="No data" color={theme.neutral.main} />
                        </View>
                    ) : (
                        <ActivityIndicator color={theme.neutral.main} style={{flex: 1, marginTop: scale(20)}} size={25} />
                    )}
                </>
            )}
        />
    )
}

const styles = StyleSheet.create({
    item: {
        padding: scale(10),
        borderRadius: scale(10),
        marginTop: scale(10),
    }
})

export default AppointmentList