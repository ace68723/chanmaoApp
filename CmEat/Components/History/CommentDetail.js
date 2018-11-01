'use strict';

import React, { Component } from 'react';
import {
  Alert,
  Clipboard,
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  InteractionManager,
  TextInput,
  Image,
  ImageBackground,
  Linking,
  Modal,
  Picker,
  Platform,
  DatePickerIOS,
  TimePickerAndroid,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import Label from '../../../App/Constants/AppLabel';
const  CmAlert = require('../../Modules/System/Alert');
const {height, width} = Dimensions.get('window');
const deviceHeight = height;
const deviceWidth = width;
let marginTop,headerHeight,acceptButtonHeight;
if(height == 812){
  //min 34
  //header 88 + swiper 200 - FlatList margin 34 + tabbar 30
  marginTop = 34;
  headerHeight = 88;
  acceptButtonHeight = 80;
}else{
  marginTop = 20;
  headerHeight = 64;
  acceptButtonHeight = 40;
}
import Header from '../General/Header';
import CommentsAction from '../../Actions/CommentsAction';
import CommentsStore from '../../Stores/CommentsStore';
import ModalBox from 'react-native-modalbox';
import PopupView from '../Popup/PopupView'

export default class pastOrderEN extends Component {
  constructor(props) {
      super(props);
      this.state = {
          complete_time: new Date(props.orderInfo.complete_time),
          driver_score: 0,
          driver_comment: "",
          restaurant_score: 0,
          restaurant_comment: "",
          dish_ratings: props.orderInfo.items,
          modalVisible: false,
          oid: props.orderInfo.order_oid,
          showHistoryOrderDetail: false,
          shouldDisable: false,
      };
      this._handleInputOnFocus = this._handleInputOnFocus.bind(this);
      this._handleDriverScore = this._handleDriverScore.bind(this);
      this._handleRestaurantScore = this._handleRestaurantScore.bind(this);
      this._handleDriverQuickComments = this._handleDriverQuickComments.bind(this);
      this._handleRestaurantQuickComments = this._handleRestaurantQuickComments.bind(this);
      this._handleDriverComments = this._handleDriverComments.bind(this);
      this._handleRestaurantComments = this._handleRestaurantComments.bind(this);
      this._handleDishLike = this._handleDishLike.bind(this);
      this._handleChangeTime = this._handleChangeTime.bind(this);
      this._handleTimeSelected = this._handleTimeSelected.bind(this);
      this._handleConfirm = this._handleConfirm.bind(this);
      this._showConfirmSection = this._showConfirmSection.bind(this);
      this._hideConfirmSection = this._hideConfirmSection.bind(this);
      this._renderConfirmSection = this._renderConfirmSection.bind(this);
      this._onChange = this._onChange.bind(this);

      this.popupView = PopupView.getInstance();
  }

  componentDidMount() {
    CommentsStore.addChangeListener(this._onChange);
    let _dish_ratings = [];
    for (let _dish of this.props.orderInfo.items) {
      _dish_ratings.push({name: _dish.ds_name, rating: 0, otid: _dish.otid});
    }
    this.setState({dish_ratings: _dish_ratings});
  }
  componentWillUnmount() {
    CommentsStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    const newState = CommentsStore.getState();
    if (newState.showReviewAdded) {
      this.props.setOnRefresh();
      this.props.navigator.dismissModal();
      if (newState.toStoreReview) {
        let url;
        if (Platform.OS == 'ios') {
          url = 'https://itunes.apple.com/ca/app/%E9%A6%8B%E7%8C%AB%E7%94%9F%E6%B4%BB/id888553991?mt=8';
        }
        else {
          url = 'https://play.google.com/store/apps/details?id=ca.chanmao.app';
        }

        this.popupView.setMessagePopup({
          title: "已成功评价",
          subtitle: "觉得馋猫棒棒哒?去评分吧!",
          confirmText: '前往',
          cancelText: '取消',
          onConfirm: ()=>{
            Linking.canOpenURL(url).then(supported => {
              supported && Linking.openURL(url);
            }, (err) => console.log(err));
          },
          onDismiss: () => {
            this.setState({showPopup: false})
          }
        });
        this.setState({showPopup: true});

        // Alert.alert(
        //   '已成功评价',
        //   '觉得馋猫棒棒哒?去评分吧!',
        //   [
        //     {text: '取消', onPress:()=>{} ,style: 'cancel'},
        //     {text:'前往', onPress:()=>{
        //       Linking.canOpenURL(url).then(supported => {
        //         supported && Linking.openURL(url);
        //       }, (err) => console.log(err));
        //     }}
        //   ]
        // )

      }
      else {
        CmAlert.errorAlert("已成功评价");
      }
    }
  }

  _handleInputOnFocus(offset) {
    this.refs.ScrollView.scrollTo({x:0,y:offset,animated:true})
  }

  _handleDriverScore(score) {
    this.setState({driver_score: score});
  }

  _handleRestaurantScore(score) {
    this.setState({restaurant_score: score});
  }

  _handleDriverQuickComments(text) {
    //Set the value of textinput by native props
    this.refs.driverComment.setNativeProps({text: this.state.driver_comment + " " + text + " "})

    this.setState({driver_comment: this.state.driver_comment + " " + text + " "})
  }

  _handleRestaurantQuickComments(text) {
    //Set the value of textinput by native props
    this.refs.restaurantComment.setNativeProps({text: this.state.restaurant_comment + " " + text + " "})

    this.setState({restaurant_comment: this.state.restaurant_comment + " " + text + " "})
  }

  _handleDriverComments(text) {
    this.setState({driver_comment: text});
  }

  _handleRestaurantComments(text) {
    this.setState({restaurant_comment: text});
  }

  _handleDishLike(dish) {
    let _dish_ratings = this.state.dish_ratings;
    _dish_ratings.map((_dish) => {
      if (_dish.name == dish.name) {
        if (_dish.rating == 1) {
          return _dish;
        }
        else {
          _dish.rating = 1;
          return _dish;
        }
      }
    })
    this.setState({dish_ratings: _dish_ratings});
  }

  _handleDishDislike(dish) {
    let _dish_ratings = this.state.dish_ratings;
    _dish_ratings.map((_dish) => {
      if (_dish.name == dish.name) {
        if (_dish.rating == -1) {
          return _dish;
        }
        else {
          _dish.rating = -1;
          return _dish;
        }
      }
    })
    this.setState({dish_ratings: _dish_ratings});
  }

  async _handleChangeTime() {
    if (Platform.OS == 'ios') {
      this.setState({modalVisible: true});
    }
    else {
      try {
        const {action, hour, minute} = await TimePickerAndroid.open({
          hour: parseInt(this.state.complete_time.split(' ')[4].split(':')[0]),
          minute: parseInt(this.state.complete_time.split(' ')[4].split(':')[1]),
          is24Hour: true, // Will display '2 PM'
        });
        if (action !== TimePickerAndroid.dismissedAction) {
          // Selected hour (0-23), minute (0-59)
          let cur_hour_minute = this.state.complete_time.split(' ')[4];
          let cur_hour = cur_hour_minute.split(':')[0];
          let cur_minute = cur_hour_minute.split(':')[1];
          let cur_second = cur_hour_minute.split(':')[2];
          let target_hour_minute = hour.toString() + ":" + minute.toString() + ":" + cur_second;
          let target_time = this.state.complete_time.split(' ')[0] + ' ' +
                           this.state.complete_time.split(' ')[1] + ' ' +
                           this.state.complete_time.split(' ')[2] + ' ' +
                           this.state.complete_time.split(' ')[3] + ' ' +
                           target_hour_minute  + ' ' +
                           this.state.complete_time.split(' ')[5] + ' ' +
                           this.state.complete_time.split(' ')[5];
          this.setState({complete_time: target_time});
        }
      } catch ({code, message}) {
        console.warn('Cannot open time picker', message);
      }
    }
  }

  _handleTimeSelected(date) {
    this.setState({complete_time: date});
  }

  _showConfirmSection() {
    if (this.state.driver_score === 0 || this.state.restaurant_score === 0) {
      alert(Label.getCMLabel('PLEASE_COMMENT'));
    }
    else {
      this.setState({showHistoryOrderDetail: true});
    }
  }
  _hideConfirmSection() {
    this.setState({showHistoryOrderDetail: false});
  }

  _handleConfirm() {
    if (this.state.shouldDisable) {
      return;
    }
    else {
      this.setState({showHistoryOrderDetail: false, shouldDisable: true});
      let dish_ratings = this.state.dish_ratings;
      dish_ratings.map((_dish) => {
        delete _dish['name'];
        return _dish;
      })
      const data = {
        complete_time: this.state.complete_time,
        oid: this.state.oid,
        driver_score: this.state.driver_score,
        driver_comment: this.state.driver_comment,
        restaurant_score: this.state.restaurant_score,
        restaurant_comment: this.state.restaurant_comment,
        dish_ratings: dish_ratings,
      }
      CommentsAction.addReview(data);
    }
  }

  _renderConfirmSection() {
    return (
      <View style={{flex: 1}}>
          <View style={{flex: 1,
                        marginTop: 5,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        borderColor: '#bdc8d9'}}>
              <Text style={{fontSize:20,
                            textAlign:'center',
                            paddingBottom:10,
                            fontFamily:'NotoSansCJKsc-Regular'}}
                    allowFontScaling={false}>
              {Label.getCMLabel('CONFIRM_COMMENT')}</Text>
          </View>
          <View style={{flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'}}>
            <View style={{flex: 1,
                          borderRightWidth: 1,
                          borderColor: '#bdc8d9'}}>
                <TouchableOpacity style={{flex: 1,
                                          justifyContent: 'center'}}
                                  onPress={this._hideConfirmSection}>
                    <Text style={{alignSelf: 'center',
                                  fontSize:18,
                                  textAlign:'center',
                                  fontFamily:'NotoSansCJKsc-Regular'}}
                          allowFontScaling={false}>
                    {Label.getCMLabel('CANCEL')}</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{flex: 1}}
                              onPress={this._handleConfirm}>
                <Text style={{fontSize:18,
                              textAlign:'center',
                              color: '#ff8b00',
                              fontFamily:'NotoSansCJKsc-Regular'}}
                      allowFontScaling={false}>
                {Label.getCMLabel('CONFIRM')}</Text>
            </TouchableOpacity>
          </View>
      </View>
    )
  }

  _renderDriverComments() {
    const starList = () => {
      let _starList = [];
      let list = [1, 2, 3, 4, 5];
      for (let i of list.splice(0, this.state.driver_score)) {
        _starList.push(
          <TouchableOpacity key={i} onPress={() => this._handleDriverScore(i)}>
            <Image style={{width:35,height:35}}source={require('./Image/yellow_star.png')}/>
          </TouchableOpacity>
        )
      }
      for (let i of list.splice(0, 5)) {
        _starList.push(
          <TouchableOpacity key={i} onPress={() => this._handleDriverScore(i)}>
            <Image style={{width:35,height:35}}source={require('./Image/grey_star.png')}/>
          </TouchableOpacity>
        )
      }
      return _starList;
    };
    const commentList = () => {
      let _commentList = [];
      let list = [Label.getCMLabel('ON_TIME'),
                  Label.getCMLabel('POLITE'),
                  Label.getCMLabel('QUICK'),
                  Label.getCMLabel('WELL_SERVERED'),
                  Label.getCMLabel('DELIVERY_TO_DOOR'),
                  Label.getCMLabel('WARM_DISH'),
                  Label.getCMLabel('WELL_PACKAGING')];
      for (let text of list) {
        _commentList.push(
          <TouchableOpacity key={text} onPress={() => this._handleDriverQuickComments(text)}>
              <Text style={{marginRight: 20,
                            padding: 6,
                            borderRadius: 15,
                            borderWidth: StyleSheet.hairlineWidth,
                            borderColor: '#bdc8d9',
                            marginBottom: 5,
                            fontFamily:'NotoSansCJKsc-Regular'}}
                    allowFontScaling={false}>
                    {text}
              </Text>
          </TouchableOpacity>
        )
      }
      return _commentList;
    };
    const driverHeader = () => {
      if (this.props.orderInfo.complete_time) {
        return (
          <View style={{flexDirection: 'row',
                        // padding: 20,
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        borderBottomColor: '#bdc8d9',
                        alignItems: 'center',
                        justifyContent:'center',
                      }}>
              <Image style={{width:100,height:100}}source={require('./Image/chanmao_logo.png')}/>
              <View style={{flex: 1,
                            flexDirection: 'column',
                            marginLeft: 10}}>
                  <Text style={{fontSize: 18,
                                fontFamily:'NotoSansCJKsc-Regular'}}
                        allowFontScaling={false}>
                        {Label.getCMLabel('CM_DELIVERY')}
                  </Text>
                  <Text style={{fontSize: 14,
                                fontFamily:'NotoSansCJKsc-Regular'}}
                        allowFontScaling={false}>
                      {Label.getCMLabel('COMPLETE_TIME_PREFIX')}{this.state.complete_time.toString().split(" ")[4]}{Label.getCMLabel('COMPLETE_TIME_SUFFIX')}
                  </Text>
              </View>

              <TouchableOpacity  onPress={this._handleChangeTime}>
                <View style={{flexDirection: 'row',
                              alignItems: 'center',
                              marginRight:10,
                            }}>
                  <Text style={{color: '#ff8b00', fontSize: 14, fontFamily:'NotoSansCJKsc-Regular'}}
                        allowFontScaling={false}>
                  {Label.getCMLabel('CHANGE_COMMENT')}</Text>
                  <Text allowFontScaling={false}
                        style={{width: 14,
                                height: 14,
                                fontSize: 11,
                                textAlign: 'center',
                                color: '#ff8b00',
                                borderWidth: StyleSheet.hairlineWidth,
                                borderColor: '#ff8b00',
                                borderRadius: 7,
                                fontFamily:'NotoSansCJKsc-Regular'}}>
                                >
                  </Text>
                </View>
              </TouchableOpacity>
          </View>
        )
      }
      else {
        return (
          <View style={{flexDirection: 'row',
                        // padding: 20,
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        borderBottomColor: '#bdc8d9',
                        alignItems: 'center',
                        justifyContent:'center',
                      }}>
              <Image style={{width:100,height:100, marginLeft: 20}}source={require('./Image/chanmao_logo.png')}/>
              <View style={{flex: 1,
                            flexDirection: 'column',
                            marginLeft: 10}}>
                  <Text style={{fontSize: 18,
                                fontFamily:'NotoSansCJKsc-Regular'}}
                        allowFontScaling={false}>
                        {Label.getCMLabel('CM_DELIVERY')}
                  </Text>
              </View>
          </View>
        )
      }
    }
    return (
      <View style={{marginTop: 10,
                    backgroundColor: 'white',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    borderBottomColor: '#bdc8d9'}}>
          {driverHeader()}
          <View style={{padding: 20}}>
              <Text allowFontScaling={false}
                    style={{textAlign: 'center', marginBottom: 20, fontFamily:'NotoSansCJKsc-Regular'}}>
              {Label.getCMLabel('RATE_DELIVERY')}</Text>
              <View style={{flexDirection: 'row',
                            justifyContent: 'space-around',
                            marginBottom: 20,
                            marginLeft: 10,
                            marginRight: 10}}>
                  {starList()}
              </View>
              <View style={{marginBottom: 20,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            flexWrap: 'wrap'}}>
                  {commentList()}
              </View>
              <TextInput style={{height: 80,
                                 borderWidth: StyleSheet.hairlineWidth,
                                 borderColor: '#bdc8d9',
                                 textAlignVertical: 'top',
                                 padding: 10,
                                 fontFamily:'NotoSansCJKsc-Regular'}}
                         ref={'driverComment'}
                         allowFontScaling={false}
                         underlineColorAndroid='transparent'
                         placeholder={Label.getCMLabel('COMMENT_PLACEHOLDER')}
                         onFocus={() => this._handleInputOnFocus(50)}
                         onChangeText={(text) => this._handleDriverComments(text)}
                         multiline = {true}>
              </TextInput>
          </View>
      </View>
    );
  }
  _renderRestaurantComments() {
    const starList = () => {
      let _starList = [];
      let list = [1, 2, 3, 4, 5];
      for (let i of list.splice(0, this.state.restaurant_score)) {
        _starList.push(
          <TouchableOpacity key={i}
                            onPress={() => this._handleRestaurantScore(i)}>
            <Image style={{width:35,height:35}}source={require('./Image/yellow_star.png')}/>
          </TouchableOpacity>
        )
      }
      for (let i of list.splice(0, 5)) {
        _starList.push(
          <TouchableOpacity key={i}
                            onPress={() => this._handleRestaurantScore(i)}>
            <Image style={{width:35,height:35}}source={require('./Image/grey_star.png')}/>
          </TouchableOpacity>
        )
      }
      return _starList;
    };
    const commentList = () => {
      let _commentList = [];
      let list = [Label.getCMLabel('NICE_PACKAGING'),
                  Label.getCMLabel('WORTHY'),
                  Label.getCMLabel('TASTY'),
                  Label.getCMLabel('ECONOMICAL'),
                  Label.getCMLabel('LARGE_AMOUNT')];
      for (let text of list) {
        _commentList.push(
          <TouchableOpacity key={text} onPress={() => this._handleRestaurantQuickComments(text)}>
              <Text allowFontScaling={false}
                    style={{marginRight: 20,
                            padding: 6,
                            borderRadius: 15,
                            borderWidth: StyleSheet.hairlineWidth,
                            borderColor: '#bdc8d9',
                            marginBottom: 5,
                            fontFamily:'NotoSansCJKsc-Regular'}}>
                    {text}
              </Text>
          </TouchableOpacity>
        )
      }
      return _commentList;
    };
    const dishList = () => {
      let _dishList = [];
      let list = this.state.dish_ratings;
      for (let dish of list) {
        let thump_up_color = '#a5a5a5';
        let thump_down_color = '#a5a5a5';
        let thump_up_url = "./Image/grey_thump_up.png";
        let thump_down_url = "./Image/grey_thump_down.png";
        if (dish.rating == 1) {
          thump_up_color = '#ff8b00';
          thump_up_url = "./Image/thump_up.png";
        }
        else if (dish.rating == -1) {
          thump_down_color = '#ff8b00';
          thump_down_url = "./Image/thump_down.png";
        }
        const thump_up_image = () => {
          if (dish.rating == 1) {
            return (<Image style={{marginLeft: 5, width:20,height:20}} source={require('./Image/thump_up.png')}/>)
          }
          else {
            return (<Image style={{marginLeft: 5, width:20,height:20}} source={require('./Image/grey_thump_up.png')}/>)
          }
        }
        const thump_down_image = () => {
          if (dish.rating == -1) {
            return (<Image style={{marginLeft: 5, width:20,height:20}} source={require('./Image/thump_down.png')}/>)
          }
          else {
            return (<Image style={{marginLeft: 5, width:20,height:20}} source={require('./Image/grey_thump_down.png')}/>)
          }
        }
        _dishList.push(
          <View key={dish.otid} style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12}}>
            <Text allowFontScaling={false}
                  style={{color: '#a5a5a5', fontFamily:'NotoSansCJKsc-Regular'}}>{dish.name}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity style={{flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 15,
                                        borderWidth: StyleSheet.hairlineWidth,
                                        borderColor: thump_up_color,
                                        height: 28,
                                        marginRight: 20}}
                                onPress={() => this._handleDishLike(dish)}>
                {thump_up_image()}
                <Text allowFontScaling={false}
                      style={{marginLeft: 5,
                              marginRight: 5,
                              fontSize: 16,
                              color: thump_up_color,
                              fontFamily:'NotoSansCJKsc-Regular'}}>
                      {Label.getCMLabel('LIKE')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 15,
                                        borderWidth: StyleSheet.hairlineWidth,
                                        borderColor: thump_down_color,
                                        height: 28,}}
                                onPress={() => this._handleDishDislike(dish)}>
                {thump_down_image()}
                <Text allowFontScaling={false}
                      style={{marginLeft: 5,
                              marginRight: 5,
                              fontSize: 16,
                              color: thump_down_color,
                              fontFamily:'NotoSansCJKsc-Regular'}}>
                      {Label.getCMLabel('DISLIKE')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      }
      return _dishList;
    };
    return(
      <View style={{marginTop: 10,
                    backgroundColor: 'white',
                    borderTopWidth: StyleSheet.hairlineWidth,
                    borderTopColor: '#bdc8d9',
                    marginBottom: 20}}>
          <ImageBackground style={{height: 110, width: width,alignSelf:'center'}} source={{uri:this.props.orderInfo.rr_url}}>
            <View style={styles.opacityView}/>
              <View style={styles.imageTextContainer}>
                <Text allowFontScaling={false}
                      style={styles.imageText} >
                      {this.props.orderInfo.rr_name}
                </Text>
              </View>
          </ImageBackground>
          <View style={{padding: 20}}>
              <View style={{marginBottom: 20,
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            marginLeft: 10,
                            marginRight: 10}}>
                  {starList()}
              </View>
              <View style={{marginBottom: 20,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            flexWrap: 'wrap'}}>
                  {commentList()}
              </View>
              <TextInput style={{height: 80,
                                 marginBottom: 20,
                                 borderWidth: StyleSheet.hairlineWidth,
                                 borderColor: '#bdc8d9',
                                 textAlignVertical: 'top',
                                 padding: 10,
                                 fontFamily:'NotoSansCJKsc-Regular'}}
                         ref={'restaurantComment'}
                         allowFontScaling={false}
                         underlineColorAndroid='transparent'
                         placeholder={Label.getCMLabel('RESTAURANT_PLACEHOLDER')}
                         onFocus={() => this._handleInputOnFocus(435)}
                         onChangeText={(text) => this._handleRestaurantComments(text)}
                         multiline = {true}>
              </TextInput>
              {dishList()}
          </View>
      </View>
    );
  }
  _renderTimePicker() {
    if (Platform.OS == 'ios') {
      return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}>
          <TouchableOpacity style={{flex: 1}}
            onPressIn={() => this.setState({modalVisible: false})}>
            <View
                style={{position: 'absolute',
                        height: 216 + acceptButtonHeight,
                        width: width,
                        bottom: 0,
                        backgroundColor: '#d4d4d4'}}>
                <DatePickerIOS
                  mode='time'
                  date={new Date(this.state.complete_time)}
                  onDateChange={(value) => this._handleTimeSelected(value)}
                />
              <TouchableOpacity
                style={{backgroundColor: '#ff8b00',
                        padding: 15,
                        height: acceptButtonHeight,
                        justifyContent: 'center'}}
                onPress={() => this.setState({modalVisible: false})}>
                  <Text allowFontScaling={false}
                        style={{textAlign: 'center',
                                color: 'white',
                                fontSize: 18,
                                fontFamily:'NotoSansCJKsc-Regular'}}>
                    {Label.getCMLabel('CONFIRM')}
                  </Text>
                </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      )
    }
  }
  // <View style={styles.container} >
  //     <Header title={'评价'}
  //             goBack={this.props.goBack}
  //             leftButtonText={'x'}/>
  //     <Animated.View style={{top:this.state.inputPaddingTop}}>
  //         <ScrollView keyboardShouldPersistTaps={'always'}
  //                     keyboardDismissMode={'on-drag'}
  //                     scrollEventThrottle={0}
  //                     onScroll={(e) => this._resetPaddingTop()}
  //                     style={{top: 0}}>
  //             {this._renderDriverComments()}
  //             {this._renderRestaurantComments()}
  //         </ScrollView>
  //     </Animated.View>
  //
  // </View>
  render() {
      return(
        <View style={styles.container} >
          {this.state.showPopup && this.popupView.show()}
            <Header title={Label.getCNLabel('COMMENT')}
                    goBack={this.props.goBack}
                    leftButtonText={'x'}/>
                <ScrollView ref="ScrollView"
                            keyboardShouldPersistTaps={'always'}
                            keyboardDismissMode={Platform.OS === 'ios' ?'on-drag':'none'}>
                    {this._renderDriverComments()}
                    {this._renderRestaurantComments()}
                </ScrollView>
                <TouchableOpacity
                    style={{backgroundColor: '#ff8b00', height: acceptButtonHeight, justifyContent: 'center'}}
                    onPress={this._showConfirmSection}>
                  <Text style={{textAlign: 'center',
                                color: 'white',
                                fontSize: 18,
                                fontFamily:'NotoSansCJKsc-Regular'}}
                        allowFontScaling={false}>
                    {Label.getCMLabel('CONFIRM')}
                  </Text>
                </TouchableOpacity>
                {this._renderTimePicker()}

                <ModalBox style={styles.modal}
   						 			 position={"center"}
   						 			 isOpen={this.state.showHistoryOrderDetail}
   						 			 onClosed={this._hideConfirmSection}
   						 			 swipeToClose={false}>
   						 		 {this._renderConfirmSection()}
   						 </ModalBox>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#ffffff',
  },
  modal: {
		justifyContent: 'center',
		height: 100,
		width: 280,
	},
  opacityView:{
    flex:1,
    opacity: 0.3,
    backgroundColor:'#000000'
  },
  imageTextContainer:{
    position:'absolute',
    left:0,
    top:0,
    right:0,
    bottom:0,
    backgroundColor:'rgba(0,0,0,0)',
    //flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageText: {
   fontSize: 20,
   color:'white',
   alignSelf:'center',
   fontFamily:'NotoSansCJKsc-Black',
  },
});
