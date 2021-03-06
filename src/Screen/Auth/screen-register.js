import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Container, Content, Input, Item, Text, View, Thumbnail, Label, Form} from "native-base";
import {Dimensions, Image} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import {actRegister} from "./action";
import Snackbar from 'react-native-snackbar';
import Spinner from 'react-native-spinkit';
import Modal from 'react-native-modalbox';
import md5 from 'crypto-js/md5';
import {normalizeFont} from "../../Utils/func";

const errors = {};
let width_ = Dimensions.get('window').width;
let height = Dimensions.get('window').height - 25;

class ScreenRegister extends Component {
    constructor(props) {
        super(props);
    }

    onBack = ()=>{
        return ()=>{
            this.props.navigation.goBack()
        }
    }
    render() {
        console.log(Math.round(height))
        return (
            <Container style={{backgroundColor: '#FFF'}}>
                <View style={{height:60, backgroundColor:'#FFF',flexDirection:'row'}}>
                    <View style={{flex: 1}}>
                        <Button full transparent style={{height:60}} onPress={this.onBack()}>
                            <Icon active name='arrow-left' size={normalizeFont(4)} color={'#000'}/>
                        </Button>
                    </View>
                    <View style={{flex: 4, backgroundColor:'#FFF'}}>

                    </View>
                    <View style={{flex: 1}}>
                        <Button full transparent style={{height:60}}>
                            <Icon active name='check' size={normalizeFont(4)} color={'#000'}/>
                        </Button>
                    </View>
                </View>
                <Content contentContainerStyle={{minHeight: height-60}}>
                    <View style={{marginLeft:20}}>
                        <Text style={{fontSize:34, fontWeight: 'bold'}}>
                            New Account
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center',margin: 20}}>
                        <View style={{
                            height: 85,
                            width: 85,
                            backgroundColor: '#424242',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 50
                        }}>
                            <Thumbnail large
                                       source={{uri: 'https://us.123rf.com/450wm/rastudio/rastudio1702/rastudio170203078/72137532-c%C3%A1mara-de-vectores-icono-de-boceto-aislado-en-el-fondo-dibujado-a-mano-icono-de-la-c%C3%A1mara-dibujo-icono-d.jpg?ver=6'}}/>
                        </View>
                        <View style={{marginLeft: 10}}>
                            <Text>
                                Upload a profil picture (optional)
                            </Text>
                        </View>
                    </View>
                    <View>
                        <Form style={{marginRight:20, marginLeft:10}}>
                            <Item stackedLabel style={{height:40}}>
                                <Label>Email</Label>
                                <Input />
                            </Item>
                            <Item stackedLabel style={{height:40}}>
                                <Label>Name</Label>
                                <Input />
                            </Item>
                            <Item stackedLabel style={{height:40}}>
                                <Label>Password</Label>
                                <Input />
                            </Item>
                            <Item stackedLabel style={{height:40}}>
                                <Label>Confirm Password</Label>
                                <Input />
                            </Item>
                            <Button block info style={{marginLeft:10,marginTop:10}}>
                                <Text>Register</Text>
                            </Button>
                        </Form>
                    </View>
                    <View style={{height: 200, position: 'absolute', bottom: 0}}>
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
