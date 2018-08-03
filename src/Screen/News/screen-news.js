import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StatusBar, FlatList, Dimensions, Image} from 'react-native';
import {View, Container, Text, Content, Button} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

function mapStateToProps(state) {
    return {};
}

const width = (Dimensions.get('window').width - 20);
const kategori = [
    {
        value: 'Inspiration'
    },
    {
        value: 'Editor Pick'
    },
    {
        value: 'Entertainment'
    },
    {
        value: 'Community'
    }
]
const news = [
    {
        value: 'https://picsum.photos/300/300/?image=560',
        text: 'Sed feugiat ut felis vitae.'
    },
    {
        value: 'https://picsum.photos/300/300/?image=559',
        text: 'Aenean sodales dui id tincidunt varius. Donec suscipit sapien eget.'
    },
    {
        value: 'https://picsum.photos/300/300/?image=558',
        text: 'Ut rutrum quam non feugiat tempor. Quisque ut dui.'
    },
    {
        value: 'https://picsum.photos/300/300/?image=557',
        text: 'Sed euismod enim at arcu condimentum, feugiat elementum leo.'
    },
    {
        value: 'https://picsum.photos/300/300/?image=556',
        text: 'Etiam pellentesque lobortis ex. Class aptent taciti sociosqu ad.'
    },
    {
        value: 'https://picsum.photos/300/300/?image=555',
        text: 'Etiam nec tortor consectetur metus congue pretium. Curabitur ullamcorper.'
    }
]

class ScreenNews extends Component {
    static navigationOptions = {
        header: null,
        tabBarIcon: ({tintColor}) => {
            return <Icon name="newspaper-o" size={20} color={tintColor}/>;
        }
    }

    render() {
        console.log(width)
        return (
            <Container style={{backgroundColor: '#FFFFFF'}}>
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
                        <Text>
                            News
                        </Text>
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Button full transparent light>
                            <Icon color={'#000000'} size={20}
                                  name="search"/>
                        </Button>
                    </View>
                </View>
                {/*<View style={{height: 70, backgroundColor: '#FFE082'}}>*/}
                {/*<FlatList*/}
                {/*showsHorizontalScrollIndicator={false}*/}
                {/*horizontal={true}*/}
                {/*data={kategori}*/}
                {/*keyExtractor={(item, index) => '' + index}*/}
                {/*renderItem={({item}) =>*/}
                {/*<View style={{*/}
                {/*justifyContent: 'center',*/}
                {/*alignItems: 'center',*/}
                {/*height: 50,*/}
                {/*width: 100,*/}
                {/*backgroundColor: '#FFF',*/}
                {/*marginTop: 10,*/}
                {/*marginBottom: 10,*/}
                {/*marginLeft: 5,*/}
                {/*marginRight: 5,*/}
                {/*borderRadius: 5*/}
                {/*}}>*/}
                {/*<Text style={{fontSize: 12, position: 'absolute', bottom: 5}}>{item.value}</Text>*/}
                {/*</View>}*/}
                {/*/>*/}
                {/*</View>*/}
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
                            source={require('../../Assets/news.png')}
                            resizeMode={"contain"}
                        />
                    </View>
                    <View style={{flex:1}}>
                        <Text style={{fontSize: 12}}>
                            Sorry, no news for now.
                        </Text>
                    </View>
                </View>
                {/*<Content>*/}

                    {/*<FlatList*/}

                    {/*data={news}*/}
                    {/*numColumns={2}*/}
                    {/*keyExtractor={(item, index) => '' + index}*/}
                    {/*renderItem={({item}) =>*/}
                    {/*<View style={{*/}
                    {/*width: width / 2,*/}
                    {/*justifyContent: 'center',*/}
                    {/*alignItems: 'center',*/}
                    {/*height: (width / 2) - 50,*/}
                    {/*backgroundColor: '#FFF',*/}
                    {/*marginTop: 10,*/}
                    {/*marginBottom: 10,*/}
                    {/*marginLeft: 5,*/}
                    {/*marginRight: 5,*/}
                    {/*borderColor: '#BDBDBD',*/}
                    {/*overflow: 'hidden',*/}
                    {/*borderRadius: 5*/}
                    {/*}}>*/}
                    {/*<Image*/}
                    {/*style={{width: (width / 2), height: (width / 2)}}*/}
                    {/*source={{uri: item.value}}*/}
                    {/*/>*/}
                    {/*<View style={{*/}
                    {/*position: 'absolute',*/}
                    {/*backgroundColor: 'rgba(255, 255, 255, 0.6)',*/}
                    {/*bottom: 0,*/}
                    {/*width: '100%',*/}
                    {/*height: 40,*/}
                    {/*justifyContent: 'center',*/}
                    {/*padding: 5*/}
                    {/*}}>*/}
                    {/*<Text*/}
                    {/*style={{fontSize: 10}}>{item.text.length > 50 ? item.text.slice(0, 65) + "..." : item.text}</Text>*/}
                    {/*</View>*/}
                    {/*</View>}*/}
                    {/*/>*/}
                {/*</Content>*/}
            </Container>
        );
    }
}

export default connect(
    mapStateToProps,
)(ScreenNews);