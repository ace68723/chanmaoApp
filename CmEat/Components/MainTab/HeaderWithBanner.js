
import React, {
	Component,
} from 'react';

import {
	Animated,
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

const xOffset = new Animated.Value(0);
const onScroll = Animated.event(
  [{ nativeEvent: { contentOffset: { x: xOffset } } }],
  { useNativeDriver: true }
);
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
const HEADER_MIN_HEIGHT = 20;
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
			if(banner.navitype == 3){
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
		}
    _rotateTransform(index: number) {
      if (Platform.OS === 'ios') {

        // 0 - 375
        return {
          transform: [{
            translateX: xOffset.interpolate({
              inputRange: [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
              // outputRange: [-width*0.5, 0, width*0.5],
              outputRange: [-35, 0, 35],
            })
          }]
        };
      } else {
        return {
          transform: [{
            translateX: xOffset.interpolate({
              inputRange: [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
              outputRange: [-35, 0, 35],
            })
          }],
          paddingLeft:  xOffset.interpolate({
            inputRange: [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
            outputRange: [-35, 0, 35],
          })
        };
      }
    }
		_renderBanner(){
			const imageTranslate = this.props.scrollY.interpolate({
				inputRange: [0, HEADER_SCROLL_DISTANCE],
				outputRange: [0, -50],
				extrapolate: 'clamp',
			});

			if(this.props.bannerList ){
				return  this.props.bannerList.map((banner,index)=>{
						return(
              <TouchableWithoutFeedback key={index}
                          onPress={this._handleOnPress.bind(null,banner)}>
                <View style={{flex:1,justifyContent:'center'}}>
                    <Animated.Image
                      style={[
                        styles.backgroundImage,
                        { transform: [{translateY: imageTranslate}]},
                      ]}
                       source={{uri: banner.image}}
                    />
                </View>
              </TouchableWithoutFeedback>
            )
					})
			}
		}
		_renderSwiper(){
			// 	return(
      //     <CardView ref="CardView"
      //               onScroll={onScroll}>
      //        {this._renderBanner()}
      //     </CardView>
      //
			// 	)
			// }
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
			// {this._renderSwiper()}
		render() {
			const headerHeight = this.props.scrollY.interpolate({
	      inputRange: [0, HEADER_SCROLL_DISTANCE],
	      outputRange: [200, HEADER_MIN_HEIGHT],
	      extrapolate: 'clamp',
	    });
			const imageOpacity = this.props.scrollY.interpolate({
	      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
	      outputRange: [1, 1, 0],
	      extrapolate: 'clamp',
	    });
	    return (
				<Animated.View style={[styles.header, {height: headerHeight,opacity:imageOpacity,}]}>
					{this._renderSwiper()}
        </Animated.View>
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
