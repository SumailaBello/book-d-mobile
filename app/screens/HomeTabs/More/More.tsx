import { View, Text } from 'react-native';
import React, { FC } from 'react';
import Container from '../../../components/Container/Container';
import { ConfirmationAlertConfig, Screen } from '../../../utils/types';
import ListItem from '../../../components/ListItem/ListItem';
import scale from '../../../utils/scale';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import Button from '../../../components/Buttons/Button';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import ToggleItem from '../../../components/ListItem/ToggleItem';
import { toggleLoggedIn } from '../../../store/appSettings';
import { toggleConfirmation } from '../../../store/modalSlice';
import { setConfirmationFunction } from '../../../utils/utils';
import { resetUser } from '../../../store/userSlice';

const More: FC<Screen> = ({navigation}) => {
  //GLOBAL STATE
  const {theme} = useSelector((state: RootState) => state.appSetting);
  const dispatch = useDispatch();

  //HANDLE LOGOUT
  const handleLogout = ()=> {
    const confirmationAlert: ConfirmationAlertConfig = {
        title: "Confirm",
        message: "Do you want to logout?",
        mode: "danger",
    }
    setConfirmationFunction(logOutFunction)
    dispatch(toggleConfirmation(confirmationAlert))
  }

  const logOutFunction = ()=> {
    dispatch(toggleLoggedIn());
    dispatch(resetUser());
  }
  
  return (
    <Container style={{padding: scale(20), backgroundColor: theme.background}}>
        <ListItem title='Profile' subtitle='View & Edit Profile Information' 
          onPress={()=> navigation.navigate('Profile')}
          textColor={theme.primary.main} clickable 
        />
        <ToggleItem title='Dark Mode' textColor={theme.primary.main} />
        <View style={{marginTop: 'auto'}}>
          <Button title='Logout'
            onPress={handleLogout}
            icon={<MaterialCommunityIcons style={{marginLeft: scale(3)}} name="logout" color={theme.light} size={scale(14)} />} 
            color={theme.danger.main} textColor={theme.light} 
          />
        </View>
    </Container>
  )
}

export default More