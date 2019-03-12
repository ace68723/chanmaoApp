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
import { GetUserInfo, cme_getRegion } from '../../Modules/Database';

class AdView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: this.props.url,
      loading: true,
      progress: 0,
    };
    this._goBack = this._goBack.bind(this);

    this.sendMessage = this.sendMessage.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
  }
  sendMessage(data) {
    this.webview.postMessage(JSON.stringify(data));
  }
  handleMessage(e) {
    this.setState({"loading": false}); // Reciving message with trigger onload

    const eventKey = JSON.parse(e.nativeEvent.data).key;
    const reply = this.eventDispatcher(eventKey);
    console.log(reply);
    
    this.sendMessage({ "data": reply});
  }
  eventDispatcher(key){
    const { token, uid } = GetUserInfo();
    const region = cme_getRegion();
    switch (key){
      case "getToken": return token;
      case "getUID": return uid;
      case "getRegion": return region;
    }
  }
  _goBack() {
    if (this.props.tag == "forChanmaoLaunchAd") {
      InteractionManager.runAfterInteractions(() => {
        this.props.navigator.dismissModal({
          animationType: "none"
        });
        setTimeout(() => {
          this.props.navigator.dismissModal({
            animationType: "slide-down"
          });
        }, 500);
      });
    } else {
      this.props.navigator.dismissModal({
        animationType: "slide-down"
      });
    }
  }
  showLoading() {
    this.setState({ loading: true, progress: 0 });
    this.timer = setInterval(() => {
      const maxProgress = 0.95;
      if (this.state.progress >= maxProgress) {
        clearInterval(this.timer);
      } else {
        let random = 0.01;
        let progress = this.state.progress + random;
        if (progress > maxProgress) {
          progress = maxProgress;
        }
        this.setState({ progress });
      }
    }, 1);
  }
  hideLoading() {
    this.setState({ progress: 1 });
    let timer = setTimeout(() => {
      this.setState({ loading: false });
      clearInterval(this.timer);
    }, 500);
  }

  render() {
    let progressWidth = Dimensions.get("window").width * this.state.progress;
    return (
      <View style={styles.container}>
        <Header goBack={this._goBack} leftButtonText={"x"} />
        {this.state.loading && (
          <View
            style={{
              backgroundColor: "#F46A2C",
              height: 3,
              width: progressWidth
            }}
          />
        )}
        <View style={{ flex: 1 }}>
          <WebView
            style={styles.WebView}
            source={{ uri: "http://127.0.0.1:8000/" }}
            onShouldStartLoadWithRequest={e => {
              var scheme = e.url.split("://")[0];
              if (scheme === "http" || scheme === "https") {
                return true;
              }
              // whitelist for tmall 11.11
              if (scheme == "tbopen") {
                Linking.openURL(e.url);
              }
              return false;
            }}
            onLoadStart={() => this.showLoading()}
            onLoad={() => this.hideLoading()}
            ref={webview => (this.webview = webview)}
            onMessage={this.handleMessage}
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

module.exports = AdView;
