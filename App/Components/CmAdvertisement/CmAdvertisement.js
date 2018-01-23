/* @flow */

import React, { Component } from 'react';
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
const {width,height} = Dimensions.get('window')
export default class CmAdvertisement extends Component {
  constructor(){
    super();
    this.state = {
      AdImage:'',
    }
    this._closeAd = this._closeAd.bind(this);
  }
  componentDidMount() {
    this._getAd();
    setTimeout(() =>{
      this._closeAd();
    },7600)
  }
  _closeAd() {
    InteractionManager.runAfterInteractions(() => {
      this.props.navigator.dismissLightBox();
    })
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
        console.log(res)
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
					// AuthService.doAuth()
				}
			})
			.catch((error) => {throw error})
	}
  _renderAdvertisement(){
    if(this.state.AdImage){
      return(
          <TouchableWithoutFeedback onPress={this._openAdView}>
            <Image style={{width:this.state.adWidth,height:this.state.adHeight,opacity:this.state.adOpacity}}
                    resizeMode={'cover'}
                    source={{uri:this.state.AdImage}}/>
          </TouchableWithoutFeedback>
      )
    }
  }
  _renderAdLogo(){
    return(
      <View style={styles.logoBox}>
          <Image source={require('./Image/logo.png')} style={{width:180,height:60}} />
     </View>
    )
  }
  render() {
    return (
      <View style={[styles.mainContainer,{backgroundColor:'#ffffff'}]}>
          {this._renderAdvertisement()}
          <TouchableOpacity style={{position:'absolute',
                                    top:30,
                                    right:20,
                                    padding:6,
                                    backgroundColor:'rgba(151,151,151,0.5)',
                                    borderRadius:5}}
                            onPress={this._closeAd}>
            <Text style={{color:'#ffffff',fontSize:16,fontWeight:'600'}}>
              跳过
            </Text>
          </TouchableOpacity>
          <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
              {this._renderAdLogo()}
          </View>
          <View style={styles.copyRightView}>
            <Text style={styles.copyright}>Chanmao Inc. All Copyrights Reserved</Text>
         </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    // position:'absolute',
    width:width,
    height:height,
    backgroundColor:'white',
    top:0,left:0,right:0,bottom:0,
  },
  logoBox: {
      flexDirection: 'row',
      height: 100,
      alignSelf: 'center',
  },
  logo:{
    width:240,
    height:80,
  },
  copyRightView:{
    position:'absolute',
    right:0,
    left:0,
    bottom:height*0.025,
    height: 20,
    alignItems:'center',
  },
  copyright:{
    fontSize:12,
    backgroundColor:'rgba(0,0,0,0)',
    color:'#ffffff'
  },
});
