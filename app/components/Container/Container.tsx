import React from 'react';
import { SafeAreaView, View, ViewProps} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
// import { colors } from '../../Styles/Styles';
import CONSTANTS from '../../utils/constants';
import scale from '../../utils/scale';

// const {theme} = CONSTANTS;
const Container: React.FC<ViewProps> = (props: ViewProps) => {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    const {IS_ANDROID, IS_IOS} = CONSTANTS;
    return (
        <View {...props} style = {[{flex: 1, backgroundColor: theme.light, paddingBottom: IS_IOS ? scale(10) : undefined}, props.style]} />
        // <>
        //     {IS_IOS ? (
        //         <SafeAreaView {...props} style = {[{flex: 1, backgroundColor: theme.light}, props.style]}>
        //             <View style={{padding: scale(10), flex: 1}}>
        //                 {props.children}
        //             </View>
        //         </SafeAreaView>
        //     ) : (
        //         <SafeAreaView {...props} style = {[{flex: 1, backgroundColor: theme.light}, props.style]} />
        //     )}
        // </>
    )
}

export default Container;
