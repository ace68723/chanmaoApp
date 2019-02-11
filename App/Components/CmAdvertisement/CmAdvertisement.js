/* @flow */

import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import {
  Dimensions,
  Image,
  InteractionManager,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Alert,
  
} from 'react-native';
import {cme_getSelectedAddress} from '../../Modules/Database';
import Label from '../../Constants/AppLabel';
import { GetUserInfo, cme_getRegion } from '../../Modules/Database';

var WeChat = require('react-native-wechat');
const {width,height} = Dimensions.get('window')
const appid = 'wx447c419e84aa1496';
const appsecret = '0ab08b2af59380c237863b0964bd76db';
const scope = 'snsapi_userinfo';
const state = 'wechat_sdk_demos';
export default class CmAdvertisement extends Component {
  constructor(){
    super();
    let addr;
    if(cme_getSelectedAddress()){
      addr = cme_getSelectedAddress().addr.split(",", 1);
    }
    this.state = {
      adImage: null,
      addr:addr,
      showingAd: true,
      isLoading:false
    }
    this._openAdView = this._openAdView.bind(this);
    this._closeAd = this._closeAd.bind(this);
  }
  componentDidMount() {
    WeChat.registerApp(appid);
    this._getAd();
    setTimeout(() =>{
      if (this.state.showingAd){
        this._closeAd();
      }
    },7600)
  }
  _closeAd() {
    this.setState({showingAd: false});
    this.props.navigator.dismissModal({animationType: 'slide-down'});
    // InteractionManager.runAfterInteractions(() => {
      // this.props.navigator.dismissModal();
    // })
  }
  _getAd() {
      const url ="https://www.cmapi.ca/cm_backend/index.php/api/cmapp/v1/get_ad_launch";
   
      const {token} = GetUserInfo();
  		let options = {
  				method: 'GET',
  				mode:'cors',
  				headers: {
  						'Accept': 'application/json',
  						'Content-Type': 'application/json',
              'Authortoken': token,
              'region': parseInt(cme_getRegion()),
  				}
  		}
  		fetch(url,options)
  			.then((res) => res.json())
  			.then((res)=>{
  				if(res.ev_error == 0){
  					if(res.result){
              const adHeight = Dimensions.get('window').height;
              const adWidth = Dimensions.get('window').width;
              // select image by its ratio, otherwise select the first one
              let image = res.result[0];
              for (let i of res.result){
                let ratio = i.image_width / i.image_height
                if (Math.round(ratio, 2) == Math.round(adWidth / adHeight, 2)){
                  image = i;
                  break;
                }
              }
              this.setState({
                adImage: image,
                adHeight,
                adWidth
              })
  					}
  				}
  			})
  			.catch((error) => { console.log(error); throw error})
  }
  _getAccessToken(secret){
    const url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + appid + '&secret=' + appsecret + '&code='+ secret.code +'&grant_type=authorization_code';
    let options = {
      method: 'GET',
      mode:'cors',
      headers: {
      
      }
    }
    return fetch(url,options)
    .then((res) => res.json())
    .catch((error) => { console.log(error) })
  }
  async _getUserInfo(secret){
    const token = await this._getAccessToken(secret)
    const url = 'https://api.weixin.qq.com/sns/userinfo?access_token=' + token.access_token  + '&openid=' + token.openid  + '&lang=' + secret.lang;
    let options = {
        method: 'GET',
        mode:'cors',
        headers: {
        
        }
    }
    return fetch(url,options)
  			.then((res) => res.json())
  			.catch((error) => { console.log(error) })
  }
  _openAdView() {
    const ad = this.state.adImage;
    this.setState({showingAd: false});

    if(ad.navi_type == 2){
      const {url} = ad.navi_param;
      Navigation.showModal({
        screen: 'AdView',
        animated: true,
        navigatorStyle: {navBarHidden: true},
        passProps: {url: url}
      });
    }
    else if(ad.navi_type == 3){
        this.props.navigator.showModal({
          screen: 'CmEatMenu',
          animated: false,
          navigatorStyle: {navBarHidden: true},
          passProps: {
            py:height,
            restaurant:ad.navi_param,
          },
        });
    }
    // else if(ad.navi_type == 4) {
    //     if (ad.navi_param.target_page == 'cmwash') {
    //         this.props.navigator.resetTo({
    //             screen: 'cmHome',
    //             animated: true,
    //             animationType: 'fade',
    //             navigatorStyle: {
    //                 navBarHidden: true
    //             },
    //             passProps: {
    //                 goToCmLife: 'cmwash'
    //             }
    //         });
    //     }
    // }
    else if(ad.navi_type == 7){
      if(ad.navi_param){
        const {url, title, desc} = ad.navi_param;
        try{
          WeChat.isWXAppInstalled()
          .then((isInstalled) => {
            if (isInstalled) {
              this.setState({
                isLoading:true
              })
              Alert.alert(
                '分享到朋友圈',
                '跳转到微信？',
                [
                  {
                    text: 'Cancel',
                    onPress:()=>{this.setState({
                      isLoading:false
                    })},
                    style: 'cancel',
                  },
                  {text: 'GO', onPress: async () => {
                  
                    const result = await WeChat.sendAuthRequest(scope, state)
                    if(result.errCode === 0){
                      const WXUserInfo  = await this._getUserInfo(result);
                      const sharedResult = WeChat.shareToTimeline({
                        title:WXUserInfo.nickname + ' ' + title,
                        description: desc,
                        thumbImage: ad.navi_param.image ? ad.navi_param.image : WXUserInfo.headimgurl, //判断是否有Image,没有则默认使用微信头像
                        type: 'news',
                        webpageUrl:url
                      })
                      .then(()=>this._closeAd())
                      .catch((error) => {
                        console.log(error);
                        this._closeAd()
                      })
                      .finally(()=>this.setState({
                        isLoading:false
                      }))

                    }else{
                      this.setState({
                        isLoading:false
                      })
                    }
                
                    
            
                  }},
                ]
              );
            
            } else {
              Alert.alert(
                'Oops！',
                '没有安装微信软件，请您安装微信之后再试',
                [
              
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ]
              );
              
            }
          });
        }catch (e) {
          if (e instanceof WeChat.WechatError) {
            console.error(e.stack);
          } else{
            console.log(e)
          }
        }
      }
      
    }
    
  }
  _renderAdvertisement(){
    if(this.state.adImage){
      return(
          <TouchableWithoutFeedback onPress={this._openAdView}>
            <Image style={{top:0,left:0,position:'absolute',width:this.state.adWidth,height:this.state.adHeight,opacity:this.state.adOpacity}}
                    resizeMode={'cover'}
                    source={{uri:this.state.adImage.image_url}}/>
          </TouchableWithoutFeedback>
      )
    }
  }
  _renderAdLogo(){
    // return(
    //   <View style={styles.logoBox}>
    //       <Image source={require('./Image/logo.png')} style={{width:180,height:60}} />
    //  </View>
    // )
  }
  _renderAddress(){
    // if(this.state.addr){
    //   return(
    //     <View style={{alignItems:'center',justifyContent:'center',padding:5,marginBottom:0}}>
    //       <Text style={{color:'#ff8b00',fontSize:13,fontWeight:'600'}}
    //             allowFontScaling={false}>
    //         {Label.getCMLabel('DELIVER_TO')}
    //       </Text>
    //       <Text style={{color:'#ff8b00',fontSize:13,fontWeight:'600',marginTop:5,}}
    //             allowFontScaling={false}>
    //         {this.state.addr}
    //       </Text>
    //     </View>
    //   )
    // }
  }
  _renderLoading(){
    if(this.state.isLoading){
      return(
        <View style={{alignItems:'center',justifyContent:'center',position:'absolute',top:0,flex:1,width:this.state.adWidth,height:this.state.adHeight,backgroundColor:'rgba(0,0,0,0.3)'}}>
          <Image source={require('./Image/Loading_dots_white.gif')} style={{width:45,height:15}}/>
        </View>

      )
    }
  }
  render() {
    return (
      <View style={styles.mainContainer}>
          {this._renderAdvertisement()}
          {this._renderAddress()}
          {this._renderAdLogo()}
          {this._renderLoading()}
          <TouchableOpacity style={{position:'absolute',
                                    top:30,
                                    right:20,
                                    padding:6,
                                    backgroundColor:'rgba(151,151,151,0.5)',
                                    borderRadius:5}}
                            onPress={this._closeAd}>
            <Text style={{color:'#ffffff',fontSize:16,fontWeight:'600'}}
                  allowFontScaling={false}>
              {Label.getCMLabel('SKIP')}
            </Text>
          </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex:1,
    justifyContent:"flex-end",
    backgroundColor:"#ffffff",
    marginBottom: 10
  },
  logoBox: {
      flexDirection: 'row',
      height: 60,
      alignSelf: 'center',
  },
  logo:{
    width:240,
    height:80,
  },

});
