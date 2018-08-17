/* @flow */

import React, { Component } from 'react';
import {
  AppState,
  Animated,
  Dimensions,
  Image,
  InteractionManager,
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
  Linking,
  NativeModules
} from 'react-native';
import AuthAction from '../Actions/AuthAction';
import VersionAction from '../Actions/VersionAction';
import {GetUserInfo} from '../Modules/Database';
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
          boxRight: new Animated.Value(width * 0.5),
          settingBottom: new Animated.Value(height * 0.45),
          orderTop: new Animated.Value(height * 0.45),
          cmLeft: new Animated.Value(width * 0.5),
          cmScaleY: new Animated.Value(1),
          cmScaleX: new Animated.Value(1),
          open: new Animated.Value(0),
          scale: 1,
          translateX:0,
          translateY:0,
          entryFlag: true,
      };
      this._startUp = this._startUp.bind(this);
      this._versionCheck = this._versionCheck.bind(this);
      this._handleAppStateChange = this._handleAppStateChange.bind(this);
      this._handleChanmaoPress = this._handleChanmaoPress.bind(this);
      this._handleSboxPress = this._handleSboxPress.bind(this);
      this._handleBackToHome = this._handleBackToHome.bind(this);
      this._handleLoginSuccessful = this._handleLoginSuccessful.bind(this);

      this._isiPhoneX = this._isiPhoneX.bind(this);
      this._getSBoxHomePage = this._getSBoxHomePage.bind(this);
      this._getCMHomePage = this._getCMHomePage.bind(this);

  }
  _openStarted = false
  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    this._startUp();
    setTimeout( () => {
      this._versionCheck();
    }, 500);
  }
  componentWillUnmount(){
    AppState.removeEventListener('change', this._handleAppStateChange);
  }
  _versionCheck(){
    let curVersion = GetUserInfo().version;
    VersionAction.getLatestVersion(curVersion).then((versionObject)=>{
      if (versionObject && versionObject.need_update) {
        this._updateAlert(versionObject);
      }
      else {
        // this._startUp();
      }
      // if(curVersion != versionObject.version){
      //   this._updateAlert(versionObject)
      // }else{
      //   this._startUp();
      // }
  })
  .catch((err)=>console.log(err));
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
      Alert.alert(
        '软件更新',
        '有新版本可下载,请前往更新',
        [
          {text:'立即更新', onPress:()=>{
            Linking.canOpenURL(url).then(supported => {
              supported && Linking.openURL(url);
            }, (err) => console.log(err));
          }}
        ]
      )
    }else{
      Alert.alert(
        '软件更新',
        '有新版本可下载，要前往App Store?',
        [
          {text: '以后再说', onPress:()=>{} ,style: 'cancel'},
          {text:'立即更新', onPress:()=>{
            Linking.canOpenURL(url).then(supported => {
              supported && Linking.openURL(url);
            }, (err) => console.log(err));
          }}
        ]
      )
    }
  }
  _startUp(){
    // AuthAction.doAuth();


      if(this.props.goToCmEat){

        setTimeout(() => {
          this._startAnimation();
        }, 200);
        setTimeout(() => {
          this._handleChanmaoPress()
        }, 3100);
      }else if(this.props.goToSweetfulBox){
        setTimeout(() => {
          this._startAnimation();
        }, 200);
        setTimeout(() => {
          this._handleSboxPress()
        }, 3100);
      }else{
        this._startAnimation();
      }
  }
  _startAnimation() {
      Animated.parallel([
          Animated.timing(
          this.state.boxRight,
              {
                  toValue: 0,
                  delay: 1700,
                  duration: 800,
              }
          ),
          Animated.timing(
          this.state.settingBottom,
              {
                  toValue: 0,
                  delay: 2000,
                  duration: 500,
              }
          ),
          // this.state.settingBottom,
          //     {
          //         toValue: 0,
          //         delay: 2000,
          //         duration: 500,
          //     }
          // ),
          Animated.timing(
          this.state.orderTop,
              {
                  toValue: 0,
                  delay: 1850,
                  duration: 650,
              }
          ),
          Animated.timing(
          this.state.cmLeft,
              {
                  toValue: 0,
                  delay: 1500,
                  duration: 1000,
              }
          ),
      ]).start();
  }
  async _handleChanmaoPress() {
      if(this._openStarted) return;
      if(!this.state.entryFlag) return;
      this._openStarted = true;
      this.setState({
        scale:3.2,
        translateX:-(width*0.5+105*3.1285/1242*375),
        translateY:-(height*0.5-136/2208*height + 116*3.1285/2208*667),
      })
      setTimeout(() => {
        this._openStarted = false
      }, 5000);
      Animated.parallel([
          Animated.timing(
          this.state.open,
              {
                  toValue: 1,
                  duration: 500,
              }
          ),
      ]).start();
      // const isAuthed =  AuthAction.isAuthed();
      const res =  await AuthAction.isAuthed();
      console.log('First ======', res);
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
        // setTimeout(() => {
        //   InteractionManager.runAfterInteractions(() => {
        //     this.props.navigator.showLightBox({
        //       screen: 'CmLoading',
        //       animated: false,
        //       navigatorStyle: {navBarHidden: true},
        //       style: {
        //         flex:1,
        //        backgroundBlur: "none", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
        //       //  backgroundColor: "rgba(0,0,0,0)" // tint color for the background, you can specify alpha here (optional)
        //      }
        //     })
        //   })
        // }, 500);
        setTimeout(() => {
          InteractionManager.runAfterInteractions(() => {
            this.props.navigator.showModal({
              screen: 'CmAdvertisement',
              animationType: 'none',
              navigatorStyle: {navBarHidden: true},
            })
          })
        }, 500);
        setTimeout(() => {
          InteractionManager.runAfterInteractions(() => {
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
          })
        }, 600);
      }
  }
  _handleSboxPress() {
                  // if (Platform.OS === 'ios') {
      if(this._openStarted) return;
      if(!this.state.entryFlag) return;
      this._openStarted = true;
      this._scale = 3.95;
      this.setState({
        scale:3.95,
        translateX:width*0.5 + width*0.39*3.8215/1242*375,
        translateY:height*0.5 + height*0.21*3.8215/2208*667,
      })

      setTimeout(() => {
        this._openStarted = false
      }, 5000);
      InteractionManager.runAfterInteractions(() => {
        Animated.timing(
        this.state.open,
            {
                toValue: 1,
                duration: 500,
            }
        ).start();
      });
      setTimeout(() => {
        InteractionManager.runAfterInteractions(() => {
          this.props.navigator.showLightBox({
            screen: 'SboxLoading',
            animationType: 'none',
            navigatorStyle: {navBarHidden: true},
          })
        })
      }, 500);
      setTimeout(() => {
        InteractionManager.runAfterInteractions(() => {
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
        })
      }, 2500);
                  // } else if (Platform.OS === 'android') {
                  //   setTimeout(() => {
                  //     InteractionManager.runAfterInteractions(() => {
                  //       this.props.navigator.push({
                  //         screen: 'SboxHome',
                  //         passProps: {handleBackToHome: this._handleBackToHome},
                  //         animated: true,
                  //         animationType: 'slide-horizontal',
                  //         navigatorStyle: {
                  //           navBarHidden: true,
                  //           disabledBackGesture: true,
                  //         },
                  //         style: {
                  //          backgroundBlur: "none",
                  //          backgroundColor: "rgba(0,0,0,0)"
                  //        }
                  //       })
                  //     })
                  //   }, 1000);
                  // }
    }
  _handleBackToHome(tag) {
    if(tag === 'fromChanmao') {
        this.props.navigator.pop({
          animated: true,
          animationType: 'fade',
        });
        this._handleChanmaoPress();
    }else{
      this.props.navigator.pop({
        animated: true,
        animationType: 'slide-horizontal',
      });
      InteractionManager.runAfterInteractions(() => {
        Animated.timing(
        this.state.open,
            {
                toValue: 0,
                duration: 500,
            }
        ).start();
      });
    }
  }
  _handleLoginSuccessful() {
    // InteractionManager.runAfterInteractions(() => {
    //   //   this.props.navigator.push({
    //   //     screen: 'CmEat',
    //   //     passProps: {handleBackToHome: this._handleBackToHome},
    //   //     animated: false,
    //   //     navigatorStyle: {
    //   //       navBarHidden: true,
    //   //       disabledBackGesture: true,
    //   //     },
    //   //
    //   //     style: {
    //   //      backgroundBlur: "none",
    //   //      backgroundColor: "rgba(0,0,0,0)"
    //   //    }
    //   // })
    setTimeout(() => {
      InteractionManager.runAfterInteractions(() => {
        this.props.navigator.showModal({
          screen: 'CmAdvertisement',
          animationType: 'none',
          navigatorStyle: {navBarHidden: true},
        })
      })
    }, 500);
    setTimeout(() => {
      InteractionManager.runAfterInteractions(() => {
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
      })
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

  render() {
      const cmScale = this.state.open.interpolate({inputRange: [0, 1], outputRange: [1, this.state.scale]}) //3.8215  275 320
      const cmtranslateX = this.state.open.interpolate({inputRange: [0, 1], outputRange: [0, this.state.translateX]})
      const cmtranslateY = this.state.open.interpolate({inputRange: [0, 1], outputRange: [0, this.state.translateY]})
      const cmTransform = {transform:[{translateX:cmtranslateX},{translateY:cmtranslateY},{scale:cmScale}]}

      const sboxHomeHeightRatio = this._isiPhoneX() ? 2.2 : 1.971;
      const cmHomeHeightRatio = this._isiPhoneX() ? 2.2 : 1.88;

      return (
          <Animated.View style={[styles.container,cmTransform]}>
              <View style={{ flex: 1,}}>
                <TouchableWithoutFeedback onPress={this._handleSboxPress}>
                  <Animated.View style={{ flex: 0.55, right: this.state.boxRight,}}>

                      <Image source={ this._getSBoxHomePage() }
                          style={{ width: width * 0.3674,
                                    height: width * 0.3674 * sboxHomeHeightRatio,
                                    bottom: 10,
                                    position: 'absolute',
                                    left: width * 0.0612,
                          }}
                      />
                  </Animated.View>
                </TouchableWithoutFeedback>

                  <Animated.View style={{ flex: 0.45, top: this.state.orderTop,  }}>

                  </Animated.View>
              </View>
              <View style={{ flex: 1, }}>
                  <Animated.View style={{ flex: 0.45, bottom: this.state.settingBottom,  }}>
                    <Image source={require('./Img/HOME-PAGE-SBOX-RIGHT.png')}
                         style={{ width: width * 0.4,
                                   height: width * 0.4 * 1.1462,
                                   top: height*0.18,
                                   position: 'absolute',
                                   right: width * 0.16,
                         }}
                     />
                  </Animated.View>

                  <TouchableWithoutFeedback onPress={this._handleChanmaoPress} >
                    <Animated.View style={{ flex: 0.55,overflow: 'visible', left: this.state.cmLeft, }}>

                        <Image source={ this._getCMHomePage() }

                            style={[{ width: width * 0.4315,
                                      height: width * 0.4315 * cmHomeHeightRatio,
                                      top: 20,
                                      position: 'absolute',
                                      left: 0,overflow: 'visible',
                            },]}
                        >

                        </Image>


                    </Animated.View>
                  </TouchableWithoutFeedback>
              </View>
          </Animated.View>

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
