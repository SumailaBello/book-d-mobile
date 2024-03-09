import React, { useEffect } from 'react';
import { View, Animated, Image, StyleSheet } from 'react-native';

export const Indicator = ()=> {
    let animated = new Animated.Value(0);
    const inputRange = [0, 1];
    let outputRange = ['0deg', '-360deg'];
    let rotateOpposit = animated.interpolate({inputRange, outputRange});
    outputRange = ['0deg', '360deg'];
    let rotate = animated.interpolate({inputRange, outputRange});
    const transform = [{rotate: rotate}];
    const transform1 = [{rotate: rotateOpposit}];
    
    useEffect(()=>{
        animate()
    })
    const animate = ()=> {
        Animated.loop(
          Animated.timing(animated, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
          }),
        ).start();
    }
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/img/logo.png')} style={styles.imgStyle}/>
            <Animated.View style={[styles.item, {transform}]}>
            <Animated.View style={[styles.dot, {transform: transform1}]} />
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        position: 'absolute',
        width: 100,
        height: 70, // this is the diameter of circle
    },
    dot: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#FAC308',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        left: '90%'
    },
    text: {
        color: '#fff',
    },
    imgStyle: {
        height: 70,
        width: 100,
        resizeMode: 'contain',
    },
});
