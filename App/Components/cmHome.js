  /* @flow */

import React, { Component } from 'react';
import {
  AppState,
  Dimensions,
  View,
  Text,
  StyleSheet,
  Platform,
  Linking,
} from 'react-native';
import AuthAction from '../Actions/AuthAction';
import HomeAction from '../../CmEat/Actions/HomeAction'
import VersionAction from '../Actions/VersionAction';
import { GetVersion, GetUserInfo, cme_getRegion,cme_saveMessageData } from '../Modules/Database';
import PopupView from '../../CmEat/Components/Popup/PopupView'
import StartUpAnimation from './startupAnimation';
import JPushModule from 'jpush-react-native';
// import Database from '../Modules/Database';
const { height, width } = Dimensions.get('window');
const X_WIDTH = 375;
const X_HEIGHT = 812;

const styles = StyleSheet.create({
    container: {
        width:width,
        height:height,
        flexDirection: 'row',
    },
});

const HOME_IMAGES = {
  sbox_home_image: require('./Img/HOME-PAGE-SBOX.png'),
  sbox_home_image_x: require('./Img/iphoneX_SweetfulBox.png'),
  cm_home_image: require('./Img/HOME-PAGE-CM-iPhone.png'),
  cm_home_image_x: require('./Img/iphoneX_chanmao.png'),
}

export default class Home extends Component {
  constructor() {
      super();
      this.state = {
          entryFlag: true,
          showPopup: false,
          isCodePushChecked: false
      };

      this._versionCheck = this._versionCheck.bind(this);
      this._handleAppStateChange = this._handleAppStateChange.bind(this);
      this._handleChanmaoPress = this._handleChanmaoPress.bind(this);
      this._handleSboxPress = this._handleSboxPress.bind(this);
      this._handleCmLifePress = this._handleCmLifePress.bind(this);
      this._handleBackToHome = this._handleBackToHome.bind(this);
      this._handleLoginSuccessful = this._handleLoginSuccessful.bind(this);

      this._isiPhoneX = this._isiPhoneX.bind(this);
      this._getSBoxHomePage = this._getSBoxHomePage.bind(this);
      this._getCMHomePage = this._getCMHomePage.bind(this);

      this.popupView = PopupView.getInstance();
      this._handleLoginSuccessfulToCmLife = this._handleLoginSuccessfulToCmLife.bind(this);

      this.finishcodePushCheck = this.finishcodePushCheck.bind(this);
  }
  _openStarted = false
  componentWillMount() {
    this._versionCheck();
  }
  // componentDidMount() {
  //   const res={
  //     type:1,
  //     messageid:1,
  //     content:'testMessage',
  //   }
  //   cme_saveMessageData(res);
  //   if (Platform.OS==='android'){
  //   JPushModule.notifyJSDidLoad((resultCode) => {
  //
  //       if (resultCode === 0) {
  //       }
  //
  //   });
  //   }
  //   _openStarted = false
  // }

