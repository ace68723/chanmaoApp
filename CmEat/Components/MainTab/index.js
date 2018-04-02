'use strict';
import React, {
	Component,
} from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
	FlatList
} from 'react-native';

import _forEach from 'lodash/forEach';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import DefaultTabBar from './DefaultTabBar';

import CmEatHomeHeader from './CmEatHomeHeader';

import HomeTab from '../HomeTab/'
import RestaurantTab from '../Restaurant/RestaurantTab'
import RestaurantCard from '../Restaurant/RestaurantCard';
import AddressPromptView from './AddressPromptView';
// import Menu from '../Restaurant/Menu';

import HomeAction from '../../Actions/HomeAction';
import AddressAction from '../../Actions/AddressAction';
import HomeStore from '../../Stores/HomeStore';

import Util from '../../Modules/Util'

const {width,height} = Dimensions.get('window');
// const HEADER_MAX_HEIGHT = width*0.45+6;
const HEADER_MAX_HEIGHT = 220;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
let _scrollY = 0;
let marginTop;
if(height == 812){
  //min 34
  //header 88 + swiper 200 - FlatList margin 34 + tabbar 30
  marginTop = 0;
}else{
  marginTop = -20;
}
export default class MainTab extends Component {

  constructor(){
    super()
    this.scrollViewRefs = [];
		const state = {
      scrollY: new Animated.Value(0),
			restaurantCoverOpacity: new Animated.Value(0), // init restaurant tab view opacity 0
			renderAddressPrompt: false,
      shouldRenderAddressPrompt:false,
			showIntroduction: true,
			restaurantList: [],
		}

		this.state = Object.assign({},state,HomeStore.getHomeState());
    this._onChange = this._onChange.bind(this);
    this._handleBackToHome = this._handleBackToHome.bind(this);
    // this._goToRestaurantSearch = this._goToRestaurantSearch.bind(this);

		this._showAddressPrompt = this._showAddressPrompt.bind(this);
		this._dismissAddressPrompt = this._dismissAddressPrompt.bind(this);
		this._onScrollRestaurantsList = this._onScrollRestaurantsList.bind(this);

  }
	async componentDidMount(){
    await AddressAction.getAddress();
    HomeAction.getHomeData();
    HomeStore.addChangeListener(this._onChange);
	}
	componentWillUnmount(){
		HomeStore.removeChangeListener(this._onChange);
	}
	shouldComponentUpdate(nextProps, nextState){
		if( nextState != this.state){
			return true
		}else{
			return false
		}
	}
  _onChange(){
    const newState = Object.assign({},HomeStore.getHomeState(),{renderAddressPrompt:true,});
    this.setState(newState);
  }
  _handleBackToHome(){
    this.props.navigator.resetTo({
        screen: 'cmHome',
        animated: true,
        animationType: 'fade',
        navigatorStyle: {navBarHidden: true},
      });
  }
  // _goToRestaurantSearch(){
  //   this.props.navigator.push({
  //     screen: 'CmRestaurantSearch',
  //     animated: false,
  //     navigatorStyle: {navBarHidden: true},
  //     // passProps: {
  //     //   restaurant:this.state.areaList[0].restaurantList,
  //     //   areaList: this.state.areaList
  //     // },
  //   });
  // }

	_showAddressPrompt(){
		this.setState({shouldRenderAddressPrompt:true});
	}

	_dismissAddressPrompt(){
		this.setState({shouldRenderAddressPrompt:false});
	}

	_onScrollRestaurantsList(event){
		const DISMISS_OFFSET = 900;
		if (event.nativeEvent.contentOffset.y >= DISMISS_OFFSET && this.state.shouldRenderAddressPrompt === true){
			AddressAction.dismissAddressPromptView();
		}
	}

  render(){
    return(
      <View style={{flex: 1, marginTop: marginTop}}>
				<HomeTab  tabLabel='主页'
									navigator={this.props.navigator}
									advertisement={this.state.advertisement}
                  bannerList={this.state.bannerList}
									restaurantList = {this.state.restaurantList}
									onScrollRestaurantsList = {this._onScrollRestaurantsList}
									showIntroduction={this.state.showIntroduction}
									/>
        <CmEatHomeHeader
			       handleBackToHome={this._handleBackToHome}
			       renderSearch={this.state.renderSearch}
			       showAddressPrompt={this._showAddressPrompt}
						 dismissAddressPrompt={this._dismissAddressPrompt}
						 shouldRenderAddressPrompt={this.state.shouldRenderAddressPrompt}
						 renderAddressPrompt={this.state.renderAddressPrompt}
				 />
				 {this.state.shouldRenderAddressPrompt && this.state.renderAddressPrompt &&
						 <AddressPromptView
							 ref='AddressPrompt' onPress={this._dismissAddressPrompt} />
				 }
     </View>
    )
  }
}

const styles = StyleSheet.create({

});




					// 	{this.state.shouldRenderAddressPrompt &&
          //    this.state.renderAddressPrompt &&
					// 	<TouchableWithoutFeedback onPress={this._showAddressPrompt} >
					// 		<View style={{
					// 							position: 'absolute',
					// 							height: 36,
					// 							left: (width / 2) - (width * 0.9) / 2,
					// 							width: (width * 0.9),
					// 							paddingLeft: 16,
					// 							justifyContent:'center',
					// 							backgroundColor: '#ea7b21',
					// 							marginTop: Util.isiPhoneX() === true ? 94 : 62
					// 						}}>
					// 			<View style={styles.TriangleShapeCSS} />
					// 			<Text style={{color:"white",
					// 								fontSize:12,
					// 								top: -4,
					// 								fontWeight:'bold',
					// 								textAlignVertical: "center",
          //                 fontFamily:"FZZhunYuan-M02S",
					// 								backgroundColor: '#ea7b21',}}
					// 								numberOfLines={1}>
					// 								这是正确的地址吗？距离您的位置似乎有点远。
					// 			</Text>
					// 		</View>
					// 	</TouchableWithoutFeedback>
					// }
