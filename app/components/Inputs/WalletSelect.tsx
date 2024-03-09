import { View, Text, StyleSheet } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { RegularText } from '../Typography/Typography'
import AltSelect from './AltSelect'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import DropDownIcon from '../../../assets/icons/drop-down.svg';
import DropDownIconLight from '../../../assets/icons/drop-down-light.svg';
import scale from '../../utils/scale'
import { formatFromKobo, formatMoney } from '../../utils/utils'
import { getWallets } from '../../utils/Services/AccountService'
import { authRequestConfig } from '../../utils/api'
import { saveWallets } from '../../store/userSlice'

interface Props {
    onSelect?: (item: any) => void;
    themeMode?: 'neutral' | 'primary';
    selectedWalletValue?: any;
    hideDefault?: boolean;
    /** disable wallet with specified id */
    disableWalletId?: number;
}

const WalletSelect:FC<Props> = ({onSelect, themeMode, selectedWalletValue, hideDefault, disableWalletId}) => {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    const {businessAcct, wallets} = useSelector((state: RootState) => state.userSlice);
    const [defaultSelectedWallet, setDefaultSelectedWallet] = useState(wallets[0]);
    /** component only wallet list */
    const [walletList, setWalletList] = useState<Array<any>>([]);
    const dispatch = useDispatch();

    const handleSelect = (item: any)=> {
        onSelect ? onSelect(item) : null
    }

    // useEffect(() => {
    //     if(selectedWalletValue) {
    //         setSelectedWallet(selectedWalletValue);
    //     }
    // }, [selectedWalletValue])

    useEffect(() => {
        getWalletsData(businessAcct.uuid);
    }, [])

    useEffect(() => {
        const newList = wallets.map(item => {
            return {
                    ...item,
                    disabled: item.id === disableWalletId ? true : false,
                    formattedBalance: "₦" + formatMoney(formatFromKobo(item.balance)),
                }
            })
        setWalletList(newList)
    }, [wallets])
    
    // get user wallet data
    const getWalletsData = async (uuid: string)=> {
        try {
            const res = await getWallets(uuid, authRequestConfig);
            console.log("wall Success: ", res);
            const walletsInfo: Array<any> = res.data.wallets;
            dispatch(saveWallets(walletsInfo));
        }
        catch(err) {
            console.log("Wall Error: ", err);
        }
    }

    return (
        <AltSelect 
            onSelectItem={handleSelect}
            sheetTitle="Choose Wallet"
            title="Wallet"
            customController={
                <View style={[styles.walletSelect, {backgroundColor: themeMode === 'neutral' ? theme.neutral[100] : "rgba(255, 255, 255, 0.1)"}]}>
                    {hideDefault && !selectedWalletValue ? (
                        <View style={{flex: 11}}>
                            <View style={{flex: 1, justifyContent: "flex-start"}}>
                                <RegularText title="" size={12} color={themeMode === 'neutral' ? theme.neutral.main : theme.light} />
                            </View>
                                <>
                                    <View style={{flex: 1, justifyContent: "center"}}>
                                        <RegularText title={"Select Wallet"} size={14} transform="capitalize"
                                            color={themeMode === 'neutral' ? theme.neutral[300] : theme.primary[200]} />
                                    </View>
                                    <View style={{flex: 1, justifyContent: "flex-end"}}>
                                        <RegularText title={""} size={14} color={ themeMode === 'neutral' ? theme.neutral.main : theme.light} />
                                    </View>
                                </>
                        </View>
                    ) : (
                        <View style={{flex: 11}}>
                            <View style={{flex: 1, justifyContent: "flex-start"}}>
                                <RegularText title="Wallet" size={12} color={themeMode === 'neutral' ? theme.neutral.main : theme.light} />
                            </View>
                            {selectedWalletValue ? (
                                <>
                                    <View style={{flex: 1, justifyContent: "center"}}>
                                        <RegularText title={selectedWalletValue?.accountName} size={14} transform="capitalize"
                                            color={themeMode === 'neutral' ? theme.neutral[300] : theme.primary[200]} />
                                    </View>
                                    <View style={{flex: 1, justifyContent: "flex-end"}}>
                                        <RegularText title={"₦" + formatMoney(formatFromKobo(selectedWalletValue?.balance))} size={14} color={ themeMode === 'neutral' ? theme.neutral.main : theme.light} />
                                    </View>
                                </>
                            ) : (
                                <>
                                    <View style={{flex: 1, justifyContent: "center"}}>
                                        <RegularText title={defaultSelectedWallet?.accountName} size={14} transform="capitalize"
                                            color={themeMode === 'neutral' ? theme.neutral[300] : theme.primary[200]} />
                                    </View>
                                    <View style={{flex: 1, justifyContent: "flex-end"}}>
                                        <RegularText title={"₦" + formatMoney(formatFromKobo(defaultSelectedWallet?.balance))} size={14} color={ themeMode === 'neutral' ? theme.neutral.main : theme.light} />
                                    </View>
                                </>
                            )}
                        </View>
                    )}
                    <View style={styles.iconContainer}>
                        {themeMode === 'neutral' ? (
                            <DropDownIcon />
                        ) : (
                            <DropDownIconLight />
                        )}
                    </View>
                </View>
            }
            list={walletList}
            listTitleKey="accountName"
            subTitleKey="formattedBalance"
        />
    )
}

const styles = StyleSheet.create({
    walletSelect: {
        borderRadius: scale(8),
        padding: scale(15),
        minHeight: scale(100),
        flexDirection: "row",
    },
    iconContainer: {
        flex: 1, 
        alignItems: "flex-end", 
        justifyContent: "center",
    }
})

export default WalletSelect