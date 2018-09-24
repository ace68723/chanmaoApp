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
import CMLabel from '../../Constants/AppLabel';
class SettingTab extends Component {
    constructor(props) {
        super(props);
				this._goToHistory = this._goToHistory.bind(this);
        this._goToAddress = this._goToAddress.bind(this);
				this._goToAboutUs = this._goToAboutUs.bind(this);
        this._cmeLogOut = this._cmeLogOut.bind(this);
				this._goToSbox = this._goToSbox.bind(this);
    }
		_goToHistory(){
			this.props.navigator.push({
        screen: 'CmEatHistory',
        animated: true,
        navigatorStyle: {navBarHidden: true},
      });
		}
    _goToAddress(){
      this.props.navigator.showModal({
        screen: 'CmEatAddress',
        animated: true,
        navigatorStyle: {navBarHidden: true},
        passProps:{tag:"fromHome"}
      });
    }
    _goToAboutUs(){
      this.props.navigator.push({
        screen: 'CmEatAboutUs',
        animated: true,
        navigatorStyle: {navBarHidden: true},
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
    }
		_goToSbox() {
			this.props.navigator.resetTo({
          screen: 'cmHome',
          animated: true,
          animationType: 'fade',
          navigatorStyle: {navBarHidden: true},
					passProps:{goToSweetfulBox: true}
        });
		}
    render(){
      return(
        <View style={styles.mainContainer}>
            <Header title={CMLabel.getLabel('SETTING')}/>
            <ScrollView style={styles.scrollView}>
              <View style={{height:30,flex:1,backgroundColor:"#ffffff"}}/>
							<SettingCate  title={CMLabel.getLabel('MY_ORDER')}
                            onPress={this._goToHistory.bind(this)}
                            icon={require('./Image/history.png')}/>
              <SettingCate  title={CMLabel.getLabel('ADD_ADDRESS')}
                            onPress={this._goToAddress.bind(this)}
                            icon={require('./Image/setting.png')}/>
							<SettingCate  title={CMLabel.getLabel('CUSTOMER_SERVICE')}
														icon={require('./Image/information.png')}
														onPress={this._goToAboutUs}
														/>
							<SettingCate  title={CMLabel.getLabel('SWEETBOX')}
                icon={require('./Image/sbox.png')}
                onPress={this._goToSbox}/>
              <SettingCate  title={CMLabel.getLabel('LOG_OUT')}
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
    backgroundColor:"#ffffff",
  },
});

module.exports = SettingTab;
