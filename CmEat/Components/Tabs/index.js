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
import SearchTab from '../Restaurant/CmRestaurantSearch';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from './TabBar';

import TabsStore from '../../Stores/TabsStore';
const {width,height} = Dimensions.get('window');


export default class Tabs extends Component {

  constructor(){
    super()
		this._hideTabBar = this._hideTabBar.bind(this);
	  this._showTabBar = this._showTabBar.bind(this);
    this._onChange = this._onChange.bind(this);
  }
	componentDidMount(){
    TabsStore.addChangeListener(this._onChange);
	}
  componentWillUnmount(){
		TabsStore.removeChangeListener(this._onChange);
	}
  _onChange() {
    if(TabsStore.getState().goToHistory){
      this.tabView.goToPage(1);
      this.props.navigator.popToRoot({animated: false,});
      setTimeout( () => {
        this.props.navigator.push({
          screen: 'CmEatHistory',
          animated: true,
          navigatorStyle: {navBarHidden: true},
        });
      }, 1000);

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
												 tabBarBackgroundColor={'#fff'}
												 tabBarActiveTextColor={'#ff8b00'}
												 tabBarTextStyle={{fontSize:12,fontFamily:'FZZhunYuan-M02S',top:5}}
												 tabBarInactiveTextColor={'#666666'}
												 initialPage={0}
												 prerenderingSiblingsNumber={1}
												 renderTabBar={() => <TabBar />}
                         tabBarPosition={'bottom'}
												 keyboardShouldPersistTaps={'always'}>

							<MainTab
								tabLabel='主页'
								hideTabBar = {this._hideTabBar}
								showTabBar = {this._showTabBar}
                navigator={this.props.navigator}/>

							<SearchTab
								tabLabel = '搜索'
								navigator={this.props.navigator}
								hideTabBar = {this._hideTabBar}
								showTabBar = {this._showTabBar}
                navigator={this.props.navigator}
                />
							<SettingTab tabLabel='我的'
                    navigator={this.props.navigator}
                    handleBackToHome={this.props.handleBackToHome}/>

		 </ScrollableTabView>

    )
  }
}

const styles = StyleSheet.create({

});
