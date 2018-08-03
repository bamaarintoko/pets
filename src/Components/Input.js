import {View, TouchableWithoutFeedback} from "react-native";
import {Input, Item, Text, Textarea} from "native-base";
import React from 'react';

export const InputText = ({label, onBlur, value, onChangeText, isError, isPin}) => {
    let isPass = typeof isPin === 'undefined' ? false : isPin === true
        // console.log("-->", isPass)
    return (
        <View style={{marginBottom: 10}}>
            <Text style={{fontSize: 12}}>{label}</Text>
            <Item regular style={{width: '100%', height: 40}}
                  error={typeof isError === 'undefined' ? false : !!isError.error}>
                <Input secureTextEntry={isPass} onBlur={onBlur} style={{fontSize: 14}} value={value} onChangeText={onChangeText}/>
            </Item>
        </View>
    )

}
export const InputTextArea = ({label, onBlur, value, onChangeText, isError}) => {
    let error = typeof isError === 'undefined' ? false : !!isError.error
    // console.log("InputTextArea", error)
    return (
        <View style={{marginTop: 5}}>
            <Text style={{fontSize: 12}}>{label}</Text>
            <Textarea
                style={{borderColor: error ? 'red' : '#E0E0E0'}}
                onBlur={onBlur}
                value={value}
                onChangeText={onChangeText}
                rowSpan={5} bordered/>
        </View>
    )
}
export const InputSelect = ({label, onClick, value, isError}) => {
    return (
        <TouchableWithoutFeedback onPress={onClick}>
            <View style={{marginBottom: 10}}>
                <Text style={{fontSize: 12}}>{label}</Text>
                <View style={{
                    width: '100%',
                    height: 40,
                    borderColor: isError ? 'red' : '#E0E0E0',
                    borderWidth: 1,
                    borderStyle: 'solid',
                    justifyContent: 'center',
                    paddingLeft: 5
                }}>
                    <Text style={{fontSize: 14}}>{value}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )

}

export const InputDate = ({label, onClick, value, isError}) => {
    return (
        <TouchableWithoutFeedback onPress={onClick}>
            <View style={{marginBottom: 10}}>
                <Text style={{fontSize: 12}}>{label}</Text>
                <View style={{
                    width: '100%',
                    height: 40,
                    borderColor: isError ? 'red' : '#E0E0E0',
                    borderWidth: 1,
                    borderStyle: 'solid',
                    justifyContent: 'center',
                    paddingLeft: 5
                }}>
                    <Text style={{fontSize: 14}}>{value}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}