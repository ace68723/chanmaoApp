/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
	Component,
} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
} from 'react-native';
import SettingCate from './SettingCate';
import SettingHeader from './SettingHeader';
import Header from '../General/Header';

import AuthAction from  '../../../App/Actions/AuthAction';

class SettingTab extends Component {
    constructor(props) {
        super(props);
				this._goToHistory = this._goToHistory.bind(this);
        this._goToAddress = this._goToAddress.bind(this);
				this._goToAboutUs = this._goToAboutUs.bind(this);
        this._cmeLogOut = this._cmeLogOut.bind(this);
    }
		_goToHistory(){
			this.props.navigator.push({
        screen: 'CmEatHistory',
        animated: true,
        navigatorStyle: {navBarHidden: true},
        passProps:{tag:"fromHome"}
      });
		}
    _goToAddress(){
      this.props.navigator.showModal({
        screen: 'CmEatAddress',
        animated: true,
        navigatorStyle: {navBarHidden: true},
        passProps:{
          tag:"fromHome",
          handleBackToHome:this.props.handleBackToHome,
        }
      });
    }
    _goToAboutUs(){
      this.props.navigator.push({
        screen: 'CmEatAboutUs',
        animated: true,
        navigatorStyle: {navBarHidden: true},
        passProps:{tag:"fromHome"}
      });
    }
    _cmeLogOut(){
      AuthAction.logout();
      this.props.navigator.resetTo({
          screen: 'cmHome',
          animated: true,
          animationType: 'fade',
          navigatorStyle: {navBarHidden: true},
        });
      // this.props.handleBackToHome();
    }
    render(){
      return(
        <View style={styles.mainContainer}>
            <Header title={'设置'}/>
            <ScrollView style={styles.scrollView}>
							<SettingCate  title={'我的订单'}
                            onPress={this._goToHistory.bind(this)}
                            icon={require('./Image/setting.png')}/>
              <SettingCate  title={'添加地址'}
                            onPress={this._goToAddress.bind(this)}
                            icon={require('./Image/setting.png')}/>
							<SettingCate  title={'关于我们'}
														icon={require('./Image/information.png')}
														onPress={this._goToAboutUs}
														/>
              <SettingCate  title={'退出登录'}
                            icon={require('./Image/logout.png')}
                            onPress={this._cmeLogOut}/>
            </ScrollView>
        </View>
      )
    }
}




let styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  scrollView:{
    flex: 1,
  },
});

module.exports = SettingTab;
