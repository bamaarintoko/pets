import React, {Component} from 'react';
import {
    BackHandler, View, StatusBar
} from 'react-native';
import {createStackNavigator, createBottomTabNavigator, createDrawerNavigator} from "react-navigation";
import {initializeListeners} from 'react-navigation-redux-helpers'
import {navigationPropConstructor} from '../Utils/Redux'
// import ScreenHome from '../Screen/Home/screen-home'
// import ScreenSetting from '../Screen/Setting/screen-setting'
// import ScreenDetail from '../Screen/Home/screen-detail'
// import ScreenProfile from '../Screen/Profile/screen-profile'
// import ScreenChangePassword from '../Screen/Profile/screen-change-password'
// import ScreenEditProfil from '../Screen/Profile/screen-edit-profil'
// import ScreenMyReserveDetail from '../Screen/Profile/screen-detail-myreserve'
// import ScreenNews from '../Screen/News/screen-news'
// import ScreenEvent from '../Screen/Event/screen-event'
// import ScreenAuth from '../Screen/Auth/screen-auth'
import SplashScreen from '../Screen/Splash/screen-splash'
// import ScreenIntro from '../Screen/Splash/screen-intro'
// import ScreenRegister from '../Screen/Auth/screen-register'
// import ScreenForgetPassword from '../Screen/Auth/screen-forget-password'
// import ScreenCreateReserve from '../Screen/CreateReserve/screen-create-reserve'
import {connect} from "react-redux";
import {addListener} from '../Utils/Redux';

// export const Home = createBottomTabNavigator({
//     Home: {screen: ScreenHome},
//     News: {screen: ScreenNews},
//     Event: {screen: ScreenEvent},
//     Reserve: {screen: ScreenProfile},
// })

export const AppNavigator = createStackNavigator({
    // Menu: {screen: Home},
    // Auth: {screen: ScreenAuth},
    Splash: {screen: SplashScreen},
    // Intro: {screen: ScreenIntro},
    // Register: {screen: ScreenRegister},
    // CreateReserve: {screen: ScreenCreateReserve},
    // ForgetPassword: {screen: ScreenForgetPassword},
    // MyDetailReserve: {screen: ScreenMyReserveDetail},
    // ScreenDetail: {screen: ScreenDetail},
    // Setting: {screen: ScreenSetting},
    // ChangePassword: {screen: ScreenChangePassword},
    // EditProfil: {screen: ScreenEditProfil},

}, {
    headerMode: 'none',

    navigationOptions: {
        gesturesEnabled: true
    }
});

class AppWithNavigationState extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        initializeListeners('root', this.props.nav);
        BackHandler.addEventListener('hardwareBackPress', function () {
            const {dispatch, navigation, nav} = this.props;

            if (nav.routes.length === 1) {
                BackHandler.exitApp()
                return false;
            }
            dispatch({type: 'Navigation/BACK'});
            return true;
        }.bind(this));
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log("aaa");
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress');
    }

    render() {
        const {dispatch, nav} = this.props;
        const navigation = navigationPropConstructor(dispatch, nav);
        return (
            <AppNavigator navigation={navigation}/>

        )
    }
};

function mapStateToProps(state) {
    return {
        nav: state.nav,
    };
}


export default connect(mapStateToProps)(AppWithNavigationState);