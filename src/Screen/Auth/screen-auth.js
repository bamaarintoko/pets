import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, TouchableWithoutFeedback, StyleSheet} from "react-native";
import {Button, Container, Content, Input, Item, Text} from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome';
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
import Snackbar from 'react-native-snackbar';
import Spinner from 'react-native-spinkit';
import Modal from 'react-native-modalbox';
import {actLogin, actLoginFacebook} from "./action";
import md5 from 'crypto-js/md5';

class ScreenAuth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_email: "",
            user_password: "",
            initialRedAuth: true,
            isAuthLoading:false
        }
    }

    onRegisterClick = () => {
        return () => {
            this.props.navigation.navigate('Register')
        }
    }
    onForgotClick =()=>{
        return ()=>{
            this.props.navigation.navigate('ForgetPassword')
        }
    }

    onLoginFacebookClick = () => {
        return () => {
            FBLoginManager.loginWithPermissions(["email"], (error, data) => {
                if (!error) {
                    let profil = JSON.parse(data.profile)
                    let data_ = {name: profil.name, photo: "https://graph.facebook.com/"+profil.id+"/picture?type=large"}
                    let params = {
                        par_user_email: profil.email,
                        par_user_name: profil.name,
                        par_user_id: profil.id,
                        par_user_photo: profil.picture.data.url
                    }
                    this.props.dispatch(actLoginFacebook(params, data_));

                } else {
                    console.log("Error: ", data);
                }
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.initialRedAuth === this.props.redAuth.status) {
            if (this.props.redAuth.status_get) {
                this.props.dispatch({type: 'RESET'})
            } else {
                Snackbar.show({
                    title: this.props.redAuth.message,
                    duration: Snackbar.LENGTH_LONG,
                });
                this.setState({
                    isAuthLoading:false
                })
                this.props.dispatch({type: 'LOGIN_RESET'})
            }
        }
    }

    onChangeText = (key) => {
        return (e) => {
            let state = {}
            state[key] = e
            this.setState(state);
        }
    }
    onLogin = () => {
        return () => {
            if (this.state.user_password !=="" && this.state.user_email!==""){
                let params = {
                    par_user_password: md5(this.state.user_password).toString(),
                    par_user_email: this.state.user_email
                }
                this.setState({
                    isAuthLoading:true
                })
                this.props.dispatch(actLogin(params))
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
                        <Spinner type={'ChasingDots'} color={"#FFF"}/>
                        <Text>Please wait</Text>
                    </View>
                </Modal>
                <Content style={{padding: 20}}>
                    <View>
                        <Text style={{fontWeight: 'bold', fontSize: 30, color: '#013976'}}>Log In</Text>
                    </View>
                    <View style={{marginTop: 120}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{width: '80%'}}>
                                <Item style={{
                                    backgroundColor: '#FFF',
                                    borderColor: '#013976',
                                    borderWidth: 2,
                                    height: 40
                                }}>
                                    <View style={{width: 30, justifyContent: 'center', alignItems: 'center'}}>
                                        <Icon active name='envelope' size={20}/>
                                    </View>
                                    <Input onChangeText={this.onChangeText('user_email')}
                                           style={{fontSize: 12, color: '#013976'}} autoCapitalize={"none"}
                                           keyboardType={'email-address'} placeholder='email'/>
                                </Item>
                                <Item style={{
                                    backgroundColor: '#FFF',
                                    borderColor: '#FFF',
                                    borderWidth: 2,
                                    height: 40
                                }}>
                                    <View style={{width: 30, justifyContent: 'center', alignItems: 'center'}}>
                                        <Icon active name='lock' size={20}/>
                                    </View>
                                    <Input onChangeText={this.onChangeText('user_password')}
                                           style={{fontSize: 12, color: '#013976'}} autoCapitalize={"none"}
                                           secureTextEntry={true} placeholder='password'/>
                                </Item>
                            </View>
                            <View style={{width: '20%'}}>
                                <Button transparent full onPress={this.onLogin()}>
                                    <Icon active name='sign-in' size={40} color={'#013976'}/>
                                </Button>
                            </View>
                        </View>
                        <View style={styles.separatorContainer}>
                            <View style={styles.separatorLine}/>
                            <Text style={styles.separatorOr}>Or Login With</Text>
                            <View style={styles.separatorLine}/>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 10, alignItems: 'center', width: '100%'}}>
                            <Button full info style={{width: '100%', backgroundColor: '#3B5998'}}
                                    onPress={this.onLoginFacebookClick()}>
                                <Icon name="facebook" size={20} color={'#FFF'}/>
                            </Button>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
                            <View
                                style={{flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{color: '#013976', fontSize: 12}}>First time here?</Text>
                                <TouchableWithoutFeedback onPress={this.onRegisterClick()}>
                                    <Text style={{color: '#013976', fontWeight: 'bold', fontSize: 14}}> Sign up</Text>
                                </TouchableWithoutFeedback>
                            </View>
                            <View style={{flex: 1}}>
                                <TouchableWithoutFeedback onPress={this.onForgotClick()}>
                                    <Text style={{
                                        color: '#013976',
                                        fontWeight: 'bold',
                                        fontSize: 14,
                                        alignSelf: 'flex-end'
                                    }}> Forgot password</Text>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}

let styles = {
    wrapper: {},
    separatorContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 8
    },
    separatorLine: {
        flex: 1,
        borderWidth: StyleSheet.hairlineWidth,
        height: StyleSheet.hairlineWidth,
        borderColor: '#FFFFFF'
    },
    separatorOr: {
        color: '#FFFFFF',
        marginHorizontal: 8,
        fontSize: 12
    },
};

function mapStateToProps(state) {
    return {
        redAuth: state.redAuth
    };
}

export default connect(
    mapStateToProps,
)(ScreenAuth);
