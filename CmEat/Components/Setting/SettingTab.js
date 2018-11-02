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
    this._goToHistory = this._goToHistory.bind(this);
    this._goToAddress = this._goToAddress.bind(this);
    this._goToAboutUs = this._goToAboutUs.bind(this);
    this._cmeLogOut = this._cmeLogOut.bind(this);
    this._goToSbox = this._goToSbox.bind(this);
    this._goToLanguageSettings = this._goToLanguageSettings.bind(this);
  }
  _goToHistory() {
    this.props.navigator.push({
      screen: 'CmEatHistory',
      animated: true,
      navigatorStyle: {
        navBarHidden: true
      }
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
  _goToAboutUs() {
    this.props.navigator.push({
      screen: 'CmEatAboutUs',
      animated: true,
      navigatorStyle: {
        navBarHidden: true
      }
    });
  }
  _cmeLogOut() {
    AuthAction.logout();
    this.props.navigator.resetTo({
      screen: 'cmHome',
      animated: true,
      animationType: 'fade',
      navigatorStyle: {
        navBarHidden: true
      }
    });
  }
  _goToSbox() {
    this.props.navigator.resetTo({
      screen: 'cmHome',
      animated: true,
      animationType: 'fade',
      navigatorStyle: {
        navBarHidden: true
      },
      passProps: {
        goToSweetfulBox: true
      }
    });
  }
  _goToLanguageSettings() {
    this.props.navigator.push({
      screen: 'LanguagesAndRegions',
      animated: true,
      navigatorStyle: {
        navBarHidden: true
      },
      passProps: {
        firstSelection: false
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
        <SettingCate title={Label.getCMLabel('MY_ORDER')} onPress={this._goToHistory.bind(this)} icon={require('./Image/icon_setting-01.png')}/>
        <SettingCate title={Label.getCMLabel('ADD_ADDRESS')} onPress={this._goToAddress.bind(this)} icon={require('./Image/icon_setting_icon_setting_address-management.png')}/>
        <SettingCate title={Label.getCMLabel('CUSTOMER_SERVICE')} icon={require('./Image/icon_setting_icon_setting_customer-service.png')} onPress={this._goToAboutUs}/>
        <SettingCate title={Label.getCMLabel('LANGUAGE_SETTING')} icon={require('./Image/icon_language.png')} onPress={this._goToLanguageSettings}/>
        <SettingCate title={Label.getCMLabel('SWEETBOX')} icon={require('./Image/icon_setting_icon_setting_sweetful-box.png')} onPress={this._goToSbox}/>
        <SettingCate title={Label.getCMLabel('LOG_OUT')} icon={require('./Image/icon_setting_icon_setting_log-out.png')} onPress={this._cmeLogOut}/>
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
