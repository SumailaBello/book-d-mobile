import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import scale from '../../utils/scale';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import ArrowRight from '../../../assets/icons/arrow-right.svg';
import SkeletonLoader from '../SkeletonLoader/SkeletonLoader';

// const {theme} = CONSTANTS;
const SkeletonItem: React.FC = () => {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    return (
        <Pressable 
            style={[styles.listItem, {
                borderBottomColor: theme.light[400], 
                backgroundColor: theme.neutral[100],
                height: undefined,
            }]}
        >
            <View style={styles.content}>
                <View style={{paddingLeft: scale(5)}}>
                    <View style={{width: '80%'}}>
                        <SkeletonLoader />
                    </View>
                    <View style={{width: '30%', marginTop: scale(10)}}>
                        <SkeletonLoader />
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    listItem: {
        paddingHorizontal: scale(10),
        borderRadius: scale(8),
        minHeight: scale(54),
        marginTop: scale(10),
        justifyContent: "center",

    },
    content: {
        flex: 1,
        justifyContent: 'center',
        // paddingLeft: scale(15),
    }
})

export default SkeletonItem
