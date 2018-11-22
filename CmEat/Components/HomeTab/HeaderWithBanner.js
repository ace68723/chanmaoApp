
import React, {
	Component,
} from 'react';

import {
  Dimensions,
  Image,
	Platform,
	View,
	ScrollView,
  StyleSheet,
	StatusBar,
	TouchableWithoutFeedback,
} from 'react-native';

import Swiper from 'react-native-swiper'
import CardView from './CardView';
import { Navigation } from 'react-native-navigation';


const SCREEN_WIDTH = Dimensions.get('window').width;
const {width,height} = Dimensions.get('window');

let top;
if(height == 812){
  //min 34
  top = 88;
}else{
  top = 54;
}


const HEADER_MAX_HEIGHT = 200;
// const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_MIN_HEIGHT = 0;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
class ActivityHeaderWithBanner extends Component {
	  constructor(){
	    super();
			this._handleOnPress = this._handleOnPress.bind(this);
	  }
		_handleOnPress(banner){
			if(banner.navitype == 2){
        const {url} = banner.naviparam;
        Navigation.showModal({
          screen: 'AdView',
          animated: true,
          navigatorStyle: {navBarHidden: true},
          passProps: {url: url}
        });
			}
			else if(banner.navitype == 3){
          this.props.navigator.showModal({
            screen: 'CmEatMenu',
            animated: false,
            navigatorStyle: {navBarHidden: true},
            passProps: {
              py:height,
              restaurant:banner.naviparam,
            },
          });
			}
			else if(advertisement.navitype == 4) {
				if (advertisement.naviparam.target_page == 'cmwash') {
					this.props.navigator.resetTo({
			      screen: 'cmHome',
			      animated: true,
			      animationType: 'fade',
			      navigatorStyle: {
			        navBarHidden: true
			      },
			      passProps: {
			        goToCmLife: 'cmwash'
			      }
			    });
				}
			}
		}
		_renderBanner(){


			if(this.props.bannerList ){
				return  this.props.bannerList.map((banner,index)=>{
						return(
              <TouchableWithoutFeedback key={index}
                          onPress={this._handleOnPress.bind(null,banner)}>
                <View style={{flex:1,justifyContent:'center'}}>
                    <Image
                       style={{height: 200,}}
                       source={{uri: banner.image}}
                    />
                </View>
              </TouchableWithoutFeedback>
            )
					})
			}
		}
		_renderSwiper(){

			return(
        <Swiper showsButtons={false}
                showsPagination={false}
                height={200}
                autoplay
                loop
                horizontal
                removeClippedSubviews={false}>
                {this._renderBanner()}
        </Swiper>
      )
    }
		render() {

	    return (
				<View style={{height: 200,}}>
					{this._renderSwiper()}
        </View>
	    );
	  }
	}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: top,
    left: 0,
    width: width,
    height: 200,
    overflow: 'hidden',
  },
  backgroundImage: {
    alignSelf:'center',
    width: width,
    height: 200,
    alignSelf:'center',
  },
});

module.exports = ActivityHeaderWithBanner;
