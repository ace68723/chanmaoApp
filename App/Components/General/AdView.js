'use strict';

import React, {
	Component,
} from 'react';
import {
  Animated,
  Image,
  InteractionManager,
  StyleSheet,
  WebView,
  Text,
  View,
	Dimensions,
	Linking
} from 'react-native';
import Header from '../General/Header';

const AnimatedWebView = Animated.createAnimatedComponent(WebView);

class ArticleDetail extends Component {
  constructor(props){
    super(props);
    this.state={
      url: this.props.url,
      showWebView:new Animated.Value(0),
			loading:true,
			progress:0,
			progressBar:true
    }
    this._startShowWebView = this._startShowWebView.bind(this);
    this._goBack = this._goBack.bind(this);
  }
  _startShowWebView(){
    Animated.timing(this.state.showWebView, {
      toValue: 1,
      duration: 300,
    }).start();
  }

  _goBack(){
    if(this.props.tag == "forChanmaoLaunchAd"){
      InteractionManager.runAfterInteractions(() => {
        this.props.navigator.dismissModal({
           animationType: 'none'
        })
        setTimeout(() => {
          this.props.navigator.dismissModal({
             animationType: 'slide-down'
          })
        }, 500);
      })
    } else {
      this.props.navigator.dismissModal({
         animationType: 'slide-down'
      })
    }
  }
	showLoading() {
		this.setState({ loading: true, progress: 0 });
		this.timer = setInterval(()=>{
				const maxProgress = 0.95;
				if(this.state.progress >= maxProgress){
						clearInterval(this.timer);
				}else {
						let random = 0.01;
						let progress = this.state.progress + random;
						if(progress > maxProgress){
								progress = maxProgress;
						}
						this.setState({progress});
				}
		}, 1);
	}
	hideLoading() {
		this.setState({ progress: 1});
		let timer = setTimeout(() => {
      this.setState({ loading: false});
			clearInterval(this.timer);
    }, 500);
	}

  render() {
		let progressWidth = Dimensions.get('window').width * this.state.progress;
    return (
      <View style={styles.container} >
        <Header goBack={this._goBack}
								leftButtonText={'x'}/>
				{
					this.state.loading &&
					<View style={{backgroundColor: '#F46A2C', height: 3, width: progressWidth, }}/>
				}
        <View style={{flex:1,}}>
          <AnimatedWebView style={[
                      styles.WebView,
                      {opacity:this.state.showWebView.interpolate({
                                                  inputRange: [0, 1],
                                                  outputRange: [0,1],
                                                }),},
                    ]}
                    source={{uri:this.state.url}}
                    onLoadEnd={()=>{this._startShowWebView()}}
										onShouldStartLoadWithRequest= {(e) => {
										    var scheme = e.url.split('://')[0]
										    if(scheme === 'http' || scheme === 'https'){
										    	return true
										    }
												// whitelist for tmall 11.11
												if (scheme == 'tbopen'){
													Linking.openURL(e.url);
												}
										    return false
										}}
										onLoadStart={() => (this.showLoading())}
                    onLoad={() => (this.hideLoading())}
										/>

        </View>

     </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#f3f3f3',
  },
  WebView:{
    flex:1,
  },
	progress:{
			backgroundColor: 'transparent',
	},
});

module.exports = ArticleDetail;
