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
import RegisterInputAnimation from './register/InputAnimation';

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
const PHONE_INPUTREF = 'Phone_Input';
const VERIFICATION_INPUTREF = 'Verification_Input';
const PASSWORD_INPUTREF = 'Password_Input';
const RE_PASSWORD_INPUTREF = 'Re_Password_Input';
const EMAIL_INPUTREF = 'Email_Input';
const SUBMIT_BUTTON = 'Submit_Button';

var WeChat = require('react-native-wechat');
const scope = 'snsapi_userinfo';
const state = 'wechat_sdk_demos';
// const appid = 'wx20fd1aeb9b6fcf82';
const appid = 'wx447c419e84aa1496';


const VIEW_TYPE_LOGIN = 'view_type_login';
const VIEW_TYPE_REGISTER = 'view_type_register';
const VIEW_TYPE_BINDPHONE = 'view_type_bindphone';

export default class LogoAnimationView extends Component {
  constructor(){
    super()
		this.state = {
    			username:'',
					phone:'',
					verification:'',
					email:'',
    			password:'',
					re_password:'',
    			showLoading:false,
    			isAuthed:false,
    			isWXAppInstalled:true,
					// viewType: VIEW_TYPE_LOGIN,
					viewType: VIEW_TYPE_LOGIN,
					_registerStarted: false,
    	}
    this._handleLogin 		= this._handleLogin.bind(this);
		this._handleRegister = this._handleRegister.bind(this);
		this._handleUsername 	= this._handleUsername.bind(this);
		this._handlePhone = this._handlePhone.bind(this);
		this._handleVerification = this._handleVerification.bind(this);
		this._handleEmail = this._handleEmail.bind(this);
	  this._handlePassword 	= this._handlePassword.bind(this);
		this._handleRePassword = this._handleRePassword.bind(this);
		this._handleWechatLogin = this._handleWechatLogin.bind(this);
    this._handleBackToHome = this._handleBackToHome.bind(this);
    this._openAdView = this._openAdView.bind(this);
		this._toggleViewType	= this._toggleViewType.bind(this);
		this._handleBindSuccessful = this._handleBindSuccessful.bind(this);
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
	_handlePhone(phone) {
		this.setState({
			phone:phone
		});
	}
	_handleVerification(verification) {
		this.setState({
			verification:verification
		});
	}
	_handleEmail(email) {
		this.setState({
			email:email
		});
	}
	_handlePassword(password){
		this.setState({
			password:password
		});
  }
	_handleRePassword(password){
		this.setState({
			re_password:password
		});
	}
	_handleBindSuccessful() {
		this.props.navigator.dismissModal({
		   animationType: 'slide-down'
		})
		setTimeout( () => {
			this.props.handleLoginSuccessful();
		}, 800);
	}
  _loginStarted

  async _handleLogin(){
    if(this._loginStarted) return
		if (this.state.viewType == VIEW_TYPE_REGISTER){
			// if register

			return;
		}
    this._loginStarted = true;
		this.setState({
			showLoading:true,
		})
		const {username,verification,email,password,re_password} = this.state;
		const io_data							= {username,verification,email,password,re_password};
    try {
        const res = await AuthAction.phoneRegister(io_data);
        this.setState({
    			showLoading:false,
          registerSuccess:true,
    		})
        this.props.navigator.dismissModal({
           animationType: 'slide-down'
        })
        this.props.handleLoginSuccessful();
    } catch (e) {
      console.log(e)
      this.setState({
        showLoading:false,
        registerSuccess:false,
      })
      this._loginStarted = false;
    }
  }

	async _handleRegister() {
		console.log(this.state);
		if(this.state._registerStarted) return
		this.setState({
			showLoading:true,
			_registerStarted: true,
		})
		const {phone,verification,email,password} = this.state;
		const io_data							= {username,password}
    try {
        const res = await AuthAction.doLogin(io_data);
        this.setState({
    			showLoading:false,
          loginSuccess:true,
    		})
        this.props.navigator.dismissModal({
           animationType: 'slide-down'
        })
        this.props.handleLoginSuccessful();
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
		 const version = await WeChat.getApiVersion();

		 const result = await WeChat.sendAuthRequest(scope, state);
		 const resCode = result.code;
		 // const deviceToken = this.state.deviceToken;
		 // const data = {resCode,deviceToken};
		 const data = {resCode};
		 console.log(data);
		 const res = await AuthAction.doWechatAuth(data);
		 console.log(res);
		 if (res.ev_openid) {
			 this.props.navigator.showModal({
				 screen: 'CmBindPhone',
				 animationType: 'slide-up',
				 navigatorStyle: {navBarHidden: true},
				 passProps: {handleBackToHome: this._handleBackToHome,
										 handleBindSuccessful: this._handleBindSuccessful,
										 openid: res.ev_openid
				 },
			 })
		 }

     // this.setState({
     //   showLoading:false,
     //   loginSuccess:true,
     // })
     // this.props.navigator.dismissModal({
     //    animationType: 'slide-down'
     // })
     // this.props.handleLoginSuccessful();
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
          <Text style={{fontSize:25,textAlign:"center",color:"#ffffff",marginTop:-2}}
								allowFontScaling={false}>
            ×
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
	_toggleViewType(){
		if (this.state.viewType == VIEW_TYPE_LOGIN){
			this.setState({viewType: VIEW_TYPE_REGISTER})
		}
		else if (this.state.viewType == VIEW_TYPE_REGISTER){
			this.setState({viewType: VIEW_TYPE_LOGIN})
		}
	}
  render(){
    return(
      <View style={styles.container}>
        <View style={styles.bgImageWrapper}>
						 <Image source={require('./Image/background.png')}
										style={styles.backgroundImage}/>
				</View>

				{ this.state.viewType == VIEW_TYPE_LOGIN &&
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
													if_openAdView = {this._openAdView}
													viewType = {this.state.viewType}
													toggleViewType = {this._toggleViewType}
													/>
				}

				{ this.state.viewType == VIEW_TYPE_REGISTER &&
					<RegisterInputAnimation
													is_username = {AppString('username')}
													is_password = {AppString('password')}
													is_login = {AppString('login')}
												  is_register = {AppString('register')}
												  is_forgot = {AppString('forgot')}
													is_wechat = {AppString('wechat')}
													ib_isWXAppInstalled = {this.state.isWXAppInstalled}
													is_copyright = {AppString('copyright')}
													is_version = {AppConstants.CM_VERSION}
													ib_loginSuccess = {this.state.loginSuccess}
													ib_registerSuccess = {this.state.registerSuccess}
													ib_showLoading = {this.state.showLoading}
												  if_handleLogin = {this._handleLogin}
													if_handleRegister = {this._handleRegister}
													ir_VERIFICATION_INPUTREF = {VERIFICATION_INPUTREF}
													ir_PHONE_INPUTREF = {PHONE_INPUTREF}
													ir_EMAIL_INPUTREF = {EMAIL_INPUTREF}
													ir_PASSWORD_INPUTREF = {PASSWORD_INPUTREF}
													ir_RE_PASSWORD_INPUTREF = {RE_PASSWORD_INPUTREF}
													ir_SUBMIT_BUTTON = {SUBMIT_BUTTON}
													if_handlePhone = {this._handlePhone}
													if_handleVerification = {this._handleVerification}
													if_handleEmail = {this._handleEmail}
													if_handlePassword = {this._handlePassword}
													if_handleRePassword = {this._handleRePassword}
													if_handleWechatLogin = {this._handleWechatLogin}
													if_openAdView = {this._openAdView}
													viewType = {this.state.viewType}
													toggleViewType = {this._toggleViewType}
													/>
				}

				{ this.state.viewType == VIEW_TYPE_BINDPHONE &&
					<BindPhoneInputAnimation
													is_username = {AppString('username')}
													is_password = {AppString('password')}
													is_login = {AppString('login')}
												  is_register = {AppString('register')}
												  is_forgot = {AppString('forgot')}
													is_wechat = {AppString('wechat')}
													ib_isWXAppInstalled = {this.state.isWXAppInstalled}
													is_copyright = {AppString('copyright')}
													is_version = {AppConstants.CM_VERSION}
													ib_loginSuccess = {this.state.loginSuccess}
													ib_registerSuccess = {this.state.registerSuccess}
													ib_showLoading = {this.state.showLoading}
												  if_handleLogin = {this._handleLogin}
													if_handleRegister = {this._handleRegister}
													ir_VERIFICATION_INPUTREF = {VERIFICATION_INPUTREF}
													ir_PHONE_INPUTREF = {PHONE_INPUTREF}
													ir_EMAIL_INPUTREF = {EMAIL_INPUTREF}
													ir_PASSWORD_INPUTREF = {PASSWORD_INPUTREF}
													ir_RE_PASSWORD_INPUTREF = {RE_PASSWORD_INPUTREF}
													ir_SUBMIT_BUTTON = {SUBMIT_BUTTON}
													if_handlePhone = {this._handlePhone}
													if_handleVerification = {this._handleVerification}
													if_handleEmail = {this._handleEmail}
													if_handlePassword = {this._handlePassword}
													if_handleRePassword = {this._handleRePassword}
													if_handleWechatLogin = {this._handleWechatLogin}
													if_openAdView = {this._openAdView}
													viewType = {this.state.viewType}
													toggleViewType = {this._toggleViewType}
													/>
				}

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
