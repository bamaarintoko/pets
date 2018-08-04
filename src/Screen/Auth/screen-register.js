import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Container, Content, Input, Item, Text, View} from "native-base";
import {Dimensions, Image} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import {actRegister} from "./action";
import Snackbar from 'react-native-snackbar';
import Spinner from 'react-native-spinkit';
import Modal from 'react-native-modalbox';
import md5 from 'crypto-js/md5';

const errors = {};
let width_ = Dimensions.get('window').width;
let height = Dimensions.get('window').height-25;

class ScreenRegister extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        console.log(Math.round(height))
        return (
            <Container style={{backgroundColor: '#FFF'}}>
                <Content contentContainerStyle={{minHeight:height}}>
                    <View style={{height:200, position: 'absolute', bottom:0}}>
                        <Image
                            style={{width: width_, height: 200}}
                            source={require('../../../Assets/adopt.png')}
                        />
                    </View>
                </Content>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
)(ScreenRegister);
