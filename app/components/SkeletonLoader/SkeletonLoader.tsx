import React, { useEffect } from 'react';
import { StyleSheet, Animated, ViewStyle} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import scale from '../../utils/scale';
// import { colors } from '../../Styles/Styles';

interface Props {
    /** whether skeleton loader will be animated or not. It will animate by default */
    animated?: boolean;
    style?: ViewStyle;
    height?: number;
    width?: number;
}

const SkeletonLoader: React.FC<Props> = (props) => {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    let animated = new Animated.Value(0.3);
    const inputRange = [0, 1];
    let outputRange = [0, 1];
    let opacity = animated.interpolate({inputRange, outputRange});

    useEffect(()=> {
        if ( props.animated === true || props.animated === undefined ) {
            animate();
        }
    })
    const animate = ()=> {
        Animated.loop(
          Animated.timing(animated, {
              toValue: 1,
              duration: 1500,
              useNativeDriver: true,
          }),
        ).start();
    }
    return (
        // <Animated.View style={[props.style ? props.style : styles.view, {opacity: opacity, backgroundColor: colors.medium}]} />
        <Animated.View style={[props.style, {opacity: opacity, backgroundColor: theme.neutral[300], 
            height: props.height ?? scale(10), width: props.width ?? "100%", borderRadius: scale(2)}]} />
    )
}

export default SkeletonLoader

// const styles = StyleSheet.create({
//     view: {
//         // height: scale(10),
//         // width: '100%',
//         borderRadius: 5,
//     }
// })
