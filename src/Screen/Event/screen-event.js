import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Image, StatusBar} from 'react-native'
import {View, Text, Container, Content, Button} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Ticket} from '../../Components/Ticket'

function mapStateToProps(state) {
    return {};
}

class ScreenEvent extends Component {
    static navigationOptions = {
        header: null,
        tabBarIcon: ({ tintColor }) => {
            return <Icon name="ticket" size={20} color={tintColor} />;
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            hide_filter:true
        }
    }
    showHide=()=>{
        return ()=>{
            this.setState({
                hide_filter : !this.state.hide_filter
            })
        }
    }
    render() {
        return (
            <Container>
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
                            Event
                        </Text>
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Button full transparent light onPress={this.showHide()}>
                            <Icon color={'#000000'} size={20}
                                  name="filter"/>
                        </Button>
                    </View>
                </View>
                {
                    !this.state.hide_filter
                    &&
                    <View style={{height: 30, backgroundColor: '#E3F2FD', flexDirection: 'row'}}>
                        <View style={{flex: 1, justifyContent:'center',alignItems:'center'}}>
                            <Text style={{fontSize:12}}>This Week</Text>
                        </View>
                        <View style={{flex: 1, justifyContent:'center',alignItems:'center'}}>
                            <Text style={{fontSize:12}}>This Month</Text>
                        </View>
                        <View style={{flex: 1, justifyContent:'center',alignItems:'center'}}>
                            <Text style={{fontSize:12}}>Schedule <Icon name="sort-amount-asc" color="#2196F3" /></Text>
                        </View>
                    </View>
                }
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
                            source={require('../../Assets/event.png')}
                            resizeMode={"contain"}
                        />
                    </View>
                    <View style={{flex:1}}>
                        <Text style={{fontSize: 12}}>
                            Sorry, there are no events at this time.
                        </Text>
                    </View>
                </View>
                {/*<Content style={{backgroundColor: '#FFF'}}>*/}
                    {/*<View*/}
                        {/*style={{*/}
                            {/*flex: 1,*/}
                            {/*justifyContent: 'center',*/}
                            {/*flexDirection: 'row',*/}
                            {/*flexWrap: 'wrap',*/}
                            {/*marginTop:100*/}
                        {/*}}*/}
                    {/*>*/}
                        {/*<Text style={{textAlign:'center', fontSize:12}}>*/}
                            {/*Sorry, there are no events at this time.*/}
                        {/*</Text>*/}
                    {/*</View>*/}
                    {/*<Ticket*/}
                        {/*data={{title: 'Reduce, Reuse, Recycle', date: 'Thursday, 12 May 2018', time: '10 PM'}}*/}
                        {/*image={'https://marketplace.canva.com/MAB5W1orBoM/1/0/thumbnail_large/canva-environment-classroom-poster-MAB5W1orBoM.jpg'}*/}
                        {/*bg_color={'#B2FF59'}*/}
                        {/*sec_color={'#CCFF90'}/>*/}
                    {/*<Ticket*/}
                        {/*data={{title: 'Concert For Kid', date: 'Thursday, 12 May 2018', time: '10 PM'}}*/}
                        {/*image={'https://marketplace.canva.com/MAB1GLyFELM/2/0/thumbnail_large/canva-concert-for-kids-fundraising-poster-MAB1GLyFELM.jpg'}*/}
                        {/*bg_color={'#29B6F6'}*/}
                        {/*sec_color={'#B3E5FC'}/>*/}
                    {/*<Ticket*/}
                        {/*data={{title: 'Blood Donation', date: 'Thursday, 12 May 2018', time: '10 PM'}}*/}
                        {/*image={'https://marketplace.canva.com/MACXhzcB8NQ/4/0/thumbnail_large/canva-red-and-pink-blood-donation-poster-MACXhzcB8NQ.jpg'}*/}
                        {/*bg_color={'#EF9A9A'}*/}
                        {/*sec_color={'#FFCDD2'}/>*/}
                    {/*<Ticket*/}
                        {/*data={{title: 'Autumn Movie Marathon', date: 'Thursday, 12 May 2018', time: '10 PM'}}*/}
                        {/*image={'https://marketplace.canva.com/MACGp2rUBsI/2/0/thumbnail_large/canva-burgundy-thanksgiving-movie-marathon-poster-MACGp2rUBsI.jpg'}*/}
                        {/*bg_color={'#B71C1C'}*/}
                        {/*sec_color={'#E65100'}/>*/}
                    {/*<Ticket*/}
                        {/*data={{title: 'Bright Music', date: 'Thursday, 12 May 2018', time: '10 PM'}}*/}
                        {/*image={'https://marketplace.canva.com/MAB00NXwDDk/2/0/thumbnail_large/canva-music-poster-MAB00NXwDDk.jpg'}*/}
                        {/*bg_color={'#80DEEA'}*/}
                        {/*sec_color={'#4DD0E1'}/>*/}


                {/*</Content>*/}

            </Container>
        );
    }
}

export default connect(
    mapStateToProps,
)(ScreenEvent);