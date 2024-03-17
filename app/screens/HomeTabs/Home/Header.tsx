import { View, Image, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import IconButton from '../../../components/Buttons/IconButton';
import { RegularText, BoldText } from '../../../components/Typography/Typography';
import scale from '../../../utils/scale';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

const Header: FC<any> = ({navigation}) => {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    const {user} = useSelector((state: RootState) => state.userSlice);
    // console.log(user);

    return (
        <View style={{flexDirection: 'row'}}>
            <View style={{flex: 10, flexDirection: 'row', alignItems: 'center'}}>
                {/* <Image source={{uri: 'https://gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.jpg'}} style={styles.profileImg} /> */}
                <View style={{marginLeft: scale(5)}}>
                    <RegularText title={new Date().toDateString()} size={12} />
                    <BoldText title={user?.name} size={28} lines={1} />
                </View>
            </View>
            <View style={{flex: 2, justifyContent: 'center'}}>
                <IconButton backgroundColor={theme.primary[100]}
                    onPress={()=> navigation.navigate('Notifications')}
                    icon={<MaterialCommunityIcons name='bell-outline' size={scale(20)} />}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    profileImg: {
        height: scale(50),
        width: scale(50),
        resizeMode: 'contain',
        borderRadius: scale(25),
    },
})

export default Header