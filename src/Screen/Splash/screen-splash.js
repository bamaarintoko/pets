import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions, Keyboard, TouchableOpacity
} from 'react-native';
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
import {GoogleSignin} from 'react-native-google-signin';
import {Item, Input, Container, Button} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import {normalize, normalizeFont} from "../../Utils/func";

let width = Dimensions.get('window').width - 40;
let width_ = Dimensions.get('window').width;

class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            img_height: 130,
            img_width: 130,
            frame_top: 80,
            mrg_top: 180,
            img_top: 30,
            content_height: 450,
            hide: false
        }
        this._keyboardDidShow = this._keyboardDidShow.bind(this)
        this._keyboardDidHide = this._keyboardDidHide.bind(this)
    }

    async componentDidMount() {
        await this._configureGoogleSignIn();
        await this._getCurrentUser();
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    onLoginFacebookClick = () => {
        console.log("asdad")
        return () => {
            FBLoginManager.loginWithPermissions(["email"], (error, data) => {
                if (!error) {
                    console.log(data)

                } else {
                    console.log("Error: ", error);
                }
            })
        }
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow() {
        this.setState({
            img_height: 110,
            img_width: 110,
            frame_top: 10,
            mrg_top: 100,
            img_top: 10,
            hide: true,
            content_height: 250
        })
        // alert('Keyboard Shown');
    }

    _keyboardDidHide() {
        this.setState({
            img_height: 150,
            img_width: 150,
            frame_top: 70,
            mrg_top: 200,
            img_top: 30,
            content_height: 450,
            hide: false
        })
        // alert('Keyboard Hidden');
    }

    _signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            // this.setState({ user: null });
        } catch (error) {
            console.log(error)
        }
    };
    signIn = async () => {

        console.log("asdad")
        try {
            const user = await GoogleSignin.signIn();
            console.log(user)
            // this.setState({ user });
        } catch (error) {
            if (error.code === 'CANCELED') {
                // user cancelled the login flow
            } else {
                // some other error happened
            }
            console.log("===>", error)
        }
    };

    async _getCurrentUser() {
        try {
            const user = await GoogleSignin.currentUserAsync();
            this.setState({user, error: null});
        } catch (error) {
            this.setState({
                error,
            });
        }
    }

    async _configureGoogleSignIn() {
        await GoogleSignin.hasPlayServices({autoResolve: true});
        // const configPlatform = {
        //     ...Platform.select({
        //         ios: {
        //             iosClientId: config.iosClientId,
        //         },
        //         android: {},
        //     }),
        // };

        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
            iosClientId: '', // only for iOS
            webClientId: '', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            hostedDomain: '', // specifies a hosted domain restriction
            forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login
            accountName: '', // [Android] specifies an account name on the device that should be used
        }).then((re) => {
            console.log(re)
            // you can now call currentUserAsync()
        });
    }

    render() {
        console.log(normalize(this.state.content_height))
        return (
            <Container style={styles.container}>
                <Image
                    style={{width: width_, height: 200, position: 'absolute', bottom: 0}}
                    source={require('../../../Assets/adopt.png')}
                />
                <View style={{flex: 1, backgroundColor: '#BBDEFB', padding: 5}}>
                    <Image
                        style={{width: '100%', height: 200}}
                        resizeMode={'contain'}
                        source={require('../../../Assets/bird.png')}
                    />
                </View>
                <View style={{flex: 2, backgroundColor: 'rgba(255, 255, 255, 0.9)'}}>
                </View>

                <View style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    height: normalize(this.state.content_height),
                    width: width,
                    margin: 20,
                    top: normalize(this.state.frame_top),
                    position: 'absolute',
                    alignItems: 'center',

                }}>

                    <View style={{
                        backgroundColor: '#BBDEFB',
                        width: normalize(this.state.img_width * .7),
                        height: normalize(this.state.img_height * .7),
                        borderRadius: 100,
                        position: 'absolute',
                        top: this.state.img_top,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Image
                            style={{
                                width: normalize(this.state.img_width * .8) - 50,
                                height: normalize(this.state.img_height * .8) - 50,
                                overflow: 'hidden'
                            }}
                            resizeMode={'contain'}
                            source={{uri: 'https://static1.squarespace.com/static/5a95c420e17ba3e8bc7af6ae/t/5a9e94c78165f5c069ead5dd/1525353722295/?format=1500w'}}
                        />
                    </View>
                    <View style={{
                        width: '100%',
                        marginTop: normalize(this.state.mrg_top),
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <View style={{width: '80%'}}>
                            <View>
                                <Item regular style={{borderColor: 'white', borderWidth: 0, height: 20}}>
                                    <Input style={{fontSize: normalizeFont(3)}} placeholder={'email'}/>
                                </Item>
                            </View>
                            <View style={styles.separatorContainer}>
                                <View style={styles.separatorLine}/>
                            </View>
                            <View>
                                <Item regular style={{borderColor: 'white', height: 20}}>
                                    <Input style={{fontSize: normalizeFont(3)}} placeholder={'password'}/>
                                </Item>
                            </View>
                        </View>
                        <View style={{width: '20%'}}>
                            <Button transparent full onPress={this._signOut}>
                                <Icon active name='sign-in' size={normalizeFont(7)} color={'#EEE'}/>
                            </Button>
                        </View>
                    </View>
                    <View style={{width: '100%', flexDirection: 'row', padding: 10}}>
                        <View style={{width: '50%'}}>
                            <TouchableOpacity style={{paddingTop: 10, paddingBottom: 10}}
                                              onPress={() => this.props.navigation.navigate('Register')}>
                                <Text>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{width: '50%'}}>
                            <TouchableOpacity style={{paddingTop: 10, paddingBottom: 10}}>
                                <Text style={{alignSelf: 'flex-end'}}>Forgot Password</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {
                        !this.state.hide
                        &&
                        <View>
                            <View style={styles.separatorContainer}>
                                <View style={styles.separatorLine}/>
                                <Text style={styles.separatorOr}>Or Login With</Text>
                                <View style={styles.separatorLine}/>
                            </View>
                            <View style={{flexDirection: 'row', marginTop: 10, alignItems: 'center', width: '100%'}}>
                                <Button full info
                                        style={{width: '48%', backgroundColor: '#3B5998', height: normalize(40)}}
                                        onPress={this.onLoginFacebookClick()}
                                >
                                    <Icon name="facebook" size={normalizeFont(4)} color={'#FFF'}/>
                                </Button>
                                <View style={{width: '4%'}}>
                                </View>
                                <Button full info
                                        style={{width: '48%', backgroundColor: '#c71610', height: normalize(40)}}
                                        onPress={this.signIn}
                                >
                                    <Icon name="google-plus" size={normalizeFont(4)} color={'#FFF'}/>
                                </Button>
                            </View>
                        </View>
                    }

                </View>

            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    separatorContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 8
    },
    separatorLine: {
        flex: 1,
        borderWidth: StyleSheet.hairlineWidth,
        height: StyleSheet.hairlineWidth,
        borderColor: '#EEE'
    },
    separatorOr: {
        color: '#EEE',
        marginHorizontal: 8,
        fontSize: 12
    },
});

function mapStateToProps(state) {
    return {
        redAuth: state.redAuth,
        redSetting: state.redSetting
    };
}

export default connect(
    mapStateToProps,
)(SplashScreen);
