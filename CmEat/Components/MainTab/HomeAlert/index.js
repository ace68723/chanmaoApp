/* @flow */

import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
const { width,height } = Dimensions.get('window');
import HomeStore from '../../../Stores/HomeStore';
import {cme_getLanguage} from '../../../../App/Modules/Database';
import Label from '../../../../App/Constants/AppLabel';
export default class SboxHomeAlert extends Component {
  static navigatorStyle = {
      screenBackgroundColor: 'transparent',
      modalPresentationStyle: 'overFullScreen'
  }
  constructor() {
    super();
    this._closeSboHomeAlert = this._closeSboHomeAlert.bind(this);
    this.state = {
      isShow: false,
      homeAlert:{},
    }
    this._onChange = this._onChange.bind(this);
  }
  componentDidMount(){
    HomeStore.addChangeListener(this._onChange);
  }
  componentWillUnmount(){
		HomeStore.removeChangeListener(this._onChange);
  }
  _onChange(){
		const state = Object.assign({},this.state, {homeAlert:HomeStore.getHomeAlert()});
    let isShow = false;
    if(state.homeAlert) {
      isShow = true;
    }
    const newState = Object.assign({}, state, {isShow});
    this.setState(newState);
  }
  _closeSboHomeAlert() {
    this.setState(
      {isShow: false}
    );
  }
  _renderMessageByLanguage(){
    const lang = cme_getLanguage();
    switch(lang){
      case 'chinese_simple':
        return this.state.homeAlert.message_cn;
      case 'english':
        return this.state.homeAlert.message_en;
      case 'french':
        return this.state.homeAlert.message_fr;
      default:
        return this.state.homeAlert.message_cn;
    }
  }
  render() {
    if (!this.state.isShow || !this.state.homeAlert){
      return (<View></View>)
    }
    return (
      <View style={{
          position: 'absolute',
          top: 32,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <View style={styles.container}>
          <Image source={{uri: this.state.homeAlert.image_url}}
                 style={{width:width*0.7,height:width*0.5}}
          />
          <View style={{padding:20,paddingLeft:25,paddingRight:25,}}>
            <Text allowFontScaling={false} style={{fontSize:12,fontFamily:'NotoSans-Regular',textAlign:'center'}}>
              {this._renderMessageByLanguage()}
            </Text>
          </View>


          <View
            style={{
              alignSelf:'center',
              borderBottomColor: '#e0dede',
              borderBottomWidth: 1,
              width: width * 0.7 * 0.85,
              top: -6
            }}
          />

          <TouchableOpacity
              style={{
                bottom:0,
                width:width*0.7,
                backgroundColor:'#ffffff',
                height:45,}}
            onPress={this._closeSboHomeAlert}>
            <View style={{flex:1,
                          alignItems:'center',
                          justifyContent:'center',
                          }}>
                <Text style={{color:'black',
                              fontSize:15,
                              fontFamily:'NotoSans-Regular'}}
                      allowFontScaling={false}>
                  {Label.getCMLabel('ALERT_COMFIRM')}
                </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width:width*0.7,
    backgroundColor:'#ffffff',
    // ios
    alignItems: 'center',
    shadowOffset: {width: 3, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 6,

    // android (Android +5.0)
    elevation: 3,
  },
});
