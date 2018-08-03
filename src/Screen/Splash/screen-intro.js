import React, {Component} from 'react';
import {Image, StatusBar, StyleSheet, View} from 'react-native'
import {connect} from 'react-redux';
import {Container, Content, Text} from "native-base";
import AppIntro from 'react-native-app-intro';
const styles = StyleSheet.create({
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
        flexDirection: 'column'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
});

class ScreenIntro extends Component {
    render() {
        return (
            <Container>
                <StatusBar backgroundColor="#013976"/>
                <AppIntro
                    dotColor={'#013976'}
                    activeDotColor={'#03A9F4'}
                    rightTextColor={'#013976'}
                    leftTextColor={'#013976'}
                    onSkipBtnClick={() => this.props.navigation.dispatch({type: 'HOME'})}
                    onDoneBtnClick={() => this.props.navigation.dispatch({type: 'HOME'})}
                    doneBtnLabel={<Text style={{color: '#013976', fontSize: 25, paddingLeft: 20}}>{'   '}Done</Text>}
                >
                    <View style={[styles.slide, {backgroundColor: '#FFF'}]}>
                        <View style={{flex: 2}}>
                            <Image
                                style={{flex: 1}}
                                width={300}
                                source={require('../../Assets/Intro/Assets1.png')}
                                resizeMode={"contain"}
                            />
                        </View>
                        <View style={{flex: 1, padding:10}}>
                            <Text style={{textAlign:'center', fontSize:12}}>Welcome to Derma Buku, we help you to donate or reserve books for everyone.</Text>
                        </View>

                    </View>
                    <View style={[styles.slide, {backgroundColor: '#FFF'}]}>
                        <View style={{flex: 2}}>
                            <Image
                                style={{flex: 1}}
                                width={300}
                                source={require('../../Assets/Intro/Assets3.png')}
                                resizeMode={"contain"}
                            />
                        </View>
                        <View style={{flex: 1, padding:10}}>
                            <Text style={{textAlign:'center', fontSize:12}}>You could support the education of children, school, or community by donate your unused or new book.</Text>
                        </View>
                    </View>
                    <View style={[styles.slide, {backgroundColor: '#FFF'}]}>
                        <View style={{flex: 2}}>
                            <Image
                                style={{flex: 1}}
                                width={300}
                                source={require('../../Assets/Intro/Assets2.png')}
                                resizeMode={"contain"}
                            />
                        </View>
                        <View style={{flex: 1, padding:10}}>
                            <Text style={{textAlign:'center', fontSize:12}}>Our vision is to make everyone has access to the books, so it will change and improves their lives.</Text>
                        </View>
                    </View>
                </AppIntro>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
)(ScreenIntro);
