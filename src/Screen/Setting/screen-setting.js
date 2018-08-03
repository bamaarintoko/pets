import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StatusBar, TouchableHighlight} from 'react-native'
import {Container, Content, List, ListItem, Text, View, Button} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

function mapStateToProps(state) {
    return {
        redGetColor: state.redGetColor
    };
}

class ScreenSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: '#1565C0'
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
                <Content>
                    <List>
                        <ListItem onPress={() => this.props.navigation.navigate('ChangePassword')}>
                            <Text>Change password</Text>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }
}

export default connect(
    mapStateToProps,
)(ScreenSetting);