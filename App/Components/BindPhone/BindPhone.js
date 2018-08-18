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
import Alert from '../General/Alert';

import BindPhoneInputAnimation from './BindPhoneInputAnimation';

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

const scope = 'snsapi_userinfo';
const state = 'wechat_sdk_demos';
const appid = 'wx20fd1aeb9b6fcf82';

const VIEW_TYPE_BINDPHONE = 'view_type_bindphone';

export default class LogoAnimationView extends Component {
  constructor(props){
    super(props)
		this.state = {
					phone:'',
					verification:'',
    			showLoading:false,
    			isAuthed:false,
					_bindStarted: false,
					sentVerification:false,
					secondLeft:0,
    	}
		this._handleBindPhone = this._handleBindPhone.bind(this);
		this._handlePhone = this._handlePhone.bind(this);
		this._handleVerification = this._handleVerification.bind(this);
		this._sendVerification = this._sendVerification.bind(this);
    this._handleBackToHome = this._handleBackToHome.bind(this);
    this._openAdView = this._openAdView.bind(this);
		this._toggleViewType	= this._toggleViewType.bind(this);
		this._getVerification = this._getVerification.bind(this);
  }
	async componentDidMount() {
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

	_getVerification() {
		if (this.state.phone.length < 10) {
			Alert.errorAlert('请填写正确手机号码');
			return;
		}
		let _this = this;
		this.setState({isVerificationSent:true});
		this.setState({secondLeft:60});
		this._sendVerification();
		let interval = setInterval(() => {
			_this.setState({secondLeft: _this.state.secondLeft-1})
		}, 1000);
		setTimeout(() => {
			clearInterval(interval);
			_this.setState({isVerificationSent:false});
		},60000)

	}

	async _sendVerification() {
		const res = await AuthAction.sendVerification({phone: this.state.phone});
	}

	async _handleBindPhone() {
		if(this.state._bindStarted) return
		this.setState({
			showLoading:true,
			_bindStarted: true,
		})
		const {phone,verification} = this.state;
		const cty = 1;
		const io_data	= {phone,verification,cty}
		console.log(this.props);
		if (this.props.openid && this.props.unionid && this.props.refresh_token) {
			io_data.openid = this.props.openid;
			io_data.unionid = this.props.unionid;
			io_data.refresh_token = this.props.refresh_token;
		}
    try {
				console.log(io_data);
        const res = await AuthAction.bindPhone(io_data);
				console.log(res);
				if (res.ev_error === 0) {
					this.setState({
						showLoading:false,
			      loginSuccess:true,
					})
			    this.props.navigator.dismissModal({
			       animationType: 'slide-down'
			    })
					setTimeout( () => {
						this.props.handleBindSuccessful();
					}, 800);
				} else {
					this.setState({
		        showLoading:false,
		        loginSuccess:false,
						_bindStarted:false,
		      });
					Alert.errorAlert('绑定失败');
				}
    } catch (e) {
      console.log(e)
      this.setState({
        showLoading:false,
        loginSuccess:false,
				_bindStarted:false,
      });
			Alert.errorAlert('绑定失败');
    }


		// this.setState({
		// 	showLoading:false,
    //   loginSuccess:true,
		// })
    // this.props.navigator.dismissModal({
    //    animationType: 'slide-down'
    // })
		// setTimeout( () => {
		// 	this.props.handleBindSuccessful();
		// }, 800);
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

        <BindPhoneInputAnimation
                        is_forgot = {AppString('forgot')}
                        is_wechat = {AppString('wechat')}
                        ib_isWXAppInstalled = {this.state.isWXAppInstalled}
                        is_copyright = {AppString('copyright')}
                        is_version = {AppConstants.CM_VERSION}
                        ib_loginSuccess = {this.state.loginSuccess}
                        ib_registerSuccess = {this.state.registerSuccess}
                        ib_showLoading = {this.state.showLoading}
												if_handleBindPhone = {this._handleBindPhone}
                        ir_VERIFICATION_INPUTREF = {VERIFICATION_INPUTREF}
                        ir_PHONE_INPUTREF = {PHONE_INPUTREF}
                        ir_SUBMIT_BUTTON = {SUBMIT_BUTTON}
                        if_handlePhone = {this._handlePhone}
                        if_handleVerification = {this._handleVerification}
												if_getVerification = {this._getVerification}
                        if_openAdView = {this._openAdView}
                        toggleViewType = {this._toggleViewType}
												sentVerification = {this.state.sentVerification}
												secondLeft = {this.state.secondLeft}
                        />

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
