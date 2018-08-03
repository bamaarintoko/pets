import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Platform,
    StyleSheet,
    Text,
    View, FlatList, StatusBar, Dimensions, Image
} from 'react-native';
import {Thumbnail} from "native-base";
import TimeAgo from 'react-native-timeago';
import moment from "moment/moment";

export const Donate = ({uri, name, create_date, reserve_title, reserve_description, reserve_end_date}) => {
    return (
        <View style={{minHeight: 100, marginTop: 15}}>

            <View style={{
                minHeight: 90,
                borderRadius: 5,
                paddingBottom: 20,
                backgroundColor: '#FAFAFA', marginRight: 10, marginLeft: 15, marginTop: 10
            }}>
                <View style={{position: 'absolute', right: 5}}>
                    <TimeAgo style={{fontSize: 12}} time={create_date}/>
                </View>
                <View style={{position: 'absolute', right: 5, bottom: 2}}>
                    <Text style={{fontSize: 12}}>End donation : {moment(reserve_end_date).format('LL')}</Text>
                </View>
                <View style={{marginLeft: 75, marginTop: 1, padding:5}}>
                    <View style={{width:'60%'}}>
                        <Text style={{fontSize: 12, color: 'black'}}>{name}</Text>
                    </View>
                    <Text style={{
                        fontSize: 12,
                        color: '#424242'
                    }}>{reserve_title.length > 30 ? reserve_title.slice(0, 33) + "..." : reserve_title}</Text>
                    <Text style={{
                        fontSize: 12,
                        color: '#424242',
                        marginTop: 4
                    }}>{reserve_description.length > 350 ? reserve_description.slice(0, 350) + "..." : reserve_description}</Text>
                </View>

            </View>
            <View style={{
                overflow: 'hidden',
                left: 5,
                borderWidth: 3,
                borderColor: '#FFF',
                borderRadius: 50,
                position: 'absolute',
                backgroundColor: '#FFF'
            }}>

                <Thumbnail style={{width: 70, height: 70}} large source={{uri: uri}}/>
            </View>
        </View>
    )
}