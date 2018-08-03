import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Container, Content, Input, Item, Text} from "native-base";
import {View} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import Snackbar from 'react-native-snackbar';
import Spinner from 'react-native-spinkit';
import Modal from 'react-native-modalbox';
import Api from "../../Utils/Api";

class ScreenForgetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_email: '',
            isAuthLoading: false
        }
    }

    onChangeText = (key) => {
        return (e) => {
            let state = {}
            state[key] = e
            this.setState(state);
        }
    }
    onSendPress = () => {
        return () => {
            this.setState({
                isAuthLoading: true
            })
            if (this.state.user_email.length > 0) {

                let params = {
                    par_user_email: this.state.user_email
                }
                Api._POST('auth/forget_password', params)
                    .then((response) => {
                        this.setState({
                            isAuthLoading: false,
                            user_email:''
                        })
                        Snackbar.show({
                            title: response.data.message,
                            duration: Snackbar.LENGTH_LONG,
                        });
                    }).catch((err) => {
                    this.setState({
                        isAuthLoading: false
                    })
                    Snackbar.show({
                        title: err.message,
                        duration: Snackbar.LENGTH_LONG,
                    });
                })
            }
        }
    }

    render() {
        return (
            <Container style={{backgroundColor: '#FFF'}}>
                <View style={{height: 50, paddingLeft: 20, justifyContent: 'center'}}>
                    <Button transparent light style={{width: 50}} onPress={() => this.props.navigation.goBack()}>
                        <Icon name="arrow-left" size={20} color={'#013976'}/>
                    </Button>
                </View>
                <Modal position={"center"}
                       style={{width: 300, height: 100, justifyContent: 'center', alignItems: 'center'}}
                       swipeToClose={false}
                       isOpen={this.state.isAuthLoading}
                       backdropPressToClose={false}>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Spinner type={'ChasingDots'} color={"#013976"}/>
                        <Text>Please wait</Text>
                    </View>
                </Modal>
                <Content style={{padding: 20}}>
                    <View>
                        <Text style={{fontWeight: 'bold', fontSize: 30, color: '#013976'}}>Recovery Password</Text>
                    </View>
                    <View style={{marginTop: 120}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{width: '100%'}}>
                                <Item style={{
                                    backgroundColor: '#FFF',
                                    borderColor: '#013976',
                                    borderWidth: 2,
                                    height: 40
                                }}>
                                    <View style={{width: 30, justifyContent: 'center', alignItems: 'center'}}>
                                        <Icon active name='envelope' size={20}/>
                                    </View>
                                    <Input value={this.state.user_email} onChangeText={this.onChangeText('user_email')}
                                           style={{fontSize: 12, color: '#013976'}} autoCapitalize={"none"}
                                           keyboardType={'email-address'} placeholder='email'/>
                                </Item>
                            </View>
                        </View>
                        <Button onPress={this.onSendPress()} full bordered style={{
                            marginTop: 30,
                            backgroundColor: '#013976',
                            borderColor: '#FFF',
                            borderWidth: 2
                        }}>
                            <Text style={{color: '#FFF'}}>Send Email</Text>
                        </Button>
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
)(ScreenForgetPassword);
