import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Dimensions,
    StyleSheet,
    FlatList,
    TouchableWithoutFeedback,
    TouchableHighlight,
    ImageStore,
    Image
} from "react-native"
import {Button, Container, Content, Input, Item, Text, Textarea, View} from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modalbox';
import CheckBox from 'react-native-check-box'
import Api from "../../Utils/Api";
import {InputText, InputSelect, InputDate, InputTextArea} from "../../Components/Input";
import ImagePicker from "react-native-image-picker";
import ImageResizer from 'react-native-image-resizer'
import DateTimePicker from 'react-native-modal-datetime-picker';
import {jsDateToSqlD} from "../../Utils/func";
import moment from 'moment';
import "moment/locale/en-au";
import {actAddReserve} from "./action";
import Snackbar from 'react-native-snackbar';
import Spinner from 'react-native-spinkit'

const errors = {}
const width = (Dimensions.get('window').width - 50);
const val = [];
const img = [];
let options = {
    title: 'Select Image',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};
let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 7)

class ScreenCreateReserve extends Component {
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
            isOpen: false,
            isProvinceOpen: false,
            isDistrictModalOpen: false,
            isSubDistrictModalOpen: false,
            isDisabled: false,
            swipeToClose: true,
            sliderValue: 0.3,
            data: [],
            data_kat: [],
            province: [],
            district: [],
            sub_district: [],
            province_value: '',
            district_value: '',
            sub_district_value: '',
            keyword: '',
            data_image: [],
            isDateTimePickerVisible: false,
            endDatePreview: '',
            endDateSave: '',
            value_title: '',
            value_reserve_name: '',
            value_description: '',
            value_note: '',
            value_reserve_cp: '',
            value_address: '',
            input_error: [],
            initialRedAddReserve: true,
            create_loading : false
        }
    }

    componentDidMount() {
        let params = {}
        Api._POST('category/category_book', params).then((response) => {
            if (response.data.status) {
                this.setState({
                    data: response.data.result
                })
            }
        })

        Api._POST('location/province', params).then((response) => {
            this.setState({
                province: response.data
            })
        })
    }


    componentDidUpdate(prevProps, prevState) {
        if (prevState.initialRedAddReserve === this.props.redAddReserve.status) {
            if (this.props.redAddReserve.status_add) {
                this.componentDidMount();
                this.setState({
                    create_loading:false,
                    input_error: [],
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
                    data: [],
                    data_kat: [],
                    province: [],
                    district: [],
                    sub_district: [],
                    value_title: "",
                    value_description: "",
                    value_note: "",
                    value_reserve_name: "",
                    value_reserve_cp: "",
                    value_address: "",
                    province_value: "",
                    district_value: "",
                    sub_district_value: "",
                    endDateSave: "",
                    endDatePreview: ""
                })
                Snackbar.show({
                    title: 'Create reserve success',
                    duration: Snackbar.LENGTH_LONG,
                });
            } else {
                Snackbar.show({
                    title: 'Create reserve failed',
                    duration: Snackbar.LENGTH_LONG,
                });
            }
            this.props.dispatch({type: 'RESET_ADD_RESERVE'})
        }
    }

    _showDateTimePicker = () => this.setState({isDateTimePickerVisible: true});

    _hideDateTimePicker = () => this.setState({isDateTimePickerVisible: false});

    _handleDatePicked = (date) => {
        this.setState({
            endDatePreview: moment(date).format('LL'),
            endDateSave: jsDateToSqlD(date.toISOString())
        })
        this._hideDateTimePicker();
    };
    onOpenClick = () => {
        return () => {
            this.setState({
                isOpen: true
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
                par_province_name: this.state.province_value
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
                par_district_name: this.state.district_value
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
    onClose = () => {
        return () => {
            this.setState({
                isProvinceOpen: false,
                isDistrictModalOpen: false,
                isSubDistrictModalOpen: false,
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
    onCreate = () => {
        return () => {
            let count_errors = [];
            let words = this.state.data;
            let img_ = [];
            this.state.imgValue0 !== "" && img_.push(this.state.imgValue0)
            this.state.imgValue1 !== "" && img_.push(this.state.imgValue1)
            this.state.imgValue2 !== "" && img_.push(this.state.imgValue2)
            this.state.imgValue3 !== "" && img_.push(this.state.imgValue3)
            this.state.imgValue4 !== "" && img_.push(this.state.imgValue4)
            this.state.imgValue5 !== "" && img_.push(this.state.imgValue5)

            const result = words.filter(word => word.check);
            if (this.state.value_title.length < 1) {
                errors['value_title'] = {error: true, error_message: 'required'}
                count_errors.push({value_title: true})
            }
            if (this.state.value_description.length < 1) {
                errors['value_description'] = {error: true, error_message: 'required'}
                count_errors.push({value_description: true})
            }
            if (this.state.value_reserve_name.length < 1) {
                errors['value_reserve_name'] = {error: true, error_message: 'required'}
                count_errors.push({value_reserve_name: true})
            }
            if (this.state.value_reserve_cp.length < 1) {
                errors['value_reserve_cp'] = {error: true, error_message: 'required'}
                count_errors.push({value_reserve_cp: true})
            }
            if (this.state.value_address.length < 1) {
                errors['value_address'] = {error: true, error_message: 'required'}
                count_errors.push({value_address: true})
            }
            if (this.state.province_value.length < 1) {
                errors['province_value'] = {error: true, error_message: 'required'}
                count_errors.push({province_value: true})
            } else {
                errors['province_value'] = {error: false, error_message: 'required'}
                count_errors.push()
            }
            if (this.state.district_value.length < 1) {
                errors['district_value'] = {error: true, error_message: 'required'}
                count_errors.push({district_value: true})
            } else {
                errors['district_value'] = {error: false, error_message: 'required'}
                count_errors.push()
            }
            if (this.state.sub_district_value.length < 1) {
                errors['sub_district_value'] = {error: true, error_message: 'required'}
                count_errors.push({sub_district_value: true})
            } else {
                errors['sub_district_value'] = {error: false, error_message: 'required'}
                count_errors.push()
            }
            if (this.state.endDateSave.length < 1) {
                errors['endDateSave'] = {error: true, error_message: 'required'}
                count_errors.push({endDateSave: true})
            } else {
                errors['endDateSave'] = {error: false, error_message: 'required'}
                count_errors.push()
            }
            if (result.length < 1) {
                errors['category_value'] = {error: true, error_message: 'required'}
                count_errors.push({category_value: true})
            } else {
                errors['category_value'] = {error: false, error_message: 'required'}
                count_errors.push()
            }
            if (img_ < 4) {
                errors['value_img'] = {error: true, error_message: 'required'}
                count_errors.push({value_title: true})
            } else {
                errors['value_img'] = {error: false, error_message: 'required'}
                count_errors.push()
            }


            if (count_errors.length < 1) {
                let params = {
                    par_title: this.state.value_title,
                    par_kategory: JSON.stringify(words),
                    par_description: this.state.value_description,
                    par_note: this.state.value_note,
                    par_reserve_name: this.state.value_reserve_name,
                    par_reserve_cp: this.state.value_reserve_cp,
                    par_address: this.state.value_address,
                    par_province: this.state.province_value,
                    par_district: this.state.district_value,
                    par_sub_district: this.state.sub_district_value,
                    par_end_date: this.state.endDateSave,
                    par_create_by: this.props.redAuth.data.profile.user_id
                }
                this.setState({
                    create_loading:true
                })
                this.props.dispatch(actAddReserve(params, img_));
            } else {
                this.setState({
                    input_error: errors,
                })
            }

        }
    }
    onDeleteImg = (prev, val) => {
        return () => {
            let state = {};
            state[prev] = "";
            state[val] = "";
            this.setState(state)
        }
    }

    render() {
        let cek = typeof this.state.input_error.value_img === 'undefined' ? false : this.state.input_error.value_img.error;
        let cek_p = typeof this.state.input_error.province_value === 'undefined' ? false : this.state.input_error.province_value.error;
        let cek_d = typeof this.state.input_error.district_value === 'undefined' ? false : this.state.input_error.district_value.error;
        let cek_s = typeof this.state.input_error.sub_district_value === 'undefined' ? false : this.state.input_error.sub_district_value.error;
        let cek_e = typeof this.state.input_error.endDateSave === 'undefined' ? false : this.state.input_error.endDateSave.error;
        let cek_c = typeof this.state.input_error.category_value === 'undefined' ? false : this.state.input_error.category_value.error;
        return (
            <Container>
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
                        <Text>
                            Create Reserve
                        </Text>
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Button full transparent light>
                            <Icon color={'#000000'} size={20}
                                  name="check"/>
                        </Button>
                    </View>
                </View>
                <Modal position={"center"}
                       style={{width: 300, height: 100, justifyContent:'center',alignItems:'center'}}
                       swipeToClose={false}
                       isOpen={this.state.create_loading}
                       backdropPressToClose={false}>
                    <View style={{justifyContent:'center',alignItems:'center'}}>
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
                    <View style={{padding: 5, marginTop: 30}}>
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
                    <View style={{position: 'absolute', bottom: 0, width: '100%', padding: 5, flexDirection: 'row'}}>
                        <Button block info style={{justifyContent: 'center', width: '100%'}}
                                onPress={this.onPickClick()}>
                            <Icon color={'#FFF'} size={20}
                                  name="plus"/>
                        </Button>
                    </View>
                </Modal>
                <Modal position={"center"}
                       style={[styles.modal, styles.modal3]}
                       swipeToClose={false}
                       isOpen={this.state.isProvinceOpen}
                       backdropPressToClose={false}>
                    <View style={{flexDirection: 'column', padding: 5, marginBottom:50}}>
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
                                    <TouchableHighlight onPress={this.onPress('province_value', item.province)}>
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
                    <View style={{flexDirection: 'column', padding: 5, marginBottom:50}}>
                        <View style={{width: '100%'}}>
                            <FlatList
                                data={this.state.district}
                                keyExtractor={(item, index) => '' + index}
                                renderItem={({item, index}) =>
                                    <TouchableHighlight onPress={this.onPress('district_value', item.district)}>
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
                    <View style={{flexDirection: 'column', padding: 5, marginBottom:50}}>
                        <View style={{width: '100%'}}>
                            <FlatList
                                data={this.state.sub_district}
                                keyExtractor={(item, index) => '' + index}
                                renderItem={({item, index}) =>
                                    <TouchableHighlight onPress={this.onPress('sub_district_value', item.subdistrict)}>
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
                <Content style={{backgroundColor: '#FFF'}}>

                    <View style={{margin: 10}}>
                        <InputText
                            onBlur={this.onValidate('value_title')}
                            isError={this.state.input_error.value_title}
                            label={"Title"}
                            value={this.state.value_title}
                            onChangeText={this.onChangeText('value_title')}/>
                        <View>
                            <Text style={{fontSize: 12}}>Kind of book (Click plus button to add book)</Text>
                            {
                                cek_c
                                &&
                                <Text style={{fontSize: 12, color: 'red'}}>please select category</Text>
                            }
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
                                                    <Item regular style={{height: 30, borderColor: '#FFF'}}>
                                                        <Input keyboardType="numeric" style={{fontSize: 12}}
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
                                            <TouchableWithoutFeedback key={k} onPress={this.onCheck(v.value, k)}>
                                                <View style={{width: '70%', flexDirection: 'row', paddingLeft: 5}}>
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
                            <Button info style={{width: 50, justifyContent: 'center'}} onPress={this.onOpenClick()}>
                                <Icon color={'#FFF'} size={20}
                                      name="plus"/>
                            </Button>
                        </View>
                        <InputTextArea
                            onBlur={this.onValidate('value_description')}
                            value={this.state.value_description}
                            onChangeText={this.onChangeText('value_description')}
                            isError={this.state.input_error.value_description}
                            label={'Description'}
                        />
                        <InputText
                            value={this.state.value_note}
                            onChangeText={this.onChangeText('value_note')}
                            label={"Note"}/>
                        <InputText
                            onBlur={this.onValidate('value_reserve_name')}
                            isError={this.state.input_error.value_reserve_name}
                            value={this.state.value_reserve_name}
                            onChangeText={this.onChangeText('value_reserve_name')}
                            label={"Recipient name"}/>
                        <InputText
                            onBlur={this.onValidate('value_reserve_cp')}
                            isError={this.state.input_error.value_reserve_cp}
                            value={this.state.value_reserve_cp}
                            onChangeText={this.onChangeText('value_reserve_cp')}
                            label={"Reserve Contact Person"}/>
                        <View style={{marginTop: 5, marginBottom: 5}}>
                            <Text style={{fontSize: 12, marginBottom: 5}}>Image (Click plus button to add image)</Text>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}>
                                <View>

                                    <TouchableWithoutFeedback onPress={this.onPickImage('imgPreview0', 'imgValue0')}>
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
                                                        source={{isStatic: true, uri: this.state.imgPreview0}}/>
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
                                            onPress={this.onDeleteImg('imgPreview0', 'imgValue0')}>
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
                                    <TouchableWithoutFeedback onPress={this.onPickImage('imgPreview1', 'imgValue1')}>
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
                                                        source={{isStatic: true, uri: this.state.imgPreview1}}/>
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
                                            onPress={this.onDeleteImg('imgPreview1', 'imgValue1')}>
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
                                    <TouchableWithoutFeedback onPress={this.onPickImage('imgPreview2', 'imgValue2')}>
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
                                                        source={{isStatic: true, uri: this.state.imgPreview2}}/>
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
                                            onPress={this.onDeleteImg('imgPreview2', 'imgValue2')}>
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
                                    <TouchableWithoutFeedback onPress={this.onPickImage('imgPreview3', 'imgValue3')}>
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
                                                        source={{isStatic: true, uri: this.state.imgPreview3}}/>
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
                                            onPress={this.onDeleteImg('imgPreview3', 'imgValue3')}>
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
                                    <TouchableWithoutFeedback onPress={this.onPickImage('imgPreview4', 'imgValue4')}>
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
                                                        source={{isStatic: true, uri: this.state.imgPreview4}}/>
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
                                            onPress={this.onDeleteImg('imgPreview4', 'imgValue5')}>
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
                                    <TouchableWithoutFeedback onPress={this.onPickImage('imgPreview5', 'imgValue5')}>
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
                                                        source={{isStatic: true, uri: this.state.imgPreview5}}/>
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
                                            onPress={this.onDeleteImg('imgPreview5', 'imgValue05')}>
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
                            {
                                cek && <Text style={{fontSize: 12, color: 'red'}}>has at least 3 pictures</Text>
                            }
                        </View>
                        <InputTextArea
                            onBlur={this.onValidate('value_address')}
                            value={this.state.value_address}
                            onChangeText={this.onChangeText('value_address')}
                            isError={this.state.input_error.value_address}
                            label={'Address'}
                        />
                        <InputSelect isError={cek_p} label={"Province"} onClick={this.onProvinceClick()}
                                     value={this.state.province_value}/>
                        <InputSelect isError={cek_d} label={"District"} value={this.state.district_value}
                                     onClick={this.state.province_value.length !== 0 ? this.onDistrictClick() : () => console.log("lala")}/>
                        <InputSelect isError={cek_s} label={"Sub District"} value={this.state.sub_district_value}
                                     onClick={this.state.province_value.length !== 0 && this.state.district_value.length !== 0 ? this.onSubDistrictClick() : () => console.log("lala")}/>
                        {/*<InputText label={"Location"}/>*/}
                        <InputDate isError={cek_e} label={"Donation end date"} onClick={this._showDateTimePicker}
                                   value={this.state.endDatePreview}/>
                        <View style={{flex: 1}}>
                            <DateTimePicker
                                minimumDate={tomorrow}
                                isVisible={this.state.isDateTimePickerVisible}
                                onConfirm={this._handleDatePicked}
                                onCancel={this._hideDateTimePicker}
                            />
                        </View>
                    </View>
                    <Button block info onPress={this.onCreate()}>
                        <Text>Create</Text>
                    </Button>
                </Content>
            </Container>
        );
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
        redAuth: state.redAuth,
        redAddReserve: state.redAddReserve
    };
}

export default connect(
    mapStateToProps,
)(ScreenCreateReserve);
