import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Thumbnail, Text, Container, Content, Button} from 'native-base';
import {FlatList, Image, ImageStore, StatusBar, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Reserve, Rph} from "../../Components/Content";
import {actGetListReserve} from "./action";
import {sqlToJsISO} from "../../Utils/func";
import ImagePicker from "react-native-image-picker";
import ImageResizer from 'react-native-image-resizer'
import {host} from "../../Utils/Api";
import axios from "axios/index";

let options = {
    title: 'Select Image',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

function mapStateToProps(state) {
    return {
        redAuth: state.redAuth,
        redGetListReserveUser: state.redGetListReserveUser,
        redAddReserve: state.redAddReserve,
        redUpdateReserve: state.redUpdateReserve,
    };
}

const styles = StyleSheet.create({

    TrapezoidStyle: {

        width: '100%',
        height: 0,
        borderBottomColor: "#1565C0",
        borderTopWidth: 50,
        borderTopColor: '#1565C0',
        borderLeftWidth: 400,
        borderRightWidth: 0,
        borderRightColor: 'transparent',
        borderLeftColor: 'transparent',
    },
    TrapezoidStyle_: {

        width: '100%',
        height: 0,
        borderBottomColor: "#013976",
        borderTopWidth: 50,
        borderTopColor: '#013976',
        borderLeftWidth: 0,
        position: 'absolute',
        borderRightWidth: 400,
        borderRightColor: 'transparent',
        borderLeftColor: 'transparent',
    },
    dd: {

        width: '100%',
        height: 120,
        backgroundColor: '#1565C0'
    }
})

class ScreenProfile extends Component {
    static navigationOptions = {
        header: null,
        tabBarIcon: ({tintColor}) => {
            return <Icon name="book" size={20} color={tintColor}/>;
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            name: '',
            image: '',
            initialRedGetListReserveUser: true,
            initialRedUpdateReserve: true,
            initialRedAddReserve: true,
            data: [],
            isRefresh: false,
            isLoading: true,
            image_save: ''
        }
    }

    onLoginClick = () => {
        return () => {
            this.props.navigation.navigate('Auth')
        }
    }
    onLogOutClick = () => {
        return () => {
            this.props.dispatch({type: 'LOGOUT'})
            this.props.dispatch({type: 'RESET'})
        }
    }
    onCreareReserveClick = () => {
        return () => {
            this.props.navigation.navigate('CreateReserve')

        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.initialRedUpdateReserve === this.props.redUpdateReserve.status) {
            let params = {
                par_user_id: this.props.redAuth.data.profile.user_id
            }
            this.props.dispatch(actGetListReserve(params));
            // this.props.dispatch({type:"UPDATE_RESET"})
        }
        if (prevState.initialRedAddReserve === this.props.redAddReserve.status) {
            if (this.props.redAuth.status_get) {
                let params = {
                    par_user_id: this.props.redAuth.data.profile.user_id
                }
                this.props.dispatch(actGetListReserve(params));
            }
        }
        if (prevState.initialRedGetListReserveUser === this.props.redGetListReserveUser.status) {
            if (this.props.redGetListReserveUser.status) {
                this.setState({
                    data: this.props.redGetListReserveUser.data,
                    isRefresh: false,
                    isLoading: false
                })
            } else {
                this.setState({
                    data: [],
                    isRefresh: false,
                    isLoading: false
                })
            }

            this.props.dispatch({type: 'RESET_RESERVE_USER'})
        }
    }

    componentDidMount() {
        if (this.props.redAuth.status_get) {
            let params = {
                par_user_id: this.props.redAuth.data.profile.user_id
            }
            this.props.dispatch(actGetListReserve(params));
        }
        if (this.props.redAuth.status_get) {
            this.setState({
                isLogin: true,
                name: this.props.redAuth.data.data.name,
                image: this.props.redAuth.data.data.photo
            })
        } else {
            this.setState({
                isLogin: false
            })
        }
    }

    onRefresh = () => {
        return () => {
            let params = {
                par_user_id: this.props.redAuth.data.profile.user_id
            }
            this.props.dispatch(actGetListReserve(params));
            this.setState({
                isRefresh: true
            })
        }
    }
    onPickImage = (key, val) => {
        return () => {
            ImagePicker.showImagePicker(options, (response) => {

                if (response.didCancel) {
                }
                else if (response.error) {
                }
                else if (response.customButton) {
                }
                else {
                    ImageResizer.createResizedImage('data:image/png;base64,' + response.data, 500, 500, 'JPEG', 80)
                        .then(({uri}) => {
                            const config = {
                                headers: {'content-type': 'multipart/form-data'}
                            };
                            const data = new FormData();
                            data.append('par_image_user', {
                                uri: uri,
                                type: response.type, // or photo.type
                                name: response.fileName
                            });
                            data.append('par_user_id', this.props.redAuth.data.profile.user_id);
                            axios.post(host + 'auth/update_image', data, config)
                                .then((response) => {
                                    if (response.data.status) {
                                        let data_ = {
                                            name: response.data.result.user_name,
                                            photo: response.data.result.user_photo
                                        }
                                        this.props.dispatch({
                                            type: 'LOGIN',
                                            status_get: true,
                                            data: {data: data_, profile: response.data.result},
                                            message: response.data.message
                                        })
                                    }
                                }).catch((err) => {
                            })
                        }).catch((err) => {
                    });

                    ImageResizer.createResizedImage('data:image/png;base64,' + response.data, 200, 200, 'JPEG', 80)
                        .then(({uri}) => {
                            ImageStore.getBase64ForTag(uri, (data) => {
                                let source = 'data:image/png;base64,' + data;
                                this.setState({image: source})
                            }, (e) => {
                            });
                        }).catch((err) => {
                    });
                }
            });
        }
    }

    render() {
        return (
            <Container style={{backgroundColor: '#FFF'}}>
                <StatusBar backgroundColor="#013976"/>

                <View>

                    <View style={styles.dd}/>
                    <View style={styles.TrapezoidStyle}/>
                    <View style={styles.TrapezoidStyle_}/>
                    {
                        this.state.isLogin
                        &&
                        <View style={{
                            flexDirection: 'row',
                            height: 50,
                            position: 'absolute',
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Button transparent light style={{width: 50, justifyContent: 'center'}}
                                        onPress={this.onLogOutClick()}>
                                    <Icon name="sign-out" size={20} color={'#FFF'}/>
                                </Button>
                            </View>
                            <View style={{flex: 4, justifyContent: 'center', alignItems: 'center'}}>

                            </View>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Button full transparent light
                                        onPress={() => this.props.navigation.navigate('Setting')}>
                                    <Icon color={'#FFF'} size={20}
                                          name="cog"/>
                                </Button>
                            </View>
                            {/*<Button transparent light style={{width: 50, justifyContent: 'center'}}*/}
                            {/*onPress={this.onLogOutClick()}>*/}
                            {/*<Icon name="sign-out" size={20} color={'#FFF'}/>*/}
                            {/*</Button>*/}
                        </View>
                    }

                    <View style={{position: 'absolute', top: 50, right: 10}}>
                        {
                            this.state.isLogin
                            &&
                            <TouchableOpacity onPress={this.onPickImage()}>
                                <Thumbnail large
                                           source={{uri: this.state.image}}/>
                                <View style={{position: 'absolute', left: 0}}>
                                    <Icon color={'#FFF'} size={20}
                                          name="camera"/>

                                </View>
                            </TouchableOpacity>
                        }
                    </View>
                    <View style={{position: 'absolute', top: 130, right: 10}}>
                        <Text style={{color: '#FFF'}}>{this.state.name}</Text>
                    </View>

                </View>
                {
                    this.state.isLogin
                    &&
                    <View style={{marginLeft: 10}}>
                        <Text>Your reserve</Text>
                    </View>
                }
                {
                    !this.state.isLogin
                        ?
                        <View
                            style={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                            <View style={{flex: 1}}>
                                <Image
                                    style={{flex: 1}}
                                    width={150}
                                    source={require('../../Assets/login.png')}
                                    resizeMode={"contain"}
                                />
                            </View>
                            <View style={{flex: 1}}>
                                <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 40}}>
                                    <Text style={{textAlign: 'center', fontSize: 12}}>You can't give happiness, but you
                                        can
                                        give books.</Text>
                                    <Text style={{textAlign: 'center', fontSize: 12}}>Login to reserve/request
                                        donation</Text>
                                </View>
                            </View>
                        </View>
                        :
                        this.state.isLoading
                            ?
                            <Content>
                                <Rph/>
                                <Rph/>
                                <Rph/>
                                <Rph/>
                            </Content>

                            :
                            this.state.data.length > 0
                                ?
                                <FlatList

                                    style={{marginLeft: 10, marginRight: 10}}
                                    onRefresh={this.onRefresh()}
                                    refreshing={this.state.isRefresh}
                                    showsHorizontalScrollIndicator={false}
                                    data={this.state.data}
                                    keyExtractor={(item, index) => '' + index}
                                    renderItem={({item}) =>
                                        <TouchableOpacity
                                            onPress={() => this.props.navigation.navigate('MyDetailReserve', {
                                                reserve_id: item.reserve_id
                                            })}>
                                            <Reserve
                                                title={item.reserve_title}
                                                status={item.reserve_status}
                                                cd={sqlToJsISO(item.reserve_create_date)}
                                                ed={item.reserve_end_date}
                                            />
                                        </TouchableOpacity>
                                    }
                                />
                                : <View
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'column'
                                    }}>
                                    <View style={{flex: 1}}>
                                        <Image
                                            style={{flex: 1}}
                                            width={150}
                                            source={require('../../Assets/login.png')}
                                            resizeMode={"contain"}
                                        />
                                    </View>
                                    <View style={{flex: 1}}>
                                        <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 40}}>
                                            <Text style={{textAlign: 'center', fontSize: 12}}>You can't give happiness, but
                                                you
                                                can
                                                give books.</Text>
                                            <Text style={{textAlign: 'center', fontSize: 12}}>No data</Text>
                                        </View>
                                    </View>
                                </View>


                }
                {
                    !this.state.isLogin
                        ?
                        <View style={{
                            margin: 10
                        }}>
                            <Button style={{borderColor: '#013976'}} full bordered onPress={this.onLoginClick()}>
                                <Text style={{color: '#013976'}}>Login</Text>
                            </Button>
                        </View>
                        :
                        <Button full bordered info style={{margin: 10}} onPress={this.onCreareReserveClick()}>
                            <Text>Create Reserve</Text>
                        </Button>
                }

            </Container>
        );
    }
}

export default connect(
    mapStateToProps,
)(ScreenProfile);