    componentDidMount() {
      // const res={
      //   type:1,
      //   messageid:1,
      //   content:'testMessage',
      // }
      // cme_saveMessageData(res);
      if (Platform.OS==='android'){
      JPushModule.notifyJSDidLoad((resultCode) => {

          if (resultCode === 0) {
          }

      });
      }
      JPushModule.initPush()

      // console.log(JPushModule);
      JPushModule.getRegistrationID(registrationId => {console.log('resisterID:'+registrationId)})
      AppState.addEventListener('change', this._handleAppStateChange);

      JPushModule.addReceiveCustomMsgListener((message) => {


        this.setState({pushMsg: message});
          console.log("receive custom notification: " + message);
      });
      JPushModule.addReceiveNotificationListener((message) => {
        console.log("receive notification: " + JSON.stringify(message));
        // alert('11112');

        let iv_message='';
        if (Platform.OS === 'ios') {iv_message=message.aps.alert;}
        else {iv_message=message.alertContent;}
        let times=(new Date()).valueOf();
        // let times=100000;
        // console.log('timestamp: '+times)
        let currentmessage={
          type:1,
          messageid:times,
          // content:message.alertContent,
          content:iv_message,
        }

        cme_saveMessageData(currentmessage);
        HomeAction.getMessageData(1);
        HomeAction.getNewMessage();
      });


    }
    componentWillUnmount(){
      AppState.removeEventListener('change', this._handleAppStateChange);
      JPushModule.removeReceiveCustomMsgListener();
      JPushModule.removeReceiveNotificationListener();
    }
    _versionCheck(){
      let curVersion = GetVersion();
      VersionAction.getLatestVersion(curVersion, Platform.OS).then((versionObject)=>{
        if (versionObject && versionObject.need_update) {
          this._updateAlert(versionObject);
        }else{

          CodePush.checkForUpdate()
          .then((update) => {
              if (!update) {
                this.finishcodePushCheck(false)
              } else {
                this.props.navigator.push({
                  screen:'CodePushUpdate',
                  animationType: 'fade',
                  navigatorStyle: {navBarHidden: true}
                })
              }
          });



        }
      }).catch((err) => console.log(err));
    }
    _handleAppStateChange = (appState) =>{
      if(appState == 'active'){
        if (!this.state.entryFlag) {
          this._versionCheck();
        }
      }
    }
    _updateAlert(versionObj){
      let url;
      if (Platform.OS == 'ios') {
        url = 'https://itunes.apple.com/ca/app/%E9%A6%8B%E7%8C%AB%E7%94%9F%E6%B4%BB/id888553991?mt=8';
      }
      else {
        url = 'https://play.google.com/store/apps/details?id=ca.chanmao.app';
      }
      if(versionObj.forced){
        this.setState(Object.assign({}, this.state, {entryFlag: false}));

        this.popupView.setMessagePopup({
          title: "软件更新",
          subtitle: "有新版本可下载,请前往更新",
          confirmText: "立即更新",
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
      }else{

        this.popupView.setMessagePopup({
          title: "软件更新",
          subtitle: "有新版本可下载,请前往更新",
          confirmText: "立即更新",
          cancelText: '以后再说',
          onConfirm: ()=>{
            Linking.canOpenURL(url).then(supported => {
              supported && Linking.openURL(url);
            }, (err) => console.log(err));
          },
          onDismiss: () => {
            this.setState({showPopup: false},()=>{
              CodePush.checkForUpdate()
              .then((update) => {
                  if (!update) {
                    this.finishcodePushCheck(false)
                  } else {

                    this.props.navigator.push({
                      screen:'CodePushUpdate',
                      animationType: 'fade',
                      navigatorStyle: {navBarHidden: true},

                    })
                  }
              });

            })
          }
        });
        this.setState({showPopup: true});
      }
    }
    finishcodePushCheck(needUpdate){  //needUpdate是否需要更新并重启

      this.setState({isCodePushChecked:true},()=>{
        // if(!needUpdate){
          const region = cme_getRegion();
          if (!region) {
            setTimeout(()=>{
              this.props.navigator.showModal({
                screen: 'LanguagesAndRegions',
                animated: true,
                navigatorStyle: {navBarHidden: true},
                passProps: {
                  firstSelection: true
                }
              })
            },500)// after codePushUpdate modal dismissed

          } else if (this.props.goToCmEat) {
            setTimeout( () => {
              this._handleChanmaoPress();
            }, 2000);
          } else if (this.props.goToSweetfulBox) {
            setTimeout( () => {
              this._handleSboxPress();
            }, 1000);
          }
        // }
      })
    }
    async _handleChanmaoPress() {
        if(this._openStarted) return;
        if(!this.state.entryFlag) return;
        this._openStarted = true;
        setTimeout(() => {
          this._openStarted = false
        }, 5000);
        this.startUpAnimation._fadeOut();
        const res =  await AuthAction.isAuthed();
        if(res.ev_error !== 0) {
          setTimeout(() => {
            this.props.navigator.showModal({
              screen: 'CmLogin',
              animationType: 'slide-up',
              navigatorStyle: {navBarHidden: true},
              passProps: {handleBackToHome: this._handleBackToHome,
                          handleLoginSuccessful: this._handleLoginSuccessful,
              },
            })
          },1000)
        } else if (res.ev_error === 0 && res.ev_missing_phone && res.ev_missing_phone === 1) {
          setTimeout(() => {
            this.props.navigator.showModal({
              screen: 'CmBindPhone',
              animationType: 'slide-up',
              navigatorStyle: {navBarHidden: true},
              passProps: {handleBackToHome: this._handleBackToHome,
                          handleBindSuccessful: this._handleLoginSuccessful,
              },
            })
          },1000)
        }
        else{
          setTimeout(() => {
            // InteractionManager.runAfterInteractions(() => {
              this.props.navigator.showModal({
                screen: 'CmAdvertisement',
                animationType: 'none',
                navigatorStyle: {navBarHidden: true},
              })
            // })
          }, 500);
          setTimeout(() => {
            // InteractionManager.runAfterInteractions(() => {
                this.props.navigator.resetTo({
                  screen: 'CmEat',
                  animated: false,
                  navigatorStyle: {
                    navBarHidden: true,
                    disabledBackGesture: true,
                  },
                  style: {
                   backgroundBlur: "none",
                   backgroundColor: "rgba(0,0,0,0)"
                 }
              })
            // })
          }, 600);
        }
    }
    _handleSboxPress() {
        if(this._openStarted) return;
        if(!this.state.entryFlag) return;
        this._openStarted = true;
        this.startUpAnimation._fadeOut();
        setTimeout(() => {
          this._openStarted = false
        }, 6000);

        setTimeout(() => {
          // InteractionManager.runAfterInteractions(() => {
            this.props.navigator.showLightBox({
              screen: 'SboxLoading',
              animationType: 'none',
              navigatorStyle: {navBarHidden: true},
            })
          // })
        }, 500);
        setTimeout(() => {
          // InteractionManager.runAfterInteractions(() => {
            this.props.navigator.resetTo({
              screen: 'SboxHome',
              passProps: {handleBackToHome: this._handleBackToHome},
              animated: false,
              navigatorStyle: {
                navBarHidden: true,
                disabledBackGesture: true,
              },
              style: {
               backgroundBlur: "none",
               backgroundColor: "rgba(0,0,0,0)"
             }
            })
          // })
        }, 4500);
      }
    async _handleCmLifePress(){
      if(this._openStarted) return;
      if(!this.state.entryFlag) return;
      this._openStarted = true;

      setTimeout(() => {
        this._openStarted = false
      }, 5000);

      // setTimeout(() => {
      //   // InteractionManager.runAfterInteractions(() => {
      //     this.props.navigator.showLightBox({
      //       screen: 'SboxLoading',
      //       animationType: 'none',
      //       navigatorStyle: {navBarHidden: true},
      //     })
      //   // })
      // }, 500);
      this.startUpAnimation._fadeOut();

      const res =  await AuthAction.isAuthed();
      if(res.ev_error !== 0) {
        setTimeout(() => {
          this.props.navigator.showModal({
            screen: 'CmLogin',
            animationType: 'slide-up',
            navigatorStyle: {navBarHidden: true},
            passProps: {handleBackToHome: this._handleBackToHome,
                        handleLoginSuccessful: this._handleLoginSuccessfulToCmLife,
            },
          })
        },1000)
      } else if (res.ev_error === 0 && res.ev_missing_phone && res.ev_missing_phone === 1) {
        setTimeout(() => {
          this.props.navigator.showModal({
            screen: 'CmBindPhone',
            animationType: 'slide-up',
            navigatorStyle: {navBarHidden: true},
            passProps: {handleBackToHome: this._handleBackToHome,
                        handleBindSuccessful: this._handleLoginSuccessfulToCmLife,
            },
          })
        },1000)
      }
      else{
        // setTimeout(() => {
        //   // InteractionManager.runAfterInteractions(() => {
        //     this.props.navigator.showModal({
        //       screen: 'CmAdvertisement',
        //       animationType: 'none',
        //       navigatorStyle: {navBarHidden: true},
        //     })
        //   // })
        // }, 500);
        setTimeout(() => {
            let goToCmLife = this.props.goToCmLife;
            this.props.navigator.resetTo({
              screen: 'CmLifeHome',
              passProps: {
                handleBackToHome: this._handleBackToHome,
                goToCmLife
              },
              animated: false,
              navigatorStyle: {
                navBarHidden: true,
                disabledBackGesture: true,
              },
              style: {
                backgroundBlur: "none",
                backgroundColor: "rgba(0,0,0,0)"
             }
            })
        }, 1000);
      }




    }
    _handleBackToHome(tag) {
      if(tag === 'fromChanmao') {
          // this.props.navigator.pop({
          //   animated: true,
          //   animationType: 'fade',
          // });
          this.props.navigator.resetTo({
            screen: 'CmHome',
            animated: true,
            animationType: 'fade',
          })
          this.startUpAnimation.fadeIn();
          this._handleChanmaoPress();
      }else{
        this.props.navigator.pop({
          animated: true,
          animationType: 'slide-horizontal',
        });
        this.startUpAnimation.fadeIn();
      }
    }
    _handleLoginSuccessful() {
      setTimeout(() => {
        // InteractionManager.runAfterInteractions(() => {
          this.props.navigator.showModal({
            screen: 'CmAdvertisement',
            animationType: 'none',
            navigatorStyle: {navBarHidden: true},
          })
        // })
      }, 500);
      setTimeout(() => {
        // InteractionManager.runAfterInteractions(() => {
            this.props.navigator.resetTo({
              screen: 'CmEat',
              animated: false,
              navigatorStyle: {
                navBarHidden: true,
                disabledBackGesture: true,
              },
              style: {
               backgroundBlur: "none",
               backgroundColor: "rgba(0,0,0,0)"
             }
          })
        // })
      }, 600);
    }
    _handleLoginSuccessfulToCmLife() {
      // setTimeout(() => {
      //   // InteractionManager.runAfterInteractions(() => {
      //     this.props.navigator.showModal({
      //       screen: 'CmAdvertisement',
      //       animationType: 'none',
      //       navigatorStyle: {navBarHidden: true},
      //     })
      //   // })
      // }, 500);
      setTimeout(() => {
        // InteractionManager.runAfterInteractions(() => {
            this.props.navigator.resetTo({
              screen: 'CmLifeHome',
              animated: false,
              navigatorStyle: {
                navBarHidden: true,
                disabledBackGesture: true,
              },
              style: {
               backgroundBlur: "none",
               backgroundColor: "rgba(0,0,0,0)"
             }
          })
        // })
      }, 600);
    }

    _isiPhoneX(){
      return Platform.OS === 'ios' &&
          ((height === X_HEIGHT && width === X_WIDTH) ||
          (height === X_WIDTH && width === X_HEIGHT));
    }

    _getSBoxHomePage(){
      if (this._isiPhoneX()){
        return HOME_IMAGES['sbox_home_image_x'];
      }
      else{
        return HOME_IMAGES['sbox_home_image'];
      }
    }

    _getCMHomePage(){
      if (this._isiPhoneX()){
        return HOME_IMAGES['cm_home_image_x'];
      }
      else{
        return HOME_IMAGES['cm_home_image'];
      }
    }

    _renderBody() {
      const region = cme_getRegion();
      if (region && region.length > 0) {
        return (
          <StartUpAnimation
            ref={(startup)=>this.startUpAnimation = startup}
            onPressCMFoodDelivery={this._handleChanmaoPress}
            onPressCMECommerce={this._handleSboxPress}
            onPressCMLife={this._handleCmLifePress}
            navigator={this.props.navigator}
          />
        )
      }
    }

    render() {
        return(
          <View style={{flex: 1}}>
            {this.state.showPopup && this.popupView.show()}
            {this._renderBody()}
          </View>
        );
    }
  }








  // <View style={{
  //   position:'absolute',
  //   right:0,
  //   left:0,
  //   bottom:height*0.025,
  //   height: 10,
  //   alignItems:'center',
  // }}>
  //   <Text style={{
  //     fontSize:12,
  //     color:'#000000'
  //   }}>Chanmao Inc. All Copyrights Reserved</Text>
  // </View>
