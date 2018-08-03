import React  from 'react';
import {
    Text,
    View, TouchableWithoutFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
export const Category = ({book_name,onCheck,isCheck}) => {
    console.log(isCheck)
    return (
        <TouchableWithoutFeedback onPress={onCheck}>
            <View style={{
                paddingTop: 10,
                height: 40,
                paddingBottom: 10,
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <View style={{width: '90%'}}>
                    <Text>{book_name} {isCheck ? 'check bro' : 'ora check'}</Text>
                </View>
                <View>
                    <Icon color={'#E0E0E0'} size={20}
                          name="square-o"/>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}