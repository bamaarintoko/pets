import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Container, Content, Input, Item, Text, View} from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome';
import {actRegister} from "./action";
import Snackbar from 'react-native-snackbar';
import Spinner from 'react-native-spinkit';
import Modal from 'react-native-modalbox';
import md5 from 'crypto-js/md5';
const errors = {};

class ScreenRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value_name: '',
            value_email: '',
            value_password: '',
            confirm_password: '',
            input_error: [],
            initialRedRegister: true,
            showRegisterModal:false
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.initialRedRegister === this.props.redRegister.status) {
            if (this.props.redRegister.status_add){
                this.setState({
                    showRegisterModal:false
                })
                Snackbar.show({
                    title: 'Register success',
                    duration: Snackbar.LENGTH_LONG,
                });
                let data_ = {name:this.props.redRegister.data.user_name,photo: this.props.redRegister.data.user_photo}
                this.props.dispatch({
                    type: 'LOGIN',
                    status_get: true,
                    data: {data:data_,profile: this.props.redRegister.data},
                    message: "-"
                })
                this.props.dispatch({type: 'RESET'})
            } else {
                this.setState({
                    showRegisterModal:false
                })
                Snackbar.show({
                    title: "Error message :"+this.props.redRegister.message,
                    duration: Snackbar.LENGTH_LONG,
                });
            }

            this.props.dispatch({
                type: 'REGISTER_RESET'
            })

        }
    }


    onChangeText = (key) => {
        return (e) => {
            let state = {};
            state[key] = e;
            this.setState(state);
        }
    }
    onValidate = (key) => {
        return (e) => {
            if (this.state[key].length < 1) {
                errors[key] = {error: true, error_message: 'required'}
            } else {
                errors[key] = false
            }

            if (this.state.value_password !== this.state.confirm_password) {
                errors['confirm_password'] = {error: true, error_message: 'required'}
            } else {
                errors['confirm_password'] = false
            }
            this.setState({input_error: errors})
        }
    }
    onRegister = () => {
        return () => {
            let count_errors = [];
            if (this.state.value_name.length < 1) {
                errors['value_name'] = {error: true, error_message: 'required'}
                count_errors.push({value_name: true})
            }
            if (this.state.value_email.length < 1) {
                errors['value_email'] = {error: true, error_message: 'required'}
                count_errors.push({value_email: true})
            }
            if (this.state.value_password.length < 1) {
                errors['value_password'] = {error: true, error_message: 'required'}
                count_errors.push({value_password: true})
            }
            if (this.state.confirm_password.length < 1) {
                errors['confirm_password'] = {error: true, error_message: 'required'}
                count_errors.push({confirm_password: true})
            }
            if (this.state.confirm_password !== this.state.value_password || this.state.confirm_password.length < 1) {
                errors['confirm_password'] = {error: true, error_message: 'required'}
                count_errors.push({confirm_password: true})
            }
            if (count_errors.length < 1) {
                let params = {
                    par_user_name: this.state.value_name,
                    par_user_email: this.state.value_email,
                    par_user_password: md5(this.state.confirm_password).toString()
                }
                this.props.dispatch(actRegister(params))

                this.setState({
                    input_error: errors,
                    showRegisterModal:true
                })
            } else {
                this.setState({
                    input_error: errors,
                })
            }
        }
    }

    render() {
        let cek_n = typeof this.state.input_error.value_name === 'undefined' ? false : this.state.input_error.value_name.error;
        let cek_e = typeof this.state.input_error.value_email === 'undefined' ? false : this.state.input_error.value_email.error;
        let cek_p = typeof this.state.input_error.value_password === 'undefined' ? false : this.state.input_error.value_password.error;
        let cek_c = typeof this.state.input_error.confirm_password === 'undefined' ? false : this.state.input_error.confirm_password.error;
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
                       isOpen={this.state.showRegisterModal}
                       backdropPressToClose={false}>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Spinner type={'ChasingDots'} color={"#013976"}/>
                        <Text>Please wait</Text>
                    </View>
                </Modal>
                <Content style={{padding: 20}}>
                    <View>
                        <Text style={{fontWeight: 'bold', fontSize: 30, color: '#013976'}}>Create Account</Text>
                    </View>
                    <View style={{marginTop: 80, alignItems: 'center'}}>
                        <Item error={true} style={{backgroundColor: '#FFF', borderColor: '#013976', borderWidth: 2}}>
                            <View style={{width: 30, justifyContent: 'center', alignItems: 'center'}}>
                                <Icon active name='user' size={20} color={'#013976'}/>
                            </View>
                            <Input
                                style={{fontSize: 14, color: '#013976'}}
                                value={this.state.value_name}
                                onBlur={this.onValidate('value_name')}
                                onChangeText={this.onChangeText('value_name')}
                                placeholder='name'/>
                            {
                                cek_n
                                &&
                                <View style={{width: 30, justifyContent: 'center', alignItems: 'center'}}>
                                    <Icon active name='exclamation-circle' size={20} color={'#FF3D00'}/>
                                </View>
                            }
                        </Item>
                        <Item style={{backgroundColor: '#FFF', borderColor: '#013976', borderWidth: 2}}>
                            <View style={{width: 30, justifyContent: 'center', alignItems: 'center'}}>
                                <Icon active name='envelope' size={20} color={'#013976'}/>
                            </View>
                            <Input autoCapitalize={"none"} keyboardType={'email-address'}
                                   style={{fontSize: 14, color: '#013976'}}
                                   value={this.state.value_email}
                                   onBlur={this.onValidate('value_email')}
                                   onChangeText={this.onChangeText('value_email')}
                                   placeholder='email'/>
                            {
                                cek_e
                                &&
                                <View style={{width: 30, justifyContent: 'center', alignItems: 'center'}}>
                                    <Icon active name='exclamation-circle' size={20} color={'#FF3D00'}/>
                                </View>
                            }
                        </Item>
                        <Item style={{backgroundColor: '#FFF', borderColor: '#013976', borderWidth: 2}}>
                            <View style={{width: 30, justifyContent: 'center', alignItems: 'center'}}>
                                <Icon active name='lock' size={20} color={'#013976'}/>
                            </View>
                            <Input
                                autoCapitalize={"none"} secureTextEntry={true}
                                style={{fontSize: 14, color: '#013976'}}
                                value={this.state.value_password}
                                onBlur={this.onValidate('value_password')}
                                onChangeText={this.onChangeText('value_password')}
                                placeholder='password'/>

                            {
                                cek_p
                                &&
                                <View style={{width: 30, justifyContent: 'center', alignItems: 'center'}}>
                                    <Icon active name='exclamation-circle' size={20} color={'#FF3D00'}/>
                                </View>
                            }
                        </Item>
                        <Item style={{backgroundColor: '#FFF', borderColor: '#013976', borderWidth: 2}}>
                            <View style={{width: 30, justifyContent: 'center', alignItems: 'center'}}>
                                <Icon active name='lock' size={20} color={'#013976'}/>
                            </View>
                            <Input
                                autoCapitalize={"none"} secureTextEntry={true}
                                style={{fontSize: 14, color: '#013976'}}
                                value={this.state.confirm_password}
                                onBlur={this.onValidate('confirm_password')}
                                onChangeText={this.onChangeText('confirm_password')}
                                placeholder='confirm password'/>
                            {
                                cek_c
                                &&
                                <View style={{width: 30, justifyContent: 'center', alignItems: 'center'}}>
                                    <Icon active name='exclamation-circle' size={20} color={'#FF3D00'}/>
                                </View>
                            }
                        </Item>
                        <Button onPress={this.onRegister()} full bordered style={{
                            marginTop: 30,
                            backgroundColor: '#013976',
                            borderColor: '#FFF',
                            borderWidth: 2
                        }}>
                            <Text style={{color: '#FFF'}}>Register</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        redRegister: state.redRegister
    };
}

export default connect(
    mapStateToProps,
)(ScreenRegister);
