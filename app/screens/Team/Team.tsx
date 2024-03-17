import React, { FC } from 'react';
import { Screen } from '../../utils/types';
import Container from '../../components/Container/Container';
import EmptyBox from '../../components/EmptyBox/EmptyBox';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import scale from '../../utils/scale';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useGetTeam } from '../../utils/Hooks/UserHooks';
import { ActivityIndicator, FlatList, Image, RefreshControl, StyleSheet, View } from 'react-native';
import SkeletonItem from '../../components/ListItem/SkeletonItem';
import ListItem from '../../components/ListItem/ListItem';
import { FlashList } from '@shopify/flash-list';

const Team: FC<Screen> = ({navigation, route}) => {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    const {user} = useSelector((state: RootState) => state.userSlice);

    const {isError, isLoading, isSuccess, data, refetch, isRefetching} = useGetTeam(user._id);
    console.log(data);

    const renderItem = (obj: any)=> {
        console.log(obj);
        const item: any = obj.item;
        const index = obj.index;
        return (
            <ListItem 
                // key={item.id.value} 
                title={item.name.first + " " + item.name.last} 
                subtitle={item.email}
                icon={<Image source={{uri: item.picture.thumbnail }} style={styles.profilePic} />}
                clickable
            />
        )
    }
    return (
        <Container>
            <FlashList showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl 
                        // refreshing={isRefreshing || isLoading && lockList.length === 0} 
                        refreshing={isRefetching} 
                        onRefresh={refetch}
                        colors={[theme.primary.main]}
                    />
                }
                contentContainerStyle={{paddingBottom: scale(20), paddingHorizontal: scale(20)}}
                data={data?.data.data.results}
                renderItem={renderItem}
                estimatedItemSize={scale(54)}
                // keyExtractor={(item: any) => item.id.value}
                ListEmptyComponent = {()=> (
                    <>
                        {!isLoading ? (
                            <View style={{marginTop: "35%"}}>
                                <EmptyBox 
                                    title='No Data'
                                    icon={<MaterialCommunityIcons name="account-group-outline" size={scale(50)} color={theme.neutral[300]} />}
                                />
                            </View>
                        ) : 
                        (
                            <View>
                                <SkeletonItem />
                                <SkeletonItem />
                            </View>
                        )}
                    </>
                )}
            />
        </Container>
    )
}

const styles = StyleSheet.create({
    profilePic: {
        resizeMode: 'contain',
        height: scale(30),
        width: scale(30),
        borderRadius: scale(15)
    }
})

export default Team;