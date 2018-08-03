import React, { Component } from 'react';
import { View, Text, Thumbnail } from "native-base";
import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
    },

    TrapezoidStyle: {

        width: '100%',
        height: 0,
        borderBottomColor: "#FB8C00",
        borderTopWidth: 50,
        borderTopColor: '#FB8C00',
        borderLeftWidth: 300,
        borderRightWidth: 0,
        borderRightColor: 'transparent',
        borderLeftColor: 'transparent',
    },
    TrapezoidStyle_: {

        width: '100%',
        height: 0,
        borderBottomColor: "#FFA726",
        borderTopWidth: 50,
        borderTopColor: '#FFA726',
        borderLeftWidth: 0,
        position:'absolute',
        borderRightWidth: 300,
        borderRightColor: 'transparent',
        borderLeftColor: 'transparent',
    },
    dd: {

        width: '100%',
        height: 120,
        backgroundColor: '#FB8C00'
    }
})
export const DrawerContent = () => {
    return (
        <View style={styles.MainContainer}>

            <View style={styles.dd} />
            <View style={styles.TrapezoidStyle} />
            <View style={styles.TrapezoidStyle_} />
            <View style={{position:'absolute', top:40, left:10}}>
                <Thumbnail large source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_vja0DlupN1SvfONjHucwohNYvoNqKS-KewxhW2BfD4nkcB_XXA' }} />
                <Text>Maybelle	Cardenas</Text>
            </View>
        </View>
    )
}