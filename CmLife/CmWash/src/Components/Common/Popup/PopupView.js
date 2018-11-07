'use strict'

import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  Image,
  TextInput
} from 'react-native';

import Popup from './Popup.js';
import Common from '../../../Constants/Common'

const {height, width} = Dimensions.get('window');

/*
  ========== Usage ==========

  -- 导入 --
  import PopupView from '../Popup/PopupView'

  在constructor init
  this.popupView = PopupView.getInstance();

  -- 简易版触发 --
  this.popupView.showAlert(this, "错误信息");
  this.popupView.showAlertWithTitle(this, "标题", "错误detail");

  -- 定制触发 --
  this.popupView.setMessagePopup({
    title: "测试",
    subtitle: "测试",
    onDismiss: () => {
      this.setState({showPopup: false})
    }
  });
  this.setState({showPopup: true});

  -- 或是完整形式 --
  this.popupView.setFullPopup(
    {
      title: "测试",
      subtitle: "测试",
      detailText: '测试详情',
      icon: {uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'},
      cancelText: "取消",
      onConfirm: () => {this.setState({showPopup: false})},
      onDismiss: () => {this.setState({showPopup: false})}
    },
  );

  -- 加入render --
  {this.state.showPopup && this.popupView.show()}

*/

export default class PopupView {

    static instance = null;

    state = {};

    static getInstance() {
        if (PopupView.instance == null) {
            PopupView.instance = new PopupView();
        }
        return this.instance;
    }

    showAlert(parent, message){
      this.setMessagePopup({
        subtitle: message,
        onDismiss: () => {
          parent.setState({showPopup: false})
        }
      });
      parent.setState({showPopup: true});
    }

    showAlertWithTitle(parent, title, message){
      this.setMessagePopup({
        title: title,
        subtitle: message,
        onDismiss: () => {
          parent.setState({showPopup: false})
        }
      });
      parent.setState({showPopup: true});
    }

    setMessagePopup({title = '提示', subtitle, confirmText = '确定', cancelText, onConfirm = ()=> {} , onCancel, onDismiss, confirmButtonStyle}){
      this.state = {
        title: title,
        detailText: subtitle,
        confirmText: confirmText,
        cancelText: cancelText,
        onConfirm: onConfirm,
        onCancel: onCancel,
        // containerStyle: {height: 160},
        titleTextStyle: {},
        confirmButtonStyle: confirmButtonStyle,
        onDismiss: onDismiss
      }
    }

    setFullPopup({title, subtitle, icon, detailText, confirmText = '确定', cancelText, onConfirm = ()=> {} , onCancel = ()=> {} , onDismiss, confirmButtonStyle}){
      this.state = {
        icon: icon,
        title: title,
        subTitle: subtitle,
        detailText: detailText,
        confirmText: confirmText,
        cancelText: cancelText,
        onConfirm: onConfirm,
        onCancel: onCancel,
        confirmButtonStyle: confirmButtonStyle,
        // containerStyle: {height: 160},
        // titleTextStyle: {marginTop: 12},
        onDismiss: onDismiss
      }
    }

    setPriceDetail({title, detailText, fees, confirmText = '确定', cancelText, onConfirm = ()=> {}, onDismiss}){
      this.state = {
        title: title,
        detailText: detailText,
        fees: fees,
        confirmText: confirmText,
        cancelText: cancelText,
        onConfirm: onConfirm,
        onDismiss: onDismiss
      }
    }

    show(){
      return (
        <Popup
          title={this.state.title}
          subTitle={this.state.subTitle}
          detailText={this.state.detailText}
          icon={this.state.icon}
          fees={this.state.fees}
          springFromBottom={true}
          containerStyle={this.state.containerStyle}
          titleTextStyle={this.state.titleTextStyle}
          confirmText={this.state.confirmText}
          cancelText={this.state.cancelText}
          confirmTextStyle={{color: 'white'}}
          confirmButtonStyle={[
                        {backgroundColor: Common.MAIN_COLOR,},
                        this.state.confirmButtonStyle]}
          cancelButtonStyle={[
                        {backgroundColor: '#C5C5C5',},
                        this.state.cancelButtonStyle]}
          onConfirm={this.state.onConfirm ? this.state.onConfirm : () => {}}
          onCancel={this.state.onCancel ? this.state.onCancel : () => {}}
          onDismiss={this.state.onDismiss}
        />
      )
    }
}
