'use strict';
import React, {
	Component,
} from 'react';
import {
  Animated,
  Dimensions,
  Image,
	ScrollView,
	TextInput,
  Platform,
	findNodeHandle,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import MainTab from '../MainTab';
import HistoryTab from '../History/HistoryTab';
import SettingTab from '../Setting/SettingTab';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from './TabBar';

const {width,height} = Dimensions.get('window');


export default class Tabs extends Component {

  constructor(){
    super()
		this._hideTabBar = this._hideTabBar.bind(this);
	  this._showTabBar = this._showTabBar.bind(this);

  }
	componentDidMount(){
    if(this.props.checkoutStatus){
      this.tabView.goToPage(1);
      this.props.navigator.push({
        screen: 'CmEatHistory',
        animated: true,
        navigatorStyle: {navBarHidden: true},
        passProps:{tag:"fromHome"}
      });
    }
	}
	_hideTabBar(){
		if(this.state.showTabBar){
			this.setState({
				tabBarPosition:'overlayBottom',
				showTabBar:false,
			})
		}
	}
	_showTabBar(){
		if(!this.state.showTabBar){
			this.setState({
				showTabBar:true,
			})
			// setTimeout(() =>{
			// 	this.setState({
			// 		tabBarPosition:'bottom',
			// 	})
			// }, 300);
		}
	}
	// <HistoryTab tabLabel='我的订单'
	// 						navigator={this.props.navigator}
	// 						hideTabBar = {this._hideTabBar}
	// 						showTabBar = {this._showTabBar}/>

  render(){

    // tabBarPosition={this.state.tabBarPosition}
    //
    // showTabBar={this.state.showTabBar}
    return(

		 <ScrollableTabView  ref={(tabView) => { this.tabView = tabView; }}
												 locked={true}
												 tabBarBackgroundColor={'#fff'}
												 tabBarActiveTextColor={'#ff8b00'}
												 tabBarTextStyle={{fontSize:12,fontFamily:'FZZhunYuan-M02S',top:5}}
												 tabBarInactiveTextColor={'#666666'}
												 initialPage={0}
												 prerenderingSiblingsNumber={1}
												 renderTabBar={() => <TabBar />}
                         tabBarPosition={'bottom'}
												 keyboardShouldPersistTaps={'always'}>

							 <MainTab tabLabel='主页'
												navigator={this.props.navigator}
												hideTabBar = {this._hideTabBar}
												showTabBar = {this._showTabBar}
                        navigator={this.props.navigator}
                        />
                <SettingTab tabLabel='设置'
                            navigator={this.props.navigator}
                            handleBackToHome={this.props.handleBackToHome}/>

		 </ScrollableTabView>

    )
  }
}

const styles = StyleSheet.create({

});
