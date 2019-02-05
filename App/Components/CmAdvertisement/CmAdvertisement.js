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
} from 'react-native';
import {cme_getSelectedAddress} from '../../Modules/Database';
import Label from '../../Constants/AppLabel';
import { GetUserInfo, cme_getRegion } from '../../Modules/Database';

const {width,height} = Dimensions.get('window')

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
      showingAd: true
    }
    this._openAdView = this._openAdView.bind(this);
    this._closeAd = this._closeAd.bind(this);
  }
  componentDidMount() {
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
  		const url = "https://www.cmapi.ca/cm_backend/index.php/api/cmapp/v1/get_ad_launch";
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
      console.log(options);
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

  render() {
    return (
      <View style={styles.mainContainer}>
          {this._renderAdvertisement()}
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
          {this._renderAddress()}
          {this._renderAdLogo()}

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
