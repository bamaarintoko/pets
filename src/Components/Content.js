import React from 'react';
import {
    View,
} from 'react-native';
import Placeholder from 'rn-placeholder';
import {Text} from "native-base";
import TimeAgo from 'react-native-timeago';
import moment from "moment/moment";

export const Ph = () => {
    return (
        <View
            style={{marginRight: 5, marginTop:15}}>
            <View style={{marginLeft: 15, marginTop: 10}}>
                <Placeholder.Box
                    animate="fade"
                    height={90}
                    width={'100%'}
                    radius={5}
                    color="#BDBDBD"
                />
            </View>
            <View style={{
                left: 5,
                position: 'absolute',
                backgroundColor: '#FFF',
                borderColor: '#FFF',
                borderRadius: 50,
                borderWidth: 3
            }}>
                <Placeholder.Box
                    animate="fade"
                    height={70}
                    width={70}
                    radius={50}
                    color="#BDBDBD"
                />
            </View>
        </View>
    )
}

export const Reserve = ({title, status, cd, ed}) => {
    // console.log(ed)
    return (
        <View style={{marginBottom: 10}}>
            <View style={{height: 15, alignItems: 'flex-end'}}>
                <TimeAgo style={{fontSize: 12}} time={cd}/>
            </View>
            <View style={{backgroundColor: '#EEEEEE', minHeight: 40, borderRadius: 5, padding: 5}}>
                <View style={{minHeight: 40}}>
                    <Text style={{fontSize: 12}}>{title}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={{alignItems: 'flex-start', height: 15, flex: 1}}>
                        <Text style={{fontSize: 12}}>Status : {status}</Text>
                    </View>
                    <View style={{height: 15, alignItems: 'flex-end', flex: 1}}>
                        <Text style={{fontSize: 12}}>End donation : {moment(ed).format('LL')}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export const Rph = () => {
    return (
        <View style={{marginLeft: 10, marginTop: 20, marginRight:10}}>
            <Placeholder.Box
                animate="fade"
                height={50}
                width={'100%'}
                radius={5}
                color="#BDBDBD"
            />
        </View>
    )
}