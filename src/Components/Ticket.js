import React, { Component } from 'react';
import { Image } from 'react-native'
import { View, Text, Container, Content } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
export const Ticket = ({ data, image, bg_color, sec_color }) => {
    return (
        <View style={{ height: 120, backgroundColor: '#FFF' }}>

            <View style={{ flexDirection: 'row', backgroundColor: bg_color, height: 100, marginLeft: 10, marginTop: 10, marginRight: 10, borderStyle: 'dashed' }}>
                <View style={{ height: '100%', width: '75%', borderRightWidth: 1, borderRightColor: '#FFF' }}>
                    <View style={{ height: '80%', backgroundColor: sec_color, padding: 4, margin: 10, borderWidth: 2, borderColor: '#FFF', borderRadius: 5 }}>
                        <Text style={{ fontSize: 12 }}>{data.title}</Text>
                        <Text style={{ fontSize: 12 }}>{data.date}</Text>
                        <Text style={{ fontSize: 12 }}>{data.time}</Text>
                    </View>
                </View>
                <View style={{
                    height: '100%', width: '25%', backgroundColor: '#B3E5FC', justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Image
                        style={{ width: '100%', height: '100%' }}
                        source={{ uri: image }}
                    />
                </View>

            </View>
            <View style={{ top: 0, right: '24%', backgroundColor: '#fff', width: 15, height: 15, borderRadius: 20, position: 'absolute' }}>

            </View>
            <View style={{ bottom: 0, right: '24%', backgroundColor: '#fff', width: 15, height: 15, borderRadius: 20, position: 'absolute' }}>

            </View>
            <View style={{ top: 3, left: 3, backgroundColor: '#FFF', width: 15, height: 15, borderRadius: 20, position: 'absolute' }}>

            </View>
            <View style={{ left: 3, bottom: 3, backgroundColor: '#FFF', width: 15, height: 15, borderRadius: 20, position: 'absolute' }}>

            </View>
            <View style={{ right: 3, top: 3, backgroundColor: '#FFF', width: 15, height: 15, borderRadius: 20, position: 'absolute' }}>

            </View>
            <View style={{ right: 3, bottom: 3, backgroundColor: '#FFF', width: 15, height: 15, borderRadius: 20, position: 'absolute' }}>

            </View>
        </View>
    )
}