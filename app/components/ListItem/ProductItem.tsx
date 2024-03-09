import React from 'react';
import { View, Pressable, StyleSheet, Image } from 'react-native';
// import { colors } from '../../Styles/Styles'
import scale from '../../utils/scale';
import { RegularText, MediumText, SemiBoldText, BlockText, BoldText } from '../Typography/Typography';
import CONSTANTS from '../../utils/constants';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Checkbox from '../Checkbox/Checkbox';
import ArrowRight from '../../../assets/icons/arrow-right.svg';
import EditIcon from '../../../assets/icons/edit.svg';
import DeleteIcon from '../../../assets/icons/delete.svg';
import { ProductType } from '../../utils/types';
import { formatMoney } from '../../utils/utils';

interface ListProps {
    /** function executed on press */
    onPress?: ()=> void,
    disabled?: boolean,
    /** color of button text to override default color */
    textColor?: string,
    /** custom color of the item background */
    backgroundColor?: string,
    /** handler for edit button press */
    onEditPress?: ()=> void,
    /** handler for delete button press */
    onDeletePress?: ()=> void,
    /** product object */
    product: ProductType,
}
// const {theme} = CONSTANTS;
const ProductItem: React.FC<ListProps> = ({onPress, disabled, textColor, backgroundColor, onEditPress, onDeletePress, product}) => {
    const {theme} = useSelector((state: RootState) => state.appSetting);
    return (
        <Pressable 
            style={[styles.listItem, {
            backgroundColor: theme.neutral[100],
            opacity: disabled ? 0.5 : 1
            }]} 
            onPress={disabled ? undefined : onPress}>
            <View style={styles.content}>
                <View style={{flex: 4, justifyContent: "center", alignItems: "center"}}>
                    {product?.productImages && product.productImages.length > 0 ? (
                        <Image source = {{uri: product.productImages[0].locationUrl as string}} style={styles.img} />
                    ) : (
                        <Image source={require('../../../assets/img/placeholder.png')} style={styles.img} />
                    )}
                </View>
                <View style={{flex: 5, paddingLeft: scale(10), justifyContent: 'space-between'}}>
                    <RegularText title={product?.name ?? ''} color={textColor ?? theme.neutral[300]} size={14} />
                    <View style={{flexDirection: 'row', marginTop: scale(10)}}>
                        {/* <BlockText> */}
                        <RegularText title={product?.productType} transform='capitalize' size={12} color={theme.neutral.main} />
                        <RegularText title={'・'} size={12} color={theme.faintDark} />
                        <RegularText title={String(product?.quantity)} size={12} color={theme.neutral.main} />
                        {/* </BlockText> */}
                    </View>
                    <View style={{marginTop: 'auto'}}>
                        {product?.quantity === 0 ? (
                            <RegularText title='Out Of Stock' color={theme.danger.main} size={12} />
                        ) : (
                            <BoldText title={'₦' + formatMoney(product.unitPrice)} size={16} color={theme.neutral[300]} />
                        )}
                    </View>
                </View>
                <View style={{flex: 3, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Pressable onPress={onEditPress}>
                        <EditIcon />
                    </Pressable>
                    <Pressable onPress={onDeletePress}>
                        <DeleteIcon />
                    </Pressable>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    listItem: {
        paddingVertical: scale(10),
        paddingHorizontal: scale(15),
        borderRadius: scale(8),
        minHeight: scale(54),
        marginVertical: scale(10),
        justifyContent: "center",

    },
    content: {
        flex: 1,
        flexDirection: 'row',
        // paddingLeft: scale(15),
        // alignItems: 'center',
    },
    img: {
        height: scale(73),
        width: "100%",
        borderRadius: scale(5),
        borderWidth: scale(1),
    }
})

export default ProductItem
