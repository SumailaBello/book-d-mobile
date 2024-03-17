import { View, Pressable, Image, StyleSheet } from 'react-native'
import React, { FC, useState } from 'react'
import Container from '../../components/Container/Container'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { AlertConfig, Screen } from '../../utils/types';
import scale from '../../utils/scale';
import { BlockText, BoldText, RegularText, SemiBoldText } from '../../components/Typography/Typography';
import { ScrollView } from 'react-native-gesture-handler';
import CONSTANTS from '../../utils/constants';
import Button from '../../components/Buttons/Button';
import Input from '../../components/Inputs/TextInput';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { UpdateUserQuery, useUpdateUser } from '../../utils/Hooks/UserHooks';
import { errorHandler, successHandler } from '../../utils/utils';
import { toggleAlert } from '../../store/modalSlice';
import { updateUserState } from '../../store/userSlice';
import { useQueryClient } from 'react-query';

const Profile: FC<Screen> = ({navigation}) => {
    //GLOBAL STATE
    const {theme, biometricEnabled} = useSelector((state: RootState) => state.appSetting);
    const {user} = useSelector((state: RootState) => state.userSlice);
    const dispatch = useDispatch();

    const fName = user.name.split(" ")[0];
    const lName = user.name.split(" ")[1];
    //LOCAL STATE
    const [changed, setChanged] = useState(false);
    const [firstName, setFirstName] = useState<string>(fName);
    const [lastName, setLastName] = useState<string>(lName);
    const [jobTitle, setJobTitle] = useState<string>(user.jobTitle);
    const [address, setAddress] = useState<string>(user.address);
    const [businessName, setBusinessName] = useState<string>(user.businessName);
    // {name, jobTitle, address, businessName, uuid}

    //HOOKS
    const query = useUpdateUser();
    const queryClient = useQueryClient();

    const proceed = async ()=> {
        const body: UpdateUserQuery = {
            name: firstName + " " + lastName,
            jobTitle: jobTitle,
            address: address,
            businessName: businessName,
            uuid: user.uuid,
        }
        try {
            const res = await query.mutateAsync(body);
            console.log('UPDATE USER', res);
            const alertObj = successHandler(res);
            dispatch(toggleAlert(alertObj));
            dispatch(updateUserState(res.data.user));
            queryClient.invalidateQueries({queryKey: 'getUser'})
        } 
        catch (err) {
            console.log(err);
            const errAlert = errorHandler(err);
            dispatch(toggleAlert(errAlert));
        }
    }

    return (
        <Container style={{backgroundColor: theme.background}}>
            <ScrollView contentContainerStyle={{minHeight: CONSTANTS.DEVICE_HEIGHT}}>
                {/* <View style={{flex: 4, paddingHorizontal: scale(20)}}>
                    <BoldText title='Welcome' size={28} />
                    <RegularText title='Create your account to get started' color={theme.neutral.main} />
                </View> */}
                <View style={{flex: 8, paddingHorizontal: scale(20)}}>
                    <View style={{alignItems: 'center', paddingVertical: scale(20)}}>
                        {/* <Image source={{uri: 'https://gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.jpg'}} style={styles.profileImg} /> */}
                        {/* <BoldText title='View/Update profile information' color={theme.neutral.main} size={18} /> */}
                    </View>
                    <View style={{flexDirection: 'row', marginTop: scale(20)}}>
                        <View style={{flex: 1, marginRight: scale(2)}}>
                            <Input 
                                label='First Name' 
                                value={firstName} 
                                onChangeText={setFirstName}
                                onChange={()=> setChanged(true)} 
                            />
                        </View>
                        <View style={{flex: 1, marginLeft: scale(2)}}>
                            <Input 
                                label='Last Name' 
                                value={lastName} 
                                onChangeText={setLastName}
                                onChange={()=> setChanged(true)} 
                            />
                        </View>
                    </View>
                    <Input label='Business Name' 
                        value={businessName} 
                        onChangeText={setBusinessName} 
                        onChange={()=>setChanged(true)} 
                    />
                    <Input label='Job Title' 
                        value={jobTitle} 
                        onChangeText={setJobTitle} 
                        onChange={()=>setChanged(true)} 
                    />
                    <Input label='Address' 
                        value={address} 
                        onChangeText={setAddress} 
                        onChange={()=>setChanged(true)} 
                    />
                </View>
                <View
                    style={{flex: 4, justifyContent: 'center', padding: scale(20)}} 
                >
                    <Button title='Update' 
                        loading={query.isLoading}
                        disabled={query.isLoading || !changed}
                        onPress={proceed}
                    />
                </View>
            </ScrollView>
        </Container>
    )
}

const styles = StyleSheet.create({
    profileImg: {
        height: scale(70),
        width: scale(70),
        resizeMode: 'contain',
        borderRadius: scale(35),
    },
})

export default Profile