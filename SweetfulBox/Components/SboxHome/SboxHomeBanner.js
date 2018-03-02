/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default class SboxHomeBanner extends Component {
  _handleOnPress(advertisement){
    console.log(advertisement);
		if(advertisement.navitype == 2){
			this.props.navigator.push({
				id: 'AdView',
				url:advertisement.naviparam.url,
			})
		}
		if(advertisement.navitype == 3){
				advertisement.restaurant = advertisement.naviparam;
				this.props.openMenu(height,advertisement.naviparam);
		}
	}
  _renderAdv(){
    if(this.props.advertisement && this.props.advertisement.length>0){
				let Ad = this.props.advertisement.map((advertisement,index)=>{
					return(
						<TouchableWithoutFeedback key={index} onPress={this._handleOnPress.bind(null,advertisement)}>
							<View style={styles.autoViewStyle}>
								<Image source={{uri:advertisement.image}} style={styles.adLarger}/>
							</View>
						</TouchableWithoutFeedback>
					)

				})
      return(
        <View style={styles.container}>
					{Ad}
        </View>

      )
    }
  }
  render() {
      return (
        <ScrollView style={styles.scrollView}
                    ref={'_scrollVew'}
                    scrollEventThrottle={16}
                    onScroll={this.props.scrollEventBind()}
                    showsVerticalScrollIndicator={false}>

             <View style={{marginTop:202,height:0}}
                   ref={'_scrollViewContent'}/>
             {this._renderAdv()}
        </ScrollView>
      );
  }
}
