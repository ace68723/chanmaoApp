
import React, {
	Component,
} from 'react';

import {
	Animated,
  Dimensions,
  Image,
	Platform,
  Text,
	View,
  ViewPagerAndroid,
	ScrollView,
  StyleSheet,
	StatusBar,
	TouchableWithoutFeedback,
} from 'react-native';

import Swiper from 'react-native-swiper'

const {width,height} = Dimensions.get('window');
// const HEADER_MAX_HEIGHT = width*0.4831*1.3699;
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
			if(banner.type == 1){
				this.props.navigator.showModal({
	        screen: 'AdView',
	        animated: true,
	        navigatorStyle: {navBarHidden: true},
	        passProps: {url: banner.param}
	      });
			}
			if(banner.type == 2){
			 		let spu_id = banner.param.spu_id;
	        this.props.jumpToItem(spu_id, -1);
			}
			if(banner.type == 3){
			 		let spu_id = banner.param.spu_id;
					let sku_id = banner.param.sku_id;
	        this.props.jumpToItem(spu_id, sku_id);
			}
		}

		_renderBanner(){
			const imageTranslate = this.props.scrollY.interpolate({
				inputRange: [0, HEADER_SCROLL_DISTANCE],
				outputRange: [0, -50],
				extrapolate: 'clamp',
			});
        let bannerList = [];
        for (var index = 0; index < this.props.bannerList.length; index++) {
          const banner = this.props.bannerList[index]
          bannerList.push(
            <TouchableWithoutFeedback
                        key={index}
                        onPress={this._handleOnPress.bind(null,banner)}
                      >
                    <Animated.Image
                      style={[
                        styles.backgroundImage,
                        { transform: [{translateY: imageTranslate,}]},
                      ]}
                       source={{uri: banner.image}}
                    />
            </TouchableWithoutFeedback>
          )
        }
        return bannerList;
		}
    _renderSwiper(){
        const imageTranslate = this.props.scrollY.interpolate({
  				inputRange: [0, HEADER_SCROLL_DISTANCE],
  				outputRange: [0, -50],
  				extrapolate: 'clamp',
  			});

        return(
            <Swiper showsButtons={false}
                    showsPagination={false}
                    height={width*0.4831*1.3699}
                    autoplay={true}
                    autoplayTimeout={5}
                    loop={true}
                    removeClippedSubviews={false}>
                    {this._renderBanner()}
            </Swiper>
        )
      }
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
					<StatusBar
							barStyle="default"
						/>
					{this._renderSwiper()}
        </Animated.View>
	    );
	  }
	}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    flex:1
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
});

module.exports = ActivityHeaderWithBanner;
