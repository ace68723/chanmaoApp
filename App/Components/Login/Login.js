'use strict';
import React, {
	Component,
} from 'react';
import {
  Dimensions,
  Image,
	InteractionManager,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import AppConstants from '../../Constants/AppConstants';
import AppString from '../../Constants/AppString';
import AuthAction from '../../Actions/AuthAction';
// import AuthStore from '../../Stores/AuthStore';

import InputAnimation from './InputAnimation';

const {width,height} = Dimensions.get('window');
let marginTop;
if(height == 812){
  //min 34
  //header 88 + swiper 200 - FlatList margin 34 + tabbar 30
  marginTop = 34;
}else{
  marginTop = 20;
}
// const(refs): define view refeneces
const USERNAME_INPUTREF = 'Username_Input';
const PASSWORD_INPUTREF = 'Password_Input';
const SUBMIT_BUTTON = 'Submit_Button';

var WeChat = require('react-native-wechat');
const scope = 'snsapi_userinfo';
const state = 'wechat_sdk_demos';
const appid = 'wx20fd1aeb9b6fcf82';

export default class LogoAnimationView extends Component {
  constructor(){
    super()
		this.state = {
    			username:'',
    			password:'',
    			showLoading:false,
    			isAuthed:false,
    			isWXAppInstalled:true,
    	}
    this._handleLogin 		= this._handleLogin.bind(this);
		this._handleUsername 	= this._handleUsername.bind(this);
	  this._handlePassword 	= this._handlePassword.bind(this);
		this._handleWechatLogin = this._handleWechatLogin.bind(this);
    this._handleBackToHome = this._handleBackToHome.bind(this);
    this._openAdView = this._openAdView.bind(this);
  }
	async componentDidMount() {
		const registerResult = await WeChat.registerApp(appid);
		const isWXAppInstalled = await WeChat.isWXAppInstalled()
		this.setState({
			isWXAppInstalled:isWXAppInstalled
		})
	}
	_handleUsername(username){
  	this.setState({
			username:username
		})
  }
	_handlePassword(password){
		this.setState({
			password:password
		})
  }
  _loginStarted
  async _handleLogin(){
    if(this._loginStarted) return
    this._loginStarted = true;
		this.setState({
			showLoading:true,
		})
		const {username,password} = this.state;
		const io_data							= {username,password}
    try {
        const res = await AuthAction.doLogin(io_data);
        this.setState({
    			showLoading:false,
          loginSuccess:true,
    		})
        this.props.handleLoginSuccessful();
        // setTimeout(() => {
          this.props.navigator.dismissModal({
             animationType: 'slide-down'
          })
        // }, 1000);
    } catch (e) {
      console.log(e)
      this.setState({
        showLoading:false,
        loginSuccess:false,
      })
      this._loginStarted = false;
    }
  }
	async _handleWechatLogin(event){
		try {
			console.log('wechat_login');
		 const version = await WeChat.getApiVersion();
		 console.log(version);

		 // WeChat.sendAuthRequest(scope, state)
		 //           .then(responseCode => {
		 //             //返回code码，通过code获取access_token
			// 					 console.log(responseCode);
		 //           })
		 //           .catch(err => {
		 //             console.log(err);
		 //           })


		 const result = await WeChat.sendAuthRequest(scope, state);
     console.log(result);
		 const resCode = result.code;
		 const deviceToken = this.state.deviceToken;
		 const data = {resCode,deviceToken};
		 const res = await AuthAction.doWechatAuth(data);
     this.setState({
       showLoading:false,
       loginSuccess:true,
     })
     this.props.handleLoginSuccessful();
     setTimeout(() => {
       this.props.navigator.dismissModal({
          animationType: 'slide-down'
       })
     }, 1000);
		//  AuthService.doWechatAuth(data);

	 } catch (e) {
		 if(e == '-2'){
			 console.log(e)
		 }else{
			 console.log(e);
		 }
     console.log(e)
     this.setState({
       showLoading:false,
       loginSuccess:false,
     });
     this._loginStarted = false;

	 }
  }

  _handleBackToHome() {
    this.props.navigator.dismissModal({
       animationType: 'slide-down'
    })
    this.props.handleBackToHome();
  }
  _openAdView(url){
    this.props.navigator.showModal({
      screen: 'AdView',
      animated: true,
      navigatorStyle: {navBarHidden: true},
      passProps: {url: url,},
    })
  }
  _renderGoBackBtn() {
    return(
      <TouchableOpacity style={{paddingTop:0,
                                paddingLeft:8,
                                paddingRight:20,
                                paddingBottom:20,
                                position:'absolute',
                                top:marginTop,
                                left:0,}}
                        onPress={this._handleBackToHome}>
        <View style={{width:30,height:30,borderRadius:15,backgroundColor:"rgba(0,0,0,0.4)"}}>
          <Text style={{fontSize:25,textAlign:"center",color:"#ffffff",marginTop:-2}}>
            ×
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
  render(){
    return(
      <View style={styles.container}>
        <View style={styles.bgImageWrapper}>
						 <Image source={require('./Image/background.png')}
										style={styles.backgroundImage}/>
				</View>


				<InputAnimation	is_username = {AppString('username')}
												is_password = {AppString('password')}
												is_login = {AppString('login')}
											  is_register = {AppString('register')}
											  is_forgot = {AppString('forgot')}
												is_wechat = {AppString('wechat')}
												ib_isWXAppInstalled = {this.state.isWXAppInstalled}
												is_copyright = {AppString('copyright')}
												is_version = {AppConstants.CM_VERSION}
												ib_loginSuccess = {this.state.loginSuccess}
												ib_showLoading = {this.state.showLoading}
											  if_handleLogin = {this._handleLogin}
												ir_USERNAME_INPUTREF = {USERNAME_INPUTREF}
												ir_PASSWORD_INPUTREF = {PASSWORD_INPUTREF}
												ir_SUBMIT_BUTTON = {SUBMIT_BUTTON}
												if_handleUsername = {this._handleUsername}
												if_handlePassword = {this._handlePassword}
												if_handleWechatLogin = {this._handleWechatLogin}
												if_openAdView = {this._openAdView}/>
          {this._renderGoBackBtn()}

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    width:width,
    height:height,
    backgroundColor:"#ffffff",
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

});


// <View ref={SUBMIT_BUTTON}style={{marginTop:15}}>
//   <FirstButton   handleLogin = {this._handleLogin}/>
// </View>
// <LoginWechat handleWechatLogin = {this.handleWechatLogin.bind(this)}/>
// <View style={{position:'absolute',bottom:5,width:width,alignItems:'center',backgroundColor:"rgba(0,0,0,0)"}}>
//   <Text allowFontScaling={false} style={{color:"#ffffff",marginBottom:5}}>
//     v2.3.0
//   </Text>
//   <Text allowFontScaling={false} style={{color:"#ffffff",fontSize:11}}>
//     {AppString('copyright')}
//
//   </Text>
// </View>
