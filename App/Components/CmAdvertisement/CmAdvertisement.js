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

const {width,height} = Dimensions.get('window')

export default class CmAdvertisement extends Component {
  constructor(){
    super();
    let addr;
    if(cme_getSelectedAddress()){
      addr = cme_getSelectedAddress().addr.split(",", 1);
    }
    this.state = {
      AdImage:'',
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
  		const url = "https://chanmao.ca/index.php?r=MobAd10/AdLaunch";
  		let options = {
  				method: 'GET',
  				mode:'cors',
  				headers: {
  						'Accept': 'application/json',
  						'Content-Type': 'application/json'
  				}
  		}
  		fetch(url,options)
  			.then((res) => res.json())
  			.then((res)=>{
  				if(res.result == 0 ){

  					if(res.image){
              Image.getSize(res.image, (width, height) => {
                const ratio = height/width;
                const adHeight = Dimensions.get('window').width * ratio;
                const adWidth = Dimensions.get('window').width;
                this.setState({
    							AdImage: res.image,
    							AdUrl: res.navigation,
    							showAd:true,
                  adHeight,
                  adWidth
    						})
              });

  					}else{
  						this.setState({
  							showAd:false,
  						})
  					}
  				}else{
  					this.setState({
  						showAd:false,
  					})
  				}
  			})
  			.catch((error) => { console.log(error); throw error})
	}
  _openAdView() {
    this.setState({showingAd: false});
      this.props.navigator.showModal({
        screen: 'AdView',
        animated: true,
        navigatorStyle: {navBarHidden: true},
        passProps: {
          url: this.state.AdUrl,
          tag:"forChanmaoLaunchAd"
        }
      })
  }
  _renderAdvertisement(){
    if(this.state.AdImage){
      return(
          <TouchableWithoutFeedback onPress={this._openAdView}>
            <Image style={{top:0,left:0,position:'absolute',width:this.state.adWidth,height:this.state.adHeight,opacity:this.state.adOpacity}}
                    resizeMode={'cover'}
                    source={{uri:this.state.AdImage}}/>
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
