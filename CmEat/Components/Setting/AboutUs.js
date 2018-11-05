'use strict'
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  Image,
  Alert,
  Linking,
  ScrollView,
  Clipboard,
} from 'react-native';
import AppConstants from '../../Constants/AppConstants';
import Label from '../../../App/Constants/AppLabel';
const {height, width} = Dimensions.get('window');
const deviceWidth = width;
const deviceHeight = height;
import Header from '../General/Header';
import PopupView from '../Popup/PopupView'

export default class InfoPage extends Component {
  constructor(){
    super();

    this.state = {

    }
    this._goBack = this._goBack.bind(this);
    this.contact = this.contact.bind(this);

    this.popupView = PopupView.getInstance();
  }

  contact(num,type){
    if(type == "phone"){
      this.popupView.setMessagePopup({
        title: "拨打号码",
        subtitle: num,
        confirmText: '确定',
        cancelText: '取消',
        onConfirm: () => {
          return Linking.openURL('tel:'+num);
        },
        onDismiss: () => {
          this.setState({showPopup: false})
        }
      });
      this.setState({showPopup: true});

     //  Alert.alert("拨打号码",num,[{
     //   text: 'OK',
     //   onPress: () => {
     //     return Linking.openURL('tel:'+num);
     //   }
     // },
     //  {
     //   text: 'Cancel',
     //   style: 'cancel',
     //  }]);
    }
    else if(type == "email"){

      this.popupView.setMessagePopup({
        title: "发送邮件",
        subtitle: num,
        confirmText: '确定',
        cancelText: '取消',
        onConfirm: () => {
          return Linking.openURL('mailto:'+num);
        },
        onDismiss: () => {
          this.setState({showPopup: false})
        }
      });
      this.setState({showPopup: true});

     //  Alert.alert("发送邮件",num,[{
     //   text: 'OK',
     //   onPress: () => {
     //     return Linking.openURL('mailto:'+num);
     //   }
     // },
     //  {
     //   text: 'Cancel',
     //   style: 'cancel',
     //  }]);
    }
  }
  _goBack(){
    this.props.navigator.pop();
  }
  render() {

    // <Text style={styles.centerFont} onPress={()=>{
    //   this.contact("647-515-6699","phone");
    // }} allowFontScaling={false}>客服电话：647-515-6699</Text>
    return (
      <View style={styles.container}>
        {this.state.showPopup && this.popupView.show()}
        <Header title={Label.getCMLabel('ABOUT_US')} goBack={this._goBack}/>
        <ScrollView style={{flex:1, paddingTop:32,paddingLeft:20,paddingRight:20, paddingBottom: 20}}>

            <View style={styles.fontContainer}>
                <Text style={styles.headerFont} allowFontScaling={false} >
                  小明配送是基于加拿大魁北克省蒙特利尔的O2O网络订餐平台，零元起送，无送餐范围限制，保证送餐速度，致力于成为蒙特利尔最佳订餐服务平台。这是一个年轻热血有梦想的团队，我们愿真诚的接纳您的意见，也邀请志同道合的你加入我们。
                </Text>
            </View>
                <View style={styles.centerContent}>
                          <View style={styles.imgContainer} >
                            <Image source={require('./Image/xmQRcode.jpg')} style={{width: 140, height: 140}} />
                          </View>
                          <View style={styles.centerFontContainer}>
                              <Text style={styles.centerFontWEIXIN}
                                    selectable={true}
                                    allowFontScaling={false}>
                                    微信客服：xiaomingpeisong_ca
                              </Text>
                              <Text style={styles.centerFont} onPress={()=>{
                                this.contact("marketing@chanmao.ca","email");
                              }} allowFontScaling={false}>商务合作：marketing@xiaoming.ca</Text>
                          </View>
                </View>
        </ScrollView>
        <View style={styles.footer}>
            <Text style={styles.footerFont} allowFontScaling={false}>
              Chanmao Inc. 版权所有
            </Text>
            <Text style={styles.footerFont} allowFontScaling={false}>

            </Text>
            <Text style={styles.footerFont} allowFontScaling={false}>
              版本号：v{AppConstants.CM_VERSION}
            </Text>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  fontContainer:{
    flex:1,
    padding:20,
  },
  headerFont: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight:20
  },
  centerContent:{
    flex:1,
    backgroundColor: '#ffffff',

    justifyContent: 'center',
    shadowColor:'#bfbfbf',
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },
  },
  centerFontContainer:{
    paddingTop:20,
    paddingBottom:25,
    alignItems: 'center',
  },
  centerFont:{
    paddingBottom:20,
    fontSize:16
  },
  centerFontWEIXIN:{
    paddingBottom:20,
    fontSize:16,
    color:'#0080ff'
  },

  footer:{
    alignSelf:'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding:10,
    width: deviceWidth-50,
    borderTopWidth: 1,
    borderColor: '#d9d9d9',
  },
  footerFont:{
    fontSize:15,
  },
  imgContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    padding:30

  }

});
