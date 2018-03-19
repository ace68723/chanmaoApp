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
  Modal,
  Picker,
  DatePickerIOS,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';

const { width } = Dimensions.get('window');
import Header from '../General/Header';
import HistoryAction from '../../Actions/HistoryAction';
import HistoryStore from '../../Stores/HistoryStore';
export default class pastOrderEN extends Component {
  constructor(props) {
      super(props);
      this.state = {
          complete_time: "",
          driver_score: 0,
          driver_comment: "",
          restaurant_score: 0,
          restaurant_comment: "",
          dish_ratings: props.orderInfo.items,
          modalVisible: false,
          oid: props.orderInfo.order_oid,
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
      this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    HistoryStore.addChangeListener(this._onChange);
    let _dish_ratings = [];
    for (let _dish of this.props.orderInfo.items) {
      _dish_ratings.push({name: _dish.ds_name, rating: 0, otid: _dish.otid});
    }
    this.setState({dish_ratings: _dish_ratings});
  }
  componentWillUnmount() {
    HistoryStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    const showReviewAdded = HistoryStore.getState().showReviewAdded;
    if (showReviewAdded) {
      this.props.navigator.dismissModal();
      alert("成功添加评价");
    }
  }

  _handleInputOnFocus(offset) {
    // this.setState({inputPaddingTop: -250});

    // InteractionManager.runAfterInteractions(() => {
    //
    //   Animated.parallel([
    //     Animated.timing(this.state.inputPaddingTop, {
    //       toValue: -250,
    //       duration: 300,
    //     }),
    //     Animated.timing(this.state.inputMarginTop, {
    //       toValue: 250,
    //       duration: 300,
    //     }),
    //
    //   ]).start();
    // });
    this.refs.ScrollView.scrollTo({x:0,y:offset,animated:true})
  }

  _handleDriverScore(score) {
    this.setState({driver_score: score});
  }

  _handleRestaurantScore(score) {
    this.setState({restaurant_score: score});
  }

  _handleDriverQuickComments(text) {
    this.setState({driver_comment: this.state.driver_comment + " " + text + " "})
  }

  _handleRestaurantQuickComments(text) {
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

  _handleChangeTime() {
    this.setState({modalVisible: true});
  }

  _handleTimeSelected(date) {
    this.setState({complete_time: date});
  }

  _handleConfirm() {
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
    HistoryAction.addReview(data);
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
      let list = ["准时", "份量足", "服务好", "快", "包装精美", "差评", "物美价廉"];
      for (let text of list) {
        _commentList.push(
          <TouchableOpacity key={text} onPress={() => this._handleDriverQuickComments(text)}>
              <Text style={{marginRight: 20,
                            padding: 6,
                            borderRadius: 15,
                            borderWidth: 1,
                            borderColor: '#b3b3b8',
                            marginBottom: 5}}>
                    {text}
              </Text>
          </TouchableOpacity>
        )
      }
      return _commentList;
    };
    return (
      <View style={{marginTop: 20,
                    backgroundColor: 'white',
                    borderTopWidth: 1,
                    borderTopColor: '#b3b3b8',
                    borderBottomWidth: 1,
                    borderBottomColor: '#b3b3b8'}}>
          <View style={{flexDirection: 'row',
                        padding: 20,
                        borderBottomWidth: 1,
                        borderBottomColor: '#b3b3b8',
                        alignItems: 'center'}}>
              <Image style={{width:35,height:35}}source={require('./Image/wechat3.png')}/>
              <View style={{flex: 1,
                            flexDirection: 'column',
                            marginLeft: 10}}>
                  <Text style={{fontSize: 18}}>馋猫专送</Text>
                  <View style={{flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between'}}>
                      <Text style={{fontSize: 14}}>今天11:35左右送达</Text>
                      <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={this._handleChangeTime}>
                          <Text style={{color: '#ff8b00', fontSize: 14}}>更正</Text>
                          <Text style={{width: 14,
                                        height: 14,
                                        fontSize: 11,
                                        textAlign: 'center',
                                        color: '#ff8b00',
                                        borderWidth: 1,
                                        borderColor: '#ff8b00',
                                        borderRadius: 7}}>></Text>
                      </TouchableOpacity>
                  </View>
              </View>
          </View>
          <View style={{padding: 20}}>
              <Text style={{textAlign: 'center', marginBottom: 20}}>为配送打分</Text>
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
                                 borderWidth: 1,
                                 borderColor: '#b3b3b8',
                                 padding: 10}}
                         value={this.state.driver_comment}
                         placeholder={"写下您对司机的评价吧~"}
                         onFocus={() => this._handleInputOnFocus(36)}
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
      let list = ["新鲜", "准时", "份量足", "服务好", "快", "包装精美", "差评", "物美价廉"];
      for (let text of list) {
        _commentList.push(
          <TouchableOpacity key={text} onPress={() => this._handleRestaurantQuickComments(text)}>
              <Text style={{marginRight: 20,
                            padding: 6,
                            borderRadius: 15,
                            borderWidth: 1,
                            borderColor: '#b3b3b8',
                            marginBottom: 5}}>
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
            <Text style={{color: '#a5a5a5'}}>{dish.name}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity style={{flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 15,
                                        borderWidth: 1,
                                        borderColor: thump_up_color,
                                        height: 28,
                                        marginRight: 20}}
                                onPress={() => this._handleDishLike(dish)}>
                {thump_up_image()}
                <Text style={{marginLeft: 5, marginRight: 5, fontSize: 16, color: thump_up_color}}>赞</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 15,
                                        borderWidth: 1,
                                        borderColor: thump_down_color,
                                        height: 28,}}
                                onPress={() => this._handleDishDislike(dish)}>
                {thump_down_image()}
                <Text style={{marginLeft: 5, marginRight: 5, fontSize: 16, color: thump_down_color}}>踩</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      }
      return _dishList;
    };
    return(
      <View style={{marginTop: 20,
                    backgroundColor: 'white',
                    borderTopWidth: 1,
                    borderTopColor: '#b3b3b8',
                    borderBottomWidth: 1,
                    borderBottomColor: '#b3b3b8',
                    marginBottom: 50}}>
          <View style={{flex: 1,
                        flexDirection: 'row',
                        padding: 20,
                        borderBottomWidth: 1,
                        borderBottomColor: '#b3b3b8',
                        alignItems: 'center'}}>
              <Image style={{width:35,height:35}}source={require('./Image/wechat3.png')}/>
              <Text style={{fontSize: 18, marginLeft: 10}}>{this.props.orderInfo.rr_name}</Text>
          </View>
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
                                 borderWidth: 1,
                                 borderColor: '#b3b3b8',
                                 padding: 10}}
                         value={this.state.restaurant_comment}
                         placeholder={"写下您对商家的评价吧~"}
                         onFocus={() => this._handleInputOnFocus(400)}
                         onChangeText={(text) => this._handleRestaurantComments(text)}
                         multiline = {true}>
              </TextInput>
              {dishList()}
          </View>
      </View>
    );
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
            <Header title={'评价'}
                    goBack={this.props.goBack}
                    leftButtonText={'x'}/>
                <ScrollView ref="ScrollView"
                            keyboardShouldPersistTaps={'always'}
                            keyboardDismissMode={'on-drag'}>
                    {this._renderDriverComments()}
                    {this._renderRestaurantComments()}
                </ScrollView>
                <TouchableOpacity
                    style={{backgroundColor: '#ff8b00', padding: 15}}
                    onPress={this._handleConfirm}>
                  <Text style={{textAlign: 'center', color: 'white', fontSize: 18}}>确认</Text>
                </TouchableOpacity>


                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={this.state.modalVisible}>
                  <TouchableOpacity style={{flex: 1}}
                    onPressIn={() => this.setState({modalVisible: false})}>
                    <View
                        style={{position: 'absolute', height: 265, width: width, bottom: 0, backgroundColor: '#d4d4d4'}}>
                        <DatePickerIOS
                          date={new Date(this.state.complete_time)}
                          onDateChange={(value) => this._handleTimeSelected(value)}
                        />
                      <TouchableOpacity
                        style={{backgroundColor: '#ff8b00', padding: 15}}
                        onPress={() => this.setState({modalVisible: false})}>
                          <Text style={{textAlign: 'center',color: 'white', fontSize: 18}}>
                            确定
                          </Text>
                        </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                </Modal>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#e6e6e6',
  },
});
