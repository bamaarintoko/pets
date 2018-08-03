import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Container, Content, Input, Item, Text} from "native-base";
import {
    Dimensions, FlatList, Image, ImageStore, StatusBar, StyleSheet, TouchableHighlight, TouchableWithoutFeedback,
    View
} from "react-native";
import RadioForm from 'react-native-simple-radio-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import Api from "../../Utils/Api";
import moment from "moment/moment";
import {InputDate, InputSelect, InputText, InputTextArea} from "../../Components/Input";
import CheckBox from "react-native-check-box";
import Modal from 'react-native-modalbox';
import DateTimePicker from 'react-native-modal-datetime-picker';

const errors = {}
const width = (Dimensions.get('window').width - 50);
const val = [];
import Spinner from 'react-native-spinkit';
import {jsDateToSqlD} from "../../Utils/func";
import {actUpdateReserve} from "./action";
import ImagePicker from "react-native-image-picker";
import ImageResizer from 'react-native-image-resizer'
import Snackbar from 'react-native-snackbar';
let radio_props = [
    { label: 'Publish', value: 'publish' },
    { label: 'Close', value: 'close' }
];

let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 7)
const img = [];
let options = {
    title: 'Select Image',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};
let data_del = [];

class ScreenMyReserveDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgPreview0: '',
            imgPreview1: '',
            imgPreview2: '',
            imgPreview3: '',
            imgPreview4: '',
            imgPreview5: '',
            imgValue0: '',
            imgValue1: '',
            imgValue2: '',
            imgValue3: '',
            imgValue4: '',
            imgValue5: '',
            value_title: '',
            value_address: '',
            data: [],
            value_status: '',
            value_description: '',
            value_note: '',
            value_reserve_name: '',
            value_reserve_cp: '',
            value_province: '',
            value_district: '',
            value_sub_district: '',
            value_end_date: '',
            par_key_word: '',
            endDateSave: '',
            province: [],
            district: [],
            sub_district: [],
            image_preview: [],
            isEdit: false,
            isOpen: false,
            isProvinceOpen: false,
            isDistrictModalOpen: false,
            isSubDistrictModalOpen: false,
            initialRedUpdateReserve: true,
            isLoading: true,
            isDateTimePickerVisible: false,
            isUpdate: false

        }
    }

    componentDidMount() {
        data_del = [];
        let params = {
            par_reserve_id: this.props.navigation.getParam('reserve_id')
        }
        Api._POST('reserve/detail_reserve', params)
            .then((response) => {
                this.setState({
                    isLoading: false
                })
                if (response.data.status) {
                    this.setState({
                        value_title: response.data.result.reserve.reserve_title,
                        value_address: response.data.result.reserve.reserve_address,
                        data: JSON.parse(response.data.result.reserve.reserve_category),
                        value_description: response.data.result.reserve.reserve_description,
                        value_note: response.data.result.reserve.reserve_note,
                        value_reserve_name: response.data.result.reserve.reserve_pic,
                        value_reserve_cp: response.data.result.reserve.reserve_contact,
                        value_province: response.data.result.reserve.reserve_province,
                        value_district: response.data.result.reserve.reserve_district,
                        value_sub_district: response.data.result.reserve.reserve_sub_district,
                        value_end_date: response.data.result.reserve.reserve_end_date,
                        endDateSave: response.data.result.reserve.reserve_end_date,
                        value_status: response.data.result.reserve.reserve_status,
                        image_preview: response.data.result.image
                    })
                    response.data.result.image.map((v, k) => {
                        let state = {}
                        state["imgPreview" + k] = v.media_value
                        this.setState(state)
                    })
                }
            }).catch((err) => {
            this.setState({
                isLoading: false
            })
        })
        Api._POST('location/province', params).then((response) => {
            this.setState({
                province: response.data
            })
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.initialRedUpdateReserve === this.props.redUpdateReserve.status) {
            this.setState({
                isUpdate: false
            })
            if (this.props.redUpdateReserve.status_update) {
                Snackbar.show({
                    title: 'Update reserve success',
                    duration: Snackbar.LENGTH_LONG,
                });
            } else {
                Snackbar.show({
                    title: 'Update reserve failed',
                    duration: Snackbar.LENGTH_LONG,
                });
            }
            this.props.dispatch({type: "UPDATE_RESET"})
        }
    }

    _showDateTimePicker = () => this.setState({isDateTimePickerVisible: true});

    _hideDateTimePicker = () => this.setState({isDateTimePickerVisible: false});

    _handleDatePicked = (date) => {
        this.setState({
            value_end_date: date,
            endDateSave: jsDateToSqlD(date.toISOString())
        })
        this._hideDateTimePicker();
    };
    onValidate = (key) => {
        return (e) => {
            if (this.state[key].length < 1) {
                errors[key] = {error: true, error_message: 'required'}
            } else {
                errors[key] = false
            }
            this.setState({input_error: errors})
        }
    }
    onOpenClick = () => {
        return () => {
            this.setState({
                isOpen: true
            })
        }
    }
    onProvinceClick = () => {
        return () => {
            this.setState({
                isProvinceOpen: true,
            })
        }
    }
    onDistrictClick = () => {
        return () => {
            let params = {
                par_province_name: this.state.value_province
            }
            Api._POST('location/district', params).then((response) => {
                this.setState({
                    district: response.data
                })
            })
            this.setState({
                isDistrictModalOpen: true,
            })
        }
    }
    onSubDistrictClick = () => {
        return () => {
            let params = {
                par_district_name: this.state.value_district
            }
            Api._POST('location/sub_district', params).then((response) => {
                this.setState({
                    sub_district: response.data
                })
            })
            this.setState({
                isSubDistrictModalOpen: true,
            })
        }
    }
    onPickClick = () => {
        return () => {

            this.setState({
                isOpen: false,
                data_kat: val
            })
        }
    }
    onChangeText = (key) => {
        return (e) => {
            let state = {}
            state[key] = e
            this.setState(state);
        }
    }
    onCheck = (key, idx) => {
        return () => {
            this.state.data[idx].check = this.state.data[idx].check === false
            this.setState({
                data: this.state.data
            })
        }
    }
    onUp = (key, idx) => {
        return () => {
            this.state.data[idx].count = parseInt(this.state.data[idx].count) + 1
            this.setState({
                data: this.state.data
            })
        }
    }
    onChangeNumber = (key, idx) => {
        return (e) => {
            this.state.data[idx].count = parseInt(e)
            this.setState({
                data: this.state.data
            })
        }
    }
    onDown = (key, idx) => {
        return () => {
            if (this.state.data[idx].count > 0) {

                this.state.data[idx].count = parseInt(this.state.data[idx].count) - 1
                this.setState({
                    data: this.state.data
                })
            }
        }
    }
    onSelectChangeText = (key) => {
        return (e) => {
            this.setState({
                keyword: e
            })
            let params = {
                par_key_word: e
            }
            Api._POST('location/province', params).then((response) => {
                this.setState({
                    province: response.data
                })
            })
        }
    }
    onPress = (key, val) => {
        return () => {
            let state = {};
            state[key] = val
            this.setState(state)
            this.setState({
                isProvinceOpen: false,
                isDistrictModalOpen: false,
                isSubDistrictModalOpen: false,
            })
            if (key === 'value_province') {
                this.setState({
                    value_district: '',
                    value_sub_district: ''
                })
            }
        }
    }
    onClose = () => {
        return () => {
            this.setState({
                isProvinceOpen: false,
                isDistrictModalOpen: false,
                isSubDistrictModalOpen: false,
            })
        }
    }
    onDeleteImg = (prev, val, trash) => {
        return () => {
            let state = {};
            if (trash.charAt(0) === 'h') {
                data_del.push(trash)
            }
            state[prev] = "";
            state[val] = "";
            this.setState(state)
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
                            let state = {};
                            state[val] = {uri: uri, type: response.type, fileName: response.fileName};
                            this.setState(state)
                            img.push({uri: uri, type: response.type, fileName: response.fileName})
                        }).catch((err) => {
                    });

                    ImageResizer.createResizedImage('data:image/png;base64,' + response.data, 200, 200, 'JPEG', 80)
                        .then(({uri}) => {
                            ImageStore.getBase64ForTag(uri, (data) => {
                                let source = 'data:image/png;base64,' + data;
                                let state = {};
                                state[key] = source;
                                this.setState(state)
                            }, (e) => {
                            });
                        }).catch((err) => {
                    });
                }
            });
        }
    }

    onSave = () => {
        return () => {
            let img_ = [];
            this.state.imgValue0 !== "" && img_.push(this.state.imgValue0)
            this.state.imgValue1 !== "" && img_.push(this.state.imgValue1)
            this.state.imgValue2 !== "" && img_.push(this.state.imgValue2)
            this.state.imgValue3 !== "" && img_.push(this.state.imgValue3)
            this.state.imgValue4 !== "" && img_.push(this.state.imgValue4)
            this.state.imgValue5 !== "" && img_.push(this.state.imgValue5)

            let params = {
                par_reserve_id: this.props.navigation.getParam('reserve_id'),
                par_title: this.state.value_title,
                par_kategory: JSON.stringify(this.state.data),
                par_description: this.state.value_description,
                par_note: this.state.value_note,
                par_reserve_name: this.state.value_reserve_name,
                par_reserve_cp: this.state.value_reserve_cp,
                par_address: this.state.value_address,
                par_province: this.state.value_province,
                par_district: this.state.value_district,
                par_sub_district: this.state.value_sub_district,
                par_end_date: this.state.endDateSave,
                par_status: this.state.value_status
            }
            this.setState({
                isUpdate:true
            })
            this.props.dispatch(actUpdateReserve(params, img_, JSON.stringify(data_del)))
        }
    }

    render() {
        return <Container>
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
                    {
                        !this.state.isEdit
                            ?
                            <Button full transparent light
                                    onPress={() => this.setState({isEdit: !this.state.isEdit})}>
                                <Icon color={'#000000'} size={20}
                                      name="pencil-square-o"/>
                            </Button>
                            :
                            <Button full transparent light onPress={() => {
                                this.componentDidMount();
                                this.setState({isEdit: !this.state.isEdit})
                            }

                            }>
                                <Icon color={'#000000'} size={20}
                                      name="times"/>
                            </Button>

                    }

                </View>
            </View>
            <Modal position={"center"}
                   style={{width: 300, height: 100, justifyContent: 'center', alignItems: 'center'}}
                   swipeToClose={false}
                   isOpen={this.state.isUpdate}
                   backdropPressToClose={false}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Spinner type={'ChasingDots'} color={"#013976"}/>
                    <Text>Please wait</Text>
                </View>
            </Modal>
            <Modal position={"center"}
                   style={[styles.modal, styles.modal3]}
                   swipeToClose={false}
                   isOpen={this.state.isOpen}
                   backdropPressToClose={false}>
                <View style={{flexDirection: 'row'}}>
                    <Button transparent
                            style={{justifyContent: 'center', width: 50, position: 'absolute', right: 0}}
                            onPress={this.onPickClick()}>
                        <Icon color={'#E0E0E0'} size={20}
                              name="times"/>
                    </Button>
                </View>
                <View style={{padding: 5, marginTop: 30, marginBottom: 50}}>
                    <FlatList
                        data={this.state.data}
                        keyExtractor={(item, index) => '' + index}
                        renderItem={({item, index}) =>
                            <CheckBox
                                style={{flex: 1, padding: 10}}
                                onClick={this.onCheck(item.value, index)}
                                isChecked={item.check}
                                leftText={item.value}
                            />
                        }
                    />
                </View>
                <View style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    padding: 5,
                    flexDirection: 'row',
                    marginTop: 30
                }}>
                    <Button block info style={{justifyContent: 'center', width: '100%'}}
                            onPress={this.onPickClick()}>
                        <Icon color={'#FFF'} size={20}
                              name="plus"/>
                    </Button>
                </View>
            </Modal>
            {/*province modal*/}
            <Modal position={"center"}
                   style={[styles.modal, styles.modal3]}
                   swipeToClose={false}
                   isOpen={this.state.isProvinceOpen}
                   backdropPressToClose={false}>
                <View style={{flexDirection: 'column', padding: 5}}>
                    <View style={{width: '100%'}}>
                        <Item regular style={{height: 40}}>
                            <Input value={this.state.keyword}
                                   onChangeText={this.onSelectChangeText('par_key_word')}/>
                        </Item>
                    </View>
                    <View style={{width: '100%'}}>
                        <FlatList
                            data={this.state.province}
                            keyExtractor={(item, index) => '' + index}
                            renderItem={({item, index}) =>
                                <TouchableHighlight onPress={this.onPress('value_province', item.province)}>
                                    <View style={{padding: 10}}>
                                        <Text>{item.province}</Text>
                                    </View>
                                </TouchableHighlight>
                            }
                        />

                    </View>


                </View>
                <View style={{width: '100%', position: 'absolute', bottom: 0}}>
                    <Button block info style={{width: '100%'}} onPress={this.onClose()}>
                        <Text>Ok</Text>
                    </Button>
                </View>

            </Modal>
            {/*District Modal*/}
            <Modal position={"center"}
                   style={[styles.modal, styles.modal3]}
                   swipeToClose={false}
                   isOpen={this.state.isDistrictModalOpen}
                   backdropPressToClose={false}>
                <View style={{flexDirection: 'column', padding: 5}}>
                    <View style={{width: '100%'}}>
                        <FlatList
                            data={this.state.district}
                            keyExtractor={(item, index) => '' + index}
                            renderItem={({item, index}) =>
                                <TouchableHighlight onPress={this.onPress('value_district', item.district)}>
                                    <View style={{padding: 10}}>
                                        <Text>{item.district}</Text>
                                    </View>
                                </TouchableHighlight>
                            }
                        />

                    </View>


                </View>
                <View style={{width: '100%', position: 'absolute', bottom: 0}}>
                    <Button block info style={{width: '100%'}} onPress={this.onClose()}>
                        <Text>Ok</Text>
                    </Button>
                </View>

            </Modal>
            {/*subdistrict*/}
            <Modal position={"center"}
                   style={[styles.modal, styles.modal3]}
                   swipeToClose={false}
                   isOpen={this.state.isSubDistrictModalOpen}
                   backdropPressToClose={false}>
                <View style={{flexDirection: 'column', padding: 5}}>
                    <View style={{width: '100%'}}>
                        <FlatList
                            data={this.state.sub_district}
                            keyExtractor={(item, index) => '' + index}
                            renderItem={({item, index}) =>
                                <TouchableHighlight onPress={this.onPress('value_sub_district', item.subdistrict)}>
                                    <View style={{padding: 10}}>
                                        <Text>{item.subdistrict}</Text>
                                    </View>
                                </TouchableHighlight>
                            }
                        />

                    </View>


                </View>
                <View style={{width: '100%', position: 'absolute', bottom: 0}}>
                    <Button block info style={{width: '100%'}} onPress={this.onClose()}>
                        <Text>Ok</Text>
                    </Button>
                </View>

            </Modal>
            {
                this.state.isLoading
                    ?
                    <Content style={{backgroundColor: '#FFF'}}>
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Spinner type={'ChasingDots'} color={"#013976"}/>
                            <Text>Please wait</Text>
                        </View>
                    </Content>
                    :
                    <Content style={{backgroundColor: '#FFF'}}>
                        {
                            !this.state.isEdit
                                ?
                                <View style={{margin: 10}}>
                                    <View style={{marginBottom: 10}}>
                                        <Text style={{fontSize: 12}}>Title</Text>
                                        <Item regular style={{width: '100%', height: 40, borderColor: '#FFF'}}>
                                            <Text style={{fontSize: 14}}> {this.state.value_title}</Text>
                                            {/*<Input onBlur={onBlur} style={{fontSize: 14}} value={value} onChangeText={onChangeText}/>*/}
                                        </Item>
                                    </View>
                                    <View style={{marginBottom: 10}}>
                                        <Text style={{fontSize: 12}}>Kategori</Text>
                                        {
                                            this.state.data.map((v, k) => {

                                                return (
                                                    v.check
                                                    &&
                                                    <View key={k} style={{
                                                        marginBottom: 5,
                                                        flexDirection: 'row',
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }}>
                                                        <View style={{
                                                            width: '100%',
                                                            flexDirection: 'row',
                                                            paddingLeft: 5
                                                        }}>
                                                            <View style={{width: '10%'}}>

                                                                <Text style={{fontSize: 12}}>{v.count}</Text>
                                                            </View>
                                                            <View style={{width: '90%'}}>

                                                                <Text style={{fontSize: 12}}>{v.value}</Text>
                                                            </View>
                                                            {/*<View style={{width: '10%'}}>*/}
                                                            {/*<Icon color={'red'} size={20}*/}
                                                            {/*name="minus-circle"/>*/}
                                                            {/*</View>*/}
                                                        </View>
                                                    </View>
                                                )
                                            })
                                        }
                                        {/*<Input onBlur={onBlur} style={{fontSize: 14}} value={value} onChangeText={onChangeText}/>*/}
                                    </View>
                                    <View style={{marginBottom: 10}}>
                                        <Text style={{fontSize: 12}}>Description</Text>
                                        <Item regular style={{width: '100%', minHeight: 40, borderColor: '#FFF'}}>
                                            <Text style={{fontSize: 14}}> {this.state.value_description}</Text>
                                            {/*<Input onBlur={onBlur} style={{fontSize: 14}} value={value} onChangeText={onChangeText}/>*/}
                                        </Item>
                                    </View>
                                    <View style={{marginBottom: 10}}>
                                        <Text style={{fontSize: 12}}>Note</Text>
                                        <Item regular style={{width: '100%', minHeight: 40, borderColor: '#FFF'}}>
                                            <Text style={{fontSize: 14}}> {this.state.value_note}</Text>
                                            {/*<Input onBlur={onBlur} style={{fontSize: 14}} value={value} onChangeText={onChangeText}/>*/}
                                        </Item>
                                    </View>
                                    <View style={{marginBottom: 10}}>
                                        <Text style={{fontSize: 12}}>Recipient name</Text>
                                        <Item regular style={{width: '100%', minHeight: 40, borderColor: '#FFF'}}>
                                            <Text style={{fontSize: 14}}> {this.state.value_reserve_name}</Text>
                                            {/*<Input onBlur={onBlur} style={{fontSize: 14}} value={value} onChangeText={onChangeText}/>*/}
                                        </Item>
                                    </View>
                                    <View style={{marginBottom: 10}}>
                                        <Text style={{fontSize: 12}}>Recipient contact person</Text>
                                        <Item regular style={{width: '100%', minHeight: 40, borderColor: '#FFF'}}>
                                            <Text style={{fontSize: 14}}> {this.state.value_reserve_cp}</Text>
                                            {/*<Input onBlur={onBlur} style={{fontSize: 14}} value={value} onChangeText={onChangeText}/>*/}
                                        </Item>
                                    </View>
                                    <View style={{marginBottom: 10}}>
                                        <Text style={{fontSize: 12}}>Image</Text>
                                        <View style={{
                                            marginBottom: 10, flex: 1,
                                            flexDirection: 'row',
                                            justifyContent: 'space-between'
                                        }}>
                                            <FlatList
                                                data={this.state.image_preview}
                                                numColumns={3}
                                                keyExtractor={(item, index) => '' + index}
                                                renderItem={({item}) =>
                                                    <View style={{
                                                        margin: 5,
                                                        height: width / 3,
                                                        overflow: 'hidden',
                                                        borderRadius: 5,
                                                        width: width / 3,
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        backgroundColor: '#E3F2FD'
                                                    }}>
                                                        <Image

                                                            style={{width: width / 3, height: width / 3}}
                                                            source={{isStatic: true, uri: item.media_value}}/>
                                                    </View>
                                                }
                                            />
                                        </View>
                                    </View>
                                    <View style={{marginBottom: 10}}>
                                        <Text style={{fontSize: 12}}>Recipient address</Text>
                                        <Item regular style={{width: '100%', minHeight: 40, borderColor: '#FFF'}}>
                                            <Text style={{fontSize: 14}}> {this.state.value_address}</Text>
                                            {/*<Input onBlur={onBlur} style={{fontSize: 14}} value={value} onChangeText={onChangeText}/>*/}
                                        </Item>
                                    </View>
                                    <View style={{marginBottom: 10}}>
                                        <Text style={{fontSize: 12}}>Province</Text>
                                        <Item regular style={{width: '100%', minHeight: 40, borderColor: '#FFF'}}>
                                            <Text style={{fontSize: 14}}> {this.state.value_province}</Text>
                                            {/*<Input onBlur={onBlur} style={{fontSize: 14}} value={value} onChangeText={onChangeText}/>*/}
                                        </Item>
                                    </View>
                                    <View style={{marginBottom: 10}}>
                                        <Text style={{fontSize: 12}}>District</Text>
                                        <Item regular style={{width: '100%', minHeight: 40, borderColor: '#FFF'}}>
                                            <Text style={{fontSize: 14}}> {this.state.value_district}</Text>
                                            {/*<Input onBlur={onBlur} style={{fontSize: 14}} value={value} onChangeText={onChangeText}/>*/}
                                        </Item>
                                    </View>
                                    <View style={{marginBottom: 10}}>
                                        <Text style={{fontSize: 12}}>Sub district</Text>
                                        <Item regular style={{width: '100%', minHeight: 40, borderColor: '#FFF'}}>
                                            <Text style={{fontSize: 14}}> {this.state.value_sub_district}</Text>
                                            {/*<Input onBlur={onBlur} style={{fontSize: 14}} value={value} onChangeText={onChangeText}/>*/}
                                        </Item>
                                    </View>
                                    <View style={{marginBottom: 10}}>
                                        <Text style={{fontSize: 12}}>End date</Text>
                                        <Item regular style={{width: '100%', minHeight: 40, borderColor: '#FFF'}}>
                                            <Text
                                                style={{fontSize: 14}}>{moment(this.state.value_end_date).format('LL')}</Text>
                                            {/*<Input onBlur={onBlur} style={{fontSize: 14}} value={value} onChangeText={onChangeText}/>*/}
                                        </Item>
                                    </View>
                                </View>
                                :
                                <View style={{margin: 10}}>
                                    <InputText
                                        onBlur={this.onValidate('value_title')}
                                        // isError={this.state.input_error.value_title}
                                        label={"Title"}
                                        value={this.state.value_title}
                                        onChangeText={this.onChangeText('value_title')}/>
                                    <View>
                                        {

                                            this.state.data.map((v, k) => {
                                                return (
                                                    v.check
                                                    &&
                                                    <View key={k} style={{
                                                        marginBottom: 5,
                                                        flexDirection: 'row',
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }}>
                                                        <View style={{width: '30%', flexDirection: 'row'}}>
                                                            <View style={{width: '30%'}}>
                                                                <Button full info style={{height: 30}}
                                                                        onPress={this.onUp(v.key, k)}>
                                                                    <Icon color={'#FFF'} size={12}
                                                                          name="chevron-up"/>
                                                                </Button>
                                                            </View>
                                                            <View style={{width: '40%'}}>
                                                                <Item regular
                                                                      style={{height: 30, borderColor: '#FFF'}}>
                                                                    <Input keyboardType="numeric"
                                                                           style={{fontSize: 12}}
                                                                           onChangeText={this.onChangeNumber(v.key, k)}
                                                                           value={v.count.toString()}/>
                                                                </Item>
                                                            </View>
                                                            <View style={{width: '30%'}}>
                                                                <Button full info style={{height: 30}}
                                                                        onPress={this.onDown(v.key, k)}>
                                                                    <Icon color={'#FFF'} size={12}
                                                                          name="chevron-down"/>
                                                                </Button>
                                                            </View>
                                                        </View>
                                                        <TouchableWithoutFeedback key={k}
                                                                                  onPress={this.onCheck(v.value, k)}>
                                                            <View style={{
                                                                width: '70%',
                                                                flexDirection: 'row',
                                                                paddingLeft: 5
                                                            }}>
                                                                <View style={{width: '90%'}}>

                                                                    <Text style={{fontSize: 12}}>{v.value}</Text>
                                                                </View>
                                                                <View style={{width: '10%'}}>
                                                                    <Icon color={'red'} size={20}
                                                                          name="minus-circle"/>
                                                                </View>
                                                            </View>
                                                        </TouchableWithoutFeedback>
                                                    </View>
                                                )
                                            })
                                        }
                                        <Button info style={{width: 50, justifyContent: 'center'}}
                                                onPress={this.onOpenClick()}>
                                            <Icon color={'#FFF'} size={20}
                                                  name="plus"/>
                                        </Button>
                                    </View>
                                    <InputTextArea
                                        onBlur={this.onValidate('value_description')}
                                        value={this.state.value_description}
                                        onChangeText={this.onChangeText('value_description')}
                                        // isError={this.state.input_error.value_description}
                                        label={'Description'}
                                    />
                                    <InputText
                                        value={this.state.value_note}
                                        onChangeText={this.onChangeText('value_note')}
                                        label={"Note"}/>
                                    <InputText
                                        onBlur={this.onValidate('value_reserve_name')}
                                        // isError={this.state.input_error.value_reserve_name}
                                        value={this.state.value_reserve_name}
                                        onChangeText={this.onChangeText('value_reserve_name')}
                                        label={"Recipient name"}/>
                                    <InputText
                                        onBlur={this.onValidate('value_reserve_cp')}
                                        // isError={this.state.input_error.value_reserve_cp}
                                        value={this.state.value_reserve_cp}
                                        onChangeText={this.onChangeText('value_reserve_cp')}
                                        label={"Recipient Contact Person"}/>
                                    <View style={{marginTop: 5, marginBottom: 5}}>
                                        <Text style={{fontSize: 12, marginBottom: 5}}>Image (Click plus button to add
                                            image)</Text>
                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                        }}>
                                            <View>

                                                <TouchableWithoutFeedback
                                                    onPress={this.state.imgPreview0.length > 0 ?()=>console.log("asd") : this.onPickImage('imgPreview0', 'imgValue0')}>
                                                    <View style={{
                                                        height: width / 3,
                                                        overflow: 'hidden',
                                                        borderRadius: 5,
                                                        width: width / 3,
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        backgroundColor: '#E3F2FD'
                                                    }}>

                                                        {
                                                            this.state.imgPreview0.length > 0
                                                                ?
                                                                <Image

                                                                    style={{width: width / 3, height: width / 3}}
                                                                    source={{
                                                                        isStatic: true,
                                                                        uri: this.state.imgPreview0
                                                                    }}/>
                                                                :
                                                                <Icon color={'#FFF'} size={20}
                                                                      name="picture-o"/>
                                                        }


                                                    </View>
                                                </TouchableWithoutFeedback>
                                                {
                                                    this.state.imgPreview0 !== ""
                                                    &&
                                                    <TouchableWithoutFeedback
                                                        onPress={this.onDeleteImg('imgPreview0', 'imgValue0', this.state.imgPreview0)}>
                                                        <View style={{
                                                            width: 25,
                                                            height: 25,
                                                            backgroundColor: '#E0E0E0',
                                                            position: 'absolute',
                                                            right: 0,
                                                            borderTopRightRadius: 5,
                                                            justifyContent: 'center',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Icon color={'#FFF'} size={12}
                                                                  name="times"/>
                                                        </View>
                                                    </TouchableWithoutFeedback>
                                                }

                                            </View>
                                            <View>
                                                <TouchableWithoutFeedback
                                                    onPress={this.state.imgPreview1.length > 0 ?()=>console.log("asd") : this.onPickImage('imgPreview1', 'imgValue1', this.state.imgPreview0)}>
                                                    <View style={{
                                                        height: width / 3,
                                                        overflow: 'hidden',
                                                        borderRadius: 5,
                                                        width: width / 3,
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        backgroundColor: '#E3F2FD'
                                                    }}>
                                                        {
                                                            this.state.imgPreview1.length > 0
                                                                ?
                                                                <Image

                                                                    style={{width: width / 3, height: width / 3}}
                                                                    source={{
                                                                        isStatic: true,
                                                                        uri: this.state.imgPreview1
                                                                    }}/>
                                                                :
                                                                <Icon color={'#FFF'} size={20}
                                                                      name="picture-o"/>
                                                        }
                                                    </View>
                                                </TouchableWithoutFeedback>
                                                {
                                                    this.state.imgPreview1 !== ""
                                                    &&
                                                    <TouchableWithoutFeedback
                                                        onPress={this.onDeleteImg('imgPreview1', 'imgValue1', this.state.imgPreview1)}>
                                                        <View style={{
                                                            width: 25,
                                                            height: 25,
                                                            backgroundColor: '#E0E0E0',
                                                            position: 'absolute',
                                                            right: 0,
                                                            borderTopRightRadius: 5,
                                                            justifyContent: 'center',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Icon color={'#FFF'} size={12}
                                                                  name="times"/>
                                                        </View>
                                                    </TouchableWithoutFeedback>
                                                }
                                            </View>
                                            <View>
                                                <TouchableWithoutFeedback
                                                    onPress={this.state.imgPreview2.length > 0 ?()=>console.log("asd") : this.onPickImage('imgPreview2', 'imgValue2')}>
                                                    <View style={{
                                                        height: width / 3,
                                                        overflow: 'hidden',
                                                        borderRadius: 5,
                                                        width: width / 3,
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        backgroundColor: '#E3F2FD'
                                                    }}>
                                                        {
                                                            this.state.imgPreview2.length > 0
                                                                ?
                                                                <Image

                                                                    style={{width: width / 3, height: width / 3}}
                                                                    source={{
                                                                        isStatic: true,
                                                                        uri: this.state.imgPreview2
                                                                    }}/>
                                                                :
                                                                <Icon color={'#FFF'} size={20}
                                                                      name="picture-o"/>
                                                        }
                                                    </View>
                                                </TouchableWithoutFeedback>
                                                {
                                                    this.state.imgPreview2 !== ""
                                                    &&
                                                    <TouchableWithoutFeedback
                                                        onPress={this.onDeleteImg('imgPreview2', 'imgValue2', this.state.imgPreview2)}>
                                                        <View style={{
                                                            width: 25,
                                                            height: 25,
                                                            backgroundColor: '#E0E0E0',
                                                            position: 'absolute',
                                                            right: 0,
                                                            borderTopRightRadius: 5,
                                                            justifyContent: 'center',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Icon color={'#FFF'} size={12}
                                                                  name="times"/>
                                                        </View>
                                                    </TouchableWithoutFeedback>
                                                }
                                            </View>

                                        </View>
                                        <View style={{
                                            marginTop: 10,
                                            flex: 1,
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                        }}>
                                            <View>
                                                <TouchableWithoutFeedback
                                                    onPress={this.state.imgPreview3.length > 0 ?()=>console.log("asd") : this.onPickImage('imgPreview3', 'imgValue3')}>
                                                    <View style={{
                                                        height: width / 3,
                                                        overflow: 'hidden',
                                                        borderRadius: 5,
                                                        width: width / 3,
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        backgroundColor: '#E3F2FD'
                                                    }}>
                                                        {
                                                            this.state.imgPreview3.length > 0
                                                                ?
                                                                <Image

                                                                    style={{width: width / 3, height: width / 3}}
                                                                    source={{
                                                                        isStatic: true,
                                                                        uri: this.state.imgPreview3
                                                                    }}/>
                                                                :
                                                                <Icon color={'#FFF'} size={20}
                                                                      name="picture-o"/>
                                                        }
                                                    </View>
                                                </TouchableWithoutFeedback>
                                                {
                                                    this.state.imgPreview3 !== ""
                                                    &&
                                                    <TouchableWithoutFeedback
                                                        onPress={this.onDeleteImg('imgPreview3', 'imgValue3', this.state.imgPreview3)}>
                                                        <View style={{
                                                            width: 25,
                                                            height: 25,
                                                            backgroundColor: '#E0E0E0',
                                                            position: 'absolute',
                                                            right: 0,
                                                            borderTopRightRadius: 5,
                                                            justifyContent: 'center',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Icon color={'#FFF'} size={12}
                                                                  name="times"/>
                                                        </View>
                                                    </TouchableWithoutFeedback>
                                                }
                                            </View>
                                            <View>
                                                <TouchableWithoutFeedback
                                                    onPress={this.state.imgPreview4.length > 0 ?()=>console.log("asd") : this.onPickImage('imgPreview4', 'imgValue4')}>
                                                    <View style={{
                                                        height: width / 3,
                                                        overflow: 'hidden',
                                                        borderRadius: 5,
                                                        width: width / 3,
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        backgroundColor: '#E3F2FD'
                                                    }}>
                                                        {
                                                            this.state.imgPreview4.length > 0
                                                                ?
                                                                <Image

                                                                    style={{width: width / 3, height: width / 3}}
                                                                    source={{
                                                                        isStatic: true,
                                                                        uri: this.state.imgPreview4
                                                                    }}/>
                                                                :
                                                                <Icon color={'#FFF'} size={20}
                                                                      name="picture-o"/>
                                                        }
                                                    </View>
                                                </TouchableWithoutFeedback>
                                                {
                                                    this.state.imgPreview4 !== ""
                                                    &&
                                                    <TouchableWithoutFeedback
                                                        onPress={this.onDeleteImg('imgPreview4', 'imgValue5', this.state.imgPreview4)}>
                                                        <View style={{
                                                            width: 25,
                                                            height: 25,
                                                            backgroundColor: '#E0E0E0',
                                                            position: 'absolute',
                                                            right: 0,
                                                            borderTopRightRadius: 5,
                                                            justifyContent: 'center',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Icon color={'#FFF'} size={12}
                                                                  name="times"/>
                                                        </View>
                                                    </TouchableWithoutFeedback>
                                                }
                                            </View>
                                            <View>
                                                <TouchableWithoutFeedback
                                                    onPress={this.state.imgPreview5.length > 0 ?()=>console.log("asd") : this.onPickImage('imgPreview5', 'imgValue5')}>
                                                    <View style={{
                                                        height: width / 3,
                                                        overflow: 'hidden',
                                                        borderRadius: 5,
                                                        width: width / 3,
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        backgroundColor: '#E3F2FD'
                                                    }}>
                                                        {
                                                            this.state.imgPreview5.length > 0
                                                                ?
                                                                <Image

                                                                    style={{width: width / 3, height: width / 3}}
                                                                    source={{
                                                                        isStatic: true,
                                                                        uri: this.state.imgPreview5
                                                                    }}/>
                                                                :
                                                                <Icon color={'#FFF'} size={20}
                                                                      name="picture-o"/>
                                                        }
                                                    </View>
                                                </TouchableWithoutFeedback>
                                                {
                                                    this.state.imgPreview5 !== ""
                                                    &&
                                                    <TouchableWithoutFeedback
                                                        onPress={this.onDeleteImg('imgPreview5', 'imgValue05', this.state.imgPreview5)}>
                                                        <View style={{
                                                            width: 25,
                                                            height: 25,
                                                            backgroundColor: '#E0E0E0',
                                                            position: 'absolute',
                                                            right: 0,
                                                            borderTopRightRadius: 5,
                                                            justifyContent: 'center',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Icon color={'#FFF'} size={12}
                                                                  name="times"/>
                                                        </View>
                                                    </TouchableWithoutFeedback>
                                                }
                                            </View>

                                        </View>
                                    </View>
                                    <InputTextArea
                                        onBlur={this.onValidate('value_address')}
                                        value={this.state.value_address}
                                        onChangeText={this.onChangeText('value_address')}
                                        // isError={this.state.input_error.value_address}
                                        label={'Recipient Address'}
                                    />
                                    <InputSelect
                                        // isError={cek_p}
                                        label={"Province"} onClick={this.onProvinceClick()}
                                        value={this.state.value_province}/>
                                    <InputSelect
                                        // isError={cek_d}
                                        label={"District"} value={this.state.value_district}
                                        onClick={this.state.value_province.length !== 0 ? this.onDistrictClick() : () => console.log("lala")}/>

                                    <InputSelect
                                        // isError={cek_s}
                                        label={"Sub District"} value={this.state.value_sub_district}
                                        onClick={this.state.value_province.length !== 0 && this.state.value_district.length !== 0 ? this.onSubDistrictClick() : () => console.log("lala")}/>
                                    <InputDate
                                        // isError={cek_e}
                                        label={"Donation end date"}
                                        onClick={this._showDateTimePicker}
                                        value={moment(this.state.value_end_date).format('LL')}/>
                                    <View style={{ marginBottom:10}}>
                                        <Text style={{fontSize: 12}}>Status</Text>

                                        <RadioForm
                                            formHorizontal={true}
                                            labelHorizontal={true}
                                            radioStyle={{ paddingRight: 20 }}
                                            radio_props={radio_props}
                                            initial={this.state.value_status === "publish"? 0 : 1}
                                            onPress={(v)=>this.setState({value_status:v})}
                                        />
                                    </View>

                                    <View style={{flex: 1}}>
                                        <DateTimePicker
                                            minimumDate={tomorrow}
                                            isVisible={this.state.isDateTimePickerVisible}
                                            onConfirm={this._handleDatePicked}
                                            onCancel={this._hideDateTimePicker}
                                        />
                                    </View>

                                    <Button block info onPress={this.onSave()}>
                                        <Text>Save</Text>
                                    </Button>
                                </View>
                        }
                    </Content>
            }
        </Container>;
    }
}

const styles = StyleSheet.create({

    wrapper: {
        paddingTop: 50,
        flex: 1
    },

    modal: {
        flex: 1
    },

    modal2: {
        height: 230,
        backgroundColor: "#3B5998"
    },

    modal3: {
        height: 300,
        width: 300
    },

    modal4: {
        height: 300
    },

    btn: {
        margin: 10,
        backgroundColor: "#3B5998",
        color: "white",
        padding: 10
    },

    btnModal: {
        position: "absolute",
        top: 0,
        right: 0,
        width: 50,
        height: 50,
        backgroundColor: "transparent"
    },

    text: {
        color: "black",
        fontSize: 22
    }

});

function mapStateToProps(state) {
    return {
        redUpdateReserve: state.redUpdateReserve,
    };
}

export default connect(
    mapStateToProps,
)(ScreenMyReserveDetail);
