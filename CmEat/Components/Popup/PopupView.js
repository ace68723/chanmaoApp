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

const {height, width} = Dimensions.get('window');

export default class PopupView {

    static instance = null;

    state = {};

    static getInstance() {
        if (PopupView.instance == null) {
            PopupView.instance = new PopupView();
        }
        return this.instance;
    }

    setMessagePopup({title, subtitle, confirmText = '确定', cancelText, confirmCallback = ()=> {} , cancelCallback}){
      this.state = {
        title: title,
        detailText: subtitle,
        confirmText: confirmText,
        cancelText: cancelText,
        confirmCallback: confirmCallback,
        cancelCallback: cancelCallback,
        containerStyle: {height: 160},
        titleTextStyle: {marginTop: 12}
      }
    }

    getPopup(){
      return (
        <Popup
          title={this.state.title}
          subTitle={this.state.subTitle}
          detailText={this.state.detailText}
          icon={this.state.icon}
          springFromBottom={true}
          containerStyle={this.state.containerStyle}
          titleTextStyle={this.state.titleTextStyle}
          confirmText={this.state.confirmText}
          cancelText={this.state.cancelText}
          confirmTextStyle={{color: 'white'}}
          confirmButtonStyle={{backgroundColor: '#4397DC',}}
          cancelButtonStyle={{backgroundColor: '#C5C5C5',}}

          onConfirm={this.state.confirmCallback ? this.state.confirmCallback : () => {}}
          onCancel={this.state.cancelCallback ? this.state.cancelCallback : () => {}}
        />
      )
    }
}
