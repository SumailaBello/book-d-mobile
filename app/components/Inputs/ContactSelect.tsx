import { View, Text, StyleSheet, Pressable, TextInput, ScrollView } from 'react-native';
import React, { FC, Ref, useCallback, useEffect, useRef, useState } from 'react';
import AlphabetList from "react-native-flatlist-alphabet";
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import * as Contacts from 'expo-contacts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import IData from 'react-native-flatlist-alphabet/dist/interfaces/IData';
import { TouchableOpacity } from 'react-native-gesture-handler';
import scale from '../../utils/scale';
import { RegularText, SemiBoldText } from '../Typography/Typography';
import SearchNeutralIcon from '../../../assets/icons/search-neutral.svg';
import IconButton from '../Buttons/IconButton';
import { search } from '../../utils/utils';
import { toggleAlert } from '../../store/modalSlice';

interface Props {
    setRef?: (ref: any)=> void,
    toggleSheet?: ()=> void,
    onSelect?: (item: any)=> void,
}

const ContactSelect: FC<Props> = ({setRef, toggleSheet, onSelect}) => {
    //GLOBAL STATE
    const {theme} = useSelector((state: RootState) => state.appSetting);
    const dispatch = useDispatch();
    
    //LOCAL STATE
    const [contactList, setContactList] = useState<Array<IData>>([]);
    const [selectedContact, setSelectedContact] = useState<any>(null);
    
    useEffect(() => {
        getContacts();
    }, []);

    //get all contacts
    const getContacts = async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
            const {data} = await Contacts.getContactsAsync();
            console.log("CONTACT LIST: ", data);
            if (data.length > 0) {
                const newList = data.map(item => {
                    return {
                        value: item.name,
                        key: item.id,
                        ...item
                    }
                })
                setContactList(newList);
            }
        }
    }

    // handle contact select
    const handleSelect = (contact: any)=> {
        console.log("selected contact: ", contact);
        toggleSheet ? toggleSheet() : null;
        setSelectedContact(contact);
        !contact?.phoneNumbers ? dispatch(toggleAlert({
            title: 'Error',
            message: 'No number found for selected contact',
            mode: 'danger',
        })) : null
        if(contact?.phoneNumbers?.length > 1) {
            console.log('REF: ', subMenuRef)
            subMenuRef?.show();
        }
        else {
            onSelect ? onSelect(contact) : null;
        }
    }

    const renderItem = (obj: any)=> {
        // console.log(obj);
        // const item = obj.item;
        // const index = obj.index;
        return (
            <Pressable style={[styles.item, {borderBottomColor: theme.neutral[100]}]} 
                onPress={()=> handleSelect(obj)}
            >
                <RegularText title={obj.name} color={theme.neutral[300]} size={16} />
            </Pressable>
        )
    }

    const renderSectionHeader = (val: any)=> {
        // console.log("SECTION HEADER: ", val)
        return (
            <View style={{paddingVertical: scale(2), paddingHorizontal: scale(16), backgroundColor: theme.neutral[200]}}>
                <SemiBoldText title={val.title} size={16} color={theme.neutral[300]} />
            </View>
        )
    }

    let subMenuRef : Ref<ActionSheetRef> | any;

    const handleSearch = (text: string)=> {
        if (text) {
            const searchRes = search(contactList, text, 'name');
            console.log(searchRes);
            setContactList(searchRes);
        }
        else {
            getContacts();
        }
    }
    
    return (
        <>
            <ActionSheet 
                ref={setRef}
                closeOnPressBack
                statusBarTranslucent={true}
                gestureEnabled = {true}
                enableGesturesInScrollView={false}
                openAnimationConfig={{bounciness: 0}}
                keyboardHandlerEnabled={false}
                // keyboardHandlerEnabled
                containerStyle={{flex: 1}}
                CustomHeaderComponent={<View />}
            >
                <View style={{flex: 1}}>
                    <View style={{alignItems: 'center', paddingHorizontal: scale(16), paddingTop: scale(16)}}>
                        {/* <View style={{flex: 1, alignItems: 'flex-end'}} > */}
                            <SemiBoldText title='Contacts' color={theme.neutral[300]} size={16} />
                        {/* </View> */}
                        <Pressable style={{position: 'absolute', right: scale(16), top: scale(16)}} 
                            onPress={()=> {
                                toggleSheet ? toggleSheet() : null;
                                getContacts();
                            }}
                        >
                            <RegularText title='Cancel' color={theme.primary.main} size={16} />
                        </Pressable>
                    </View>
                    <View style={{padding: scale(16)}}>
                        <View style={{backgroundColor: theme.neutral[100], height: scale(40), flexDirection: "row", paddingLeft: scale(10),
                            alignItems: "center", borderRadius: scale(10)}}
                        >
                            <SearchNeutralIcon height={24} width={24} style={{flex: 2, alignSelf: "center", marginRight: scale(5)}} />
                            <TextInput onChangeText = {handleSearch}
                            // autoFocus 
                            placeholder="Search" 
                            style={{flex: 8}} 
                            placeholderTextColor={theme.neutral.main} />
                        </View>
                    </View>
                    <AlphabetList
                        data={contactList}
                        renderItem={renderItem}
                        renderSectionHeader={renderSectionHeader}
                        // getItemHeight={YourItemHeight}
                        // sectionHeaderHeight={YourHeaderHeight}
                        indexLetterColor={theme.primary.main}
                        indexLetterSize={scale(10)}
                    />
                </View>
            </ActionSheet>
            <ActionSheet ref={(ref)=> subMenuRef = ref} 
                closeOnPressBack
                openAnimationConfig={{bounciness: 0}}
            >
                <View style={{alignItems: 'center', paddingVertical: scale(16)}}>
                    <SemiBoldText title='Select Number' color={theme.neutral[300]} size={16} />
                </View>
                <View style={{padding: scale(16)}}>
                    <SemiBoldText title={selectedContact?.name} color={theme.neutral[300]} size={16} />
                </View>
                {selectedContact?.phoneNumbers?.length > 1 ? (
                    <ScrollView>
                        {selectedContact?.phoneNumbers?.map((item: any) => (
                            <Pressable key={item?.id} style={[styles.item, {borderBottomColor: theme.neutral[100]}]}
                                onPress={()=> {
                                    const contact = {...selectedContact};
                                    // make sure phoneNumbers array contains just the selected object
                                    contact.phoneNumbers = [{...item, number: item.number}];
                                    setSelectedContact(contact);
                                    onSelect ? onSelect(contact) : null;
                                    subMenuRef.hide();
                                }} 
                            >
                                <RegularText title={item.number} color={theme.neutral[300]} size={16} />
                            </Pressable>
                        ))}
                    </ScrollView>
                ) : null}
            </ActionSheet>
        </>
    )
}

const styles = StyleSheet.create({
    item: {
        borderBottomWidth: scale(1),
        paddingVertical: scale(10),
        paddingHorizontal: scale(16),
    }
})

export default ContactSelect;