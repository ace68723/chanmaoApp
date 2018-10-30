/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
const {width,height} = Dimensions.get('window');
import AuthModule from '../../Modules/AuthModule/Auth';
import PopupView from '../../../CmEat/Components/Popup/PopupView';
import Label from '../../Constants/AppLabel';

export default class ResetPassword extends Component {
  constructor()
  {
    super();
    this.state = {
      username:'',
      code:'',
      num:'',
      password:'',
      confirm_password:'',
    };
    this.popupView = PopupView.getInstance();
  }
  componentDidMount()
  {
    this._getVcode=this._getVcode.bind(this);
    this._resetPassword=this._resetPassword.bind(this);
  }
  async _getVcode(num)
  {
    let data={
      "num":num,
    }
    let res=await AuthModule.getVcode(data);

    if (res.ev_noti_msg) {alert(res.ev_noti_msg)}
    else if (res.ev_error==0) {alert('message sent')}
    else alert(res.ev_context);
  }
  async _resetPassword(iv_verification_code,iv_password,iv_num,confirm_password) {
    if (iv_verification_code.length == 0 ||
        iv_password.length == 0 ||
        iv_num.length == 0 ||
        confirm_password.length == 0) {
      this.popupView.showAlertWithTitle(this, Label.getCMLabel('ALERT_ERROR_TITLE'), Label.getCMLabel('PLZ_ENTER_PASSWORD'));
      return;
    }
    if (iv_password!=confirm_password){
      this.popupView.showAlertWithTitle(this, Label.getCMLabel('ALERT_ERROR_TITLE'), Label.getCMLabel('PASSWORD_NOT_THE_SAME'));
      return;
    }
    let data={
      "iv_verification_code": iv_verification_code,
      "iv_password": iv_password,
      "iv_num": iv_num,
    }
    let res = await AuthModule.resetPassword(data);
    if (res.ev_error == 0) {
      this.popupView.showAlertWithTitle(this, Label.getCMLabel('ALERT_CONGRA_TITLE'), Label.getCMLabel('PASSWORD_RESET_SUCCESS'));
    }
    else {
      // alert(res.ev_context);
      this.popupView.showAlertWithTitle(this, Label.getCMLabel('ALERT_ERROR_TITLE'), res.ev_context);
    }
    this.props.toggleViewTypeReset();
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.showPopup && this.popupView.show()}
        <View style={styles.bgImageWrapper}>
						 <Image source={require('./Image/background.png')}
										style={styles.backgroundImage}/>
				</View>
        <View style={{marginTop:height*0.1042}}>
        <View style={styles.logoBox}>
            <Image source={require('./Image/logo.png')} style={{width:240,height:80}} />
       </View>
        </View>
        <View style={{marginLeft:0.1*width,width:0.8*width,flex:1,}}>

          <TextInput
                style={[styles.input,{marginTop:height*0.068, opacity: 1}]}
                placeholder={'Phone number'}
                placeholderTextColor={'#ffffff'}
                selectionColor={'#ea7b21'}
                keyboardType = { 'url'}
                autoCorrect= { false}
                returnKeyType={'next'}
                onChangeText={(num) => this.setState({num})}
                underlineColorAndroid={"rgba(0,0,0,0)"}
            />
            <View style={{height:1,
                          backgroundColor:'#ffffff',}}>
            </View>
            <View style={{flexDirection:'row'}}>

              <TextInput
                    style={[styles.input,{marginTop:height*0.01, opacity: 1,flex:1}]}
                    placeholder={'Security Code'}
                    placeholderTextColor={'#ffffff'}
                    selectionColor={'#ea7b21'}
                    keyboardType = { 'url'}
                    autoCorrect= { false}
                    returnKeyType={'next'}
                    onChangeText={(code) => this.setState({code})}
                    underlineColorAndroid={"rgba(0,0,0,0)"}
                />
              <View style={{flex:1,alignItems:'flex-end',justifyContent:'center'}}>
                <TouchableOpacity onPress={() => this._getVcode(this.state.num)}>
                  <View style={{width:90,height:30,backgroundColor:'rgba(0,0,0,0)',borderRadius:8,borderColor:'#ea7b21',
                  borderWidth:1,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'#ea7b21'}}
                          allowFontScaling={false}>
                      GET CODE
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{height:1,
                          backgroundColor:'#ffffff',}}>
            </View>
            <TextInput
                  style={[styles.input,{marginTop:height*0.01, opacity: 1}]}
                  placeholder={'New Password'}
                  placeholderTextColor={'#ffffff'}
                  selectionColor={'#ea7b21'}
                  keyboardType = { 'url'}
                  autoCorrect= { false}
                  returnKeyType={'next'}

                  secureTextEntry={true}
                  onChangeText={(password) => this.setState({password})}
                  underlineColorAndroid={"rgba(0,0,0,0)"}
              />
              <View style={{height:1,
                            backgroundColor:'#ffffff',}}>
              </View>
              <TextInput
                    style={[styles.input,{marginTop:height*0.01, opacity: 1}]}
                    placeholder={'Confirm Password'}
                    placeholderTextColor={'#ffffff'}
                    selectionColor={'#ea7b21'}
                    keyboardType = { 'url'}
                    autoCorrect= { false}
                    returnKeyType={'next'}
                    secureTextEntry={true}
                    onChangeText={(confirm_password) => this.setState({confirm_password})}
                    underlineColorAndroid={"rgba(0,0,0,0)"}
                />
              <View style={{height:1,
                            backgroundColor:'#ffffff',}}>
              </View>



              <View style={{height:70,marginTop:height*0.08,width:0.8*width,
              justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity onPress={()=> this._resetPassword(this.state.code,this.state.password,this.state.num,this.state.confirm_password)}>
                  <View style={{height:60,width:0.8*width,backgroundColor:'#ea7b21',borderRadius:30 ,
                justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:25,color:'white'}}
                          allowFontScaling={false}>
                      SUBMIT
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{height:30,width:width,marginTop:10}}>
                <TouchableWithoutFeedback onPress={this.props.toggleViewTypeReset}>
                  <View style={{flex:1}}>
                    <Text allowFontScaling={false}
                          style={{fontSize:15,color:"#ffffff",}}>
                       Login
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>



        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    width:width,
    height:height,
  },
  logoBox: {
      flexDirection: 'row',
      height: 100,
      alignSelf: 'center',
  },
  bgImageWrapper: {
    flex:1,
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0,
  },
  backgroundImage:{
    flex:1,
    width:width,
    height:height,
  },
  input:{
    fontSize: 18,
    borderRadius: 8,
    color: '#ffffff',
    height:50,
    marginTop:5,
  },
});
