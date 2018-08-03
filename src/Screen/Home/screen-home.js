import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    View, StatusBar, Dimensions, Image, FlatList, TouchableOpacity
} from 'react-native';
import {Container, Content, Text} from "native-base"
import Icon from 'react-native-vector-icons/FontAwesome';
import {Donate} from '../../Components/Donate'
import {actGetListReserve} from "./action";
import {sqlToJsISO} from "../../Utils/func";

const {width} = Dimensions.get('window')
import {Ph} from "../../Components/Content";

function mapStateToProps(state) {
    return {
        redAuth: state.redAuth,
        redGetListReserve: state.redGetListReserve,
        redAddReserve: state.redAddReserve,
        redUpdateReserve: state.redUpdateReserve,
    };
}

const styles = {
    wrapper: {},

    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    image: {
        width,
        flex: 1,
        backgroundColor: 'transparent'
    },

    loadingView: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,.5)'
    },

    loadingImage: {
        width: 60,
        height: 60
    }
}

const Slide = props => {
    return (<View style={styles.slide}>
        <Image onLoad={props.loadHandle.bind(null, props.i)} style={styles.image} source={{uri: props.uri}}/>
        {
            !props.loaded && <View style={styles.loadingView}>
            </View>
        }
    </View>)
}

class ScreenHome extends Component {
    static navigationOptions = {
        header: null,
        tabBarIcon: ({tintColor}) => {
            return <Image
                style={{flex: 1}}
                source={require('../../Assets/home.png')}
                resizeMode={"contain"}
            />;
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            initialRedGetListReserve: true,
            initialRedUpdateReserve: true,
            initialRedAddReserve: true,
            color: '#FFFFFF',
            imgList: [
                'https://gitlab.pro/yuji/demo/uploads/d6133098b53fe1a5f3c5c00cf3c2d670/DVrj5Hz.jpg_1',
                'https://gitlab.pro/yuji/demo/uploads/2d5122a2504e5cbdf01f4fcf85f2594b/Mwb8VWH.jpg',
                'https://gitlab.pro/yuji/demo/uploads/4421f77012d43a0b4e7cfbe1144aac7c/XFVzKhq.jpg',
                'https://gitlab.pro/yuji/demo/uploads/576ef91941b0bda5761dde6914dae9f0/kD3eeHe.jpg'
            ],
            loadQueue: [0, 0, 0, 0],
            data: [],
            isRefresh: false
        }
        // this.loadHandle = this.loadHandle.bind(this)
    }

    componentDidMount() {
        this.props.dispatch(actGetListReserve());

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.initialRedUpdateReserve === this.props.redUpdateReserve.status){
            this.props.dispatch(actGetListReserve());
        }
        if (prevState.initialRedAddReserve === this.props.redAddReserve.status){
            this.props.dispatch(actGetListReserve());
        }
        if (prevState.initialRedGetListReserve === this.props.redGetListReserve.status) {
            this.setState({
                isLoading: false,
                data: this.props.redGetListReserve.data,
                isRefresh: false
            })
            this.props.dispatch({type: "RESET_RESERVE"})
        }
    }

    loadHandle = (i) => {
        return () => {

            let loadQueue = this.state.loadQueue
            loadQueue[i] = 1
            this.setState({
                loadQueue
            })
        }
    }
    onRefresh = () => {
        return () => {
            this.componentDidMount()
            this.setState({
                isRefresh: true
            })
        }
    }

    onPress = (id, img, name, cd) => {
        return () => {
            this.props.navigation.navigate('ScreenDetail', {
                reserve_id: id,
                img: img,
                name: name,
                cd: sqlToJsISO(cd)
            })
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
                    <View style={{flex: 1,}}>

                    </View>
                    <View style={{flex: 4, justifyContent: 'center', alignItems: 'center'}}>
                        <Image
                            style={{flex: 1}}
                            width={100}
                            source={require('../../Assets/head.png')}
                            resizeMode={"contain"}
                        />
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

                    </View>
                </View>

                {
                    this.state.isLoading
                        ?
                        <Content>
                            <Ph/>
                            <Ph/>
                            <Ph/>
                            <Ph/>
                            <Ph/>
                            <Ph/>
                            <Ph/>
                        </Content>
                        :
                        this.state.data.length > 0
                            ?
                            <FlatList
                                onRefresh={this.onRefresh()}
                                refreshing={this.state.isRefresh}
                                showsHorizontalScrollIndicator={false}
                                data={this.state.data}
                                keyExtractor={(item, index) => '' + index}
                                renderItem={({item}) =>
                                    <TouchableOpacity
                                        onPress={this.onPress(item.reserve_id, item.user_photo, item.user_name, item.reserve_create_date)}>
                                        <Donate uri={item.user_photo}
                                                name={item.user_name}
                                                reserve_title={item.reserve_title}
                                                reserve_description={item.reserve_description}
                                                reserve_end_date={item.reserve_end_date}
                                                create_date={sqlToJsISO(item.reserve_create_date)}/>
                                    </TouchableOpacity>
                                }
                            />
                            :
                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#FFF',
                                flexDirection: 'column'
                            }}>
                                <View style={{flex: 2}}>
                                    <Image
                                        style={{flex: 1}}
                                        width={150}
                                        source={require('../../Assets/login.png')}
                                        resizeMode={"contain"}
                                    />
                                </View>
                                <View style={{flex:1}}>
                                    <Text style={{fontSize: 12}}>
                                        Sorry, no data donation for now.
                                    </Text>
                                </View>
                            </View>

                }

            </Container>
        );
    }
}

export default connect(
    mapStateToProps,
)(ScreenHome);