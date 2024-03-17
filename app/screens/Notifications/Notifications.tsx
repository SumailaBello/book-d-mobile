import { View, Text } from 'react-native';
import React, { FC } from 'react';
import Container from '../../components/Container/Container';
import { Screen } from '../../utils/types';
import ListItem from '../../components/ListItem/ListItem';
import scale from '../../utils/scale';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Button from '../../components/Buttons/Button';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import ToggleItem from '../../components/ListItem/ToggleItem';

const Notifications: FC<Screen> = ({navigation}) => {
  const {theme} = useSelector((state: RootState) => state.appSetting);
  
  return (
    <Container style={{padding: scale(20), backgroundColor: theme.background}}>
        <ListItem title='Sample Notification' subtitle='This is a sample notification' 
        //   onPress={()=> navigation.navigate('Profile')}
          textColor={theme.primary.main} clickable 
        />
    </Container>
  )
}

export default Notifications