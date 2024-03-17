import React, { FC } from 'react';
import { Screen } from '../../utils/types';
import Container from '../../components/Container/Container';
import EmptyBox from '../../components/EmptyBox/EmptyBox';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import scale from '../../utils/scale';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const Messages: FC<Screen> = ({navigation, route}) => {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    return (
        <Container>
            {/* <ListItem */}
            <EmptyBox 
                title='No Messages'
                icon={<MaterialCommunityIcons name="message-off-outline" size={scale(50)} color={theme.neutral[300]} />}
            />
        </Container>
    )
}

export default Messages;