import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Container, Content, Text} from "native-base";
import {StatusBar, View} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import {InputText} from "../../Components/Input";
import md5 from 'crypto-js/md5';
import sha256 from 'crypto-js/sha256';
import Snackbar from 'react-native-snackbar';
import Api from "../../Utils/Api";

class ScreenChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            old_password: '',
            new_password: '',
            re_password: ''
        }
    }

    onChangeText = (key) => {
        return (e) => {
            let state = {}

            state[key] = e
            this.setState(state)
        }
    }

    componentDidMount() {
        console.log(this.props.redAuth)
    }

    onSave = () => {
        return () => {
            if (sha256(md5(this.state.old_password).toString()).toString() !== this.props.redAuth.data.profile.user_password || this.state.old_password.length === 0) {
                Snackbar.show({
                    title: 'Check your old password',
                    duration: Snackbar.LENGTH_LONG,
                });
            } else if (sha256(md5(this.state.new_password).toString()).toString() !== sha256(md5(this.state.re_password).toString()).toString() || this.state.re_password.length === 0 || this.state.new_password.length === 0) {
                Snackbar.show({
                    title: 'Password not match',
                    duration: Snackbar.LENGTH_LONG,
                });
            } else {
                let params = {
                    par_user_id: this.props.redAuth.data.profile.user_id,
                    par_old_password: md5(this.state.old_password).toString(),
                    par_new_password: md5(this.state.new_password).toString()
                }
                Api._POST('auth/change_password', params)
                    .then((response) => {
                        this.setState({
                            old_password: '',
                            new_password: '',
                            re_password: ''
                        })
                        Snackbar.show({
                            title: response.data.message,
                            duration: Snackbar.LENGTH_LONG,
                        });
                        console.log(response)
                    }).catch((err) => {
                    this.setState({
                        old_password: '',
                        new_password: '',
                        re_password: ''
                    })
                    Snackbar.show({
                        title: err.message,
                        duration: Snackbar.LENGTH_LONG,
                    });
                    console.log(err)
                })
                console.log(params)
            }
            console.log(sha256(md5(this.state.old_password).toString()).toString())
        }
    }

    render() {
        return (
            <Container style={{backgroundColor: '#FFF'}}>
                <StatusBar backgroundColor="#013976"/>
                <View style={{
                    flexDirection: 'row',
                    height: 50,
                    backgroundColor: '#FFF',
                    borderBottomColor: '#BDBDBD',
                    borderBottomWidth: 1
                }}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Button full transparent light onPress={() => this.props.navigation.goBack()}>
                            <Icon color={'#000000'} size={20}
                                  name="arrow-left"/>
                        </Button>
                    </View>
                    <View style={{flex: 4, justifyContent: 'center', alignItems: 'center'}}>

                    </View>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    </View>
                </View>
                <Content style={{backgroundColor: '#FFF'}}>
                    <View style={{margin: 10}}>
                        {
                            this.props.redAuth.data.profile.user_password !== ""

                            &&
                            <InputText
                                isPin={true}
                                value={this.state.old_password}
                                onChangeText={this.onChangeText('old_password')}
                                label={"Old Password"}/>
                        }

                        <InputText
                            isPin={true}
                            value={this.state.new_password}
                            onChangeText={this.onChangeText('new_password')}
                            label={"New Password"}/>
                        <InputText
                            isPin={true}
                            value={this.state.re_password}
                            onChangeText={this.onChangeText('re_password')}
                            label={"New Password, Again"}/>
                    </View>
                </Content>
                <View style={{
                    margin: 10,
                    backgroundColor: '#FFF'
                }}>
                    <Button style={{borderColor: '#013976'}} full bordered onPress={this.onSave()}>
                        <Text style={{color: '#013976'}}>Save</Text>
                    </Button>
                </View>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        redAuth: state.redAuth
    };
}

export default connect(
    mapStateToProps,
)(ScreenChangePassword);
