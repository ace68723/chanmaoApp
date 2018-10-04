/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {Component} from 'react';
import {StyleSheet, ScrollView, Text, View} from 'react-native';
import SettingCate from './SettingCate';
import SettingHeader from './SettingHeader';
import Header from '../General/Header';

import AuthAction from '../../../App/Actions/AuthAction';
import Label from '../../../App/Constants/AppLabel';


class SettingTab extends Component {
  constructor(props) {
    super(props);
    this._goToCmEat = this._goToCmEat.bind(this);
    this._goToAddress = this._goToAddress.bind(this);
    this._contact = this._contact.bind(this);
    this._logout = this._logout.bind(this);
    this._goToHistory = this._goToHistory.bind(this);
    this._goToLanguageSettings = this._goToLanguageSettings.bind(this);
  }
  _goToCmEat() {
		this.props.navigator.resetTo({
				screen: 'cmHome',
				animated: true,
				animationType: 'fade',
				navigatorStyle: {navBarHidden: true},
				passProps:{goToCmEat: true}
			});
	}
  _goToAddress() {
    this.props.navigator.showModal({
      screen: 'CmEatAddress',
      animated: true,
      navigatorStyle: {
        navBarHidden: true
      },
      passProps: {
        tag: "fromHome"
      }
    });
  }
  _contact() {
    this.props.navigator.push({
      screen: 'SboxAboutContact',
      navigatorStyle: {navBarHidden: true},
    })
  }

  _logout() {
    AuthAction.logout();
    this.props.handleBackToHome();
  }
  _goToHistory() {
    this.props.navigator.push({
      screen: 'SboxHistory',
      navigatorStyle: {navBarHidden: true},
    })
  }
  _goToLanguageSettings() {
    this.props.navigator.push({
      screen: 'CmEatLanguageSettings',
      animated: true,
      navigatorStyle: {
        navBarHidden: true
      }
    });
  }
  render() {
    return (<View style={styles.mainContainer}>
      <Header title={Label.getCMLabel('SETTING')}/>
      <ScrollView style={styles.scrollView}>
        <View style={{
            height: 15,
            flex: 1,
            backgroundColor: "#f4f4f4"
          }}/>
        <SettingCate title={Label.getSboxLabel('MY_ORDER')} onPress={this._goToHistory.bind(this)} icon={require('./Image/icon_setting-01.png')}/>
        <SettingCate title={Label.getSboxLabel('CUSTOMER_SERVICE')} icon={require('./Image/icon_setting_icon_setting_customer-service.png')} onPress={this._contact}/>
        <SettingCate title={Label.getCMLabel('LANGUAGE_SETTING')} icon={require('./Image/icon_language.png')} onPress={this._goToLanguageSettings}/>
        <SettingCate title={Label.getSboxLabel('CM_EAT')} icon={require('./Image/icon_setting_icon_setting_sweetful-box.png')} onPress={this._goToCmEat}/>
        <SettingCate title={Label.getSboxLabel('LOG_OUT')} icon={require('./Image/icon_setting_icon_setting_log-out.png')} onPress={this._logout}/>
      </ScrollView>
    </View>)
  }
}

let styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#f4f4f4"
  }
});

module.exports = SettingTab;
